import { Edit } from "@refinedev/antd";
import { Form, Input, InputNumber, Divider, Skeleton, Alert, Tabs, Button, Card, message } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export const ProgramEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [form] = Form.useForm();

  // --- FIX START: Correct Data Loading ---
  useEffect(() => {
    const fetchProgram = async () => {
      if (!id) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        setErrorMsg(error?.message || "Program not found");
      } else {
        const content = data.page_content || {};

        // MANUALLY MAP Nested JSON -> Flat Form Fields
        form.setFieldsValue({
            // Standard Columns
            title: data.title,
            slug: data.slug,
            short_description: data.short_description,
            icon_name: data.icon_name,
            display_order: data.display_order,
            
            // Flatten Hero
            hero_headline: content.hero?.headline,
            hero_subhead: content.hero?.subhead,
            hero_cta_text: content.hero?.cta_text,

            // Flatten Problem
            problem_title: content.problem?.title,
            problem_content: content.problem?.content,

            // Lists (These map directly)
            approach_steps: content.approach || [],
            deliverables: content.deliverables || [],
            outcomes: content.outcomes || [],
            case_studies: content.case_studies || []
        });
      }
      setLoading(false);
    };
    fetchProgram();
  }, [id, form]);
  // --- FIX END ---

  const onFinish = async (values: any) => {
      setSaving(true);
      
      const { 
          title, slug, short_description, icon_name, display_order, 
          // Flat fields from form
          hero_headline, hero_subhead, hero_cta_text, 
          problem_title, problem_content,
          approach_steps, deliverables, outcomes, case_studies
      } = values;

      // Re-Nest for Database
      const page_content = {
          hero: { 
              headline: hero_headline, 
              subhead: hero_subhead, 
              cta_text: hero_cta_text 
          },
          problem: { 
              title: problem_title, 
              content: problem_content 
          },
          approach: approach_steps || [], 
          deliverables: deliverables || [],
          outcomes: outcomes || [],
          case_studies: case_studies || []
      };

      const { error } = await supabase
          .from('programs')
          .update({
              title, slug, short_description, icon_name, display_order,
              page_content // Save as JSON
          })
          .eq('id', id);

      setSaving(false);

      if (error) {
          message.error("Error saving: " + error.message);
      } else {
          message.success("Program updated successfully!");
      }
  };

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" className="m-4" />;

  return (
    <Edit 
        isLoading={loading}
        footerButtons={
            <Button type="primary" loading={saving} onClick={() => form.submit()}>
                Save Program
            </Button>
        }
    >
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'General Info',
                    children: (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Program Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
                                <Form.Item label="URL Slug" name="slug" rules={[{ required: true }]}><Input /></Form.Item>
                            </div>
                            <Form.Item label="Short Description (For Cards)" name="short_description">
                                <Input.TextArea rows={3} showCount maxLength={250} />
                            </Form.Item>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Icon Name" name="icon_name"><Input /></Form.Item>
                                <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" /></Form.Item>
                            </div>
                        </>
                    )
                },
                {
                    key: '2',
                    label: 'Hero & Problem',
                    children: (
                        <>
                            <Divider orientation="left">Hero Section</Divider>
                            <Form.Item label="Headline" name="hero_headline"><Input /></Form.Item>
                            <Form.Item label="Subhead" name="hero_subhead"><Input.TextArea rows={2} /></Form.Item>
                            <Form.Item label="CTA Text" name="hero_cta_text"><Input /></Form.Item>
                            
                            <Divider orientation="left">Problem Block</Divider>
                            <Form.Item label="Problem Section Title" name="problem_title"><Input /></Form.Item>
                            <Form.Item label="Problem Content" name="problem_content" help="Use bullet points or paragraphs">
                                <Input.TextArea rows={6} />
                            </Form.Item>
                        </>
                    )
                },
                {
                    key: '3',
                    label: 'Approach & Deliverables',
                    children: (
                        <>
                            <Divider orientation="left">Our Approach (Steps)</Divider>
                            <Form.List name="approach_steps">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Card size="small" key={key} className="mb-2 bg-gray-50" extra={<DeleteOutlined onClick={() => remove(name)} style={{color: 'red'}} />}>
                                                <Form.Item {...restField} name={[name, 'title']} label="Step Title" className="mb-2"><Input /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'description']} label="Description" className="mb-0"><Input.TextArea rows={2} /></Form.Item>
                                            </Card>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Approach Step</Button>
                                    </>
                                )}
                            </Form.List>

                            <Divider orientation="left">Key Deliverables</Divider>
                            <Form.List name="deliverables">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={name} className="mb-0 flex-1"><Input /></Form.Item>
                                                <Button icon={<DeleteOutlined />} danger onClick={() => remove(name)} />
                                            </div>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Deliverable</Button>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )
                },
                {
                    key: '4',
                    label: 'Outcomes & Cases',
                    children: (
                        <>
                            <Divider orientation="left">Impact / Outcomes</Divider>
                            <Form.List name="outcomes">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={name} className="mb-0 flex-1"><Input /></Form.Item>
                                                <Button icon={<DeleteOutlined />} danger onClick={() => remove(name)} />
                                            </div>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Outcome</Button>
                                    </>
                                )}
                            </Form.List>

                            <Divider orientation="left">Case Studies</Divider>
                            <Form.List name="case_studies">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={[name, 'title']} className="mb-0 flex-1"><Input placeholder="Industry" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'metric']} className="mb-0 flex-1"><Input placeholder="Outcome" /></Form.Item>
                                                <Button icon={<DeleteOutlined />} danger onClick={() => remove(name)} />
                                            </div>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Case Study</Button>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )
                }
            ]} />
        </Form>
      )}
    </Edit>
  );
};
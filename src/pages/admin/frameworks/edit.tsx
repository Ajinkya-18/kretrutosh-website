import { Edit } from "@refinedev/antd";
import { Form, Input, InputNumber, Divider, Skeleton, Alert, Tabs, Button, Card, message } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export const FrameworkEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // 1. Create independent form instance
  const [form] = Form.useForm();

  // 2. Fetch Data
  useEffect(() => {
    const fetchFramework = async () => {
      if (!id) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        setErrorMsg(error?.message || "Framework not found");
      } else {
        const content = data.page_content || {};

        // MANUALLY FLATTEN
        form.setFieldsValue({
            title: data.title,
            slug: data.slug,
            short_description: data.short_description,
            icon_name: data.icon_name,
            display_order: data.display_order,
            
            // Map JSON keys to Form keys
            hero_subhead: content.hero?.subhead,
            cta_text: content.hero?.cta_text,
            
            problem_list: content.problems || [],
            
            model_image_url: content.model?.image,
            model_dimensions: content.model?.dimensions || [],
            
            process_steps: content.process || [],
            business_impact: content.impact || [],
            case_examples: content.cases || []
        });
      }
      setLoading(false);
    };
    fetchFramework();
  }, [id, form]);

  // 3. Save Data (Re-structure into JSON)
  const onFinish = async (values: any) => {
      setSaving(true);
      
      // Destructure core fields vs page content fields
      const { 
          title, slug, short_description, icon_name, display_order, 
          hero_subhead, problem_list, model_dimensions, model_image_url,
          process_steps, business_impact, case_examples, cta_text
      } = values;

      // Pack into JSONB
      const page_content = {
          hero: { subhead: hero_subhead, cta_text: cta_text },
          problems: problem_list || [],
          model: { dimensions: model_dimensions || [], image: model_image_url },
          process: process_steps || [],
          impact: business_impact || [],
          cases: case_examples || []
      };

      const { error } = await supabase
          .from('frameworks')
          .update({
              title, slug, short_description, icon_name, display_order,
              page_content // Save the JSON
          })
          .eq('id', id);

      setSaving(false);

      if (error) {
          message.error("Error saving: " + error.message);
      } else {
          message.success("Framework updated successfully!");
      }
  };

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" className="m-4" />;

  return (
    <Edit 
        isLoading={loading}
        footerButtons={
            <Button type="primary" loading={saving} onClick={() => form.submit()}>
                Save Framework
            </Button>
        }
    >
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'Core Info',
                    children: (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Framework Name" name="title" rules={[{ required: true }]}><Input /></Form.Item>
                                <Form.Item label="URL Slug" name="slug" rules={[{ required: true }]}><Input /></Form.Item>
                            </div>
                            <Form.Item label="Short Description (Card View)" name="short_description">
                                <Input.TextArea rows={2} showCount maxLength={200} />
                            </Form.Item>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Lucide Icon Name" name="icon_name" help="e.g. Trophy, Layers, Zap"><Input /></Form.Item>
                                <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" /></Form.Item>
                            </div>
                        </>
                    )
                },
                {
                    key: '2',
                    label: 'Hero & Problems',
                    children: (
                        <>
                            <Form.Item label="Page Subhead (Hero)" name="hero_subhead" help="The main value prop shown at the top of the detail page">
                                <Input.TextArea rows={3} />
                            </Form.Item>
                            
                            <Divider orientation="left">What This Solves</Divider>
                            <Form.List name="problem_list">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={name} className="mb-0 flex-1"><Input placeholder="e.g. Experience delivery is inconsistent" /></Form.Item>
                                                <Button icon={<DeleteOutlined />} danger onClick={() => remove(name)} />
                                            </div>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Problem Statement</Button>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )
                },
                {
                    key: '3',
                    label: 'The Model',
                    children: (
                        <>
                            <Form.Item label="Model Visual URL" name="model_image_url" help="Paste URL of the uploaded diagram (Radial chart, etc)">
                                <Input placeholder="https://..." />
                            </Form.Item>

                            <Divider orientation="left">Model Dimensions / Components</Divider>
                            <Form.List name="model_dimensions">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={name} className="mb-0 flex-1"><Input placeholder="e.g. 1. Brand Promise Clarity" /></Form.Item>
                                                <Button icon={<DeleteOutlined />} danger onClick={() => remove(name)} />
                                            </div>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Dimension</Button>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )
                },
                {
                    key: '4',
                    label: 'How It Works',
                    children: (
                        <>
                            <Form.List name="process_steps">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Card size="small" key={key} className="mb-2 bg-gray-50" extra={<DeleteOutlined onClick={() => remove(name)} style={{color: 'red'}} />}>
                                                <Form.Item {...restField} name={[name, 'title']} label="Step Name" className="mb-2"><Input placeholder="e.g. Assess" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'description']} label="Description" className="mb-0"><Input placeholder="e.g. Using the proprietary diagnostic..." /></Form.Item>
                                            </Card>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Process Step</Button>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )
                },
                {
                    key: '5',
                    label: 'Impact & Cases',
                    children: (
                        <>
                            <Divider orientation="left">Business Impact (Outcomes)</Divider>
                            <Form.List name="business_impact">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={name} className="mb-0 flex-1"><Input placeholder="e.g. +18–33% CSAT" /></Form.Item>
                                                <Button icon={<DeleteOutlined />} danger onClick={() => remove(name)} />
                                            </div>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Outcome</Button>
                                    </>
                                )}
                            </Form.List>

                            <Divider orientation="left">Case Examples</Divider>
                            <Form.List name="case_examples">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={[name, 'title']} className="mb-0 flex-1"><Input placeholder="Industry (e.g. Retail UK)" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'outcome']} className="mb-0 flex-1"><Input placeholder="Outcome (e.g. AOV +24%)" /></Form.Item>
                                                <Button icon={<DeleteOutlined />} danger onClick={() => remove(name)} />
                                            </div>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Case</Button>
                                    </>
                                )}
                            </Form.List>

                            <Divider />
                            <Form.Item label="CTA Text" name="cta_text"><Input placeholder="e.g. Take the CX Maturity Assessment" /></Form.Item>
                        </>
                    )
                }
            ]} />
        </Form>
      )}
    </Edit>
  );
};
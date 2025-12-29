import { Create } from "@refinedev/antd";
import { Form, Input, InputNumber, Divider, Tabs, Button, Card, message } from "antd";
import { useNavigation } from "@refinedev/core";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export const ProgramCreate = () => {
  const { list } = useNavigation();
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
      setSaving(true);
      
      const { 
          title, slug, short_description, icon_name, display_order, 
          // Flat fields
          hero_headline, hero_subhead, hero_cta_text, 
          problem_title, problem_content,
          approach_steps, deliverables, outcomes, case_studies
      } = values;

      // Construct JSON structure
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
          .insert({ // <--- INSERT
              title, 
              slug, 
              short_description, 
              icon_name, 
              display_order,
              page_content 
          });

      setSaving(false);

      if (error) {
          message.error("Error creating program: " + error.message);
      } else {
          message.success("Program created successfully!");
          list("programs"); // Redirect
      }
  };

  return (
    <Create 
        footerButtons={
            <Button type="primary" loading={saving} onClick={() => form.submit()}>
                Create Program
            </Button>
        }
    >
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'General Info',
                    children: (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Program Title" name="title" rules={[{ required: true }]}><Input placeholder="e.g. Sales Velocity Acceleration" /></Form.Item>
                                <Form.Item label="URL Slug" name="slug" rules={[{ required: true }]}><Input placeholder="sales-velocity" /></Form.Item>
                            </div>
                            <Form.Item label="Short Description (For Cards)" name="short_description" rules={[{ required: true }]}>
                                <Input.TextArea rows={3} showCount maxLength={250} />
                            </Form.Item>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Icon Name" name="icon_name"><Input placeholder="e.g. Rocket" /></Form.Item>
                                <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" defaultValue={0} /></Form.Item>
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
                            <Form.Item label="CTA Text" name="hero_cta_text"><Input placeholder="e.g. Book a GTM Strategy Review" /></Form.Item>
                            
                            <Divider orientation="left">Problem Block</Divider>
                            <Form.Item label="Problem Section Title" name="problem_title"><Input placeholder="e.g. Why Pre-Sales Fails" /></Form.Item>
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
                                                <Form.Item {...restField} name={[name, 'title']} label="Step Title" className="mb-2"><Input placeholder="e.g. CX Maturity Diagnostic" /></Form.Item>
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
                                                <Form.Item {...restField} name={name} className="mb-0 flex-1"><Input placeholder="Deliverable item..." /></Form.Item>
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
                                                <Form.Item {...restField} name={name} className="mb-0 flex-1"><Input placeholder="e.g. +20-30% increase in funnel..." /></Form.Item>
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
                                                <Form.Item {...restField} name={[name, 'title']} className="mb-0 flex-1"><Input placeholder="Industry/Client" /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'metric']} className="mb-0 flex-1"><Input placeholder="Key Metric (e.g. +31% Sales)" /></Form.Item>
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
    </Create>
  );
};
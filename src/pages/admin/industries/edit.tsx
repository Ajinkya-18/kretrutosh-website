import { Edit } from "@refinedev/antd";
import { Form, Input, InputNumber, Divider, Tabs, Button, Card, Skeleton, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export const IndustryEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase.from('industries').select('*').eq('id', id).maybeSingle();
      
      if (error || !data) {
        setErrorMsg(error?.message || "Industry not found");
      } else {
        const content = data.page_content || {};
        form.setFieldsValue({
            title: data.title,
            slug: data.slug,
            short_description: data.short_description,
            icon_name: data.icon_name,
            display_order: data.display_order,
            
            hero_title: content.hero?.title,
            hero_subhead: content.hero?.subhead,
            cta_text: content.hero?.cta_text,
            cta_link: content.hero?.cta_link,
            
            challenges_intro: content.challenges?.intro,
            challenges_list: content.challenges?.list || [],
            
            approach_intro: content.approach?.intro,
            approach_steps: content.approach?.list || [],
            
            frameworks_list: content.frameworks || [],
            real_cases_list: content.real_cases || [],
            
            feature_case_title: content.feature_case?.title,
            feature_case_problem: content.feature_case?.problem,
            feature_case_approach: content.feature_case?.approach,
            feature_case_outcome: content.feature_case?.outcome,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [id, form]);

  const onFinish = async (values: any) => {
      setSaving(true);
      
      const { 
          title, slug, short_description, icon_name, display_order, 
          hero_title, hero_subhead, cta_text, cta_link,
          challenges_intro, challenges_list,
          approach_intro, approach_steps,
          frameworks_list,
          real_cases_list,
          feature_case_title, feature_case_problem, feature_case_approach, feature_case_outcome
      } = values;

      const { data: currentData, error: fetchError } = await supabase
        .from('industries')
        .select('page_content')
        .eq('id', id)
        .single();

    if (fetchError) {
        message.error("Error fetching original data. Save cancelled.");
        setSaving(false);
        return;
    }

    const existingContent = currentData?.page_content || {};

    const merged_page_content = {
        ...existingContent, // Keeps any top-level keys not in the form (e.g. meta_tags)
        
        hero: { 
            ...existingContent.hero, 
            title: hero_title, 
            subhead: hero_subhead, 
            cta_text: cta_text, 
            cta_link: cta_link 
        },
        
        challenges: { 
            ...existingContent.challenges, 
            intro: challenges_intro, 
            list: challenges_list || [] 
        },
        
        approach: { 
            ...existingContent.approach, 
            intro: approach_intro, 
            list: approach_steps || [] 
        },
        
        // Lists are usually replaced entirely by the form state, which is correct
        frameworks: frameworks_list || [],
        real_cases: real_cases_list || [],
        
        feature_case: { 
            ...existingContent.feature_case, // Safe deep merge
            title: feature_case_title, 
            problem: feature_case_problem, 
            approach: feature_case_approach, 
            outcome: feature_case_outcome 
        }
    };

      const { error } = await supabase
        .from('industries')
        .update({
            title, slug, short_description, icon_name, display_order,
            page_content: merged_page_content // <--- Send the merged object
        })
        .eq('id', id);

    setSaving(false);

    if (error) message.error("Error: " + error.message);
    else message.success("Industry updated!");
};

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" />;

  return (
    <Edit footerButtons={<Button type="primary" loading={saving} onClick={() => form.submit()}>Save Industry</Button>}>
        {loading ? <Skeleton active /> : (
            <Form form={form} layout="vertical" onFinish={onFinish}>
                {/* ... Copy the exact <Tabs> structure from Create.tsx here ... */}
                {/* IMPORTANT: Paste the Tabs code from Create.tsx here */}
                <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'General & Hero',
                    children: (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Industry Name" name="title" rules={[{ required: true }]}><Input /></Form.Item>
                                <Form.Item label="URL Slug" name="slug" rules={[{ required: true }]}><Input /></Form.Item>
                            </div>
                            <Form.Item label="Short Description (Home Card)" name="short_description"><Input.TextArea rows={2} /></Form.Item>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Icon Name" name="icon_name"><Input /></Form.Item>
                                <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" /></Form.Item>
                            </div>
                            <Divider orientation="left">Hero Section</Divider>
                            <Form.Item label="Hero Headline" name="hero_title"><Input /></Form.Item>
                            <Form.Item label="Hero Subhead" name="hero_subhead"><Input.TextArea rows={3} /></Form.Item>
                            <Form.Item label="CTA Text" name="cta_text"><Input /></Form.Item>
                            <Form.Item label="CTA Link (Internal or External)" name="cta_link" help="e.g. /contact or https://calendly.com/...">
                                <Input placeholder="/contact" />
                            </Form.Item>
                        </>
                    )
                },
                {
                    key: '2',
                    label: 'Challenges',
                    children: (
                        <>
                            <Form.Item label="Section Intro" name="challenges_intro"><Input.TextArea rows={2} /></Form.Item>
                            <Form.List name="challenges_list">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Card size="small" key={key} className="mb-2 bg-gray-50" extra={<DeleteOutlined onClick={() => remove(name)} />}>
                                                <Form.Item {...restField} name={[name, 'title']} label="Gap Title"><Input /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'description']} label="Description"><Input.TextArea rows={2} /></Form.Item>
                                            </Card>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Challenge/Gap</Button>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )
                },
                {
                    key: '3',
                    label: 'Approach',
                    children: (
                        <>
                            <Form.Item label="Section Intro" name="approach_intro"><Input.TextArea rows={2} /></Form.Item>
                            <Form.List name="approach_steps">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Card size="small" key={key} className="mb-2 bg-gray-50" extra={<DeleteOutlined onClick={() => remove(name)} />}>
                                                <Form.Item {...restField} name={[name, 'title']} label="Step Title"><Input /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'description']} label="Description"><Input.TextArea rows={3} /></Form.Item>
                                            </Card>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Transformation Step</Button>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )
                },
                {
                    key: '4',
                    label: 'Cases & Frameworks',
                    children: (
                        <>
                            <Divider orientation="left">Relevant Frameworks</Divider>
                            <Form.List name="frameworks_list">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={name} className="mb-0 flex-1"><Input placeholder="Framework Name" /></Form.Item>
                                                <Button icon={<DeleteOutlined />} danger onClick={() => remove(name)} />
                                            </div>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Framework</Button>
                                    </>
                                )}
                            </Form.List>

                            <Divider orientation="left">Real Case Studies (Bulleted Outcomes)</Divider>
                            <Form.List name="real_cases_list">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Card size="small" key={key} className="mb-2" extra={<DeleteOutlined onClick={() => remove(name)} />}>
                                                <Form.Item {...restField} name={[name, 'client']} label="Client/Brand"><Input /></Form.Item>
                                                <Form.Item {...restField} name={[name, 'outcomes']} label="Outcomes (Comma separated)"><Input.TextArea placeholder="Item 1, Item 2..." /></Form.Item>
                                            </Card>
                                        ))}
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Real Case</Button>
                                    </>
                                )}
                            </Form.List>

                            <Divider orientation="left">Featured Case Study (Detailed)</Divider>
                            <Form.Item label="Title" name="feature_case_title"><Input /></Form.Item>
                            <Form.Item label="Problem" name="feature_case_problem"><Input.TextArea rows={2} /></Form.Item>
                            <Form.Item label="Approach" name="feature_case_approach"><Input.TextArea rows={2} /></Form.Item>
                            <Form.Item label="Outcome" name="feature_case_outcome"><Input.TextArea rows={2} /></Form.Item>
                        </>
                    )
                }
            ]} />
            </Form>
        )}
    </Edit>
  );
};
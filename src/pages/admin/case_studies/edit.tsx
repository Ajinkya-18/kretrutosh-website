import { Edit } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Button, Skeleton, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

export const CaseStudyEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase.from('case_studies').select('*').eq('id', id).maybeSingle();
      if (error || !data) setErrorMsg(error?.message || "Case Study not found");
      else form.setFieldsValue(data);
      setLoading(false);
    };
    fetchData();
  }, [id, form]);

  const onFinish = async (values: any) => {
      setSaving(true);
      const { error } = await supabase.from('case_studies').update(values).eq('id', id);
      setSaving(false);
      if (error) message.error("Error: " + error.message);
      else message.success("Case Study updated!");
  };

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" />;

  return (
    <Edit isLoading={loading} footerButtons={<Button type="primary" loading={saving} onClick={() => form.submit()}>Save</Button>}>
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Client Name" name="client_name" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item label="Industry" name="industry">
                    <Select options={[
                        { value: 'SaaS & Tech', label: 'SaaS & Tech' },
                        { value: 'Retail', label: 'Retail' },
                        { value: 'Insurance', label: 'Insurance' },
                        { value: 'BFSI', label: 'BFSI' },
                        { value: 'Manufacturing', label: 'Manufacturing' },
                        { value: 'Healthcare', label: 'Healthcare' },
                    ]} />
                </Form.Item>
            </div>
            <Form.Item label="Headline Metric" name="headline_metric"><Input /></Form.Item>
            <Form.Item label="Summary" name="summary"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item label="Link URL" name="link_url"><Input /></Form.Item>
            <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" /></Form.Item>
        </Form>
      )}
    </Edit>
  );
};
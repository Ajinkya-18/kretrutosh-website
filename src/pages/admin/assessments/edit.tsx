import { Edit } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, Button, Skeleton, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

export const AssessmentEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase.from('assessments').select('*').eq('id', id).maybeSingle();
      
      if (error || !data) setErrorMsg(error?.message || "Assessment not found");
      else form.setFieldsValue(data);
      
      setLoading(false);
    };
    fetchData();
  }, [id, form]);

  const onFinish = async (values: any) => {
      setSaving(true);
      const { error } = await supabase.from('assessments').update(values).eq('id', id);
      setSaving(false);
      
      if (error) message.error("Error: " + error.message);
      else message.success("Assessment updated!");
  };

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" />;

  return (
    <Edit isLoading={loading} footerButtons={<Button type="primary" loading={saving} onClick={() => form.submit()}>Save Assessment</Button>}>
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item label="Lucide Icon Name" name="icon_name"><Input /></Form.Item>
            </div>
            <Form.Item label="External Link (Assessment Tool)" name="external_link"><Input /></Form.Item>
            <Form.Item label="Description" name="description"><Input.TextArea rows={3} /></Form.Item>
            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" /></Form.Item>
                <Form.Item label="Visible?" name="is_visible" valuePropName="checked"><Switch /></Form.Item>
            </div>
        </Form>
      )}
    </Edit>
  );
};
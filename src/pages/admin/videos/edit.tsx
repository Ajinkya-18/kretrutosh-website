import { Edit } from "@refinedev/antd";
import { Form, Input, InputNumber, Button, Skeleton, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

export const VideoEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [form] = Form.useForm();

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        setErrorMsg(error?.message || "Video not found");
      } else {
        form.setFieldsValue(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, form]);

  // 2. Save Data
  const onFinish = async (values: any) => {
      setSaving(true);
      const { error } = await supabase
        .from('videos')
        .update(values)
        .eq('id', id);

      setSaving(false);

      if (error) {
          message.error("Error saving video: " + error.message);
      } else {
          message.success("Video updated successfully!");
      }
  };

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" className="m-4" />;

  return (
    <Edit 
        isLoading={loading} 
        footerButtons={
            <Button type="primary" loading={saving} onClick={() => form.submit()}>
                Save Video
            </Button>
        }
    >
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Video Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="YouTube Video ID" name="youtube_id" help="e.g. dQw4w9WgXcQ" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Description" name="description"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" /></Form.Item>
        </Form>
      )}
    </Edit>
  );
};
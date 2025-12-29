import { Edit } from "@refinedev/antd";
import { Form, Input, Select, Button, Skeleton, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { ImageUpload } from "../../../components/admin/ImageUpload";

export const WhitepaperEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase.from('whitepapers').select('*').eq('id', id).maybeSingle();
      
      if (error || !data) setErrorMsg(error?.message || "Whitepaper not found");
      else form.setFieldsValue(data);
      
      setLoading(false);
    };
    fetchData();
  }, [id, form]);

  const onFinish = async (values: any) => {
      setSaving(true);
      const { error } = await supabase.from('whitepapers').update(values).eq('id', id);
      setSaving(false);
      
      if (error) message.error("Error: " + error.message);
      else message.success("Whitepaper updated!");
  };

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" />;

  return (
    <Edit isLoading={loading} footerButtons={<Button type="primary" loading={saving} onClick={() => form.submit()}>Save Whitepaper</Button>}>
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Download/External URL" name="download_url" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Type" name="type">
                <Select options={[{ value: 'pdf', label: 'PDF' }, { value: 'article', label: 'Article' }]} />
            </Form.Item>
            
            <Form.Item label="Cover Image" name="cover_image_url">
                <ImageUpload />
            </Form.Item>
            
            <Form.Item label="Description" name="description"><Input.TextArea rows={4} /></Form.Item>
        </Form>
      )}
    </Edit>
  );
};
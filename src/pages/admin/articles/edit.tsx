import { Edit } from "@refinedev/antd";
import { Form, Input, DatePicker, Button, Skeleton, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { ImageUpload } from "../../../components/admin/ImageUpload";
import dayjs from "dayjs";

export const ArticleEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        setErrorMsg(error?.message || "Article not found");
      } else {
        form.setFieldsValue({
            ...data,
            // Convert string date to dayjs object for the DatePicker
            publish_date: data.publish_date ? dayjs(data.publish_date) : null
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [id, form]);

  const onFinish = async (values: any) => {
      setSaving(true);
      // Convert dayjs object back to string for Database
      const payload = {
          ...values,
          publish_date: values.publish_date ? values.publish_date.format('YYYY-MM-DD') : null
      };

      const { error } = await supabase.from('articles').update(payload).eq('id', id);

      setSaving(false);
      if (error) message.error("Error: " + error.message);
      else message.success("Article updated!");
  };

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" />;

  return (
    <Edit isLoading={loading} footerButtons={<Button type="primary" loading={saving} onClick={() => form.submit()}>Save Article</Button>}>
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Article Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="External Link / URL" name="link" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Publish Date" name="publish_date" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
            
            <Form.Item label="Cover Image" name="image_url">
                <ImageUpload />
            </Form.Item>
            
            <Form.Item label="Short Description" name="description"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      )}
    </Edit>
  );
};
import { Edit } from "@refinedev/antd";
import { Form, Input, Divider, Button, Skeleton, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { ImageUpload } from "../../../components/admin/ImageUpload";

export const BookEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // 1. Independent Form Instance
  const [form] = Form.useForm();

  // 2. Manual Fetch Data
  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from('book')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        setErrorMsg(error?.message || "Book not found");
      } else {
        // Populate form
        form.setFieldsValue(data);
      }
      setLoading(false);
    };
    fetchBook();
  }, [id, form]);

  // 3. Manual Save
  const onFinish = async (values: any) => {
      setSaving(true);
      const { error } = await supabase
          .from('book')
          .update(values) // Book table is flat, so we can pass values directly
          .eq('id', id);

      setSaving(false);

      if (error) {
          message.error("Error saving book: " + error.message);
      } else {
          message.success("Book updated successfully!");
      }
  };

  if (errorMsg) return <Alert message="Error" description={errorMsg} type="error" className="m-4" />;

  return (
    <Edit 
        isLoading={loading}
        footerButtons={
            <Button type="primary" loading={saving} onClick={() => form.submit()}>
                Save Book
            </Button>
        }
    >
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Divider orientation="left">Hero Section</Divider>
            <Form.Item label="Book Title" name="hero_title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Subtitle" name="hero_subtitle"><Input.TextArea rows={2} /></Form.Item>
            
            <Form.Item label="Cover Image" name="cover_image_url">
                <ImageUpload />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Price / Promo Text" name="price_text"><Input /></Form.Item>
                <Form.Item label="Amazon URL" name="amazon_url"><Input /></Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="CTA Title" name="cta_title"><Input /></Form.Item>
                <Form.Item label="CTA Button Text" name="cta_button_text"><Input /></Form.Item>
            </div>

            <Divider orientation="left">Content</Divider>
            <Form.Item label="About Title" name="about_title"><Input /></Form.Item>
            <Form.Item label="About Description" name="about_description"><Input.TextArea rows={6} /></Form.Item>

            <Divider orientation="left">Author & QR</Divider>
            <Form.Item label="Author Bio" name="author_bio"><Input.TextArea rows={4} /></Form.Item>
            
            <Form.Item label="QR Code Image" name="qr_image_url">
                <ImageUpload />
            </Form.Item>
        </Form>
      )}
    </Edit>
  );
};
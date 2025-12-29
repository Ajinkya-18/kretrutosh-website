import { Edit } from "@refinedev/antd";
import { Form, Input, Divider, Button, Skeleton, message, Alert } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { ImageUpload } from "../../../components/admin/ImageUpload";

export const ContactEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase.from('page_contact').select('*').eq('id', id).single();
      if (data) form.setFieldsValue(data);
      setLoading(false);
    };
    fetchData();
  }, [id, form]);

  const onFinish = async (values: any) => {
      setSaving(true);
      const { error } = await supabase.from('page_contact').update(values).eq('id', id);
      setSaving(false);
      if (error) message.error("Error: " + error.message);
      else message.success("Contact page updated!");
  };

  return (
    <Edit isLoading={loading} footerButtons={<Button type="primary" loading={saving} onClick={() => form.submit()}>Save Contact Info</Button>}>
      {loading ? <Skeleton active /> : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Divider orientation="left">General Info</Divider>

            <Form.Item label="Website Logo" name="logo_url" help="Upload a PNG with transparent background">
                <ImageUpload />
            </Form.Item>
            
            <Form.Item label="Hero Title" name="hero_title"><Input /></Form.Item>
            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Email Address" name="email"><Input /></Form.Item>
                <Form.Item label="Phone Number" name="phone"><Input /></Form.Item>
            </div>
            
            <Divider orientation="left">Social Media Links</Divider>
            <div className="grid grid-cols-2 gap-4">
                <Form.Item label="LinkedIn URL" name="linkedin_url"><Input /></Form.Item>
                <Form.Item label="YouTube URL" name="youtube_url"><Input /></Form.Item>
            </div>

            <Divider orientation="left">Embeds & Locations</Divider>
            <Form.Item label="Address (HTML allowed)" name="address_html"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item label="Google Map Embed URL (src only)" name="map_embed" help="Paste the 'src' link from the Google Maps iframe code"><Input.TextArea rows={2} /></Form.Item>
            
            <Divider orientation="left">Forms & Calendly</Divider>
            <Form.Item label="Calendly Link" name="calendly_url"><Input /></Form.Item>
            <Form.Item label="Calendly Button Text" name="calendly_cta_text"><Input /></Form.Item>
            <Form.Item label="External Form URL (Google/Microsoft Forms)" name="google_form_url"><Input /></Form.Item>
        </Form>
      )}
    </Edit>
  );
};
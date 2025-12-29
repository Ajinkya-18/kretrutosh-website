import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Divider } from "antd";
import { ImageUpload } from "../../../components/admin/ImageUpload";

export const BookCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Divider orientation="left">Hero Section</Divider>
        <Form.Item label="Book Title" name="hero_title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Subtitle" name="hero_subtitle"><Input.TextArea rows={2} /></Form.Item>
        {/* <Form.Item label="Cover Image URL" name="cover_image_url"><Input /></Form.Item> */}
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
        {/* <Form.Item label="QR Code Image URL" name="qr_image_url"><Input /></Form.Item> */}
        <Form.Item label="QR Code Image" name="qr_image_url">
            <ImageUpload />
        </Form.Item>
      </Form>
    </Create>
  );
};
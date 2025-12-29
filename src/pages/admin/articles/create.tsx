import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import { ImageUpload } from "../../../components/admin/ImageUpload";

export const ArticleCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Article Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="External Link / URL" name="link" rules={[{ required: true }]}><Input placeholder="https://medium.com/..." /></Form.Item>
        <Form.Item label="Publish Date" name="publish_date" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
        {/* <Form.Item label="Cover Image URL" name="image_url"><Input /></Form.Item> */}
        <Form.Item label="Cover Image" name="image_url">
            <ImageUpload />
        </Form.Item>
        <Form.Item label="Short Description" name="description"><Input.TextArea rows={3} /></Form.Item>
      </Form>
    </Create>
  );
};
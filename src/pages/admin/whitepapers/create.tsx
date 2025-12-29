import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { ImageUpload } from "../../../components/admin/ImageUpload";

export const WhitepaperCreate = () => {
  const { formProps, saveButtonProps } = useForm();
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Download/External URL" name="download_url" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Type" name="type"><Select options={[{ value: 'pdf', label: 'PDF' }, { value: 'article', label: 'Article' }]} /></Form.Item>
        {/* <Form.Item label="Cover Image URL" name="cover_image_url"><Input /></Form.Item> */}
        <Form.Item label="Cover Image" name="cover_image_url">
            <ImageUpload />
        </Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea /></Form.Item>
      </Form>
    </Create>
  );
};
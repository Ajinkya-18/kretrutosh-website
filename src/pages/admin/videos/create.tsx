import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";

export const VideoCreate = () => {
  const { formProps, saveButtonProps } = useForm();
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Video Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="YouTube Video ID" name="youtube_id" help="e.g. dQw4w9WgXcQ" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea rows={3} /></Form.Item>
        <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" defaultValue={0} /></Form.Item>
      </Form>
    </Create>
  );
};
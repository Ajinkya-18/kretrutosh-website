import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch } from "antd";

export const AssessmentCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={{ is_visible: true, display_order: 0 }}>
        <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Lucide Icon Name" name="icon_name"><Input placeholder="e.g. ClipboardCheck" /></Form.Item>
        </div>
        <Form.Item label="External Link (Assessment Tool)" name="external_link"><Input /></Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea rows={3} /></Form.Item>
        <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" /></Form.Item>
            <Form.Item label="Visible?" name="is_visible" valuePropName="checked"><Switch /></Form.Item>
        </div>
      </Form>
    </Create>
  );
};
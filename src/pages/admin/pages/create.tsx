import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { PageBuilder } from "../../../components/admin/PageBuilder";

export const PageCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Page Title (Internal)" name="title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="URL Slug" name="slug" rules={[{ required: true }]}><Input prefix="/" /></Form.Item>
        </div>
        <Form.Item label="Status" name="status"><Select options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }]} /></Form.Item>
        
        {/* The Magic Builder */}
        <Form.Item label="Content Blocks" name="blocks">
            <PageBuilder />
        </Form.Item>
      </Form>
    </Create>
  );
};
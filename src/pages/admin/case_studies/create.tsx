import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

export const CaseStudyCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Client Name" name="client_name" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Industry" name="industry" rules={[{ required: true }]}>
                <Select options={[
                    { value: 'SaaS & Tech', label: 'SaaS & Tech' },
                    { value: 'Retail', label: 'Retail' },
                    { value: 'Insurance', label: 'Insurance' },
                    { value: 'BFSI', label: 'BFSI' },
                    { value: 'Manufacturing', label: 'Manufacturing' },
                    { value: 'Healthcare', label: 'Healthcare' },
                ]} />
            </Form.Item>
        </div>

        <Form.Item label="Headline Metric" name="headline_metric" help="e.g. +31% Like-for-Like Sales" rules={[{ required: true }]}>
            <Input />
        </Form.Item>

        <Form.Item label="Summary" name="summary" help="Short paragraph for the card"><Input.TextArea rows={3} /></Form.Item>
        
        <Form.Item label="Full Case Study Link" name="link_url" help="Link to PDF or external page"><Input /></Form.Item>
        
        <Form.Item label="Display Order" name="display_order"><InputNumber className="w-full" /></Form.Item>
      </Form>
    </Create>
  );
};
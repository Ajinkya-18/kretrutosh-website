import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Skeleton, message, Alert } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient"; 
import { PageBuilder } from "../../../components/admin/PageBuilder";

export const PageEdit = () => {
  const { id } = useParams(); // URL contains the UUID (e.g., 84a7...)
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize Refine Form
  const { formProps, saveButtonProps, form } = useForm({
    resource: "pages",
    action: "edit",
    id: id, 
    queryOptions: {
      enabled: false, // Disable auto-fetch, we handle it below
    }
  });

  useEffect(() => {
    const fetchPage = async () => {
      if (!id) return;
      
      setLoading(true);
      setErrorMsg(null);

      // FIXED: Query by 'id' (Primary Key), not 'slug'
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error("Supabase Error:", error);
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        setErrorMsg(`Page with ID "${id}" not found.`);
        setLoading(false);
        return;
      }

      setPageData(data);
      
      // Populate Form
      form.setFieldsValue({
        title: data.title,
        slug: data.slug,
        status: data.status,
        blocks: data.blocks || [] // Load existing blocks
      });
      
      setLoading(false);
    };

    fetchPage();
  }, [id, form]);

  if (errorMsg) {
    return (
        <div className="p-4">
            <Alert
                message="Error Loading Page"
                description={errorMsg}
                type="error"
                showIcon
            />
        </div>
    );
  }

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={loading}>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <Form {...formProps} layout="vertical">
            <div className="grid grid-cols-2 gap-4">
                <Form.Item 
                    label="Page Title (Internal)" 
                    name="title" 
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item 
                    label="URL Slug" 
                    name="slug" 
                    rules={[{ required: true }]}
                >
                    <Input prefix="/" />
                </Form.Item>
            </div>

            <Form.Item 
                label="Status" 
                name="status"
            >
                <Select options={[
                    { value: 'draft', label: 'Draft' }, 
                    { value: 'published', label: 'Published' }
                ]} />
            </Form.Item>
            
            <Form.Item label="Content Blocks" name="blocks">
                <PageBuilder />
            </Form.Item>
        </Form>
      )}
    </Edit>
  );
};
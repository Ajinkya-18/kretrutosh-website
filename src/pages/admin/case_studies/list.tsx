import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";

export const CaseStudyList = () => {
  const { tableProps } = useTable({
    resource: "case_studies",
    sorters: { initial: [{ field: "display_order", order: "asc" }] }
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="display_order" title="#" width={60} />
        <Table.Column 
            dataIndex="client_name" 
            title="Client" 
            render={(val) => <span className="font-bold text-[#0B1C3E]">{val}</span>}
        />
        <Table.Column dataIndex="industry" title="Industry" />
        <Table.Column 
            dataIndex="headline_metric" 
            title="Key Metric" 
            render={(val) => <span className="text-green-600 font-medium">{val}</span>}
        />
        <Table.Column
          title="Actions"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
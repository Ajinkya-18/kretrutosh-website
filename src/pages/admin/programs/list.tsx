import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const ProgramList = () => {
  const { tableProps } = useTable({
    resource: "programs",
    syncWithLocation: true,
    sorters: { initial: [{ field: "display_order", order: "asc" }] }
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="display_order" title="#" width={60} />
        <Table.Column 
            dataIndex="title" 
            title="Program Name" 
            render={(val) => <span className="font-semibold text-[#0B1C3E]">{val}</span>}
        />
        <Table.Column 
            dataIndex="slug" 
            title="Slug" 
            render={(val) => <Tag>/{val}</Tag>} 
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
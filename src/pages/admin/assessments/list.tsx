import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const AssessmentList = () => {
  const { tableProps } = useTable({
    resource: "assessments",
    sorters: { initial: [{ field: "display_order", order: "asc" }] }
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="display_order" title="#" width={60} />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="icon_name" title="Icon" render={(val) => <Tag>{val}</Tag>} />
        <Table.Column 
            dataIndex="is_visible" 
            title="Status" 
            render={(val) => val ? <Tag color="green">Active</Tag> : <Tag color="red">Hidden</Tag>} 
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
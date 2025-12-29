import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const WhitepaperList = () => {
  const { tableProps } = useTable({ resource: "whitepapers" });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="type" title="Type" render={(val) => <Tag>{val}</Tag>} />
        <Table.Column title="Actions" render={(_, record: any) => (
            <Space><EditButton hideText size="small" recordItemId={record.id} /><DeleteButton hideText size="small" recordItemId={record.id} /></Space>
        )} />
      </Table>
    </List>
  );
};
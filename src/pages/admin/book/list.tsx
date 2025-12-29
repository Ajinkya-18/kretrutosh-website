import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";

export const BookList = () => {
  const { tableProps } = useTable({ resource: "book" });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="hero_title" title="Title" />
        <Table.Column dataIndex="cta_button_text" title="CTA" />
        <Table.Column title="Actions" render={(_, record: any) => (
            <Space><EditButton hideText size="small" recordItemId={record.id} /><DeleteButton hideText size="small" recordItemId={record.id} /></Space>
        )} />
      </Table>
    </List>
  );
};
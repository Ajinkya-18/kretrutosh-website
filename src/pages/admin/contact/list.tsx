import { List, useTable, EditButton } from "@refinedev/antd";
import { Table } from "antd";

export const ContactList = () => {
  const { tableProps } = useTable({ resource: "page_contact" });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="hero_title" title="Page Title" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column 
            title="Actions" 
            render={(_, record: any) => <EditButton hideText size="small" recordItemId={record.id} />} 
        />
      </Table>
    </List>
  );
};
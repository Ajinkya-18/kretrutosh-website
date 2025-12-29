import { List, useTable, EditButton, DeleteButton, DateField } from "@refinedev/antd";
import { Table, Space} from "antd";

export const ArticleList = () => {
  const { tableProps } = useTable({
    resource: "articles",
    sorters: { initial: [{ field: "publish_date", order: "desc" }] }
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column 
            dataIndex="publish_date" 
            title="Date" 
            render={(val) => <DateField value={val} format="LL" />} 
        />
        <Table.Column dataIndex="link" title="Link URL" ellipsis />
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
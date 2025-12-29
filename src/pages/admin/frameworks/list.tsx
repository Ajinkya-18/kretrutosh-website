import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { Layers } from "lucide-react";

export const FrameworkList = () => {
  const { tableProps } = useTable({
    resource: "frameworks",
    syncWithLocation: true,
    sorters: { initial: [{ field: "display_order", order: "asc" }] }
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column 
            dataIndex="display_order" 
            title="#" 
            width={60} 
            render={(val) => <span className="text-gray-400">#{val}</span>}
        />
        <Table.Column 
            dataIndex="title" 
            title="Framework Name" 
            render={(val) => <span className="font-semibold text-[#0B1C3E]">{val}</span>}
        />
        <Table.Column 
            dataIndex="slug" 
            title="Slug" 
            render={(val) => <Tag>/{val}</Tag>} 
        />
        <Table.Column 
            dataIndex="outcomes" 
            title="Outcomes" 
            render={(tags: string[]) => (
                <>
                    {tags?.slice(0, 2).map(tag => <Tag key={tag} color="blue">{tag}</Tag>)}
                    {tags?.length > 2 && <Tag>+{tags.length - 2}</Tag>}
                </>
            )}
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
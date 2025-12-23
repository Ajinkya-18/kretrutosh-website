import { useState } from 'react';
import { Button, Card, Drawer, Form, Input, Select, Space, Typography, Dropdown } from 'antd';
import { PlusOutlined, DeleteOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageBlock, BlockType } from '../../types/blocks';

const BLOCK_TYPES: { type: BlockType; label: string }[] = [
  { type: 'hero_simple', label: 'Hero (Simple)' },
  { type: 'logo_strip', label: 'Logo Strip' },
  { type: 'framework_carousel', label: 'Framework Carousel' },
  { type: 'stats_grid', label: 'Stats Grid (Outcomes)' },
  { type: 'features_grid', label: 'Features Grid' },
  {type: 'rich_text', label: 'Rich Text' },
  // Add more here later
];

interface PageBuilderProps {
  value?: PageBlock[];
  onChange?: (value: PageBlock[]) => void;
}

// Draggable Item Component
const SortableItem = ({ block, onEdit, onDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '8px',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card 
        size="small"
        title={<Space><MenuOutlined style={{ cursor: 'grab' }} {...listeners} /> {block.type}</Space>}
        extra={
          <Space>
            <Button icon={<SettingOutlined />} size="small" onClick={onEdit}>Edit</Button>
            <Button icon={<DeleteOutlined />} size="small" danger onClick={onDelete} />
          </Space>
        }
      >
        <Typography.Text type="secondary">ID: {block.id}</Typography.Text>
      </Card>
    </div>
  );
};

export const PageBuilder = ({ value = [], onChange }: PageBuilderProps) => {
  const [editingBlock, setEditingBlock] = useState<PageBlock | null>(null);

  const handleAdd = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: crypto.randomUUID(),
      type,
      props: {} // Start empty
    };
    onChange?.([...value, newBlock]);
    setEditingBlock(newBlock); // Open editor immediately
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = value.findIndex((b) => b.id === active.id);
      const newIndex = value.findIndex((b) => b.id === over.id);
      onChange?.(arrayMove(value, oldIndex, newIndex));
    }
  };

  const handleUpdateBlock = (values: any) => {
    if (!editingBlock) return;
    const newBlocks = value.map(b => 
      b.id === editingBlock.id ? { ...b, props: values } : b
    );
    onChange?.(newBlocks);
    setEditingBlock(null);
  };

  const handleDelete = (id: string) => {
    onChange?.(value.filter(b => b.id !== id));
  };

  // Dynamic Form Fields based on Block Type
  const renderFormFields = () => {
    if (!editingBlock) return null;
    
    switch (editingBlock.type) {
        case 'hero_simple':
            return (
                <>
                    <Form.Item label="Headline" name="headline" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item label="Subheadline" name="subheadline"><Input.TextArea rows={2} /></Form.Item>
                    <Form.Item label="Primary CTA Text" name="primaryCtaText"><Input /></Form.Item>
                    <Form.Item label="Primary CTA Link" name="primaryCtaLink"><Input /></Form.Item>
                    <Form.Item label="Background Image URL" name="backgroundImage"><Input /></Form.Item>
                </>
            );
        case 'logo_strip':
            return (
                <Form.Item label="Section Title" name="title"><Input /></Form.Item>
            );
        case 'framework_carousel':
            return (
                <>
                    <Form.Item label="Title" name="title"><Input /></Form.Item>
                    <Form.Item label="Subtitle" name="subtitle"><Input.TextArea rows={2} /></Form.Item>
                </>
            );
            
        case 'stats_grid':
            return (
                <>
                    <Form.Item label="Section Title" name="title"><Input /></Form.Item>
                    <Form.Item label="Background Style" name="background">
                        <Select options={[
                            { value: 'white', label: 'White' },
                            { value: 'light', label: 'Light Gray' },
                            { value: 'navy', label: 'Navy (Dark)' }
                        ]} />
                    </Form.Item>
                    
                    {/* Dynamic List for Stats */}
                    <Typography.Text strong>Statistics</Typography.Text>
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="flex gap-2 mb-2 items-start border p-2 rounded">
                                        <Form.Item {...restField} name={[name, 'value']} label="Value" className="mb-0 flex-1">
                                            <Input placeholder="+25%" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'label']} label="Label" className="mb-0 flex-1">
                                            <Input placeholder="NRR Increase" />
                                        </Form.Item>
                                        <Button danger icon={<DeleteOutlined />} onClick={() => remove(name)} />
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className="mt-2">
                                    Add Stat
                                </Button>
                            </>
                        )}
                    </Form.List>
                </>
            );

        case 'features_grid':
            return (
                <>
                    <Form.Item label="Section Title" name="title"><Input /></Form.Item>
                    <Form.Item label="Subtitle" name="subtitle"><Input.TextArea rows={2} /></Form.Item>
                    
                    {/* Dynamic List for Features */}
                    <Typography.Text strong>Feature Cards</Typography.Text>
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card size="small" key={key} className="mb-2" extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(name)} />}>
                                        <Form.Item {...restField} name={[name, 'title']} label="Title" className="mb-2">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'description']} label="Description" className="mb-2">
                                            <Input.TextArea rows={2} />
                                        </Form.Item>
                                        <div className="flex gap-2">
                                            <Form.Item {...restField} name={[name, 'linkText']} label="Link Text" className="mb-0 flex-1">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, 'linkUrl']} label="Link URL" className="mb-0 flex-1">
                                                <Input />
                                            </Form.Item>
                                        </div>
                                    </Card>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className="mt-2">
                                    Add Feature Card
                                </Button>
                            </>
                        )}
                    </Form.List>
                </>
            );

        case 'rich_text':
             return (
                 <Form.Item label="Content" name="content" help="You can use HTML tags here">
                     <Input.TextArea rows={6} />
                 </Form.Item>
             );

        default:
            return <div>No configuration needed for this block.</div>;
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <Space className="mb-4 w-full justify-between">
        <Typography.Text strong>Page Blocks</Typography.Text>
        <Dropdown menu={{ 
            items: BLOCK_TYPES.map(b => ({ 
                key: b.type, 
                label: b.label, 
                onClick: () => handleAdd(b.type) 
            })) 
        }}>
            <Button type="primary" icon={<PlusOutlined />}>Add Block</Button>
        </Dropdown>
      </Space>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={value.map(b => b.id)} strategy={verticalListSortingStrategy}>
          {value.map((block) => (
            <SortableItem 
              key={block.id} 
              block={block} 
              onEdit={() => setEditingBlock(block)} 
              onDelete={() => handleDelete(block.id)} 
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* The "Inspector" Drawer */}
      <Drawer
        title={`Edit ${editingBlock?.type}`}
        width={400}
        open={!!editingBlock}
        onClose={() => setEditingBlock(null)}
        extra={
            <Button type="primary" onClick={() => document.getElementById('block-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}>
                Save
            </Button>
        }
      >
        {editingBlock && (
            <Form 
                id="block-form"
                layout="vertical" 
                initialValues={editingBlock.props}
                onFinish={handleUpdateBlock}
                key={editingBlock.id} // Force re-render on switch
            >
                {renderFormFields()}
                <Button type="primary" htmlType="submit" block className="mt-4">Save Changes</Button>
            </Form>
        )}
      </Drawer>
    </div>
  );
};
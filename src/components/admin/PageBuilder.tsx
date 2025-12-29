import { useState, useEffect } from 'react';
import { Button, Card, Drawer, Form, Input, Select, Space, Typography, Dropdown, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageBlock, BlockType } from '../../types/blocks';
import { ImageUpload } from './ImageUpload';

// 1. DEFINING THE MENU OPTIONS
const BLOCK_TYPES: { type: BlockType; label: string }[] = [
  // Layouts
  { type: 'hero_simple', label: 'Hero: Standard (Internal Pages)' },
  { type: 'hero_home', label: 'Hero: Home Page (Fold 1)' },
  { type: 'content_split', label: 'Content Split (Book/Philosophy)' },
  { type: 'rich_text', label: 'Rich Text / HTML' },
  
  // Smart Grids (Dynamic Data)
  { type: 'programs_home', label: 'Home: Growth Engine (Section 3.3)' },
  { type: 'framework_carousel', label: 'Home: Frameworks Slider' },
  { type: 'case_study_strip', label: 'Home: Case Studies Strip' },
  { type: 'industry_grid', label: 'Home: Industries Grid' },
  { type: 'resource_hub', label: 'Home: Thought Leadership Hub' },
  { type: 'articles_grid', label: 'Home: Articles Grid' }, // <--- New
  { type: 'case_studies_grid', label: 'Full Case Studies Grid' },

  // Lists
  { type: 'logo_strip', label: 'Client Logos Strip' },
  { type: 'stats_grid', label: 'Stats Grid (Outcomes)' },
  { type: 'features_grid', label: 'Features Grid (Manual)' },
  
  // Full Pages (If used as blocks)
  { type: 'framework_grid', label: 'Full Frameworks Grid' },
  { type: 'program_grid', label: 'Full Programs List' },
  
  // Global
  { type: 'cta_banner', label: 'CTA Banner' },
  { type: 'philosophy_block', label: 'About: Philosophy (Kretru/Tosh)' },
];

interface PageBuilderProps {
  value?: PageBlock[];
  onChange?: (value: PageBlock[]) => void;
}

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
  const [innerForm] = Form.useForm();

  useEffect(() => {
    if (editingBlock) {
        innerForm.setFieldsValue(editingBlock.props);
    }
  }, [editingBlock, innerForm]);

  const handleAdd = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: crypto.randomUUID(),
      type,
      props: {} 
    };
    onChange?.([...value, newBlock]);
    setEditingBlock(newBlock); 
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
    innerForm.resetFields();
  };

  const handleDelete = (id: string) => {
    onChange?.(value.filter(b => b.id !== id));
  };

  // 2. DEFINING THE FORM FIELDS FOR EACH BLOCK
  const renderFormFields = () => {
    if (!editingBlock) return null;
    
    switch (editingBlock.type) {
        // --- HERO SECTIONS ---
        case 'hero_simple':
            return (
                <>
                    <Form.Item label="Headline" name="headline" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item label="Subheadline" name="subheadline"><Input.TextArea rows={2} /></Form.Item>
                    <Form.Item label="Primary CTA Text" name="primaryCtaText"><Input /></Form.Item>
                    <Form.Item label="Primary CTA Link" name="primaryCtaLink"><Input /></Form.Item>
                    <Form.Item label="Bg Image URL" name="backgroundImage"><Input /></Form.Item>
                </>
            );
        case 'hero_home':
            return (
                <>
                    <Form.Item label="Headline" name="headline" rules={[{ required: true }]}><Input.TextArea rows={2} /></Form.Item>
                    <Form.Item label="Subheadline" name="subheadline"><Input.TextArea rows={3} /></Form.Item>
                    <Divider>Primary CTA</Divider>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Text" name="primaryCtaText"><Input /></Form.Item>
                        <Form.Item label="Link" name="primaryCtaLink"><Input /></Form.Item>
                    </div>
                    <Divider>Secondary CTA</Divider>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Text" name="secondaryCtaText"><Input /></Form.Item>
                        <Form.Item label="Link" name="secondaryCtaLink"><Input /></Form.Item>
                    </div>
                </>
            );

        // --- CONTENT & SPLIT ---
        case 'rich_text':
             return (
                 <Form.Item label="Content" name="content" help="Use HTML tags"><Input.TextArea rows={6} /></Form.Item>
             );
        case 'content_split':
            return (
                <>
                    <Form.Item label="Background" name="background"><Select options={[{ value: 'white', label: 'White' }, { value: 'navy', label: 'Navy' }]} /></Form.Item>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Label (Small)" name="label"><Input /></Form.Item>
                        <Form.Item label="Img Position" name="image_position"><Select options={[{ value: 'right', label: 'Right' }, { value: 'left', label: 'Left' }]} /></Form.Item>
                    </div>
                    <Form.Item label="Title" name="title"><Input /></Form.Item>
                    <Form.Item label="Content (HTML)" name="content"><Input.TextArea rows={5} /></Form.Item>
                    {/* <Form.Item label="Image URL" name="image_url"><Input /></Form.Item> */}
                    <Form.Item label="Image" name="image_url">
                        <ImageUpload />
                    </Form.Item>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="CTA Text" name="cta_text"><Input /></Form.Item>
                        <Form.Item label="CTA Link" name="cta_link"><Input /></Form.Item>
                    </div>
                </>
            );

        // --- SMART GRIDS (Fetching from DB) ---
        // These mostly just need a title, the data comes from Supabase
        case 'logo_strip':
        case 'case_study_strip':
        case 'articles_grid':
             return <Form.Item label="Section Title" name="title"><Input /></Form.Item>;

        case 'framework_carousel':
             return (
                 <>
                    <Form.Item label="Title" name="title"><Input /></Form.Item>
                    <Form.Item label="Subtitle" name="subtitle"><Input /></Form.Item>
                 </>
             );
        case 'programs_home':
             return <Typography.Text type="secondary">This block fetches the 5 programs automatically.</Typography.Text>;
        
        case 'industry_grid':
             return <Typography.Text type="secondary">Fetches all industries automatically.</Typography.Text>;

        case 'resource_hub':
            return (
                <>
                    <Form.Item label="Section Title" name="title"><Input /></Form.Item>
                    <Divider>Links</Divider>
                    <Form.Item label="Book Link" name="book_link"><Input placeholder="/book" /></Form.Item>
                    <Form.Item label="Podcast Link" name="podcast_link"><Input placeholder="/resources/podcast" /></Form.Item>
                    <Form.Item label="Assessment Link" name="assessment_link"><Input placeholder="/resources/assessments" /></Form.Item>
                    <Form.Item label="Whitepaper Link" name="whitepaper_link"><Input placeholder="/resources/whitepapers" /></Form.Item>
                    <Form.Item label="Articles Link" name="article_link"><Input placeholder="/resources/articles" /></Form.Item>
                </>
            );

        // --- MANUAL LISTS ---
        case 'stats_grid':
            return (
                <>
                    <Form.Item label="Title" name="title"><Input /></Form.Item>
                    <Form.Item label="Background" name="background"><Select options={[{ value: 'white', label: 'White' }, { value: 'light', label: 'Light' }, { value: 'navy', label: 'Navy' }]} /></Form.Item>
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="flex gap-2 mb-2 border p-2 rounded">
                                        <Form.Item {...restField} name={[name, 'value']} label="Value" className="mb-0 flex-1"><Input /></Form.Item>
                                        <Form.Item {...restField} name={[name, 'label']} label="Label" className="mb-0 flex-1"><Input /></Form.Item>
                                        <Button danger icon={<DeleteOutlined />} onClick={() => remove(name)} />
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Stat</Button>
                            </>
                        )}
                    </Form.List>
                </>
            );

        case 'features_grid':
            return (
                <>
                    <Form.Item label="Title" name="title"><Input /></Form.Item>
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card size="small" key={key} className="mb-2" extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(name)} />}>
                                        <Form.Item {...restField} name={[name, 'title']} label="Title"><Input /></Form.Item>
                                        <Form.Item {...restField} name={[name, 'description']} label="Desc"><Input.TextArea rows={2} /></Form.Item>
                                        <div className="flex gap-2">
                                            <Form.Item {...restField} name={[name, 'linkText']} className="mb-0 flex-1"><Input placeholder="Link Text" /></Form.Item>
                                            <Form.Item {...restField} name={[name, 'linkUrl']} className="mb-0 flex-1"><Input placeholder="URL" /></Form.Item>
                                        </div>
                                    </Card>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Feature Card</Button>
                            </>
                        )}
                    </Form.List>
                </>
            );

        case 'cta_banner':
            return (
                <>
                    <Form.Item label="Headline" name="title"><Input /></Form.Item>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Button Text" name="btnText"><Input /></Form.Item>
                        <Form.Item label="Button URL" name="btnLink"><Input /></Form.Item>
                    </div>
                </>
            );

        case 'philosophy_block':
            return (
                <>
                    <Divider orientation="left">Kretru (The Seeker)</Divider>
                    <Form.Item label="Title" name="kretruTitle"><Input defaultValue="Kretru (क्रेतृ)" /></Form.Item>
                    <Form.Item label="Description" name="kretruDesc"><Input.TextArea rows={3} /></Form.Item>

                    <Divider orientation="left">Tosh (The Contentment)</Divider>
                    <Form.Item label="Title" name="toshTitle"><Input defaultValue="Tosh (तोष)" /></Form.Item>
                    <Form.Item label="Description" name="toshDesc"><Input.TextArea rows={3} /></Form.Item>

                    <Divider orientation="left">Thesis</Divider>
                    <Form.Item label="Central Thesis" name="thesis"><Input.TextArea rows={3} /></Form.Item>
                </>
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

      <Drawer
        title={`Edit ${editingBlock?.type}`}
        width={500}
        open={!!editingBlock}
        onClose={() => { setEditingBlock(null); innerForm.resetFields(); }}
        extra={<Button type="primary" onClick={() => innerForm.submit()}>Save Block</Button>}
      >
        {editingBlock && (
            <Form form={innerForm} layout="vertical" onFinish={handleUpdateBlock}>
                {renderFormFields()}
            </Form>
        )}
      </Drawer>
    </div>
  );
};
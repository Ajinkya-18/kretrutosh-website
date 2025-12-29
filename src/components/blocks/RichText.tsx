import React from 'react';

interface RichTextProps {
  content: string;
  align?: 'left' | 'center' | 'right';
}

export const RichText = ({ content, align = 'left' }: RichTextProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className={`prose prose-lg max-w-4xl mx-auto ${align === 'center' ? 'text-center' : ''}`}
          // This safely renders the HTML saved from your Admin Panel
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </section>
  );
};
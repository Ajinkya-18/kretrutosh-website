import React from 'react';

interface RichTextProps {
  content: string;
  align?: 'left' | 'center' | 'right';
}

const renderSmartText = (text: string) => {
  if (!text) return null;
  
  // Normalize line endings
  const lines = text.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return; 

    if (['-', '*', '•'].some(char => trimmed.startsWith(`${char} `))) {
      const content = trimmed.replace(/^[-*•]\s+/, '');
      currentList.push(<li key={`li-${index}`}>{content}</li>);
    } else {
      if (currentList.length > 0) {
        elements.push(<ul key={`ul-${index}`}>{currentList}</ul>);
        currentList = [];
      }
      elements.push(<p key={`p-${index}`}>{trimmed}</p>);
    }
  });

  if (currentList.length > 0) {
    elements.push(<ul key="ul-last">{currentList}</ul>);
  }

  return elements;
};

export const RichText = ({ content, align = 'left' }: RichTextProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className={`prose prose-lg max-w-4xl mx-auto ${align === 'center' ? 'text-center' : ''}`}>
           {/* Replaces dangerouslySetInnerHTML with smart rendering */}
           {renderSmartText(content)}
        </div>
      </div>
    </section>
  );
};
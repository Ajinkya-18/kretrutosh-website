import React from 'react';

interface RichTextProps {
  content?: string;
  className?: string;
}

const RichText: React.FC<RichTextProps> = ({ content, className = "" }) => {
  if (!content) return null;

  // Split by double newlines for paragraphs
  const paragraphs = content.split('\n\n');

  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((block, idx) => {
        // Check for bullet points (lines starting with - or •)
        if (block.trim().match(/^[-•]/m)) {
            const listItems = block.split('\n').filter(line => line.trim());
            return (
                <ul key={idx} className="list-disc pl-5 space-y-2 marker:text-secondary">
                    {listItems.map((item, i) => (
                        <li key={i} className="leading-relaxed">
                            {item.replace(/^[-•]\s*/, '').trim()}
                        </li>
                    ))}
                </ul>
            )
        }

        // Standard paragraph
        return (
            <p key={idx} className="leading-relaxed whitespace-pre-line">
                {block.trim()}
            </p>
        );
      })}
    </div>
  );
};

export default RichText;

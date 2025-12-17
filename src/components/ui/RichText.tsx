import React from 'react';
import { cn } from '@/lib/utils';

interface RichTextProps {
  content?: string;
  className?: string;
}

const RichText: React.FC<RichTextProps> = ({ content, className = "" }) => {
  if (!content) return null;

  // Check if content is HTML (contains HTML tags)
  const isHTML = /<[a-z][\s\S]*>/i.test(content);

  if (isHTML) {
    // Render as HTML with rich typography
    return (
      <div 
        className={cn(
          "prose prose-lg max-w-none",
          // Heading styles
          "prose-headings:font-bold prose-headings:tracking-tight",
          "prose-h1:text-4xl prose-h1:mb-6 prose-h1:text-primary",
          "prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-primary",
          "prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-primary",
          "prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4 prose-h4:text-primary",
          // Paragraph styles
          "prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-p:text-muted-foreground",
          // List styles
          "prose-ul:my-4 prose-ul:space-y-2",
          "prose-ol:my-4 prose-ol:space-y-2",
          "prose-li:text-muted-foreground prose-li:leading-relaxed",
          "prose-li:marker:text-secondary prose-li:marker:font-bold",
          // Link styles
          "prose-a:text-secondary prose-a:no-underline prose-a:font-medium",
          "prose-a:hover:text-secondary/80 prose-a:hover:underline",
          // Strong/Bold styles
          "prose-strong:text-primary prose-strong:font-bold",
          // Code styles
          "prose-code:text-secondary prose-code:bg-secondary/10",
          "prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
          "prose-code:text-sm prose-code:font-mono",
          "prose-code:before:content-none prose-code:after:content-none",
          // Blockquote styles
          "prose-blockquote:border-l-4 prose-blockquote:border-secondary",
          "prose-blockquote:pl-6 prose-blockquote:italic",
          "prose-blockquote:text-muted-foreground",
          // Table styles
          "prose-table:border-collapse prose-table:w-full",
          "prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold",
          "prose-td:p-3 prose-td:border-t prose-td:border-border",
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Fallback for plain text with newlines
  const paragraphs = content.split('\n\n');

  return (
    <div className={cn("space-y-4", className)}>
      {paragraphs.map((block, idx) => {
        // Check for bullet points (lines starting with - or •)
        if (block.trim().match(/^[-•]/m)) {
            const listItems = block.split('\n').filter(line => line.trim());
            return (
                <ul key={idx} className="list-disc pl-6 space-y-2 marker:text-secondary">
                    {listItems.map((item, i) => (
                        <li key={i} className="leading-relaxed text-muted-foreground">
                            {item.replace(/^[-•]\s*/, '').trim()}
                        </li>
                    ))}
                </ul>
            )
        }

        // Standard paragraph
        return (
            <p key={idx} className="leading-relaxed text-muted-foreground whitespace-pre-line">
                {block.trim()}
            </p>
        );
      })}
    </div>
  );
};

export default RichText;

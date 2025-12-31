import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ContentSplitProps } from '../../types/blocks';
import React from 'react';

// Smart text renderer
const renderSmartText = (text: string) => {
  if (!text) return null;
  
  const lines = text.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return; 

    // Detect Bullet Points
    if (['-', '*', '•'].some(char => trimmed.startsWith(`${char} `))) {
      const content = trimmed.replace(/^[-*•]\s+/, '');
      currentList.push(<li key={`li-${index}`} className="mb-1">{content}</li>);
    } else {
      // Flush List
      if (currentList.length > 0) {
        elements.push(<ul key={`ul-${index}`} className="list-disc pl-5 mb-4 space-y-1">{currentList}</ul>);
        currentList = [];
      }
      // Render Paragraph
      elements.push(<p key={`p-${index}`} className="mb-4 leading-relaxed">{trimmed}</p>);
    }
  });

  if (currentList.length > 0) {
    elements.push(<ul key="ul-last" className="list-disc pl-5 mb-4 space-y-1">{currentList}</ul>);
  }

  return elements;
};

export const ContentSplit = ({ 
  label, title, content, image_url, image_position = 'right', cta_text, cta_link, background 
}: ContentSplitProps) => {
  const isNavy = background === 'navy';
  
  return (
    <section className={`py-24 ${isNavy ? 'bg-[#0B1C3E] text-white' : 'bg-white text-[#0B1C3E]'}`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col gap-16 items-center ${image_position === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
          
          {/* Text Side */}
          <div className="flex-1">
            {label && (
              <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${isNavy ? 'text-[#FF9933]' : 'text-gray-500'}`}>
                {label}
              </p>
            )}
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${isNavy ? 'text-white' : 'text-[#0B1C3E]'}`}>
              {title}
            </h2>
            
            {/* Smart Content Rendering */}
            <div className={`text-lg mb-8 ${isNavy ? 'text-gray-300' : 'text-gray-600'}`}>
              {renderSmartText(content)}
            </div>

            {cta_text && cta_link && (
              <Link to={cta_link} className={`inline-flex items-center font-bold text-lg hover:underline ${isNavy ? 'text-[#FF9933]' : 'text-[#0B1C3E]'}`}>
                {cta_text} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>

          {/* Image Side */}
          <div className="flex-1 flex justify-center">
             <img 
               src={image_url} 
               alt={title} 
               className="rounded-xl shadow-2xl max-w-md w-full object-cover aspect-[3/4]" 
             />
          </div>
        </div>
      </div>
    </section>
  );
};
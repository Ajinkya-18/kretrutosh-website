import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ContentSplitProps } from '../../types/blocks';

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
            <div 
              className={`prose prose-lg mb-8 ${isNavy ? 'prose-invert' : 'text-gray-600'}`}
              dangerouslySetInnerHTML={{ __html: content }} 
            />
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
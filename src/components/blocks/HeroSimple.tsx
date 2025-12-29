import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// This matches the props definition in your types/blocks.ts
interface HeroSimpleProps {
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string; // Optional URL
}

export const HeroSimple = ({
  headline,
  subheadline,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage
}: HeroSimpleProps) => {
  return (
    <section className="relative w-full pt-48 pb-24 overflow-hidden bg-[#0B1C3E] text-white">
      
      {/* Background Image Layer */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to={primaryCtaLink} 
              className="inline-flex items-center justify-center px-8 py-4 bg-[#FF9933] text-white font-semibold rounded-lg hover:bg-[#E68A00] transition-colors"
            >
              {primaryCtaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            {secondaryCtaText && secondaryCtaLink && (
              <Link 
                to={secondaryCtaLink}
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 bg-white/5 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
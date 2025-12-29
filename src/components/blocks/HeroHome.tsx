import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { HeroHomeProps } from '../../types/blocks';

export const HeroHome = ({
  headline, subheadline, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink
}: HeroHomeProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0B1C3E] text-white overflow-hidden pt-32 pb-20">
      {/* Abstract Background Element (The "Lifecycle Arc") */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#FF9933]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      
      <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 mb-6 border border-[#FF9933]/50 rounded-full bg-[#FF9933]/10 text-[#FF9933] text-sm font-semibold tracking-wider uppercase">
            GTM Velocity Transformation
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            {headline}
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={primaryCtaLink} className="inline-flex items-center justify-center px-8 py-4 bg-[#FF9933] text-white font-bold rounded-lg hover:bg-[#E68A00] transition-colors">
              {primaryCtaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to={secondaryCtaLink} className="inline-flex items-center justify-center px-8 py-4 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-all">
              {secondaryCtaText}
            </Link>
          </div>
        </div>
        
        {/* Right Side: Abstract Visual Placeholder */}
        <div className="hidden md:flex justify-center items-center relative">
            <div className="relative w-full aspect-square max-w-lg bg-gradient-to-tr from-white/5 to-white/10 rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white/20 font-bold text-xl">[Abstract GTM Model Visual]</span>
                {/* You can replace this div with an <img src="..." /> later */}
            </div>
        </div>
      </div>
    </section>
  );
};
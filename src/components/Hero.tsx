import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  primaryCtaLink?: string;
  secondaryCta?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  overlayOpacity?: number;
}

const Hero = ({ 
  badge,
  title, 
  subtitle, 
  primaryCta,
  primaryCtaLink = '/contact',
  secondaryCta,
  secondaryCtaLink = '#growth-engine',
  backgroundImage, 
  mediaType = 'image',
  videoUrl,
  overlayOpacity = 30
}: HeroProps) => {

  // Convert Opacity to fraction (e.g. 30 -> 0.3)
  const opacityValue = overlayOpacity / 100;

  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0A192F]"
    >
      {/* Dynamic Background Media */}
      <div className="absolute inset-0 z-0">
        {mediaType === 'video' && videoUrl ? (
             <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                poster={backgroundImage}
             >
                <source src={videoUrl} type="video/mp4" />
                {/* Fallback if video fails */}
                <img src={backgroundImage} alt="Hero Background" className="w-full h-full object-cover" />
             </video>
        ) : (
             backgroundImage && <img src={backgroundImage} alt="Hero Background" className="w-full h-full object-cover" />
        )}
        
        {/* Dynamic Overlay */}
        <div 
            className="absolute inset-0 bg-black transition-opacity duration-300" 
            style={{ opacity: opacityValue }}
        />
        
        {/* Helper Gradient for Text Readability at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-90" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05] z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          {badge && (
            <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-4">
                <span className="text-secondary font-medium text-sm tracking-wide uppercase">
                {badge}
                </span>
            </div>
          )}
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light drop-shadow-md">
                {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              asChild
              size="lg" 
              className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold text-lg px-8 py-6 shadow-glow transition-all hover:scale-105"
            >
              <Link to={primaryCtaLink}>
                {primaryCta || 'Book a Growth Strategy Review'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            {secondaryCta && (
                <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 hover:text-white font-medium text-lg px-8 py-6 backdrop-blur-sm transition-all cursor-pointer"
                >
                <a href={secondaryCtaLink}>
                    {secondaryCta}
                </a>
                </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Smooth blending into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
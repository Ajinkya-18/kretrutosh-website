import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
  backgroundImage?: string;
  videoUrl?: string;
}

const Hero = ({ 
  badge,
  title, 
  subtitle, 
  primaryCta,
  secondaryCta,
  backgroundImage, 
  videoUrl 
}: HeroProps) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Dynamic Background Image/Video */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt="Hero Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
      )}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] z-0" />
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-4">
            <span className="text-secondary font-medium text-sm tracking-wide uppercase">
              {badge || 'The Premier Growth Transformation Firm'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white">
            {title || 'Build a Customer-Led Growth Engine That Scales'}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
            {subtitle || 'Integrated Go-To-Market (GTM), Customer Experience, Customer Success, Digital, AI & Culture Transformation — driving predictable, scalable growth across the customer lifecycle.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              asChild
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-8 py-6 shadow-glow transition-all hover:scale-105"
            >
              <Link to="/contact">
                {primaryCta || 'Book a Growth Strategy Review'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 hover:text-white font-medium text-lg px-8 py-6 backdrop-blur-sm transition-all cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('frameworks');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <a href="#frameworks">
                {secondaryCta || 'Explore Transformation Programs'}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
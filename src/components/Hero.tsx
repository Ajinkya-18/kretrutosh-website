import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContent } from "@/hooks/useContent"; // <-- 1. Import the hook

interface HeroProps {
  // These props can still be used as overrides if needed
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  videoUrl?: string;
}

const Hero = ({ title, subtitle, backgroundImage, videoUrl }: HeroProps) => {
  const navigate = useNavigate();
  
  // 2. Fetch content for the 'home' page
  const { getText } = useContent('home');

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "contact" } });
    }
  };

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
              {/* 3. Use getText instead of hardcoded strings */}
              {getText('hero.badge', 'The Premier Growth Transformation Firm')}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white">
            {/* 4. Replaced complex hardcoded JSX with a cleaner DB-driven text */}
            {/* Note: The client can type plain text in the Admin Panel */}
            {getText('hero.title', 'Build a Customer-Led Growth Engine That Scales')}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
            {/* 5. Subheadline */}
            {getText('hero.description', 'Integrated Go-To-Market (GTM), Customer Experience, Customer Success, Digital, AI & Culture Transformation — driving predictable, scalable growth across the customer lifecycle.')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-8 py-6 shadow-glow transition-all hover:scale-105"
              onClick={handleContactClick}
            >
              {/* 6. Button Text */}
              {getText('hero.primary_cta', 'Book a Growth Strategy Review')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white font-medium text-lg px-8 py-6 backdrop-blur-sm transition-all">
              <Link to="/solutions">
                {/* 7. Secondary Button Text */}
                {getText('hero.secondary_cta', 'Explore Transformation Programs')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FinalCTAProps {
  title: string;
  subtitle: string;
  primaryBtn: string;
  secondaryBtn: string;
}

const FinalCTA = ({ title, subtitle, primaryBtn, secondaryBtn }: FinalCTAProps) => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          {title}
        </h2>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 shadow-glow">
            <Link to="/contact">
              {primaryBtn}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="bg-white text-black border-white hover:bg-white/90 hover:text-black text-lg px-8 py-6"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('growth-engine');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <a href="#growth-engine">
              {secondaryBtn}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

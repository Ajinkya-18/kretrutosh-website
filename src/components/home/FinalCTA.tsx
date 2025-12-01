import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/hooks/useContent";

const FinalCTA = () => {
  const { getText } = useContent('home');

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          {getText('final_cta.title', 'Ready to Transform Your Growth Trajectory?')}
        </h2>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {getText('final_cta.subtitle', "Let's build your customer-led growth engine together.")}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 shadow-glow">
            <Link to="/contact">
              {getText('final_cta.primary_btn', 'Schedule a Consultation')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6">
            <Link to="/solutions">
              {getText('final_cta.secondary_btn', 'Explore Solutions')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

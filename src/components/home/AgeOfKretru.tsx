import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import bookCover from "@/assets/3d-book-cover.jpeg";

interface AgeOfKretruProps {
  badge: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  bookLink: string;
  ctaText: string;
}

const AgeOfKretru = ({
  badge,
  title,
  subtitle,
  quote,
  description,
  bookLink,
  ctaText
}: AgeOfKretruProps) => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-8 z-10">
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/10 bg-primary/5 mb-4">
              <span className="text-primary font-medium text-sm tracking-wide uppercase">
                {badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              {title} <br />
              <span className="text-secondary">{subtitle}</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="font-medium text-primary/80 italic border-l-4 border-secondary pl-4">
                {quote}
              </p>
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a 
                  href={bookLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {ctaText}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Book Image */}
          <div className="flex-1 relative flex justify-center z-10">
            <div className="relative w-96 md:w-[450px] group perspective-1000">
              <img 
                src={bookCover} 
                alt="The Age of Kretru Book Cover" 
                className="rounded-lg shadow-2xl transform rotate-0 group-hover:rotate-3 transition-all duration-500 border border-white/10 w-full h-auto"
              />
              {/* Glow effect behind */}
              <div className="absolute -inset-4 bg-secondary/20 blur-2xl -z-10 rounded-full group-hover:bg-secondary/30 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgeOfKretru;

import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AgeOfKretru = () => {
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            const { data } = await supabase.from('book').select('*').limit(1).single();
            if (data) setBook(data);
            setLoading(false);
        };
        fetchBook();
    }, []);

    if (loading) return null;
    if (!book) return null;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-8 z-10">
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/10 bg-primary/5 mb-4">
              <span className="text-primary font-medium text-sm tracking-wide uppercase">
                New Release
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              {book.title}
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              {book.description_html ? (
                   <div dangerouslySetInnerHTML={{ __html: book.description_html }} />
              ) : (
                  <p>Discover the new era of customer-led growth.</p>
              )}
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a 
                  href={book.amazon_link || '#'}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Get the Book on Amazon
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Book Image */}
          <div className="flex-1 relative flex justify-center z-10">
            <div className="relative w-96 md:w-[450px] group perspective-1000">
              <img 
                src={book.cover_image || "https://placehold.co/400x600?text=Book+Cover"} 
                alt={book.title} 
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

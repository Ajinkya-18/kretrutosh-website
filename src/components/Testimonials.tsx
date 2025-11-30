import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  client_name: string;
  client_role: string;
  company: string;
  quote: string;
  rating: number;
  avatar_url: string | null;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error);
      } else if (data) {
        setTestimonials(data);
      }
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (isLoading) return null; // Or a loading spinner if you prefer
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear what our clients say about their experience working with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-border/50 relative overflow-hidden bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-16 w-16 text-primary" />
              </div>
              <CardContent className="pt-6 relative flex flex-col h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 leading-relaxed italic flex-grow">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t border-border pt-4 flex items-center gap-4">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={testimonial.avatar_url || ""} alt={testimonial.client_name} />
                    <AvatarFallback>
                      <User className="h-5 w-5 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.client_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.client_role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
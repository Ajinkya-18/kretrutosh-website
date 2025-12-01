import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Layers, Megaphone, Ear, BookOpen, BarChart, Scale, HeartHandshake, Thermometer, Trophy, Map, Calculator, Factory } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NotFound from "./NotFound";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, any> = {
  Megaphone, Ear, BookOpen, BarChart, Scale, HeartHandshake, Thermometer, Trophy, Map, Calculator, Factory
};

interface Framework {
  id: number;
  title: string;
  short_description: string;
  full_details: string;
  image_url: string | null;
  slug: string;
  icon_name: string;
  outcomes: string[];
  meta_title?: string;
  meta_description?: string;
  industry_slugs?: string[];
}

interface RelatedIndustry {
  id: number;
  title: string;
  slug: string;
  icon_name: string;
}

const FrameworkDetail = () => {
  const { id: slug } = useParams(); 
  const navigate = useNavigate();
  const [framework, setFramework] = useState<Framework | null>(null);
  const [relatedIndustries, setRelatedIndustries] = useState<RelatedIndustry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFramework = async () => {
      if (!slug) return;
      setIsLoading(true);

      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .eq('slug', slug) 
        .single();

      if (error) {
        console.error("Error fetching framework:", error);
        setFramework(null);
      } else {
        setFramework(data);
        
        // Fetch related industries if any
        if (data.industry_slugs && data.industry_slugs.length > 0) {
          const { data: industriesData, error: industriesError } = await supabase
            .from('industries')
            .select('id, title, slug, icon_name')
            .in('slug', data.industry_slugs);
            
          if (!industriesError && industriesData) {
            setRelatedIndustries(industriesData);
          }
        }
      }
      setIsLoading(false);
    };

    fetchFramework();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
           <div className="container mx-auto px-4 relative z-10">
             <Skeleton className="h-10 w-40 mb-8 bg-white/10" />
             <div className="flex flex-col md:flex-row gap-8 items-start">
               <Skeleton className="h-24 w-24 rounded-2xl bg-white/10" />
               <div className="space-y-4 w-full max-w-3xl">
                 <Skeleton className="h-6 w-32 bg-white/10" />
                 <Skeleton className="h-16 w-3/4 bg-white/10" />
                 <Skeleton className="h-24 w-full bg-white/10" />
               </div>
             </div>
           </div>
        </section>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div className="space-y-4">
                 <Skeleton className="h-10 w-1/2" />
                 <Skeleton className="h-64 w-full" />
               </div>
               <div className="space-y-4">
                 <Skeleton className="h-10 w-1/2" />
                 <Skeleton className="h-64 w-full" />
               </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!framework) {
    return <NotFound />;
  }

  const Icon = iconMap[framework.icon_name] || Layers;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title={framework.meta_title || framework.title}
        description={framework.meta_description || framework.short_description}
        image={framework.image_url || undefined}
      />
      <Navbar />
      
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            className="text-white/70 hover:text-white hover:bg-white/10 mb-8 pl-0"
            onClick={() => navigate("/frameworks")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Frameworks
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shrink-0">
               {framework.image_url ? (
                <img 
                  src={framework.image_url} 
                  alt={framework.title} 
                  className="h-16 w-16 object-contain invert brightness-0" 
                />
              ) : (
                <Icon className="h-16 w-16 text-secondary" />
              )}
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-4">
                <span className="text-secondary font-medium text-xs tracking-wide uppercase">
                  Proprietary Framework
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {framework.title}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
                {framework.short_description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Framework Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
                {framework.full_details}
              </p>
              
              <div className="bg-muted/30 p-8 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold text-primary mb-4">Ideal For:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                    <span>Organizations seeking predictable growth</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                    <span>Teams needing strategic alignment</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                    <span>Scaling GTM and CX operations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col justify-center items-start lg:items-center text-left lg:text-center p-8 border border-border/40 rounded-2xl bg-card shadow-sm h-fit">
                <h3 className="text-2xl font-bold text-primary mb-6">Measurable Outcomes</h3>
                
                {/* DYNAMIC OUTCOMES LIST */}
                <div className="grid gap-4 w-full mb-8">
                  {framework.outcomes && framework.outcomes.map((outcome, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border/50 shadow-sm"
                    >
                      <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                      </div>
                      <span className="text-base font-medium text-primary text-left">{outcome}</span>
                    </motion.div>
                  ))}
                </div>
                
                <Button asChild size="lg" className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6">
                  <Link to="/contact">
                    Implement This Framework
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* RELATED INDUSTRIES */}
              {relatedIndustries.length > 0 && (
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-primary mb-6">Industries using this Framework</h3>
                  <div className="grid gap-4">
                    {relatedIndustries.map((industry) => {
                       const IndustryIcon = iconMap[industry.icon_name] || Factory;
                       return (
                        <Link key={industry.id} to={`/industries/${industry.slug}`}>
                          <Card className="hover:shadow-md transition-all duration-300 border-border/50 hover:border-secondary/50 group">
                            <CardContent className="p-6 flex items-center gap-4">
                              <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                                <IndustryIcon className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg text-primary group-hover:text-secondary transition-colors">
                                  {industry.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">View Industry Application &rarr;</p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                       );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FrameworkDetail;
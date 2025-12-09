import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Target, Lightbulb, Compass, Users, Rocket, Settings, BookOpen, TrendingUp, BarChart3, MessageSquare, Database, Network, Cpu, LineChart, AlertTriangle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import NotFound from "./NotFound";
import RichText from "@/components/ui/RichText";

// Fallback icon
const DefaultIcon = Target;

const ServiceDetail = () => {
  const { slug } = useParams();
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from('sections_services')
        .select('*')
        .eq('page_slug', slug)
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (data) setSections(data);
      setLoading(false);
    };
    fetchSections();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (!loading && sections.length === 0) return <NotFound />;

  const renderSection = (section: any) => {
    const specific = section.specific_data || {};

    switch(section.section_key) {
      case 'hero':
        return (
          <section key={section.id} className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {specific.badge && (
                  <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
                    <span className="text-secondary font-medium text-sm tracking-wide uppercase">{specific.badge}</span>
                  </div>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {section.title}
                </h1>
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                  {section.subtitle}
                </p>
                {section.primary_cta_text && (
                    <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 h-auto">
                    <Link to="/contact">
                        {section.primary_cta_text}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    </Button>
                )}
              </motion.div>
            </div>
          </section>
        );

      case 'problem_block':
        return (
           <section key={section.id} className="py-24 bg-background">
              <div className="container mx-auto px-4">
                 <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-primary mb-6 text-center">{section.title}</h2>
                    <p className="text-center text-muted-foreground text-lg mb-16 leading-relaxed bg-muted/20 p-6 rounded-xl border border-primary/5">
                        {section.subtitle}
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                       {specific.list?.map((item: string, idx: number) => (
                          <motion.div 
                             key={idx}
                             initial={{ opacity: 0, x: -20 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true }}
                             className="flex items-start gap-4 p-6 rounded-xl bg-destructive/5 border border-destructive/10 hover:border-destructive/20 transition-colors"
                          >
                             <div className="p-2 bg-destructive/10 rounded-full shrink-0">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                             </div>
                             <p className="text-foreground font-medium text-lg leading-snug">{item}</p>
                          </motion.div>
                       ))}
                    </div>
                 </div>
              </div>
           </section>
        )

      case 'approach_steps':
        return (
          <section key={section.id} className={`py-24 ${section.bg_theme === 'navy' ? 'bg-primary text-secondary' : 'bg-muted/30'}`}>
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-primary mb-4">{section.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {section.subtitle}
                </p>
              </div>
              
              {/* Masonry Fix: h-full and flex-col */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                {specific.steps?.map((item: any, index: number) => {
                   return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card p-8 rounded-xl border border-border/50 hover:shadow-lg hover:border-secondary/50 transition-all group flex flex-col h-full"
                    >
                      <div className="mb-6 p-4 bg-primary/5 rounded-full w-fit group-hover:bg-primary/10 transition-colors">
                        <span className="text-2xl font-bold text-secondary">0{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                      {/* Flex grow to push content */}
                      <div className="text-muted-foreground leading-relaxed flex-grow">
                        <RichText content={item.desc} />
                      </div>
                    </motion.div>
                   );
                })}
              </div>
            </div>
          </section>
        );

      case 'outcomes_grid':
        return (
          <section key={section.id} className="py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary">
                    {section.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.subtitle}
                  </p>
                  
                  {section.primary_cta_text && (
                    <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 mt-4">
                        <Link to="/case-studies">{section.primary_cta_text}</Link>
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 relative">
                  <div className="relative z-10 bg-card p-8 rounded-2xl shadow-2xl border border-border/50 max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {specific.stats?.map((stat: any, idx: number) => (
                        <div key={idx} className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl">
                            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        </div>
                      ))}
                  </div>
                  {/* Decorative background elements */}
                  <div className="absolute top-10 -right-10 w-full h-full bg-secondary/10 rounded-2xl -z-10" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
                </div>
              </div>
            </div>
          </section>
        );
      
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      {sections.map(section => (
        <div key={section.id}>
          {renderSection(section)}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default ServiceDetail;

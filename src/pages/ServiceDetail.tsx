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
import { GRID_MAP, ALIGN_MAP, THEME_MAP } from "@/lib/layoutConstants";

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

    // Real-time subscription
    // Real-time subscription
    const channel = supabase
      .channel(`services-${slug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sections_services',
          filter: `page_slug=eq.${slug}`, // Hyphens in slugs usually work without quotes in realtime, but let's try strict string matching if issues persist.
          // Actually, 'page_slug=eq.pre-sales' is valid.
          // Problem might be related to previous component state not updating or fetchSections not running.
          // Let's add a console log to debug in user environment if possible, or just force the fetch.
          // Filter safety: `page_slug=eq.${slug}`
        },
        (payload) => {
           console.log('Realtime update:', payload);
           fetchSections();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (!loading && sections.length === 0) return <NotFound />;

  const renderSection = (section: any) => {
    const specific = section.specific_data || {};
    const gridClass = GRID_MAP[section.grid_columns] || GRID_MAP[3];
    const themeClass = THEME_MAP[section.bg_theme] || THEME_MAP['light'];


    switch(section.section_key) {
      case 'hero':
        return (
          <section key={section.id} className="relative pt-32 pb-24 bg-primary text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {specific.badge && (
                  <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
                    <span className="text-secondary font-bold text-sm tracking-wide uppercase">{specific.badge}</span>
                  </div>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                  {section.title}
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
                  {section.subtitle}
                </p>
                {section.primary_cta_text && (
                    <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 h-auto shadow-glow">
                    <Link to={specific.primary_cta_link || section.primary_cta_link || "/contact"}>
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
                 <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Why it Fails Text */}
                    <div className="space-y-6">
                        <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-2">
                            The Challenge
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">{section.title}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {section.subtitle}
                        </p>
                    </div>
                    
                    {/* Right: The Gap List */}
                    <div className="grid gap-4">
                       {specific.list?.map((item: string, idx: number) => (
                          <motion.div 
                             key={idx}
                             initial={{ opacity: 0, x: 20 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true }}
                             transition={{ delay: idx * 0.1 }}
                             className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
                          >
                             <div className="p-2 bg-secondary/10 rounded-lg shrink-0 mt-0.5">
                                <AlertTriangle className="h-5 w-5 text-secondary" />
                             </div>
                             <div>
                                <h4 className="font-semibold text-primary text-lg mb-1">Gap {idx + 1}</h4>
                                <p className="text-muted-foreground leading-snug">{item}</p>
                             </div>
                          </motion.div>
                       ))}
                    </div>
                 </div>
              </div>
           </section>
        )

      case 'approach_steps':
        return (
          <section key={section.id} className={`py-24 ${themeClass}`}>
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{section.title}</h2>
                <p className="text-muted-foreground text-xl leading-relaxed">
                  {section.subtitle}
                </p>
              </div>
              
              <div className={`grid gap-8 auto-rows-fr ${gridClass}`}>
                {specific.steps?.map((item: any, index: number) => {
                   return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:-translate-y-2 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 flex flex-col h-full group"
                    >
                      <div className="mb-6 p-4 bg-secondary/10 rounded-2xl w-fit group-hover:bg-secondary/20 transition-colors">
                        <span className="text-2xl font-black text-secondary">0{index + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                      <div className="text-muted-foreground leading-relaxed flex-grow prose prose-sm max-w-none">
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
          <section key={section.id} className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 pointer-events-none" />
             
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                
                {/* Left: Heading & CTA */}
                <div className="lg:w-1/3 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-lg text-primary-foreground/80 leading-relaxed">
                    {section.subtitle}
                  </p>
                  {section.primary_cta_text && (
                    <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-primary mt-2">
                        <Link to={specific.primary_cta_link || section.primary_cta_link || "/case-studies"}>{section.primary_cta_text}</Link>
                    </Button>
                  )}
                </div>
                
                {/* Right: Stats Bar */}
                <div className="lg:w-2/3 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {specific.stats?.map((stat: any, idx: number) => (
                        <motion.div 
                            key={idx}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center hover:bg-white/20 transition-colors"
                        >
                            <p className="text-4xl font-black text-secondary mb-2">{stat.value}</p>
                            <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
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

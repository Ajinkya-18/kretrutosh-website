import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Target, Lightbulb, Compass, Users, Rocket, Settings, BookOpen, TrendingUp, BarChart3, MessageSquare, Database, Network, Cpu, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

const iconMap: any = {
  Target, Lightbulb, Compass, Users, Rocket,
  Settings, BookOpen, TrendingUp, BarChart3,
  MessageSquare, Database, Network, Cpu, LineChart
};

// Fallback icon
const DefaultIcon = Target;

interface ServicePageProps {
  slug: string;
}

const ServiceBuilder = ({ slug }: ServicePageProps) => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      const { data, error } = await supabase
        .from('sections_services')
        .select('*')
        .eq('service_slug', slug)
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (data) setSections(data);
      setLoading(false);
    };
    fetchSections();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const renderSection = (section: any) => {
    const specific = section.specific_data || {};

    switch(section.section_key) {
      case 'hero':
        return (
          <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
                  <span className="text-secondary font-medium text-sm tracking-wide uppercase">{specific.badge}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {section.title.split(' ')[0]} <span className="text-secondary">{specific.title_suffix || section.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                  {section.subtitle}
                </p>
                <Button asChild size="lg" className="bg-[#FF9933] text-white hover:bg-[#FF9933]/90 text-lg px-8 py-6">
                  <Link to="/contact">
                    {section.primary_cta_text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>
        );

      case 'components_grid':
        return (
          <section className={`py-24 ${section.bg_theme === 'dark' ? 'bg-primary text-secondary' : 'bg-background'}`}>
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-primary mb-4">{section.title}</h2>
                <p className="text-muted-foreground text-lg">
                  {section.subtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {specific.items?.map((item: any, index: number) => {
                   // Try to predict icon from title or just use random standard ones if not dynamic
                   // Ideally specific data would have 'icon_key' but I didn't migrate that yet in the massive insert.
                   // I used icon components in original file.
                   // For now, I'll use a mapping if I stored icon names, otherwise random or default.
                   // The SQL insert didn't have icon_names. I will accept this limitation or use a generic one.
                   // Limitation: Icons will be generic unless I update SQL to include icon_name.
                   // Let's use CheckCircle as generic for now to avoid broken icons.
                   const Icon = DefaultIcon;
                   return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card p-8 rounded-xl border border-border/50 hover:shadow-lg hover:border-secondary/50 transition-all group"
                    >
                      <div className="mb-6 p-4 bg-primary/5 rounded-full w-fit group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-6 w-6 text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </motion.div>
                   );
                })}
              </div>
            </div>
          </section>
        );

      case 'outcomes':
        return (
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary">
                    {section.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.subtitle}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {specific.list?.map((outcome: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                        <span className="font-medium text-primary">{outcome}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 mt-4">
                    <Link to="/case-studies">{section.primary_cta_text}</Link>
                  </Button>
                </div>
                
                <div className="flex-1 relative">
                  <div className="relative z-10 bg-card p-8 rounded-2xl shadow-2xl border border-border/50 max-w-xs mx-auto">
                    <div className="space-y-6">
                      {specific.stats?.map((stat: any, idx: number) => (
                        <div key={idx} className={`flex flex-col items-start gap-1 pb-4 ${idx !== specific.stats.length - 1 ? 'border-b border-border' : ''}`}>
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-3xl font-bold text-primary">{stat.value}</p>
                          </div>
                          <div className="text-green-500 font-medium text-lg">{stat.highlight}</div>
                        </div>
                      ))}
                    </div>
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

export default ServiceBuilder;

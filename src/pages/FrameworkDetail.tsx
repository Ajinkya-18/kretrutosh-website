import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Layers, Megaphone, Ear, BookOpen, BarChart, Scale, HeartHandshake, Thermometer, Trophy, Map, Calculator, Factory, Target } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NotFound from "./NotFound";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useContent } from "@/hooks/useContent";
import { GRID_MAP, THEME_MAP, ALIGN_MAP } from "@/lib/layoutConstants";

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
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getText } = useContent('framework_detail'); // Optional usage if we want global texts

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);

      // 1. Fetch Framework Metadata
      const { data: fwData, error: fwError } = await supabase
        .from('frameworks')
        .select('*')
        .eq('slug', slug) 
        .single();

      if (fwError) {
        console.error("SUPABASE ERROR [FrameworkMeta]:", fwError);
        alert("Data Load Failed [FrameworkMeta]: " + fwError.message);
        setFramework(null);
        setLoading(false);
        return;
      }
      setFramework(fwData);

      // 2. Fetch Dynamic Sections
      // NOTE: Temporarily commented out until correct table structure is confirmed
      // The original code referenced 'sections_framework_details' which doesn't exist
      // Need to clarify if framework details should be:
      // - Stored in a separate sections table
      // - Part of the frameworks table itself
      // - Not needed at all (using only frameworks table data)
      
      /* ORIGINAL CODE - sections_framework_details table doesn't exist
      const { data: secData, error: secError } = await supabase
        .from('frameworks')
        .select('*')
        .eq('parent_slug', slug)
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (secError) {
           console.error("SUPABASE ERROR [FrameworkSections]:", secError);
           alert("Data Load Failed [FrameworkSections]: " + secError.message);
      }
      setSections(secData || []);
      */
      
      // For now, set sections to empty to prevent errors
      setSections([]);
      
      setLoading(false);
    };

    fetchData();

    // Real-time subscription (Sections)
    const channel = supabase
      .channel(`framework-detail-${slug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'frameworks',
          filter: `parent_slug=eq.${slug}`,
        },
        () => fetchData()
      )
      .subscribe();

    // Real-time metadata subscription
    const metaChannel = supabase
      .channel(`framework-meta-${slug}`)
       .on(
           'postgres_changes', 
           { event: '*', schema: 'public', table: 'frameworks', filter: `slug=eq.${slug}` }, 
           () => fetchData()
       )
       .subscribe();

    return () =\u003e { 
        // supabase.removeChannel(channel); // Commented out since channel not created
        supabase.removeChannel(metaChannel); 
    };
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Skeleton className="h-10 w-10 rounded-full" /></div>;
  
  if (!framework) return <NotFound />;

  const Icon = iconMap[framework.icon_name] || iconMap['Layers'] || Layers;

  // Separate sections for layout reordering
  const idealSection = sections.find(s => s.section_key === 'ideal' || s.title?.toLowerCase().includes('ideal'));
  const overviewSection = sections.find(s => s.section_key === 'overview');
  const otherSections = sections.filter(s => s !== idealSection && s !== overviewSection);

  // Helper to render dynamic sections
  const renderSection = (section: any) => {
    const gridClass = GRID_MAP[section.grid_columns] || GRID_MAP[1];
    const themeClass = THEME_MAP[section.bg_theme] || THEME_MAP['light'];

    if (section.section_key === 'overview') {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                   <h2 className="text-3xl font-bold text-primary mb-6">{section.title}</h2>
                   <div className="text-lg text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
                      {section.content_body} 
                   </div>
                </div>
                {/* Right side widgets can be managed here if needed */}
            </div>
        );
    }

    return (
        <div className={`py-12 ${themeClass}`}>
           <div className="container mx-auto px-4">
              {section.title && <h2 className="text-3xl font-bold mb-6">{section.title}</h2>}
              {section.content_body && (
                  <div className="prose max-w-none text-muted-foreground whitespace-pre-line">
                      {section.content_body}
                  </div>
              )}
           </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title={`${framework.meta_title || framework.title} | KretruTosh`}
        description={framework.meta_description || framework.short_description}
        image={framework.image_url || undefined}
      />
      <Navbar />
      
      {/* Hero is usually static or can be dynamic too. Keeping static wrapper for now, populating with DB data. */}
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
            
            {/* Top Section: Ideal For + Measurable Outcomes */}
            <div className="grid md:grid-cols-2 gap-12 mb-20 animate-fade-in-up">
                {/* Ideal For (Left) */}
                {idealSection ? (
                    <div className="bg-secondary/5 p-8 rounded-2xl border border-secondary/20">
                        <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                            <Target className="h-6 w-6 text-secondary" />
                            {idealSection.title}
                        </h3>
                        <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                            {idealSection.content_body}
                        </div>
                    </div>
                ) : (
                    // Fallback if 'ideal' section is missing - maybe render outcomes full width?
                    // For now, keeping empty or placeholder if needed.
                    <div className="hidden md:block" /> 
                )}

                {/* Measurable Outcomes (Right) */}
                <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                    <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-secondary" />
                        Measurable Outcomes
                    </h3>
                    <ul className="space-y-4">
                        {framework.outcomes?.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-1" />
                                <span className="text-foreground/80 font-medium">{outcome}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

           {/* Remaining Dynamic Sections */}
           <div className="space-y-20">
               {otherSections.map(section => (
                   <div key={section.id} className={THEME_MAP[section.bg_theme] || ''}>
                       {renderSection(section)}
                   </div>
               ))}
           </div>
           
           {/* Overview (Bottom) */}
           {overviewSection && (
               <div className={`mt-20 ${THEME_MAP[overviewSection.bg_theme] || ''}`}>
                   {renderSection(overviewSection)}
               </div>
           )}

           {sections.length === 0 && (
               <div className="text-center py-20 text-muted-foreground">
                   No details available for this framework yet.
               </div>
           )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FrameworkDetail;
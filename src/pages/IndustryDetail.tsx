import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Server, ShoppingBag, ShoppingCart, Shield, Landmark, Factory, Stethoscope, GraduationCap, Building2, Layers } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NotFound from "./NotFound";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import RichText from "@/components/ui/RichText";
import { GRID_MAP, ALIGN_MAP, THEME_MAP } from "@/lib/layoutConstants";
import { useContent } from "@/hooks/useContent";

// Icon mapping
const iconMap: any = {
  Server, ShoppingBag, ShoppingCart, Shield, 
  Landmark, Factory, Stethoscope, GraduationCap, 
  Building2, Layers
};

interface Industry {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  challenges: string[];
  approach: string;
  outcomes: string[];
  icon_name: string;
  meta_title?: string;
  meta_description?: string;
  framework_slugs?: string[];
}

interface Section {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  description?: string;
  specific_data: any;
  bg_theme: 'light' | 'dark' | 'accent';
  is_visible: boolean;
}

interface RelatedFramework {
  id: number;
  title: string;
  slug: string;
  icon_name: string;
}

const IndustryDetail = () => {
  const { id: slug } = useParams(); 
  const navigate = useNavigate();
  const [industryMeta, setIndustryMeta] = useState<Industry | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getText } = useContent('industry_detail');

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);

      try {
        // 1. Fetch Industry Metadata
        const { data: metaData, error: metaError } = await supabase
          .from('industries')
          .select('*')
          .eq('slug', slug)
          .single();

        if (metaError || !metaData) {
            console.error("Error fetching industry meta:", metaError);
            setIndustryMeta(null);
            setLoading(false);
            return;
        }
        setIndustryMeta(metaData);

        // 2. Fetch Page Sections (Dynamic Builder)
        const { data: sectionsData, error: sectionsError } = await supabase
            .from('sections_industry_details') // New Table
            .select('*')
            .eq('parent_slug', slug)
            .eq('is_visible', true)
            .order('display_order', { ascending: true });
        
        if (sectionsError) console.error("Error fetching sections:", sectionsError);
        setSections(sectionsData || []);

        // 3. Fetch Linked Case Studies (Success Stories)
        const { data: csData } = await supabase
            .from('case_studies')
            .select('*')
            .eq('industry_slug', slug) // Assuming column added by SQL
            .limit(3); 
        
        // Fallback: if no slug match, try name match
        if (!csData || csData.length === 0) {
             const { data: csDataBackup } = await supabase
                .from('case_studies')
                .select('*')
                .ilike('industry', `%${metaData.title}%`)
                .limit(3);
             setCaseStudies(csDataBackup || []);
        } else {
             setCaseStudies(csData || []);
        }

      } catch (err) {
          console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Real-time subscription
    const channel = supabase
      .channel(`industry-${slug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sections_industry_details',
          filter: `parent_slug=eq.${slug}`,
        },
        () => fetchData()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Skeleton className="h-10 w-10 rounded-full" /></div>;

  if (!industryMeta) return <NotFound />;

  const Icon = iconMap[industryMeta.icon_name] || Building2;

  const renderSection = (section: any) => {
    const gridClass = GRID_MAP[section.grid_columns] || GRID_MAP[1];
    const alignClass = ALIGN_MAP[section.alignment] || ALIGN_MAP['left'];
    const themeClass = THEME_MAP[section.bg_theme] || THEME_MAP['light'];

    // Specific Handling for 'hero' if it is a section in DB (it might not be, usually hero is static or special)
    // But if migrated to DB, we can render it here.
    // Assuming for now Hero is still partly static (using meta) or specialized.
    
    // Example: Specialized "Approach" section rendering if needed, or generic:
    if (section.section_key === 'approach') {
         return (
             <div className="py-12">
                 <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary mb-6">{section.title}</h2>
                    <div className="text-lg text-muted-foreground leading-relaxed p-8 bg-secondary/5 border-l-4 border-secondary rounded-r-xl whitespace-pre-line">
                        {section.content_body}
                    </div>
                 </div>
             </div>
         );
    }
    
    // Generic Render
    return (
        <div className={`py-12 ${themeClass}`}>
           <div className="container mx-auto px-4">
              <div className={`${gridClass} gap-8`}>
                   <div className={`${alignClass} space-y-4`}>
                      {section.title && <h2 className="text-3xl font-bold">{section.title}</h2>}
                      {section.content_body && (
                          <div 
                            className="prose max-w-none text-muted-foreground whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: section.content_body }} // Allow Rich Text/HTML
                          />
                      )}
                      {section.image_url && (
                          <img src={section.image_url} alt={section.title} className="rounded-xl shadow-md mt-4 max-h-96 object-cover" />
                      )}
                   </div>
                   {/* If grid > 1, maybe the content body is split or there are child items? 
                       For now, assuming single block properties. 
                       If deep nested items are needed (like cards), they would need a json column or joined table.
                       The prompt asked for "section_key (e.g., 'benefits_grid')". 
                       If it's a grid of benefits, 'content_body' might be JSON or we assume strict text for now as per schema.
                   */}
              </div>
           </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title={industryMeta.meta_title || industryMeta.title}
        description={industryMeta.meta_description || industryMeta.description}
      />
      <Navbar />
      
      {/* Hero Section - Keeping static wrapper populated by Meta for now to ensure consistency */}
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
            <Button 
                variant="ghost" 
                className="text-white/70 hover:text-white hover:bg-white/10 mb-8 pl-0"
                onClick={() => navigate("/")}
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-8 items-start"
            >
                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Icon className="h-16 w-16 text-secondary" />
                </div>
                <div>
                <div className="inline-block px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-4">
                    <span className="text-secondary font-medium text-xs tracking-wide uppercase">{industryMeta.subtitle}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {industryMeta.title}
                </h1>
                <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
                    {industryMeta.description}
                </p>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Dynamic Sections Renderer */}
      <div className="flex flex-col">
          {sections.length > 0 ? (
              sections.map(section => (
                  <div key={section.id}>
                      {renderSection(section)}
                  </div>
              ))
          ) : (
                <div className="py-20 text-center text-muted-foreground">
                    <p>Industry details coming soon.</p>
                </div>
          )}
      </div>

      {/* Success Stories (Case Studies) Section */}
      {caseStudies.length > 0 && (
        <section className="py-24 bg-muted/30 border-t border-border/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                     <h2 className="text-3xl font-bold">Success Stories</h2>
                     <Button variant="outline" onClick={() => navigate('/case-studies')}>View All Stories</Button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                     {caseStudies.map(study => (
                         <Card key={study.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/case-studies#case-study-${study.id}`)}>
                             <CardContent className="p-6">
                                 <h3 className="font-bold text-xl mb-3 line-clamp-2">{study.title}</h3>
                                 <p className="text-muted-foreground mb-4 line-clamp-3">{study.challenge}</p>
                                 <div className="text-sm font-semibold text-primary">
                                     Read Story <ArrowRight className="inline w-4 h-4 ml-1" />
                                 </div>
                             </CardContent>
                         </Card>
                     ))}
                </div>
            </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default IndustryDetail;
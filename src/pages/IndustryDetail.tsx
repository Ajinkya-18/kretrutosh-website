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
  const [sections, setSections] = useState<Section[]>([]);
  const [relatedFrameworks, setRelatedFrameworks] = useState<RelatedFramework[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setIsLoading(true);

      try {
        // 1. Fetch Industry Metadata (for icon, SEO)
        const { data: metaData, error: metaError } = await supabase
          .from('industries')
          .select('*')
          .eq('slug', slug)
          .single();

        if (metaError || !metaData) {
            console.error("Error fetching industry meta:", metaError);
            setIndustryMeta(null);
            setIsLoading(false);
            return;
        }
        setIndustryMeta(metaData);

        // 2. Fetch Page Sections (for layout)
        const { data: sectionsData, error: sectionsError } = await supabase
            .from('sections_industries')
            .select('*')
            .eq('page_slug', slug)
            .eq('is_visible', true)
            .order('display_order', { ascending: true });
        
        if (!sectionsError && sectionsData) {
            setSections(sectionsData || []);
        }

        // 3. Fetch Related Frameworks
        const frameworkSlugs = metaData.framework_slugs || [];
        if (frameworkSlugs.length > 0) {
            const { data: fwData, error: fwError } = await supabase
                .from('frameworks')
                .select('id, title, slug, icon_name')
                .in('slug', frameworkSlugs);
            if (!fwError && fwData) setRelatedFrameworks(fwData);
        }

      } catch (err) {
          console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
      </div>
    );
  }

  if (!industryMeta) {
    return <NotFound />;
  }

  const Icon = iconMap[industryMeta.icon_name] || Building2;

  const renderSection = (section: Section) => {
    const { section_key, title, specific_data } = section;

    switch (section_key) {
        case 'hero':
            return (
                <section key={section.id} className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
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
                                <span className="text-secondary font-medium text-xs tracking-wide uppercase">{specific_data?.subtitle}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                {title}
                            </h1>
                            <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
                                {section.description}
                            </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            );
        
        case 'challenges':
            return (
                <div key={section.id}>
                    <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
                    <div className="bg-muted/10 p-6 rounded-xl border border-border/50 mb-8 text-lg text-muted-foreground leading-relaxed">
                        <RichText content={section.subtitle} />
                    </div>
                    <div className="grid gap-4">
                        {specific_data?.list?.map((challenge: string, index: number) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-5 bg-card/50 hover:bg-card rounded-lg border border-border/50 hover:border-secondary/50 transition-colors"
                        >
                            <div className="h-2 w-2 mt-2.5 rounded-full bg-destructive shrink-0" />
                            <span className="text-foreground/90 font-medium text-lg">{challenge}</span>
                        </motion.div>
                        ))}
                    </div>
                </div>
            );

        case 'approach':
            return (
                <div key={section.id}>
                    <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
                    <div className="text-lg text-muted-foreground leading-relaxed p-8 bg-secondary/5 border-l-4 border-secondary rounded-r-xl">
                        <RichText content={section.description} />
                    </div>
                </div>
            );

        case 'frameworks':
            if (!relatedFrameworks || relatedFrameworks.length === 0) return null;
            return (
                <div key={section.id}>
                    <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
                    <div className="grid gap-4">
                    {relatedFrameworks.map((framework) => {
                        const FrameworkIcon = iconMap[framework.icon_name] || Layers;
                        return (
                        <Link key={framework.id} to={`/frameworks/${framework.slug}`}>
                            <Card className="hover:shadow-md transition-all duration-300 border-border/50 hover:border-secondary/50 group">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                                <FrameworkIcon className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
                                </div>
                                <div>
                                <h4 className="font-semibold text-lg text-primary group-hover:text-secondary transition-colors">
                                    {framework.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">View Framework &rarr;</p>
                                </div>
                            </CardContent>
                            </Card>
                        </Link>
                        );
                    })}
                    </div>
                </div>
            );

        case 'outcomes':
            return (
                <div key={section.id}>
                    <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-xl mb-12 relative overflow-hidden border border-border/50">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-2xl font-bold mb-6 relative z-10">{title}</h2>
                        <div className="space-y-6 relative z-10">
                        {specific_data?.list?.map((outcome: string, index: number) => (
                            <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4"
                            >
                            <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                            <span className="text-lg font-medium">{outcome}</span>
                            </motion.div>
                        ))}
                        </div>
                    </div>
                </div>
            );
        
        case 'cta':
            return (
                <div key={section.id}>
                    <div className="text-center lg:text-left">
                        <h3 className="text-xl font-bold text-primary mb-4">Ready to transform your {industryMeta.title} business?</h3>
                        <Button asChild size="lg" className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 h-auto">
                        <Link to="/contact">
                            Schedule a Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        </Button>
                    </div>
                </div>
            );
        
        default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title={industryMeta.meta_title || industryMeta.title}
        description={industryMeta.meta_description || industryMeta.description}
      />
      <Navbar />
      
      {/* Hero Rendering */}
      {sections.find(s => s.section_key === 'hero') && renderSection(sections.find(s => s.section_key === 'hero')!)}

      {/* Main Content Layout */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column Sections */}
            <div className="space-y-12">
               {sections.filter(s => ['challenges', 'approach', 'frameworks'].includes(s.section_key)).map(renderSection)}
            </div>

            {/* Right Column Sections */}
            <div>
               {sections.filter(s => ['outcomes', 'cta'].includes(s.section_key)).map(renderSection)}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryDetail;
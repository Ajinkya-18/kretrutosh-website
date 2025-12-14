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
  challenges: string[]; // Keep for compatibility or remove if unused in new design
  approach: string;
  outcomes: string[];
  icon_name: string;
  meta_title?: string;
  meta_description?: string;
  framework_slugs?: string[];
  challenges_html?: string;
  approach_html?: string;
}

const IndustryDetail = () => {
  const { id: slug } = useParams(); 
  const navigate = useNavigate();
  const [industryMeta, setIndustryMeta] = useState<Industry | null>(null);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
            console.error("SUPABASE ERROR [IndustryDetail]:", metaError);
            if (metaError) alert("Data Load Failed [IndustryMeta]: " + metaError.message);
            setIndustryMeta(null);
            setLoading(false);
            return;
        }
        setIndustryMeta(metaData);

        // 2. Fetch Linked Case Studies (Success Stories)
        const { data: csData, error: csError } = await supabase
            .from('case_studies')
            .select('*')
            .ilike('industry', `%${slug}%`)
            .limit(3);

        if (csError) {
             console.error("SUPABASE ERROR [IndustryCS]:", csError);
             alert("Data Load Failed [IndustryCS]: " + csError.message);
        }

        if (csData && csData.length > 0) {
            setCaseStudies(csData);
        } else {
            // Fallback to title match just in case
             const { data: csDataBackup } = await supabase
                .from('case_studies')
                .select('*')
                .ilike('industry', `%${metaData.title.split(' ')[0]}%`) // Try first word of title
                .limit(3);
             setCaseStudies(csDataBackup || []);
        }

      } catch (err) {
          console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Real-time subscription for Metadata
    const metaChannel = supabase
      .channel(`industry-meta-${slug}`)
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'industries', filter: `slug=eq.${slug}` }, 
        () => fetchData()
      )
      .subscribe();

    // Real-time subscription for Case Studies (Success Stories)
    const csChannel = supabase
      .channel(`industry-cs-${slug}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'case_studies' },
        () => fetchData()
      )
      .subscribe();

    return () => { 
        supabase.removeChannel(metaChannel);
        supabase.removeChannel(csChannel);
    };
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0B1C3E]"><Skeleton className="h-12 w-12 rounded-full bg-white/10" /></div>;

  if (!industryMeta) return <NotFound />;

  const Icon = iconMap[industryMeta.icon_name] || Building2;

  // Use updated color scheme: Navy (#0B1C3E) and Saffron (#FF9933)

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title={`${industryMeta.meta_title || industryMeta.title} Consulting | KretruTosh`}
        description={industryMeta.meta_description || industryMeta.description}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#0B1C3E] overflow-hidden text-white">
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
                <Icon className="h-16 w-16 text-[#FF9933]" />
                </div>
                <div>
                <div className="inline-block px-3 py-1 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 backdrop-blur-sm mb-4">
                    <span className="text-[#FF9933] font-medium text-xs tracking-wide uppercase">{industryMeta.subtitle}</span>
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

      {/* Challenges Section */}
      {industryMeta.challenges_html && (
        <section className="py-20 bg-gray-50">
             <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[#0B1C3E] font-bold tracking-widest uppercase text-sm mb-2 block">The Context</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C3E] mb-6">Key Challenges</h2>
                    </div>
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                        <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-[#0B1C3E] prose-strong:text-[#0B1C3E] prose-li:marker:text-[#FF9933]">
                            <RichText content={industryMeta.challenges_html} />
                        </div>
                    </div>
                 </div>
             </div>
        </section>
      )}

      {/* Approach Section */}
      {industryMeta.approach_html && (
         <section className="py-20 bg-white">
             <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                   <div className="flex flex-col md:flex-row gap-12 items-start">
                       <div className="md:w-1/3 sticky top-24">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C3E] mb-6">Our Approach</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                We don't just solve problems; we build systems for sustainable growth.
                            </p>
                            <Button asChild size="lg" className="bg-[#FF9933] text-white hover:bg-[#FF9933]/90 w-full md:w-auto shadow-md">
                                <Link to="/contact">Discuss Strategy <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                       </div>
                       <div className="md:w-2/3">
                            <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-[#0B1C3E] prose-strong:text-[#0B1C3E] 
                                prose-ul:space-y-4 prose-li:bg-gray-50 prose-li:p-6 prose-li:rounded-xl prose-li:border prose-li:border-gray-100 prose-li:list-none prose-li:m-0"
                            >
                                <RichText content={industryMeta.approach_html} />
                            </div>
                       </div>
                   </div>
                </div>
             </div>
         </section>
      )}

      {/* Success Stories (Case Studies) Section */}
      {caseStudies.length > 0 && (
        <section className="py-24 bg-[#0B1C3E] text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                     <h2 className="text-3xl font-bold">Success Stories</h2>
                     <Button variant="outline" className="text-[#0B1C3E] border-white/20 hover:bg-white/10 hover:text-white" onClick={() => navigate('/case-studies')}>View All Stories</Button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                     {caseStudies.map(study => (
                         <Card 
                            key={study.id} 
                            className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer text-white" 
                            onClick={() => {
                                if (study.link_url && study.link_url.length > 2) {
                                    window.open(study.link_url, '_blank');
                                } else {
                                    navigate(`/case-studies#case-study-${study.id}`);
                                }
                            }}
                         >
                             <CardContent className="p-8">
                                 <h3 className="font-bold text-xl mb-3 line-clamp-2 text-white">{study.title}</h3>
                                 <p className="text-white/70 mb-6 line-clamp-3">{study.challenge}</p>
                                 <div className="text-sm font-bold text-[#FF9933] flex items-center">
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

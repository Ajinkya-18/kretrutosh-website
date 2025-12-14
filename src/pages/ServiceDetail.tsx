import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import NotFound from "./NotFound";
import SEO from "@/components/SEO";

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (error) {
        console.error("SUPABASE ERROR [ServiceDetail]:", error);
        alert("Data Load Failed [ServiceDetail]: " + error.message);
      }
        
      if (data) setService(data);
      setLoading(false);
    };
    fetchData();

    const channel = supabase
      .channel(`service-detail-${slug}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services', filter: `slug=eq.${slug}` }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!service) return <NotFound />;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title={`${service.title} | KretruTosh`}
        description={service.subtitle}
        image={service.hero_image}
      />
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#0B1C3E] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {service.hero_image && (
             <div className="absolute inset-0 z-0 opacity-20">
                <img src={service.hero_image} alt={service.title} className="w-full h-full object-cover" />
             </div>
        )}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 backdrop-blur-sm mb-6">
                 <span className="text-[#FF9933] font-bold text-sm tracking-wide uppercase">Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
              {service.subtitle}
            </p>
            <Button asChild size="lg" className="bg-[#FF9933] text-white hover:bg-[#FF9933]/90 text-lg px-8 py-6 h-auto shadow-glow transition-all hover:scale-105">
                <Link to="/contact">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Problem Section (Rich Text) */}
      {service.problem_html && (
          <section className="py-24 bg-background">
             <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        The Challenge
                    </div>
                    <div 
                        className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-primary prose-a:text-secondary"
                        dangerouslySetInnerHTML={{ __html: service.problem_html }} 
                    />
                </div>
             </div>
          </section>
      )}

      {/* 3. Approach Section (Rich Text -> Cards) */}
       {service.approach_html && (
          <section className="py-24 bg-gray-50">
             <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0B1C3E]">Our Approach</h2>
                    </div>
                    <div 
                        className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-[#0B1C3E] prose-a:text-[#FF9933] prose-strong:text-[#0B1C3E] 
                        prose-ul:grid prose-ul:grid-cols-1 prose-ul:md:grid-cols-2 prose-ul:gap-6 prose-ul:pl-0 
                        prose-li:bg-white prose-li:p-8 prose-li:rounded-xl prose-li:shadow-sm prose-li:border prose-li:border-gray-100 prose-li:list-none prose-li:m-0 
                        prose-li:transition-all prose-li:duration-300 prose-li:hover:shadow-md prose-li:hover:-translate-y-1"
                        dangerouslySetInnerHTML={{ __html: service.approach_html }} 
                    />
                </div>
             </div>
          </section>
      )}

      {/* 4. Outcomes (List JSONB) */}
      {service.outcomes_list && service.outcomes_list.length > 0 && (
          <section className="py-24 bg-[#0B1C3E] text-white relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 pointer-events-none" />
             
             <div className="container mx-auto px-4 relative z-10">
                 <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Measurable Outcomes</h2>
                     <p className="text-xl text-white/80">The impact we deliver.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {service.outcomes_list.map((item: any, idx: number) => (
                         <div key={idx} className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/10 flex items-start gap-4 hover:bg-white/10 transition-colors">
                             <CheckCircle2 className="h-6 w-6 text-[#FF9933] shrink-0 mt-1" />
                             <div>
                                 <h3 className="font-bold text-xl text-white mb-2">{item.label || item.value}</h3>
                                 <p className="text-[#FF9933] font-bold text-2xl">{item.value}</p>
                                 {item.description && <p className="text-white/70 mt-1">{item.description}</p>}
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
          </section>
      )}

      <Footer />
    </div>
  );
};

export default ServiceDetail;

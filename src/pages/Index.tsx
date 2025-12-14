import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Homepage Sections
import AgeOfKretru from "@/components/home/AgeOfKretru";
import GrowthEngine from "@/components/home/GrowthEngine";
import Frameworks from "@/components/home/Frameworks";
import ClientLogos from "@/components/home/ClientLogos";
import CaseStudies from "@/components/home/CaseStudies";
import ThoughtLeadership from "@/components/home/ThoughtLeadership";
// Other components might be deprecated or unused in new structure if not in page_home config, 
// but we keep imports if we want to add them back later, or remove if unused.

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageConfig, setPageConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Scroll handling
  useEffect(() => {
    if (location.state?.scrollTo === 'contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, navigate, location.pathname]);

  // Fetch Page: Home Config
  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        // Fetch from 'page_home' (Assuming only one row or we take the first)
        const { data, error } = await supabase
          .from('page_home')
          .select('*')
          .limit(1)
          .single();

      if (error) {
           console.error("SUPABASE ERROR [Index]:", error);
           alert("Data Load Failed [Index]: " + error.message);
      }
      
      if (data) {
          setPageConfig(data);
      }
    } finally {
        setLoading(false);
    }
  };

    fetchPage();

    // Subscribe to changes
    const pageChannel = supabase
        .channel('page-home-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'page_home' }, () => fetchPage())
        .subscribe();

    return () => {
      supabase.removeChannel(pageChannel);
    };
  }, []);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }
  
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
    <SEO   
      title={pageConfig?.hero_title ? `${pageConfig.hero_title} | KretruTosh` : undefined}
      description={pageConfig?.hero_subtitle}
      image={pageConfig?.hero_video_url} 
    />
    <Navbar />
    <main>
      {/* Master Hero Render */}
      <Hero 
          badge="Customer-Led Growth"
          title={pageConfig?.hero_title}
          subtitle={pageConfig?.hero_subtitle}
          primaryCta="Schedule Consultation"
          primaryCtaLink="/contact"
          mediaType="video"
          videoUrl={pageConfig?.hero_video_url}
      />

// ...

       {/* Growth Engine (Services) */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
      >
           <GrowthEngine 
              title={pageConfig?.growth_engine_title} 
              subtitle="Your GTM Velocity Model"
          />
      </motion.div>

        {/* Client Logos */}
        <ClientLogos />

        {/* Frameworks */}
        <div className="bg-muted/30">
            <Frameworks title={pageConfig?.frameworks_title} />
        </div>

        {/* Case Studies */}
        <CaseStudies />

        {/* Thought Leadership (includes Book reference and Whitepapers) */}
        <ThoughtLeadership />

        {/* Final CTA Section (replacing static Contact Form) */}
        <div className="py-24 bg-primary text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Transform Your Growth Engine?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                    Let's discuss how we can help you achieve predictable, customer-led growth.
                </p>
                <Button 
                    asChild 
                    size="lg" 
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 shadow-xl hover:scale-105 transition-all"
                >
                    <Link to="/contact">
                       Schedule a Consultation
                    </Link>
                </Button>
            </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Index;

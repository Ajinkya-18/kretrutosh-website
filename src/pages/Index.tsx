import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

// Homepage Sections
import AgeOfKretru from "@/components/home/AgeOfKretru";
import GrowthEngine from "@/components/home/GrowthEngine";
import Frameworks from "@/components/home/Frameworks";
import ClientLogos from "@/components/home/ClientLogos";
import CaseStudies from "@/components/home/CaseStudies";
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
             console.error("Error fetching page_home:", error);
             // Fallback or retry?
        }
        
        if (data) {
            setPageConfig(data);
        }
      } catch (err) {
        console.error('Error fetching page data:', err);
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
        title={pageConfig?.hero_title ? `${pageConfig.hero_title} | KretruTosh` : "KretruTosh Consulting"}
        description={pageConfig?.hero_subtitle || "Customer-led growth transformation."}
        image={pageConfig?.hero_video_url} // Or add hero_image logic if exists
      />
      <Navbar />
      <main>
        {/* Master Hero Render */}
        <Hero 
            badge="Customer-Led Growth"
            title={pageConfig?.hero_title || 'Build a Customer-Led Growth Engine'}
            subtitle={pageConfig?.hero_subtitle}
            primaryCta="Schedule Consultation"
            primaryCtaLink="/contact"
            mediaType="video" // Or logic to detect
            videoUrl={pageConfig?.hero_video_url}
        />

        {/* Book Section */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <AgeOfKretru />
        </motion.div>

         {/* Growth Engine (Services) */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
             <GrowthEngine 
                title={pageConfig?.growth_engine_title} 
                subtitle="Your GTM Velocity Model" // Could add to DB if needed
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

        <motion.div
           id="contact"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <ContactForm />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

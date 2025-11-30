import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

// Homepage Sections
import AgeOfKretru from "@/components/home/AgeOfKretru";
import WhatKretrutoshMeans from "@/components/home/WhatKretrutoshMeans";
import GrowthEngine from "@/components/home/GrowthEngine";
import Outcomes from "@/components/home/Outcomes";
import Frameworks from "@/components/home/Frameworks";
import ClientLogos from "@/components/home/ClientLogos";
import CaseStudies from "@/components/home/CaseStudies";
import ThoughtLeadership from "@/components/home/ThoughtLeadership";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    // Check if we were navigated here with a request to scroll
    if (location.state?.scrollTo === 'contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        // Scroll to the contact section smoothly
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Optional: clear the state so it doesn't re-trigger on refresh
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    const fetchHeroData = async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'home')
        .single();
      
      if (data) {
        setHeroData(data);
      }
    };
    fetchHeroData();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        <Hero 
          title={heroData?.title}
          subtitle={heroData?.body_text}
          backgroundImage={heroData?.hero_image_url}
          videoUrl={heroData?.hero_video_url}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AgeOfKretru />
        </motion.div>

        <WhatKretrutoshMeans />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GrowthEngine />
        </motion.div>

        <Outcomes />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Frameworks />
        </motion.div>

        <ClientLogos />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CaseStudies />
        </motion.div>

        <ThoughtLeadership />

        <motion.div
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

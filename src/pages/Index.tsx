import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

// Homepage Sections
import AgeOfKretru from "@/components/home/AgeOfKretru";
import GrowthEngine from "@/components/home/GrowthEngine";
import Frameworks from "@/components/home/Frameworks";
import ClientLogos from "@/components/home/ClientLogos";
import CaseStudies from "@/components/home/CaseStudies";
import ThoughtLeadership from "@/components/home/ThoughtLeadership";
import Outcomes from "@/components/home/Outcomes";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageConfig, setPageConfig] = useState<any>(null);
  const [outcomes, setOutcomes] = useState<any[]>([]);
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

  // Fetch Outcomes from outcomes table
  useEffect(() => {
    const fetchOutcomes = async () => {
      const { data, error } = await supabase
        .from('outcomes')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error("SUPABASE ERROR [Outcomes]:", error);
      } else {
        setOutcomes(data || []);
      }
    };

    fetchOutcomes();

    // Subscribe to outcomes changes
    const outcomesChannel = supabase
      .channel('outcomes-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'outcomes' }, () => fetchOutcomes())
      .subscribe();

    return () => {
      supabase.removeChannel(outcomesChannel);
    };
  }, []);

  // =====================================================
  // DYNAMIC SECTION MAP
  // =====================================================
  // This maps section keys from layout_order to actual React components
  const SECTION_MAP: Record<string, JSX.Element | null> = {
    hero: (
      <Hero 
        key="hero"
        badge="Customer-Led Growth"
        title={pageConfig?.hero_title}
        subtitle={pageConfig?.hero_subtitle}
        primaryCta="Schedule Consultation"
        primaryCtaLink="/contact"
        mediaType="video"
        videoUrl={pageConfig?.hero_video_url}
      />
    ),
    age_of_kretru: pageConfig ? <AgeOfKretru key="age_of_kretru" /> : null,
    growth_engine: pageConfig ? (
      <GrowthEngine 
        key="growth_engine" 
        title={pageConfig.growth_engine_title}
      />
    ) : null,
    frameworks: pageConfig ? (
      <Frameworks 
        key="frameworks" 
        title={pageConfig.frameworks_title}
      />
    ) : null,
    outcomes: pageConfig ? (
      <Outcomes 
        key="outcomes" 
        title={pageConfig.outcomes_title || "Measurable Outcomes"}
        description={pageConfig.outcomes_description || "Results-driven approach to customer-led growth"}
        outcomes={outcomes}
      />
    ) : null,
    clients: <ClientLogos key="clients" />,
    case_studies: <CaseStudies key="case_studies" />,
    thought_leadership: <ThoughtLeadership key="thought_leadership" />
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Get layout order from page config, or use default
  const layoutOrder = pageConfig?.layout_order || [
    "hero",
    "growth_engine",
    "frameworks",
    "outcomes",
    "clients",
    "case_studies",
    "thought_leadership"
  ];

  // Get section visibility settings
  const sectionVisibility = pageConfig?.section_visibility || {};

  // =====================================================
  // DYNAMIC RENDERING LOOP
  // =====================================================
  const renderSections = () => {
    return layoutOrder
      .filter((sectionKey: string) => {
        // Only render if section is visible (default to true if not specified)
        const isVisible = sectionVisibility[sectionKey] !== false;
        return isVisible && SECTION_MAP[sectionKey];
      })
      .map((sectionKey: string) => SECTION_MAP[sectionKey]);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SEO   
        title={pageConfig?.hero_title ? `${pageConfig.hero_title} | KretruTosh` : undefined}
        description={pageConfig?.hero_subtitle}
        image={pageConfig?.hero_video_url} 
      />
      <Navbar />
      <main>
        {/* DYNAMIC SECTION RENDERING */}
        {renderSections()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;

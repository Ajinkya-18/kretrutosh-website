import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";
import { GRID_MAP, ALIGN_MAP, THEME_MAP } from "@/lib/layoutConstants";

// Homepage Sections
import AgeOfKretru from "@/components/home/AgeOfKretru";
import WhatKretrutoshMeans from "@/components/home/WhatKretrutoshMeans";
import GrowthEngine from "@/components/home/GrowthEngine";
import Outcomes from "@/components/home/Outcomes";
import Frameworks from "@/components/home/Frameworks";
import ClientLogos from "@/components/home/ClientLogos";
import CaseStudies from "@/components/home/CaseStudies";
import ThoughtLeadership from "@/components/home/ThoughtLeadership";
import Assessments from "@/components/home/Assessments";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getText } = useContent('home');
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch Page Config
  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        // 1. Fetch Master Page Config (Hero & SEO)
        const { data: pageData, error: pageError } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', 'home')
          .single();

        if (pageData) {
            // Merge pageData into a reliable config object
            // We use this to feed the Hero and Meta
            setSections(prev => {
                // We keep prev sections if we want, but for now we are just setting state
                // Actually, we need to fetch SECTIONS separately or merge efficiently.
                // Let's store page config in a separate state or just use it directly.
                return prev; 
            });
            // Better strategy: Store pageConfig in a ref or state
            setPageConfig(pageData);
        }

        // 2. Fetch Body Sections
        const { data: sectionData, error: sectionError } = await supabase
          .from('sections_home')
          .select('*')
          .eq('is_visible', true)
          .neq('section_key', 'hero') // Exclude old hero if it exists
          .order('display_order', { ascending: true });

        if (sectionError) throw sectionError;
        setSections(sectionData || []);
      } catch (err) {
        console.error('Error fetching page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();

    // Real-time subscriptions
    const pageChannel = supabase
        .channel('home-page-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'pages', filter: "slug=eq.'home'" }, () => fetchPage())
        .subscribe();

    const sectionsChannel = supabase
        .channel('home-sections-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'sections_home' }, () => fetchPage())
        .subscribe();

    return () => {
      supabase.removeChannel(pageChannel);
      supabase.removeChannel(sectionsChannel);
    };
  }, []);

  const [pageConfig, setPageConfig] = useState<any>(null); // New state for Master Config

  // ... imports

  // Section Renderer
  const renderSection = (section: any) => {
    // Map DB layout configs to Tailwind classes using Safe-List pattern
    const gridClass = GRID_MAP[section.grid_columns] || GRID_MAP[3];
    const alignClass = ALIGN_MAP[section.alignment] || ALIGN_MAP['left'];
    // Theme is handled in the wrapper (parent div)

    switch (section.section_key) {
      // 'hero' case is removed from here because it's handled by Master Page Config
      
      case 'what_means':
        const specific = section.specific_data || {};
        return (
          <WhatKretrutoshMeans 
            titlePart1={specific.title_parts?.part1 || 'Kretru = '}
            titlePart2={specific.title_parts?.part2 || 'Customer'}
            titlePart3={specific.title_parts?.part3 || 'Tosh = '}
            titlePart4={specific.title_parts?.part4 || 'Delight'}
            description={section.description || getText('meaning.copy', 'KretruTosh represents an approach where organizations redesign their Go-To-Market...')}
            highlight={specific.highlight || 'This is not CX as a function — this is customer-led business transformation.'}
          />
        );

      case 'growth_engine':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GrowthEngine 
               title={section.title || 'One Engine. Five Motions. Infinite Growth.'}
               subtitle={section.subtitle || 'Your GTM Velocity model...'}
               motions={section.specific_data?.motions}
               gridClass={gridClass}
               getText={getText}
            />
          </motion.div>
        );

      case 'outcomes':
        return (
          <Outcomes 
            title={section.title || 'Outcomes That Matter'}
            description={section.description || "We don't just deliver strategies; we deliver measurable business impact."}
            items={section.specific_data?.items || []}
            gridClass={gridClass}
          />
        );

      case 'age_of_kretru':
        const bookSpecific = section.specific_data || {};
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AgeOfKretru 
              badge={section.badge || 'New Release'}
              title={section.title || 'Beyond Customer Satisfaction:'}
              subtitle={section.subtitle || 'The Age of Kretru'}
              quote={bookSpecific.quote || ''}
              description={section.description || ''}
              bookLink={section.primary_cta_link || 'https://www.amazon.in/dp/B0D17W5B1B'}
              ctaText={section.primary_cta_text || 'Read the Book → Amazon'}
            />
          </motion.div>
        );

      case 'final_cta':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FinalCTA 
              title={section.title || 'Ready to Transform Your Growth Trajectory?'}
              subtitle={section.subtitle || "Let's build your customer-led growth engine together."}
              primaryBtn={section.primary_cta_text || 'Schedule a Consultation'}
              secondaryBtn={section.secondary_cta_text || 'Explore Services'}
            />
          </motion.div>
        );

      default:
        // Handle global widgets that aren't strictly sections but currently in index
        if (section.section_key === 'client_logos') return <ClientLogos title={section.title} />;
        if (section.section_key === 'frameworks') {
          return (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
               <Frameworks 
                  title={section.title}
                  description={section.description}
                  ctaText={section.primary_cta_text}
                  gridClass={gridClass}
                  getText={getText}
               />
            </motion.div>
          );
        }
        if (section.section_key === 'case_studies') {
            return (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <CaseStudies 
                        title={section.title}
                        description={section.description}
                        ctaText={section.primary_cta_text}
                        getText={getText}
                    />
                </motion.div>
            );
        }
        if (section.section_key === 'thought_leadership') {
            return (
                <ThoughtLeadership 
                    title={section.title}
                    description={section.description}
                    cards={section.specific_data?.cards}
                    getText={getText}
                />
            );
        }
        if (section.section_key === 'assessments') {
            return (
                <Assessments 
                    title={section.title}
                    description={section.description}
                    gridClass={gridClass}
                />
            );
        }
        
        return null;
    }
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  // If no sections found (migration not run?), fallback to static is not handled here to encourage migration
  // but we can assume DB is populated as per task.
  
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        {/* Master Hero Render */}
        <Hero 
            badge={getText('hero.badge', 'The Premier Growth Transformation Firm')} // Badge might not be in pages table yet, defaulting or using content.
            title={pageConfig?.title || 'Build a Customer-Led Growth Engine That Scales'}
            subtitle={pageConfig?.subtitle}
            primaryCta={pageConfig?.cta_text}
            primaryCtaLink={pageConfig?.cta_link}
            // Logic: Media Type from Master Config
            mediaType={pageConfig?.media_type || 'image'}
            backgroundImage={pageConfig?.hero_image_url}
            videoUrl={pageConfig?.hero_video_url}
            overlayOpacity={pageConfig?.overlay_opacity}
        />

        {sections.length > 0 ? (
          // Render Dynamic Sections (Body)
          sections.map((section) => (
            <div 
                key={section.id} 
                id={section.section_key} // deep-linking support
                className={THEME_MAP[section.bg_theme] || THEME_MAP['light']}
            >
               {renderSection(section)}
            </div>
          ))
        ) : (
          // Fallback static Layout (Ghost of the past) - ONLY if DB empty
          <>
             {/* This part intentionally left empty as we expect DB to drive content now. 
                 To see default content, DB must be populated. */}
             <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">Welcome to the New Page Builder Experience</h1>
                <p className="text-muted-foreground">Please run the migration script to see content.</p>
             </div>
          </>
        )}

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

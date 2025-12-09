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
        const { data, error } = await supabase
          .from('sections_home')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSections(data || []);
      } catch (err) {
        console.error('Error fetching page layout:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();

    // Real-time subscription for layout updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sections_home',
        },
        () => {
          console.log('Real-time update received: sections_home');
          fetchPage();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

import { GRID_MAP, ALIGN_MAP, THEME_MAP } from "@/lib/layoutConstants";

// ... imports

  // Section Renderer
  const renderSection = (section: any) => {
    // Map DB layout configs to Tailwind classes using Safe-List pattern
    const gridClass = GRID_MAP[section.grid_columns] || GRID_MAP[3];
    const alignClass = ALIGN_MAP[section.alignment] || ALIGN_MAP['left'];
    // Theme is handled in the wrapper (parent div)


    switch (section.section_key) {
      case 'hero':
        return (
          <Hero 
            badge={section.badge || getText('hero.badge', 'The Premier Growth Transformation Firm')}
            title={section.title || getText('hero.title', 'Build a Customer-Led Growth Engine That Scales')}
            subtitle={section.subtitle || getText('hero.subtitle', 'Integrated Go-To-Market and Customer Transformation.')}
            primaryCta={section.primary_cta_text || getText('hero.primary_cta', 'Book a Growth Strategy Review')}
            secondaryCta={section.secondary_cta_text || getText('hero.secondary_cta', 'Explore Transformation Programs')}
          />
        );
      
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
        {sections.length > 0 ? (
          // Render Dynamic Sections
          sections.map((section) => (
            <div key={section.id} className={THEME_MAP[section.bg_theme] || THEME_MAP['light']}>
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

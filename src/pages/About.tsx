import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  section_key: string; // 'hero', 'philosophy', 'who_we_are', 'founder_story'
  title: string;
  subtitle?: string;
  content_body?: string;
  image_url?: string;
  grid_columns: number;
  alignment: 'left' | 'center' | 'right';
  bg_theme: 'light' | 'navy' | 'gray';
  admin_instruction?: string;
}

const About = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data, error } = await supabase
          .from('sections_about')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSections(data || []);
      } catch (error) {
        console.error("Error fetching about sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const renderContent = (content?: string) => {
    if (!content) return null;
    return content.split('\n').map((line, i) => (
      line.trim() ? <p key={i} className="mb-4 text-lg leading-relaxed">{line}</p> : <br key={i} />
    ));
  };

  const renderSection = (section: Section) => {
    const { section_key, title, subtitle, content_body, bg_theme, alignment } = section;
    
    // Theme Classes
    const themeClasses = {
      light: "bg-background text-foreground",
      navy: "bg-[#0A192F] text-white",
      gray: "bg-muted/30 text-foreground"
    };

    const alignClass = alignment === 'center' ? 'text-center mx-auto' : 'text-left';
    const containerClass = `py-20 ${themeClasses[bg_theme] || themeClasses.light}`;

    if (section_key === 'hero') {
      return (
        <section key={section.id} className="pt-32 pb-20 bg-[#0A192F] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </section>
      );
    }

    return (
      <section key={section.id} className={containerClass}>
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl ${alignClass} animate-on-scroll`}>
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${bg_theme === 'navy' ? 'text-white' : 'text-primary'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-xl font-medium mb-8 ${bg_theme === 'navy' ? 'text-secondary' : 'text-secondary'}`}>
                {subtitle}
              </p>
            )}
            <div className={`prose prose-lg max-w-none ${bg_theme === 'navy' ? 'prose-invert' : 'text-muted-foreground'}`}>
               {renderContent(content_body)}
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-background">
           <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        {sections.length > 0 ? (
          sections.map(renderSection)
        ) : (
          <div className="container mx-auto py-32 text-center text-muted-foreground">
            No content available.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;
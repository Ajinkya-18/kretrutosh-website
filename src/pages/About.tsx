import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/home/ClientLogos";

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
  const [pageConfig, setPageConfig] = useState<any>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        // 1. Fetch Master Page
        const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'about').single();
        if (pageData) setPageConfig(pageData);

        // 2. Fetch Sections
        const { data: sectionData, error } = await supabase
          .from('sections_about')
          .select('*')
          .eq('is_visible', true)
          .neq('section_key', 'hero')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSections(sectionData || []);
      } catch (error) {
        console.error("Error fetching about sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();

    // Real-time Subscriptions
    const pageChannel = supabase
        .channel('about-page-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'pages', filter: "slug=eq.'about'" }, () => fetchPage())
        .subscribe();

    const sectionsChannel = supabase
        .channel('about-sections-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'sections_about' }, () => fetchPage())
        .subscribe();

    return () => {
        supabase.removeChannel(pageChannel);
        supabase.removeChannel(sectionsChannel);
    };
  }, []);

  const renderContent = (content?: string) => {
    if (!content) return null;
    // Render HTML content using dangerouslySetInnerHTML
    return (
      <div 
        className="prose prose-lg max-w-none" 
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  const renderSection = (section: Section) => {
    const { section_key, title, subtitle, content_body, image_url, bg_theme, alignment } = section;
    
    // Theme Classes
    const themeClasses = {
      light: "bg-background text-foreground",
      navy: "bg-[#0A192F] text-white",
      gray: "bg-muted/30 text-foreground"
    };

    const alignClass = alignment === 'center' ? 'text-center mx-auto' : 'text-left';
    const containerClass = `py-20 ${themeClasses[bg_theme] || themeClasses.light}`;
    
    // Hero case removed (handled by component)

    return (
      <section key={section.id} className={containerClass}>
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl ${alignClass} animate-on-scroll`}>
            {/* Image */}
            {image_url && (
              <div className="mb-8">
                <img 
                  src={image_url} 
                  alt={title || 'Section image'} 
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    console.error('Image failed to load:', image_url);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => console.log('Image loaded successfully:', image_url)}
                />
              </div>
            )}
            
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${bg_theme === 'navy' ? 'text-white' : 'text-primary'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-xl font-medium mb-8 ${bg_theme === 'navy' ? 'text-white' : 'text-secondary'}`}>
                {subtitle}
              </p>
            )}
            <div className={`prose prose-lg max-w-none ${bg_theme === 'navy' ? 'prose-invert prose-headings:text-white prose-p:text-white/90' : 'prose-headings:text-[#0B1C3E] prose-p:text-[#0B1C3E]/80'}`}>
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
        <Hero 
           mediaType={pageConfig?.media_type}
           videoUrl={pageConfig?.hero_video_url}
           backgroundImage={pageConfig?.hero_image_url}
           overlayOpacity={pageConfig?.overlay_opacity}
           title={pageConfig?.title}
           subtitle={pageConfig?.subtitle}
           // Use title/subtitle only, About might not have CTAs.
        />

        <ClientLogos />

        {sections.length > 0 ? (
          sections.map(section => (
               <div key={section.id}>
                    {renderSection(section)}
               </div>
          ))
        ) : (
          <div className="container mx-auto py-32 text-center text-muted-foreground">
             {/* If DB empty, just show loading or empty state. */}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;
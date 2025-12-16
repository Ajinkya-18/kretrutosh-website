import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/home/ClientLogos";

const About = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pageConfig, setPageConfig] = useState<any>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        // 1. Fetch Master Page config for hero video/image
        const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'about').single();
        if (pageData) setPageConfig(pageData);

        // 2. Fetch About page data from page_about table
        const { data: aboutPageData, error } = await supabase
          .from('page_about')
          .select('*')
          .single();

        if (error) {
          console.error("Error fetching page_about:", error);
        } else {
          setAboutData(aboutPageData);
        }
      } catch (error) {
        console.error("Error fetching about page:", error);
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

    const aboutDataChannel = supabase
        .channel('about-data-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'page_about' }, () => fetchPage())
        .subscribe();

    return () => {
        supabase.removeChannel(pageChannel);
        supabase.removeChannel(aboutDataChannel);
    };
  }, []);

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
           title={pageConfig?.title || aboutData?.hero_title}
           subtitle={pageConfig?.subtitle}
        />

        <ClientLogos />

        {/* Story Section */}
        {aboutData?.story_html && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Founder Image */}
                  {aboutData.founder_image_url && (
                    <div className="flex justify-center animate-fade-in">
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-accent to-accent-hover opacity-20 blur-xl group-hover:opacity-30 transition-all duration-300 rounded-lg" />
                        <img 
                          src={aboutData.founder_image_url} 
                          alt="Founder" 
                          className="relative rounded-lg shadow-2xl w-full max-w-md transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            console.error('Founder image failed to load:', aboutData.founder_image_url);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => console.log('Founder image loaded:', aboutData.founder_image_url)}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Story Content */}
                  <div className="space-y-6 animate-fade-in-up">
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-300 prose-p:leading-relaxed" 
                      dangerouslySetInnerHTML={{ __html: aboutData.story_html }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;
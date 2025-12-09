import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Zap, Mail, MapPin, Linkedin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface Section {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  content_body?: string;
  specific_data?: any;
  bg_theme: 'light' | 'navy' | 'gray';
  alignment: 'left' | 'center' | 'right';
  is_visible: boolean;
}

const Contact = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data, error } = await supabase
          .from('sections_contact')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSections(data || []);
      } catch (error) {
        console.error("Error fetching contact sections:", error);
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
        <section key={section.id} className="pt-32 pb-24 bg-[#0A192F] text-white text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
             {/* Gradient glow to make it premium */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 blur-[100px] rounded-full" />
             
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

    if (section_key === 'info_block') {
         // Specialized Card Layout for Info
         return (
             <section key={section.id} className="py-20 relative -mt-16 z-20">
                 <div className="container mx-auto px-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Map the content_body lines to cards */}
                        {content_body?.split('\n').filter(l => l.trim()).map((line, idx) => {
                             let Icon = Zap; 
                             let label = "Connect";
                             
                             if (line.toLowerCase().includes('email')) { Icon = Mail; label = "Email Us"; }
                             if (line.toLowerCase().includes('location')) { Icon = MapPin; label = "Visit Us"; }
                             if (line.toLowerCase().includes('linkedin')) { Icon = Linkedin; label = "Follow Us"; }

                             return (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group">
                                    <div className="h-14 w-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                                        <Icon className="h-7 w-7 text-secondary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary mb-3">{label}</h3>
                                    <p className="text-muted-foreground font-medium">{line.replace(/^(Email:|Location:)/i, '').trim()}</p>
                                </div>
                             )
                        })}
                     </div>
                 </div>
             </section>
         )
    }

    if (section_key === 'strategy_block') {
        // Highlighted Value Proposition Block
        return (
            <section key={section.id} className="py-24 bg-muted/30 border-y border-border/50">
                <div className="container mx-auto px-4 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-primary mb-12">{title}</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {content_body?.split('\n').filter(l => l.includes('•')).map((item, idx) => (
                             <div key={idx} className="flex gap-4">
                                 <div className="h-2 w-2 mt-2.5 rounded-full bg-secondary shrink-0" />
                                 <p className="text-lg text-foreground/80 leading-relaxed">{item.replace(/^•/, '').trim()}</p>
                             </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    // Default Fallback
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
        {sections.map(renderSection)}
        
        {/* Static Contact Form Block - Always Present */}
        <section className="py-20 bg-muted/20">
           <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8 text-primary">Send us a Message</h2>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-border/50">
                        <ContactForm />
                    </div>
                </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
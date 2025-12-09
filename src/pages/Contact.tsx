import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Calendar, Linkedin, Youtube, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

interface Section {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  description?: string;
  specific_data: any;
  bg_theme: 'light' | 'dark' | 'accent';
  is_visible: boolean;
  padding_y?: string;
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

  const renderSection = (section: Section) => {
    const { section_key, title, subtitle, specific_data, bg_theme } = section;

    switch (section_key) {
      case 'hero':
        return (
          <section key={section.id} className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {title}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                {subtitle}
              </p>
            </div>
          </section>
        );

      // --- Separate Sections as migrated in DB ---
      
      case 'contact_info':
        return (
            <section key={section.id} className="py-12 bg-background">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                      <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <Mail className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{specific_data?.email_label || 'Email Us'}</h3>
                          <div className="space-y-1 mt-1">
                             {(specific_data?.emails || ['karandikar.ashutosh@gmail.com']).map((e: string, i: number) => (
                                <p key={i} className="text-muted-foreground text-sm">{e}</p>
                             ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <Phone className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{specific_data?.call_label || 'Call Us'}</h3>
                          <p className="text-muted-foreground mt-1">{specific_data?.call_val || '+91 95913 87838'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <MapPin className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{specific_data?.loc_label || 'Location'}</h3>
                          <p className="text-muted-foreground mt-1">{specific_data?.loc_val || 'Mumbai, Maharashtra, India'}</p>
                        </div>
                      </div>
                  </div>
                </div>
            </section>
        );

      case 'strategy_call':
        return (
            <section key={section.id} className="py-12 bg-secondary/5">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20 shadow-sm">
                   <div className="flex-1">
                       <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
                       <p className="text-muted-foreground">{subtitle}</p>
                   </div>
                   <div className="shrink-0">
                        <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 h-14 px-8 text-lg">
                        <a href={specific_data?.link || "https://calendly.com/consult-ashutosh/1-1-with-ashutosh"} target="_blank" rel="noopener noreferrer">
                            <Calendar className="h-5 w-5" />
                            {specific_data?.btn_text || 'Schedule via Calendly'}
                        </a>
                        </Button>
                   </div>
                </div>
            </section>
        );

      case 'contact_form':
        // Wait, did I migrate contact form separately? I didn't see an INSERT for 'contact_form' specific section in SQL 
        // BUT ui_components has it.
        // HOWEVER, it's better to just include it as a static fallback OR part of the main layout if we want it always.
        // Re-reading SQL: I did NOT insert a 'contact_form' section into sections_contact.
        // The user wants "Contact form".
        // I will add it permanently at the bottom of the contact page component code, outside the loop/switch if not in sections.
        // OR better, insert it if we want it manageable.
        return null; 

      case 'social_links':
        return (
            <section key={section.id} className="py-12 border-t border-border">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl font-bold text-primary mb-6">{title}</h3>
                    <div className="flex justify-center gap-6">
                      <a href={specific_data?.linkedin || "https://www.linkedin.com/in/ashutosh-karandikar-ccxp/"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0077b5]/10 text-[#0077b5] rounded-full hover:bg-[#0077b5]/20 transition-all font-medium">
                        <Linkedin className="h-5 w-5" />
                        LinkedIn
                      </a>
                      <a href={specific_data?.youtube || "https://www.youtube.com/@theXTPodcast"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#ff0000]/10 text-[#ff0000] rounded-full hover:bg-[#ff0000]/20 transition-all font-medium">
                        <Youtube className="h-5 w-5" />
                        YouTube
                      </a>
                    </div>
                </div>
            </section>
        );

      default:
        // Handle fallback 'main_content' if someone used the OLD migration script or default data
        if (section_key === 'main_content') {
            return (
                <div key={section.id} className="container mx-auto px-4 py-8">
                     {/* Render the monolithic block as fallback */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                     <div className="space-y-8">
                         <h2 className="text-2xl font-bold">Contact Info</h2>
                         {/* ... simplified fallback ... */}
                         <p>Please update your migration script for granular sections.</p>
                     </div>
                     <div><ContactForm /></div>
                   </div>
                </div>
            )
        }
        return null;
    }
  };

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center">
           <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* 1. Dynamic Page Builder Sections */}
      {sections.map(renderSection)}

      {/* 2. Static Contact Form (Always present on Contact Page) */}
      <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                 <h2 className="text-3xl font-bold text-center mb-8 text-primary">Send us a Message</h2>
                 <div className="bg-white p-8 rounded-2xl shadow-lg border border-border/50">
                    <ContactForm />
                 </div>
              </div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
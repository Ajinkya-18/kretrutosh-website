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

      case 'main_content':
        return (
          <section key={section.id} className="py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Contact Info & Calendly */}
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-6">{specific_data?.info_title || 'Contact Information'}</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <Mail className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{specific_data?.email_label || 'Email Us'}</h3>
                          <p className="text-muted-foreground">{specific_data?.email_val_1 || 'karandikar.ashutosh@gmail.com'}</p>
                          <p className="text-muted-foreground">{specific_data?.email_val_2 || 'consult.ashutosh@kretru.com'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <Phone className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{specific_data?.call_label || 'Call Us'}</h3>
                          <p className="text-muted-foreground">{specific_data?.call_val || '+91 95913 87838'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <MapPin className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{specific_data?.loc_label || 'Location'}</h3>
                          <p className="text-muted-foreground">{specific_data?.loc_val_1 || 'Mumbai, Maharashtra, India'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-secondary/5 border border-secondary/20 rounded-2xl">
                    <h2 className="text-2xl font-bold text-primary mb-4">{specific_data?.strategy_title || 'Book a Strategy Review'}</h2>
                    <p className="text-muted-foreground mb-6">
                      {specific_data?.strategy_desc || 'Schedule a direct 30-minute consultation...'}
                    </p>
                    <Button asChild size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                      <a href="https://calendly.com/consult-ashutosh/1-1-with-ashutosh" target="_blank" rel="noopener noreferrer">
                        <Calendar className="h-5 w-5" />
                        {specific_data?.strategy_btn || 'Schedule via Calendly'}
                      </a>
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">{specific_data?.social_title || 'Connect on Social'}</h3>
                    <div className="flex gap-4">
                      <a href="https://www.linkedin.com/in/ashutosh-karandikar-ccxp/" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted hover:bg-primary/10 rounded-full transition-colors">
                        <Linkedin className="h-6 w-6 text-[#0077b5]" />
                      </a>
                      <a href="https://www.youtube.com/@theXTPodcast" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted hover:bg-primary/10 rounded-full transition-colors">
                        <Youtube className="h-6 w-6 text-[#ff0000]" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <ContactForm />
                </div>

              </div>
            </div>
          </section>
        );

      default:
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
      {sections.map(renderSection)}
      <Footer />
    </div>
  );
};

export default Contact;
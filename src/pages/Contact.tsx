import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Zap, Mail, MapPin, Linkedin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import { useContent } from "@/hooks/useContent";

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
    const [pageConfig, setPageConfig] = useState<any>(null);
    const { getText } = useContent('contact');

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                // 1. Fetch Master Page
                const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'contact').single();
                if (pageData) setPageConfig(pageData);

                // 2. Fetch Sections
                const { data: sectionData, error } = await supabase
                    .from('sections_contact')
                    .select('*')
                    .eq('is_visible', true)
                    .neq('section_key', 'hero')
                    .order('display_order', { ascending: true });

                if (error) throw error;
                setSections(sectionData || []);
            } catch (error) {
                console.error("Error fetching contact sections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();

        // Real-time Subscriptions
        const pageChannel = supabase
            .channel('contact-page-update')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'pages', filter: "slug=eq.'contact'" }, () => fetchPage())
            .subscribe();

        const sectionsChannel = supabase
            .channel('contact-sections-update')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'sections_contact' }, () => fetchPage())
            .subscribe();

        return () => {
            supabase.removeChannel(pageChannel);
            supabase.removeChannel(sectionsChannel);
        };
    }, []);

    // Extract Info Block data if available
    const infoBlock = sections.find(s => s.section_key === 'info_block');

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
                    mediaType={pageConfig?.media_type || 'image'}
                    videoUrl={pageConfig?.hero_video_url}
                    backgroundImage={pageConfig?.hero_image_url}
                    overlayOpacity={pageConfig?.overlay_opacity}
                    title={pageConfig?.title}
                    subtitle={pageConfig?.subtitle}
                />

                <section className="py-24 bg-primary relative overflow-hidden">
                     {/* Decorative Background */}
                     <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 pointer-events-none" />
                     <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

                     <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                             
                             {/* Left Column: Contact Info & Context */}
                             <div className="space-y-12 animate-fade-in-up">
                                 <div>
                                    <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold uppercase tracking-wider mb-4 border border-secondary/20">
                                        Let's Connect
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                        Ready to Transform Your Growth Engine?
                                    </h2>
                                    <p className="text-xl text-white/70 leading-relaxed font-light">
                                        Whether you have a specific challenge or just want to explore what's possible, our team is ready to listen.
                                    </p>
                                 </div>

                                 <div className="space-y-8">
                                    {/* Dynamic Info Render or Fallback */}
                                    {infoBlock && infoBlock.content_body ? (
                                        infoBlock.content_body.split('\n').filter(l => l.trim()).map((line, idx) => {
                                            let Icon = Zap;
                                            if (line.toLowerCase().includes('email')) Icon = Mail;
                                            if (line.toLowerCase().includes('location')) Icon = MapPin;
                                            if (line.toLowerCase().includes('linkedin')) Icon = Linkedin;
                                            if (line.toLowerCase().includes('phone')) Icon = Phone;

                                            return (
                                                <div key={idx} className="flex items-start gap-6 group">
                                                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                                                        <Icon className="h-6 w-6 text-secondary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold text-white mb-1">{line.split(':')[0]}</h4>
                                                        <p className="text-white/70">{line.replace(/^[^:]+:/, '').trim()}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        // Static Fallback if DB is empty
                                        <>
                                            <div className="flex items-start gap-6 group">
                                                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                                                    <Mail className="h-6 w-6 text-secondary" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white mb-1">Email Us</h4>
                                                    <p className="text-white/70">connect@kretrutosh.com</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-6 group">
                                                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                                                     <Linkedin className="h-6 w-6 text-secondary" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white mb-1">Follow Us</h4>
                                                    <p className="text-white/70">KretruTosh Consulting</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                 </div>
                             </div>

                             {/* Right Column: The Form */}
                             <div className="lg:pl-10">
                                 <ContactForm />
                             </div>
                        </div>
                     </div>
                </section>
                
                {/* Additional Strategy Section if exists */}
                {sections.filter(s => s.section_key === 'strategy_block').map(section => (
                    <section key={section.id} className="py-24 bg-white">
                        <div className="container mx-auto px-4 text-center max-w-4xl">
                            <h2 className="text-3xl font-bold text-primary mb-12">{section.title}</h2>
                            <div className="grid md:grid-cols-2 gap-8 text-left">
                                {section.content_body?.split('\n').filter(l => l.includes('•')).map((item, idx) => (
                                     <div key={idx} className="flex gap-4 p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                                         <div className="h-2 w-2 mt-2.5 rounded-full bg-secondary shrink-0" />
                                         <p className="text-lg text-foreground/80 leading-relaxed">{item.replace(/^•/, '').trim()}</p>
                                     </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

            </main>
            <Footer />
        </div>
    );
};

export default Contact;
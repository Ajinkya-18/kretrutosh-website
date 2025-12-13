import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import RichText from "@/components/ui/RichText";

const Contact = () => {
    const [pageConfig, setPageConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                // 1. Fetch Page Config (New Table)
                const { data: pageData, error } = await supabase
                    .from('page_contact')
                    .select('*')
                    .limit(1)
                    .single();
                
                if (error && error.code !== 'PGRST116') { // Ignore 'no rows' error
                     console.error("Error fetching contact page:", error);
                }
                setPageConfig(pageData);

            } catch (error) {
                console.error("Error fetching contact page:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();

        // Real-time Subscriptions
        const pageChannel = supabase
            .channel('contact-page-update')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'page_contact' }, () => fetchPage())
            .subscribe();

        return () => {
            supabase.removeChannel(pageChannel);
        };
    }, []);

    const renderMap = (embedCode: string) => {
        if (!embedCode) return null;

        if (embedCode.trim().startsWith('<iframe')) {
            return <div dangerouslySetInnerHTML={{ __html: embedCode }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:rounded-xl [&>iframe]:shadow-lg" />;
        }
        
        // Assume it's a URL
        return (
            <iframe 
                src={embedCode} 
                className="w-full h-full rounded-xl shadow-lg border-0" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            />
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
                {/* Hero using page_contact data */}
                <Hero
                    mediaType="image"
                    title={pageConfig?.hero_title || "Let's Connect"}
                    subtitle="We are ready to listen."
                    backgroundImage={pageConfig?.hero_image_url} // If we add this column later
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
                                        Get in Touch
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                        {pageConfig?.hero_title || "Ready to Transform Your Growth Engine?"}
                                    </h2>
                                    <p className="text-xl text-white/70 leading-relaxed font-light">
                                        Whether you have a specific challenge or just want to explore what's possible, our team is ready to listen.
                                    </p>
                                 </div>

                                 {/* Dynamic Address / Contact Info Block */}
                                 <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                                     {pageConfig?.address_html ? (
                                         <div className="prose prose-lg prose-invert text-white/80 prose-headings:text-white prose-strong:text-secondary prose-a:text-secondary">
                                             <div dangerouslySetInnerHTML={{ __html: pageConfig.address_html }} />
                                         </div>
                                     ) : (
                                        // Fallback if nothing in DB
                                        <div className="text-white/70">
                                            <p>No contact details configured. Please update in Admin Panel.</p>
                                        </div>
                                     )}
                                 </div>
                                 
                                 {/* Map Section */}
                                 {pageConfig?.map_embed && (
                                     <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                         {renderMap(pageConfig.map_embed)}
                                     </div>
                                 )}

                             </div>

                             {/* Right Column: The Form */}
                             <div className="lg:pl-10">
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
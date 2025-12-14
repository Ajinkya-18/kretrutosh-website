import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Calendar, AlertCircle } from "lucide-react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";

interface PageContactConfig {
    hero_title?: string;
    hero_image_url?: string;
    address_html?: string;
    map_embed?: string;
    google_form_url?: string;
    calendly_url?: string;
    calendly_cta_text?: string;
}

const Contact = () => {
    const [pageConfig, setPageConfig] = useState<PageContactConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const { data: pageData, error: fetchError } = await supabase
                    .from('page_contact')
                    .select('*')
                    .limit(1)
                    .single();
                
                if (fetchError) {
                    if (fetchError.code !== 'PGRST116') { // Ignore 'no rows' error
                         console.error("SUPABASE ERROR [ContactPage]:", fetchError);
                         alert("Data Load Failed [ContactPage]: " + fetchError.message);
                         setError("Unable to load contact details. Please try again later.");
                    }
                } else {
                    setPageConfig(pageData);
                }

            } catch (err: any) {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchPage();

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
        
        // Robust check for iframe tag
        const isIframe = /<iframe/i.test(embedCode);
        
        if (isIframe) {
            // Render the provided iframe HTML
            // Note: Content is trusted from Admin Panel.
            return (
                <div 
                    dangerouslySetInnerHTML={{ __html: embedCode }} 
                    className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:rounded-xl [&>iframe]:shadow-lg" 
                />
            );
        }
        
        // Fallback: Assume it's a direct URL and wrap it
        return (
            <iframe 
                src={embedCode} 
                className="w-full h-full rounded-xl shadow-lg border-0" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
            />
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-primary font-sans text-white flex flex-col items-center justify-center">
                <Navbar />
                <div className="flex flex-col items-center text-center p-8 bg-white/5 rounded-2xl border border-white/10">
                    <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                    <p className="text-white/70">{error}</p>
                    <Button onClick={() => window.location.reload()} className="mt-6" variant="outline">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full !bg-[#0B1C3E] text-white" style={{ backgroundColor: '#0B1C3E' }}>
            {/* Debug Banner - Remove after verification */}
            <div className="fixed top-20 left-0 z-50 bg-red-500 text-white px-4 py-2 text-xs font-mono">
                DEBUG: CONTACT PAGE LOADED (Navy BG: #0B1C3E)
            </div>
            
            <Navbar />
            <main>
                <Hero
                    mediaType="image"
                    title={pageConfig?.hero_title}
                    subtitle="We are ready to listen."
                    backgroundImage={pageConfig?.hero_image_url} 
                />

                <section className="py-24 !bg-[#0B1C3E] relative overflow-hidden" style={{ backgroundColor: '#0B1C3E' }}>
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
                                        {pageConfig?.hero_title}
                                    </h2>
                                    <p className="text-xl text-white/70 leading-relaxed font-light">
                                        Whether you have a specific challenge or just want to explore what's possible, our team is ready to listen.
                                    </p>
                                 </div>

                                 {/* Dynamic Address / Contact Info Block */}
                                 <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                                     {pageConfig?.address_html ? (
                                         <div className="prose prose-lg prose-invert text-white/80 prose-headings:text-white prose-strong:text-secondary prose-a:text-secondary">
                                             {/* Trusted HTML from Admin Panel */}
                                             <div dangerouslySetInnerHTML={{ __html: pageConfig.address_html }} />
                                         </div>
                                     ) : (
                                        <div className="text-white/70">
                                            <p>No contact details configured. Please update in Admin Panel.</p>
                                        </div>
                                     )}
                                 </div>
                                 
                                 {/* Calendly Block */}
                                 {pageConfig?.calendly_url && (
                                     <div className="bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm border-l-4 border-l-secondary">
                                         <h3 className="text-xl font-bold text-white mb-2">Skip the inbox?</h3>
                                         <p className="text-white/70 mb-6">Book a direct strategy session with our leadership team.</p>
                                         <Button 
                                            asChild 
                                            size="lg" 
                                            className="bg-[#FF9933] text-white hover:bg-[#FF9933]/90 w-full md:w-auto shadow-md text-lg"
                                         >
                                             <a href={pageConfig.calendly_url} target="_blank" rel="noopener noreferrer">
                                                 <Calendar className="mr-2 h-5 w-5" />
                                                 {pageConfig.calendly_cta_text}
                                             </a>
                                         </Button>
                                     </div>
                                 )}

                                 {/* Map Section */}
                                 {pageConfig?.map_embed && (
                                     <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                         {renderMap(pageConfig.map_embed)}
                                     </div>
                                 )}

                             </div>

                             {/* Right Column: Google Form Iframe */}
                             <div className="lg:pl-10">
                                 <div className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[800px]">
                                     {pageConfig?.google_form_url ? (
                                         <iframe 
                                            src={pageConfig.google_form_url} 
                                            className="w-full h-[800px] border-0" 
                                            title="Contact Form"
                                            sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-presentation"
                                         >
                                             {/* Note: Inverting standard google forms usually helps in dark mode, but might look funky. 
                                                 Ideally, use a transparent Embed or Typeform. 
                                                 For now, I'll remove the invert class and just rely on the form itself, 
                                                 or wrap it in a white container if the form is strictly black text on white. 
                                                 
                                                 WAIT: User said "Contact page has white background which is camouflaging the white text".
                                                 If I make the container dark, the form (if it's a standard GForm) is WHITE. 
                                                 If the form is embedded, it has its own background.
                                                 If the user wants the PAGE to be Navy, but the form is white, that's fine.
                                                 But the user said "white background is camouflaging white text". 
                                                 That implies the TEXT is white and background is white.
                                                 
                                                 If I switch the container to `bg-white/5` (Dark), white text becomes visible.
                                                 However, if the iframe content is white, it will stand out.
                                                 Let's use bg-white/5 for the container.
                                             */}
                                             Loading...
                                         </iframe>
                                     ) : (
                                         <div className="h-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                                             <Loader2 className="h-12 w-12 animate-spin mb-4 text-secondary" />
                                             <p className="text-white/70">Loading Contact Form...</p>
                                             <p className="text-sm text-white/40 mt-2">(If this persists, please configure the Google Form URL in Admin)</p>
                                         </div>
                                     )}
                                 </div>
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

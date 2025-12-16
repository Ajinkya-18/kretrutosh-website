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
    layout_order?: string[];
    section_visibility?: Record<string, boolean>;
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
        
        const isIframe = /<iframe/i.test(embedCode);
        
        if (isIframe) {
            return (
                <div 
                    dangerouslySetInnerHTML={{ __html: embedCode }} 
                    className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:rounded-xl [&>iframe]:shadow-lg" 
                />
            );
        }
        
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

    // Render individual sections based on section key
    const renderSection = (sectionKey: string) => {
        switch (sectionKey) {
            case 'hero':
                return (
                    <Hero
                        key="hero"
                        mediaType="image"
                        title={pageConfig?.hero_title}
                        subtitle="We are ready to listen."
                        backgroundImage={pageConfig?.hero_image_url} 
                    />
                );

            case 'form':
                if (!pageConfig?.google_form_url) return null;
                return (
                    <div key="form" className="lg:pl-10">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[800px]">
                            <iframe 
                                src={pageConfig.google_form_url} 
                                className="w-full h-[800px] border-0" 
                                title="Contact Form"
                                sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-presentation"
                            >
                                Loading...
                            </iframe>
                        </div>
                    </div>
                );

            case 'calendly':
                if (!pageConfig?.calendly_url) return null;
                return (
                    <div key="calendly" className="bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm border-l-4 border-l-secondary">
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
                );

            case 'address':
                if (!pageConfig?.address_html) return null;
                return (
                    <div key="address" className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="prose prose-lg prose-invert text-white/80 prose-headings:text-white prose-strong:text-secondary prose-a:text-secondary">
                            <div dangerouslySetInnerHTML={{ __html: pageConfig.address_html }} />
                        </div>
                    </div>
                );

            case 'map':
                if (!pageConfig?.map_embed) return null;
                return (
                    <div key="map" className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        {renderMap(pageConfig.map_embed)}
                    </div>
                );

            default:
                return null;
        }
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

    // Get layout order and section visibility
    const layoutOrder = pageConfig?.layout_order || ["hero", "form", "calendly", "address", "map"];
    const sectionVisibility = pageConfig?.section_visibility || {
        hero: true,
        form: true,
        calendly: true,
        address: true,
        map: true
    };

    // Split sections into hero and content sections
    const visibleSections = layoutOrder.filter((section: string) => sectionVisibility[section]);
    const heroSection = visibleSections.find((s: string) => s === 'hero');
    const contentSections = visibleSections.filter((s: string) => s !== 'hero');

    // Split content sections into left column (address, calendly, map) and right column (form)
    const leftColumnSections = contentSections.filter((s: string) => s !== 'form');
    const formSection = contentSections.find((s: string) => s === 'form');

    return (
        <div className="min-h-screen w-full !bg-[#0B1C3E] text-white" style={{ backgroundColor: '#0B1C3E' }}>
            <Navbar />
            <main>
                {/* Hero Section */}
                {heroSection && renderSection(heroSection)}

                {/* Main Content Section */}
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

                                 {/* Render left column sections in order */}
                                 {leftColumnSections.map((sectionKey: string) => renderSection(sectionKey))}
                             </div>

                             {/* Right Column: Google Form Iframe */}
                             {formSection && renderSection(formSection)}
                        </div>
                     </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Mail, Phone, MapPin, Linkedin, Youtube, Calendar, ArrowRight } from "lucide-react";

export const ContactPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the first record (ID 1)
      const { data } = await supabase.from('page_contact').select('*').limit(1).maybeSingle();
      if (data) setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!data) return <div className="py-20 text-center">Contact information not found.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0B1C3E] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero_title || "Contact Us"}</h1>
          <p className="text-xl text-gray-300">We'd love to hear from you. Reach out today.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1C3E] mb-8">Get in Touch</h2>
              <div className="space-y-8">
                {data.email && (
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-[#0B1C3E] rounded-lg"><Mail size={24} /></div>
                        <div>
                            <h3 className="font-bold text-gray-900">Email</h3>
                            <a href={`mailto:${data.email}`} className="text-lg text-[#FF9933] hover:underline">{data.email}</a>
                        </div>
                    </div>
                )}
                
                {data.phone && (
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-[#0B1C3E] rounded-lg"><Phone size={24} /></div>
                        <div>
                            <h3 className="font-bold text-gray-900">Phone</h3>
                            <a href={`tel:${data.phone}`} className="text-lg text-gray-600 hover:text-[#0B1C3E]">{data.phone}</a>
                        </div>
                    </div>
                )}

                {data.address_html && (
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-[#0B1C3E] rounded-lg"><MapPin size={24} /></div>
                        <div>
                            <h3 className="font-bold text-gray-900">Office</h3>
                            <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: data.address_html }} />
                        </div>
                    </div>
                )}

                {/* Social Buttons */}
                <div className="pt-8 flex gap-4">
                    {data.linkedin_url && (
                        <a href={data.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-lg hover:opacity-90 transition-opacity">
                            <Linkedin size={20} /> LinkedIn
                        </a>
                    )}
                    {data.youtube_url && (
                        <a href={data.youtube_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white rounded-lg hover:opacity-90 transition-opacity">
                            <Youtube size={20} /> YouTube
                        </a>
                    )}
                </div>

                {/* Calendly CTA */}
                {data.calendly_url && (
                    <div className="mt-8 p-8 bg-gray-50 rounded-xl border border-gray-100 text-center">
                        <h3 className="text-xl font-bold text-[#0B1C3E] mb-4">Ready to transform?</h3>
                        <a href={data.calendly_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-[#FF9933] text-white font-bold rounded-lg hover:bg-[#E68A00] transition-colors w-full md:w-auto">
                            <Calendar className="mr-2 h-5 w-5" />
                            {data.calendly_cta_text || "Book a Strategy Call"}
                        </a>
                    </div>
                )}
              </div>
            </div>

            {/* Right Column: Form or Map */}
            <div className="flex flex-col gap-8">
                {/* External Form Embed (Google/Microsoft) */}
                {data.google_form_url && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-[600px]">
                        <iframe 
                            src={data.google_form_url} 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            marginHeight={0} 
                            marginWidth={0}
                        >Loading…</iframe>
                    </div>
                )}

                {/* Map Embed */}
                {data.map_embed && (
                    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 h-80">
                        <iframe 
                            src={data.map_embed} 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
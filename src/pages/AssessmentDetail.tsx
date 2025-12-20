import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NotFound from "./NotFound";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { GRID_MAP, ALIGN_MAP, THEME_MAP } from "@/lib/layoutConstants";

// QR Code Assets
import qrCx from "@/assets/qr-cx-maturity.jpg";
import qrCs from "@/assets/qr-cs-maturity.jpg";
import qrCulture from "@/assets/qr-culture-maturity.jpg";

const qrImageMap: Record<string, string> = {
  'cx-maturity-diagnostic': qrCx,
  'cs-maturity-model': qrCs,
  'culture-maturity-assessment': qrCulture,
};


interface Assessment {
  id: number;
  title: string;
  slug: string;
  description: string;
  external_link?: string;
  image_url?: string;
} 

const AssessmentDetail = () => {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);

      const { data: metaData, error: metaError } = await supabase
        .from('assessments')
        .select('*')
        .eq('slug', slug)
        .single();

      if (metaError) {
          console.error("Errors fetching assessment:", metaError);
          setAssessment(null);
          setLoading(false);
          return;
      }
      setAssessment(metaData);

      const { data: secData, error: secError } = await supabase
        .from('sections_assessment_details')
        .select('*')
        .eq('parent_slug', slug)
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
        
      if (secError) console.error("Error fetching sections:", secError);
      setSections(secData || []);
      
      setLoading(false);
    };

    fetchData();

    // Real-time subscription for sections
    const channel = supabase
      .channel(`assessment-${slug}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sections_assessment_details', filter: `parent_slug=eq.${slug}` }, () => fetchData())
      .subscribe();

    // Real-time subscription for metadata
    const metaChannel = supabase
      .channel(`assessment-meta-${slug}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assessments', filter: `slug=eq.${slug}` }, () => fetchData())
      .subscribe();
      
    return () => { 
        supabase.removeChannel(channel); 
        supabase.removeChannel(metaChannel);
    };
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0B1C3E]"><Skeleton className="h-12 w-12 rounded-full bg-white/10" /></div>;
  if (!assessment) return <NotFound />;

  const renderSection = (section: any) => {
      const gridClass = GRID_MAP[section.grid_columns] || GRID_MAP[1];
      const alignClass = ALIGN_MAP[section.alignment] || ALIGN_MAP['left'];
      const themeClass = THEME_MAP[section.bg_theme] || THEME_MAP['light'];

      return (
          <div className={`py-16 ${themeClass}`}>
              <div className="container mx-auto px-4">
                  <div className={`${gridClass} gap-8`}>
                      <div className={alignClass}>
                          {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
                          {section.content_body && <div className="prose max-w-none text-muted-foreground whitespace-pre-line">{section.content_body}</div>}
                          {section.image_url && <img src={section.image_url} alt={section.title} className="mt-6 rounded-lg shadow-lg" />}
                      </div>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-[#0B1C3E] font-sans">
      <SEO title={assessment.title} description={assessment.description} />
      <Navbar />

      <div className="pt-32 pb-20 bg-muted/30 border-b border-border/50">
          <div className="container mx-auto px-4">
             <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 pl-0 hover:bg-transparent hover:text-primary group"><ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform"/> Back to Assessments</Button>
             
             <div className="flex flex-col lg:flex-row gap-12 items-start">
                 <div className="flex-1">
                     <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">{assessment.title}</h1>
                     <p className="text-xl text-muted-foreground leading-relaxed mb-8">{assessment.description}</p>
                     
                     {assessment.external_link ? (
                         <div className="flex flex-col sm:flex-row gap-4">
                             <Button size="lg" className="bg-[#FF9933] text-white hover:bg-[#FF9933]/90 h-auto py-4 px-8 text-lg" asChild>
                                 <a href={assessment.external_link} target="_blank" rel="noopener noreferrer">
                                     Start Assessment Now <ArrowRight className="ml-2 h-5 w-5"/>
                                 </a>
                             </Button>
                         </div>
                     ) : (
                         <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 inline-block">
                             <p className="font-semibold text-primary">This assessment requires consultant access.</p>
                             <Button variant="link" className="px-0 text-secondary" asChild><Link to="/contact">Contact us to enable access</Link></Button>
                         </div>
                     )}
                 </div>

                 {/* QR Code Section - Only if we have a matching image */}
                 {(assessment.slug && qrImageMap[assessment.slug]) && (
                     <div className="hidden lg:block shrink-0">
                         <div className="text-center bg-white p-4 rounded-xl border border-border shadow-sm">
                             <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">
                               Scan to Start
                             </p>
                             <img 
                                src={qrImageMap[assessment.slug]} 
                                alt={`${assessment.title} QR Code`}
                                className="h-40 w-40 object-contain mx-auto"
                             />
                         </div>
                     </div>
                 )}
             </div>
          </div>
      </div>

      <div>
          {sections.length > 0 ? sections.map(s => <div key={s.id}>{renderSection(s)}</div>) : (
              <div className="py-20 text-center text-muted-foreground">Assessment details coming soon.</div>
          )}
      </div>

      <Footer />
    </div>
  );
};

export default AssessmentDetail;

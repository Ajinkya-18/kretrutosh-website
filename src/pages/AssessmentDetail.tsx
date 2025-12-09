import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NotFound from "./NotFound";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { GRID_MAP, ALIGN_MAP, THEME_MAP } from "@/lib/layoutConstants";

// Placeholder interfaces
interface Assessment {
  id: number;
  title: string;
  slug: string;
  description: string;
  // Add other fields as per assessments table if known. 
  // Assuming basic fields for now.
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

      // 1. Fetch Assessment Meta
      // Note: If 'assessments' table does not truly exist or has different schema, this might fail.
      // Assuming 'assessments' table matches standard pattern.
      const { data: metaData, error: metaError } = await supabase
        .from('assessments')
        .select('*')
        .eq('slug', slug)
        .single();

      if (metaError) {
          console.error("Errors fetching assessment:", metaError);
          // If 406 or Not Found, maybe handle gracefully?
          setAssessment(null);
          setLoading(false);
          return;
      }
      setAssessment(metaData);

      // 2. Fetch Sections
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

    // Real-time
    const channel = supabase
      .channel(`assessment-${slug}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sections_assessment_details', filter: `parent_slug=eq.${slug}` }, () => fetchData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Skeleton className="h-12 w-12 rounded-full" /></div>;
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
    <div className="min-h-screen bg-background font-sans">
      <SEO title={assessment.title} description={assessment.description} />
      <Navbar />

      <div className="pt-32 pb-12 bg-muted/30">
          <div className="container mx-auto px-4">
             <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 pl-0 hover:bg-transparent hover:text-primary"><ArrowLeft className="mr-2 h-4 w-4"/> Back</Button>
             <h1 className="text-4xl font-bold mb-4">{assessment.title}</h1>
             <p className="text-xl text-muted-foreground">{assessment.description}</p>
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

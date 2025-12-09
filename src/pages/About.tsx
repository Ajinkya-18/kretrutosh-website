import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Briefcase, TrendingUp, BookOpen, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import bookCover from "@/assets/book-cover.jpg";

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

const About = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data, error } = await supabase
          .from('sections_about')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSections(data || []);
      } catch (error) {
        console.error("Error fetching about sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const renderSection = (section: Section) => {
    const { section_key, title, specific_data, bg_theme } = section;
    const paddingClass = section.padding_y || 'py-20';

    switch (section_key) {
      case 'hero':
        return (
          <section key={section.id} className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {title}
                </h1>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-up">
                  {specific_data?.badge_1 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg backdrop-blur-sm border border-accent/20 transition-all hover:bg-accent/20">
                      <Award className="h-5 w-5 text-accent" />
                      <span className="text-foreground font-semibold">{specific_data.badge_1}</span>
                    </div>
                  )}
                  {specific_data?.badge_2 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg backdrop-blur-sm border border-accent/20 transition-all hover:bg-accent/20">
                      <Briefcase className="h-5 w-5 text-accent" />
                      <span className="text-foreground font-semibold">{specific_data.badge_2}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'main_stats':
        return (
          <div key={section.id} className="max-w-4xl mx-auto mb-12 px-4">
             <h2 className="text-3xl font-bold mb-6">{title}</h2>
             <div className="grid md:grid-cols-3 gap-6 mb-8">
                {specific_data?.stats?.map((stat: any, idx: number) => (
                  <Card key={idx} className="border-border/50 animate-fade-in hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                    <CardHeader>
                      <CardTitle className="text-accent flex items-center gap-2">
                        {idx === 0 || idx === 1 ? <TrendingUp className="h-6 w-6" /> : <Award className="h-6 w-6" />}
                        {stat.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        );

      case 'expertise':
        return (
          <div key={section.id} className="max-w-4xl mx-auto mb-12 px-4">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <ul className="space-y-3 mb-8">
              {specific_data?.points?.map((point: string, idx: number) => (
                <li key={idx}>✓ {point}</li>
              ))}
            </ul>
          </div>
        );

      case 'brands':
        return (
          <div key={section.id} className="max-w-4xl mx-auto mb-16 px-4">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {specific_data?.brands?.map((brand: string, idx: number) => (
                <div key={idx} className="p-3 bg-muted rounded-lg text-sm font-medium">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        );

      case 'book':
        return (
           <div key={section.id} className="max-w-4xl mx-auto px-4 mb-20">
              <div className="p-8 bg-gradient-to-br from-accent/10 to-primary/5 rounded-lg border border-accent/20">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-6 w-6 text-accent" />
                  <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1 flex justify-center">
                    <img 
                      src={bookCover} 
                      alt="Book Cover" 
                      className="rounded-lg shadow-xl w-full max-w-xs hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate("/book")}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-2xl font-bold">{specific_data?.book_title}</h4>
                    <p className="text-xl italic text-muted-foreground">
                      {specific_data?.book_sub}
                    </p>
                    <p className="text-lg">
                      {specific_data?.desc}
                    </p>
                    <div className="inline-block px-4 py-2 bg-accent/20 rounded-lg border border-accent/30 mb-4">
                      <p className="text-xl font-bold text-accent">{specific_data?.badge}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => navigate("/book")}
                      >
                        {specific_data?.cta_learn || 'Learn More'}
                        <BookOpen className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                      >
                        <a 
                          href="https://www.amazon.in/dp/B0D17W5B1B" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {specific_data?.cta_download || 'Download from Amazon'}
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
           </div>
        );

      default:
        return null; // Fallback for unknown sections
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
    <div className="min-h-screen">
      <Navbar />
      <main className="min-h-screen">
        {/* Render Sections in Order */}
        {sections.map(renderSection)}
      </main>
      <Footer />
    </div>
  );
};

export default About;
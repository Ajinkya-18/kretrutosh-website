import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";

// Updated Interface to match Supabase Table
interface CaseStudy {
  id: number;
  title: string;
  client_name: string; // Changed from 'client' to match DB
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
}

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seoData, setSeoData] = useState<{meta_title: string, meta_description: string} | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Fetch Page SEO
      const { data: pageData } = await supabase
        .from('pages')
        .select('meta_title, meta_description')
        .eq('slug', 'case-studies')
        .single();
      
      if (pageData) {
        setSeoData(pageData);
      }

      // Fetch Case Studies
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: true }); // Preserves the order from your brief

      if (error) {
        console.error("Error fetching case studies:", error);
      } else if (data) {
        setCaseStudies(data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Scroll to hash after data loads
  useEffect(() => {
    if (!isLoading && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure rendering
      }
    }
  }, [isLoading, location.hash]);

  return (
    <div className="min-h-screen">
      <SEO 
        title={seoData?.meta_title || "Impact & Case Studies"}
        description={seoData?.meta_description || "Real-world success stories demonstrating our impact on GTM Velocity, NRR, and Retention."}
      />
      <Navbar />
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Impact & Case Studies
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up">
                Real-world success stories demonstrating our impact on GTM Velocity, NRR, and Retention.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
               <div className="space-y-8">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="border border-border/50 rounded-xl overflow-hidden bg-card h-[400px] p-6 flex gap-6">
                      <div className="w-2/3 space-y-4">
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                      </div>
                      <div className="w-1/3 bg-muted/50 rounded-lg p-6 space-y-4">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                   </div>
                 ))}
               </div>
            ) : (
              <div className="space-y-8">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.id}
                    id={`case-study-${study.id}`} // Add ID for deep linking
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className="group border-border/50 overflow-hidden bg-card transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
                    >
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <CardHeader>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {study.tags?.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                              {study.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {/* Using client_name from DB */}
                              <span className="font-semibold text-foreground">{study.client_name}</span> • {study.industry}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                              <p className="text-muted-foreground">{study.challenge}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                              <p className="text-muted-foreground">{study.solution}</p>
                            </div>
                          </CardContent>
                        </div>
                        <div className="bg-muted/50 p-6 flex flex-col justify-center">
                          <h4 className="font-semibold text-foreground mb-4 text-lg">Key Results</h4>
                          <ul className="space-y-3 mb-6">
                            {study.results?.map((result, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-foreground font-medium">{result}</span>
                              </li>
                            ))}
                          </ul>
                          {study.link_url ? (
                              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                                  <a href={study.link_url} target="_blank" rel="noopener noreferrer">
                                      Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                                  </a>
                              </Button>
                          ) : (
                              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                  Read Full Story
                              </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
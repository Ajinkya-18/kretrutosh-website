import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Assessment {
  id: number;
  title: string;
  description: string;
  slug: string;
  // image_url: string | null; // Assuming this might exist, but using icon for now.
}

const Assessments = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error("Error fetching assessments:", error);
      } else if (data) {
        setAssessments(data);
      }
      setIsLoading(false);
    };

    fetchAssessments();

    const channel = supabase
      .channel('assessments-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assessments' }, () => fetchAssessments())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Static Hero for Assessments */}
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
              <span className="text-secondary font-medium text-sm tracking-wide uppercase">Self-Evaluation Tools</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Strategic <span className="text-secondary">Assessments</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Evaluate your current capabilities and identify gaps with our curated assessment frameworks.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Loading assessments...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assessments.map((assessment, index) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                    <Card className="h-full flex flex-col hover:shadow-lg transition-all border-border/50 group">
                        <CardHeader>
                            <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                                <ClipboardCheck className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl font-bold text-primary">{assessment.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <CardDescription className="text-base leading-relaxed line-clamp-3">
                                 {assessment.description}
                             </CardDescription>
                        </CardContent>
                        <CardFooter>
                             <Button 
                                variant="ghost" 
                                className="pl-0 hover:bg-transparent hover:text-secondary group-hover:translate-x-1 transition-all"
                                onClick={() => navigate(`/assessments/${assessment.slug}`)}
                             >
                                 Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                             </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
              ))}
              
              {assessments.length === 0 && (
                  <div className="col-span-full text-center py-20 bg-muted/20 rounded-xl">
                      <p className="text-muted-foreground">No assessments available at the moment.</p>
                  </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Assessments;

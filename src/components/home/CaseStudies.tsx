import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useContent } from "@/hooks/useContent";

interface CaseStudy {
  id: number;
  title: string;
  client_name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
}

const CaseStudies = () => {
  const { getText } = useContent('home');
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .limit(3) // Fetch top 3
        .order('id', { ascending: false }); // Assuming latest first

      if (data) {
        setCases(data);
      }
      setLoading(false);
    };
    fetchCases();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {getText('case_studies.title', 'Real Impact, Real Growth')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {getText('case_studies.description', "See how we've helped organizations transform their trajectory.")}
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 border-primary/20 hover:bg-primary/5">
            <Link to="/case-studies">
              {getText('case_studies.cta', 'View All Case Studies')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading case studies...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-secondary/50 h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                    {item.industry}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  {/* Display the first result as the main metric */}
                  <div className="text-2xl font-bold text-primary mb-2">
                    {item.results && item.results.length > 0 ? item.results[0] : ""}
                  </div>
                  <CardDescription className="line-clamp-3 mb-4 flex-grow">
                    {item.challenge}
                  </CardDescription>
                  <div className="mt-auto pt-4 border-t border-border/50 flex flex-wrap gap-2">
                    {item.tags && item.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;

import { ArrowRight, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useContent } from "@/hooks/useContent";
import { getIcon } from "@/utils/iconMap";

interface Framework {
  id: number;
  title: string;
  short_description: string;
  slug: string;
  icon_name: string;
  outcomes: string[];
}

const Frameworks = () => {
  const { getText } = useContent('home');
  const navigate = useNavigate();
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFrameworks = async () => {
      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .limit(10)
        .order('id', { ascending: true });
      
      if (data) {
        setFrameworks(data);
      }
      setLoading(false);
    };
    fetchFrameworks();
  }, []);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {getText('frameworks.title', 'Signature Proprietary Frameworks')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {getText('frameworks.description', 'Our battle-tested methodologies for driving predictable growth.')}
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 border-primary/20 hover:bg-primary/5">
            <Link to="/frameworks">
              {getText('frameworks.cta', 'View All Frameworks')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
           <div className="text-center py-10">Loading frameworks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {frameworks.map((fw) => {
              const Icon = getIcon(fw.icon_name);
              // Use the first outcome as the metric if available, or a default text
              const metric = fw.outcomes && fw.outcomes.length > 0 ? fw.outcomes[0] : "Proven Results";

              return (
                <div 
                  key={fw.id} 
                  className="bg-card p-6 rounded-lg border border-border/50 hover:border-secondary hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
                  onClick={() => navigate(`/frameworks/${fw.slug}`)}
                >
                  <div className="mb-3">
                    <Icon className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors text-lg leading-tight">
                    {fw.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                    {fw.short_description}
                  </p>
                  <div className="pt-3 border-t border-border/50">
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full inline-block truncate max-w-full">
                      {metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Frameworks;

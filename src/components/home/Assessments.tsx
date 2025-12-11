import { ArrowRight, BarChart, CheckCircle, Users, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useContent } from "@/hooks/useContent";

// Icon mapping
const iconMap: any = {
  BarChart,
  CheckCircle,
  Users
};

interface Assessment {
  id: string;
  title: string;
  description: string;
  slug: string; // Added slug
  icon_name: string;
  external_link: string;
}

interface AssessmentsProps {
  title?: string;
  description?: string;
  gridClass?: string;
}

const Assessments = ({ title, description, gridClass }: AssessmentsProps) => {
  const { getText } = useContent('home');
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true })
        .limit(3);

      if (data) {
        setAssessments(data);
      }
      setLoading(false);
    };
    fetchAssessments();

    const channel = supabase
      .channel('home-assessments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assessments' }, () => fetchAssessments())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!loading && assessments.length === 0) return null;

  return (
    <section id="assessments" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title || getText('assessments.title', 'Assess Your Maturity')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {description || getText('assessments.description', 'Identify gaps and opportunities with our proprietary diagnostic tools.')}
          </p>
        </div>

        <div className={`grid gap-8 ${gridClass || 'grid-cols-1 md:grid-cols-3'}`}>
          {assessments.map((item) => {
            const Icon = iconMap[item.icon_name] || HelpCircle;
            return (
              <div key={item.id} className="bg-card p-8 rounded-xl border border-border/50 hover:shadow-lg transition-all group flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-primary/5 rounded-full group-hover:bg-secondary/10 transition-colors">
                  <Icon className="h-10 w-10 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed flex-grow">
                  {item.description}
                </p>
                <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 hover:text-secondary group-hover:border-secondary/30">
                  <Link to={`/assessments/${item.slug}`}>
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Assessments;

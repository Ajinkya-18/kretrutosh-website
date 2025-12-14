import { Target, TrendingUp, Users, Zap, Heart, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Motion {
  icon: string; 
  title: string;
  description: string;
  link: string;
}

interface GrowthEngineProps {
  title?: string;
  subtitle?: string;
  gridClass?: string;
}

const GrowthEngine = ({ title, subtitle, gridClass }: GrowthEngineProps) => {
  const [motions, setMotions] = useState<Motion[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to get icon component dynamically
  const getIcon = (iconName: string) => {
    const icons: any = { 
        Target: <Target className="h-8 w-8 text-secondary" />, 
        TrendingUp: <TrendingUp className="h-8 w-8 text-secondary" />, 
        Users: <Users className="h-8 w-8 text-secondary" />, 
        Zap: <Zap className="h-8 w-8 text-secondary" />, 
        Heart: <Heart className="h-8 w-8 text-secondary" /> 
    };
    return icons[iconName] || <HelpCircle className="h-8 w-8 text-secondary" />;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('📊 GrowthEngine: Fetching services...');
        const { data, error } = await supabase
          .from('services')
          .select('slug, title, subtitle')
          .order('id', { ascending: true });

        if (error) {
          console.error('❌ SUPABASE ERROR [GrowthEngine/Services]:', error);
          alert('Data Load Failed [Services]: ' + error.message);
          throw error;
        }

        if (data && data.length > 0) {
          console.log(`✅ Fetched ${data.length} services:`, data);
          const mappedMotions: Motion[] = data.map(item => ({
            icon: 'Target',
            title: item.title,
            description: item.subtitle || '',
            link: `/services/${item.slug}`
          }));
          setMotions(mappedMotions);
        } else {
          console.warn('⚠️ No services found in database');
          alert('No services found. Please add services in Admin Panel.');
        }
      } catch (err: any) {
        console.error('❌ Unexpected error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();

    const channel = supabase
      .channel('growth-engine-updates')
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'services' }, 
        () => fetchServices()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section id="growth-engine" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {title || "One Engine. Five Motions. Infinite Growth."}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle || "Your GTM Velocity model..."}
          </p>
        </div>

        {loading ? (
             <div className="text-center py-10">Loading growth engine...</div>
        ) : (
            <div className={`grid gap-6 ${gridClass || 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'}`}>
            {motions.map((motion, index) => (
                <Link 
                key={index} 
                to={motion.link}
                className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center group block h-full"
                >
                <div className="mb-4 inline-flex p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    {getIcon(motion.icon)}
                </div>
                <h3 className="font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">{motion.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{motion.description}</p>
                </Link>
            ))}
            </div>
        )}
      </div>
    </section>
  );
};

export default GrowthEngine;

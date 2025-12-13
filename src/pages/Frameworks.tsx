import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone, Ear, BookOpen, BarChart, Scale, HeartHandshake, Thermometer, Trophy, Map, Calculator, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";

// Map string names from DB to actual Lucide components
const iconMap: Record<string, any> = {
  Megaphone, Ear, BookOpen, BarChart, Scale, HeartHandshake, Thermometer, Trophy, Map, Calculator
};

interface Framework {
  id: number;
  title: string;
  short_description: string;
  slug: string;
  icon_name: string;
  image_url: string | null;
}

const Frameworks = () => {
  const navigate = useNavigate();
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageConfig, setPageConfig] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // 1. Fetch Master Page
      const { data: pageData } = await supabase.from('pages').select('*').eq('slug', 'frameworks').single();
      if (pageData) setPageConfig(pageData);

      // 2. Fetch Frameworks
      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error("Error fetching frameworks:", error);
      } else if (data) {
        setFrameworks(data);
      }
      setIsLoading(false);
    };

    fetchData();

    // Real-time subscriptions
    const frameChannel = supabase
      .channel('frameworks-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'frameworks' }, () => fetchData())
      .subscribe();

    const pageChannel = supabase
      .channel('frameworks-page')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pages', filter: "slug=eq.'frameworks'" }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(frameChannel);
      supabase.removeChannel(pageChannel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Master Hero */}
      <Hero 
           mediaType={pageConfig?.media_type || 'image'}
           videoUrl={pageConfig?.hero_video_url}
           backgroundImage={pageConfig?.hero_image_url}
           overlayOpacity={pageConfig?.overlay_opacity}
           title={pageConfig?.title}
           subtitle={pageConfig?.subtitle}
           badge="PROPRIETARY TOOLKIT"
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Loading frameworks...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {frameworks.map((fw, index) => {
                // Dynamically pick the icon based on DB string
                const Icon = iconMap[fw.icon_name] || Layers;
                
                return (
                  <motion.div
                    key={fw.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card p-6 rounded-xl border border-border/50 hover:shadow-xl hover:border-secondary/50 transition-all group flex flex-col h-full cursor-pointer"
                    onClick={() => navigate(`/frameworks/${fw.slug}`)}
                  >
                    <div className="mb-4 p-3 bg-primary/5 rounded-lg w-fit group-hover:bg-primary/10 transition-colors">
                       {fw.image_url ? (
                        <img src={fw.image_url} alt={fw.title} className="h-8 w-8 object-contain" />
                      ) : (
                        <Icon className="h-8 w-8 text-secondary" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                      {fw.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {fw.short_description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-border/50">
                      <span className="text-sm font-medium text-primary flex items-center group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Frameworks;
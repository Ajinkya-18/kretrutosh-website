import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone, Ear, BookOpen, BarChart, Scale, HeartHandshake, Thermometer, Trophy, Map, Calculator, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

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

  useEffect(() => {
    const fetchFrameworks = async () => {
      setIsLoading(true);
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

    fetchFrameworks();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
              <span className="text-secondary font-medium text-sm tracking-wide uppercase">Proprietary Toolkit</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Signature <span className="text-secondary">Frameworks</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              We don't just consult; we equip you with battle-tested methodologies to drive predictable, scalable growth.
            </p>
          </motion.div>
        </div>
      </section>

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
                    className="bg-card p-6 rounded-xl border border-border/50 hover:shadow-lg hover:border-secondary/50 transition-all group flex flex-col h-full cursor-pointer"
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
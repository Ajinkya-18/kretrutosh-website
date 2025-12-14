import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Mic, FileText, ArrowRight, Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

interface ResourceCard {
  title: string;
  subtitle: string;
  desc: string;
  icon: JSX.Element;
  link: string;
  cta: string;
}

const Resources = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<ResourceCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        
        // Fetch latest data from each table using Promise.all
        const [bookRes, videosRes, articlesRes, whitepapersRes] = await Promise.all([
          supabase.from('book').select('*').limit(1).single(),
          supabase.from('videos').select('*').eq('category', 'podcast').limit(1).single(),
          supabase.from('articles').select('*').order('created_at', { ascending: false }).limit(1).single(),
          supabase.from('whitepapers').select('*').order('created_at', { ascending: false }).limit(1).single()
        ]);

        // Handle errors with alerts
        if (bookRes.error) {
          console.error("SUPABASE ERROR [Book]:", bookRes.error);
          alert("Data Load Failed [Book]: " + bookRes.error.message);
        }
        if (videosRes.error) {
          console.error("SUPABASE ERROR [Videos/Podcast]:", videosRes.error);
          alert("Data Load Failed [Videos/Podcast]: " + videosRes.error.message);
        }
        if (articlesRes.error) {
          console.error("SUPABASE ERROR [Articles]:", articlesRes.error);
          alert("Data Load Failed [Articles]: " + articlesRes.error.message);
        }
        if (whitepapersRes.error) {
          console.error("SUPABASE ERROR [Whitepapers]:", whitepapersRes.error);
          alert("Data Load Failed [Whitepapers]: " + whitepapersRes.error.message);
        }

        // Build dynamic resource cards
        const dynamicResources: ResourceCard[] = [];

        if (bookRes.data) {
          dynamicResources.push({
            title: bookRes.data.title,
            subtitle: bookRes.data.subtitle,
            desc: bookRes.data.description,
            icon: <BookOpen className="h-8 w-8 text-secondary" />,
            link: "/resources/book",
            cta: "Read Chapter 1"
          });
        }

        if (videosRes.data) {
          dynamicResources.push({
            title: videosRes.data.title,
            subtitle: "Experience Transformation",
            desc: videosRes.data.description,
            icon: <Mic className="h-8 w-8 text-secondary" />,
            link: "/resources/videos",
            cta: "Listen Now"
          });
        }

        if (articlesRes.data) {
          dynamicResources.push({
            title: "Articles & Insights",
            subtitle: "Thought Leadership",
            desc: "Actionable frameworks, case studies, and perspectives on the latest trends in business transformation.",
            icon: <FileText className="h-8 w-8 text-secondary" />,
            link: "/blogs",
            cta: "Read Articles"
          });
        }

        if (whitepapersRes.data) {
          dynamicResources.push({
            title: "Whitepapers",
            subtitle: "Deep Research",
            desc: "Comprehensive reports and maturity models to benchmark your organization's performance.",
            icon: <FileText className="h-8 w-8 text-secondary" />,
            link: "/resources/whitepapers",
            cta: "Download Reports"
          });
        }

        setResources(dynamicResources);
      } catch (err: any) {
        console.error("Error fetching resources:", err);
        alert("Data Load Failed [Resources Unexpected]: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();

    // Realtime listeners for all 4 tables
    const channel = supabase
      .channel('resources-hub-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'book' }, () => {
        console.log("Book updated");
        fetchResources();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, () => {
        console.log("Videos updated");
        fetchResources();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, () => {
        console.log("Articles updated");
        fetchResources();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'whitepapers' }, () => {
        console.log("Whitepapers updated");
        fetchResources();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
              <span className="text-secondary font-medium text-sm tracking-wide uppercase">Knowledge Hub</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Resources & <span className="text-secondary">Insights</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Tools, frameworks, and perspectives to fuel your growth journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl border border-border/50 hover:shadow-lg hover:border-secondary/50 transition-all group flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="bg-secondary/10 px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-secondary uppercase">{item.subtitle}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>
                
                <Button asChild variant="outline" className="w-fit border-primary/20 hover:bg-primary/5 group-hover:border-secondary/50">
                  <Link to={item.link}>
                    {item.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            ))}
            
            {resources.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground">No resources available. Please configure in Admin Panel.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;

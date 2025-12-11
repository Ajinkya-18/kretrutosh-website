import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

interface Whitepaper {
  id: number;
  title: string;
  description: string;
  cover_image_url: string | null;
  download_url: string | null; // PDF URL
  external_link: string | null; // Website URL
  type: "pdf" | "link" | null;
}

const Whitepapers = () => {
  const [whitepapers, setWhitepapers] = useState<Whitepaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWhitepapers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('whitepapers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching whitepapers:", error);
      } else if (data) {
        setWhitepapers(data);
      }
      setIsLoading(false);
    };

    fetchWhitepapers();

    const channel = supabase
      .channel('whitepapers-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'whitepapers' }, () => fetchWhitepapers())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Helper to determine the correct link
  const getResourceLink = (paper: Whitepaper) => {
    if (paper.type === 'link' && paper.external_link) {
      return paper.external_link;
    }
    return paper.download_url;
  };

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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Whitepapers & <span className="text-secondary">Guides</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Deep dives into GTM strategies, Customer Success operations, and AI enablement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : whitepapers.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>No whitepapers available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whitepapers.map((paper, index) => {
                const link = getResourceLink(paper);
                const isExternal = paper.type === 'link';

                return (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col group border-border/50 overflow-hidden bg-card transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                      {/* Cover Image Area */}
                      <div className="aspect-[4/3] bg-muted/30 relative overflow-hidden border-b border-border/50">
                        {paper.cover_image_url ? (
                          <img 
                            src={paper.cover_image_url} 
                            alt={paper.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="h-16 w-16 text-muted-foreground/30" />
                          </div>
                        )}
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          {link && (
                            <Button variant="secondary" className="pointer-events-none">
                              {isExternal ? "Visit Link" : "Download PDF"}
                            </Button>
                          )}
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                          {paper.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="flex-grow flex flex-col justify-between">
                        <CardDescription className="line-clamp-3 mb-6 text-base">
                          {paper.description}
                        </CardDescription>
                        
                        {link ? (
                          <Button 
                            asChild 
                            className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground"
                            variant="outline"
                          >
                            <a href={link} target="_blank" rel="noopener noreferrer">
                              {isExternal ? <ExternalLink className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                              {isExternal ? "Read Article" : "Download Resource"}
                            </a>
                          </Button>
                        ) : (
                          <Button disabled variant="outline" className="w-full opacity-50">
                            Coming Soon
                          </Button>
                        )}
                      </CardContent>
                    </Card>
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

export default Whitepapers;
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Video {
  id: number;
  title: string;
  description: string;
  youtube_id: string;
  date_published?: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("SUPABASE ERROR [Videos]:", error);
        alert("Data Load Failed [Videos]: " + error.message);
      } else if (data) {
        setVideos(data);
      }
      setIsLoading(false);
    };

    fetchVideos();

    const channel = supabase
      .channel('videos-list')
       .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, () => fetchVideos())
       .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                The XT Podcast
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
                Explore our collection of insights, tutorials, and success stories
              </p>
              <Button 
                size="lg"
                variant="premium"
                className="animate-scale-in"
                asChild
              >
                <a 
                  href="https://www.youtube.com/@theXTPodcast" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Youtube className="mr-2 h-5 w-5" />
                  Visit Our YouTube Channel
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                  [1, 2, 3].map((i) => (
                      <div key={i} className="border border-border/50 rounded-xl overflow-hidden bg-card p-6 space-y-4">
                          <Skeleton className="aspect-video w-full rounded-lg" />
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                      </div>
                  ))
              ) : (
                videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="group border-border/50 bg-card
                               transition-all duration-300
                               hover:shadow-elegant hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.youtube_id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <CardTitle className="text-xl">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Videos;
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Linkedin, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// --- 1. Placeholder Image (Use your local asset or this URL as backup) ---
// If you have the file locally, uncomment the line below and comment out the const string
// import defaultArticleImage from "@/assets/whitepaper-articles.jpeg";
const defaultArticleImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop";

interface Blog {
  id: number;
  created_at: string;
  title: string;
  description: string;
  link: string;
  image_url: string | null;
  publish_date: string | null;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('articles') // Changed to 'articles' table
        .select('*')
        .order('publish_date', { ascending: false });

      if (error) {
        console.error("SUPABASE ERROR [Blogs/Articles]:", error);
        alert("Data Load Failed [Blogs/Articles]: " + error.message);
      } else if (data) {
        setBlogs(data);
      }
      setIsLoading(false);
    };

    fetchBlogs();

    const channel = supabase
      .channel('blogs-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, () => fetchBlogs())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blogs & Articles
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up">
                Insights, strategies, and expert opinions on business transformation.
              </p>
              <Button 
                size="lg"
                variant="premium"
                className="animate-scale-in"
                asChild
              >
                <a 
                  href="https://www.linkedin.com/in/ashutosh-karandikar-ccxp/recent-activity/articles/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  Visit LinkedIn Library
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                 <>
                   {[1, 2, 3, 4, 5, 6].map((i) => (
                     <div key={i} className="h-full flex flex-col border border-border/50 rounded-xl overflow-hidden bg-card">
                        <Skeleton className="aspect-video w-full" />
                        <div className="p-6 space-y-4">
                           <Skeleton className="h-6 w-3/4" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-full" />
                           <div className="flex justify-between pt-4">
                              <Skeleton className="h-4 w-20" />
                              <Skeleton className="h-6 w-24 rounded-full" />
                           </div>
                        </div>
                     </div>
                   ))}
                 </>
              ) : (
                blogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <a 
                      href={blog.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group h-full"
                    >
                      <Card
                        className="h-full flex flex-col border-border/50 overflow-hidden 
                                   bg-card transition-all duration-300
                                   hover:shadow-elegant hover:-translate-y-1"
                      >
                        {/* --- FIX: ALWAYS RENDER THE IMAGE DIV --- 
                            We use the `||` operator to provide a fallback image.
                            We also add onError to handle broken links.
                        */}
                        <div className="aspect-video overflow-hidden bg-muted relative group-hover:opacity-90 transition-opacity">
                          <img
                            src={blog.image_url || defaultArticleImage}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // If the Supabase URL is broken, fallback to default
                              e.currentTarget.src = defaultArticleImage;
                            }}
                          />
                          {!blog.image_url && (
                             <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <ImageOff className="text-white/50 h-12 w-12" />
                             </div>
                          )}
                        </div>

                        <div className="flex flex-col justify-between flex-grow">
                          <CardHeader>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                              {blog.title}
                            </CardTitle>
                            <CardDescription className="text-base pt-2 line-clamp-3">
                              {blog.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex items-center justify-between mt-auto">
                            <span className="text-sm font-medium text-primary flex items-center gap-1">
                              Read Article
                              <ArrowRight className="inline-block h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {blog.publish_date && (
                              <Badge variant="secondary" className="font-normal">
                                {formatDate(blog.publish_date)}
                              </Badge>
                            )}
                          </CardContent>
                        </div>
                      </Card>
                    </a>
                  </motion.div>
                ))
              )}
            </div>
            {blogs.length === 0 && !isLoading && (
              <p className="text-center text-muted-foreground text-lg">
                No blog posts found. Check back soon!
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
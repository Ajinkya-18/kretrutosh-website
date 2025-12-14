import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, QrCode } from "lucide-react";
import bookCoverDefault from "@/assets/book-cover.jpg";
import qrBookDefault from "@/assets/qr-book.jpg";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const Book = () => {
  const [bookData, setBookData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('book')
        .select('*')
        .single();

      if (error) {
        console.error("SUPABASE ERROR [Book]:", error);
        alert("Data Load Failed [Book]: " + error.message);
      }
      
      if (data) {
        setBookData(data);
      }
      setLoading(false);
    };

    fetchBook();

    const channel = supabase
      .channel('book-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'book' }, () => fetchBook())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fallback data
  const data = bookData || {};

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {data.hero_title || 'Beyond Customer Satisfaction'}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up">
                {data.hero_subtitle || 'Crafting Exceptional Customer Experiences in the Age of "Kretru"'}
              </p>
            </div>
          </div>
        </section>

        {/* Book Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Book Cover */}
                <div className="flex justify-center animate-fade-in">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-accent to-accent-hover opacity-20 blur-xl group-hover:opacity-30 transition-all duration-300 rounded-lg" />
                    <img 
                      src={data.cover_image_url || bookCoverDefault} 
                      alt="Beyond Customer Satisfaction Book Cover" 
                      className="relative rounded-lg shadow-2xl w-full max-w-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Book Details */}
                <div className="space-y-6 animate-fade-in-up">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">
                        {data.about_title || 'About the Book'}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6 whitespace-pre-line">
                      {data.about_description || 'Dive into the world of customer experience transformation with insights from over 20 years of global consulting expertise. This book explores innovative frameworks and strategies for creating exceptional customer experiences in the modern era.'}
                    </p>
                    <div className="inline-block px-4 py-2 bg-accent/20 rounded-lg border border-accent/30 mb-6">
                      <p className="text-2xl font-bold text-accent">
                          {data.price_text || 'Now FREE on Amazon'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                        {data.cta_title || 'Get Your Copy'}
                    </h3>
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto"
                      asChild
                    >
                      <a 
                        href={data.amazon_url || "https://www.amazon.in/dp/B0D17W5B1B"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {data.cta_button_text || 'Download from Amazon'}
                        <ExternalLink className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </div>

                  {/* QR Code Section */}
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={data.qr_image_url || qrBookDefault} 
                          alt="QR Code to Amazon Book Page" 
                          className="w-32 h-32 rounded-lg border border-border"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <QrCode className="h-5 w-5 text-accent" />
                          <h4 className="font-semibold">{data.qr_title || 'Scan to Download'}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {data.qr_description || 'Scan this QR code with your mobile device to quickly access the book on Amazon'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Section */}
              <div className="mt-16 p-8 bg-muted/50 rounded-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-center">
                    {data.author_title || 'About the Author'}
                </h3>
                <p className="text-lg text-center max-w-3xl mx-auto whitespace-pre-line">
                  {data.author_bio || 'Ashutosh Karandikar brings over 20 years of global consulting and business transformation experience, having unlocked $80M+ in revenue and delivered 2-5x sales velocity improvements for leading brands worldwide.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Book;

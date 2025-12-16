import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, QrCode, Loader2, AlertCircle } from "lucide-react";
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <section className="py-24 pt-48 text-center">
            <div className="container mx-auto px-4">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Book Not Configured</h1>
              <p className="text-muted-foreground">Please configure book details in the Admin Panel.</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        {bookData.hero_title && (
          <section className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {bookData.hero_title}
                </h1>
                {bookData.hero_subtitle && (
                  <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up">
                    {bookData.hero_subtitle}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

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
                      src={bookData.cover_image_url || bookCoverDefault} 
                      alt="Book Cover" 
                      className="relative rounded-lg shadow-2xl w-full max-w-md transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.error('Book cover failed to load:', bookData.cover_image_url);
                        e.currentTarget.src = bookCoverDefault;
                      }}
                      onLoad={() => console.log('Book cover loaded:', bookData.cover_image_url)}
                    />
                  </div>
                </div>

                {/* Book Details */}
                <div className="space-y-6 animate-fade-in-up">
                  {bookData.about_title && bookData.about_description && (
                    <div>
                      <h2 className="text-3xl font-bold mb-4 text-white">
                        {bookData.about_title}
                      </h2>
                      <div 
                        className="text-lg text-gray-300 mb-6 prose prose-lg max-w-none prose-headings:text-white" 
                        dangerouslySetInnerHTML={{ __html: bookData.about_description }}
                      />
                    </div>
                  )}

                  {bookData.price_text && (
                    <div className="inline-block px-4 py-2 bg-accent/20 rounded-lg border border-accent/30 mb-6">
                      <p className="text-2xl font-bold text-accent">
                        {bookData.price_text}
                      </p>
                    </div>
                  )}

                  {bookData.amazon_url && (
                    <div className="space-y-4">
                      {bookData.cta_title && (
                        <h3 className="text-2xl font-bold text-white">
                          {bookData.cta_title}
                        </h3>
                      )}
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto"
                        asChild
                      >
                        <a 
                          href={bookData.amazon_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {bookData.cta_button_text || "Get the Book"}
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  )}

                  {/* QR Code Section */}
                  {bookData.qr_image_url && (
                    <div className="pt-6 border-t border-border">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={bookData.qr_image_url || qrBookDefault} 
                            alt="QR Code" 
                            className="w-32 h-32 rounded-lg border border-border"
                            onError={(e) => {
                              console.error('QR image failed to load:', bookData.qr_image_url);
                              e.currentTarget.src = qrBookDefault;
                            }}
                            onLoad={() => console.log('QR image loaded:', bookData.qr_image_url)}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <QrCode className="h-5 w-5 text-accent" />
                            <h4 className="font-semibold text-white">{bookData.qr_title}</h4>
                          </div>
                          {bookData.qr_description && (
                            <p className="text-sm text-gray-300">
                              {bookData.qr_description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Author Section */}
              {bookData.author_bio && (
                <div className="mt-20 p-10 md:p-12 bg-gradient-to-br from-muted/60 via-muted/40 to-background/20 rounded-2xl border border-border/50 shadow-xl backdrop-blur-sm">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="inline-block px-6 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                          {bookData.author_title || "About the Author"}
                        </h3>
                      </div>
                    </div>
                    <div 
                      className="text-lg leading-relaxed prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed [&>p]:mb-4 text-center" 
                      dangerouslySetInnerHTML={{ __html: bookData.author_bio }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Book;

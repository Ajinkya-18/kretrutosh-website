import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

export const BookPage = () => {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      // Fetches the most recently created book
      const { data } = await supabase.from('book').select('*').limit(1).maybeSingle();
      if (data) setBook(data);
      setLoading(false);
    };
    fetchBook();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading Book...</div>;
  if (!book) return <div className="py-20 text-center">No Book Found. Add one in Admin Panel.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="py-20 bg-[#0B1C3E] text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 mb-6 border border-[#FF9933]/50 rounded-full bg-[#FF9933]/10 text-[#FF9933] text-sm font-semibold tracking-wider uppercase">
                Best Seller
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{book.hero_title}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                 {book.hero_subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a 
                    href={book.amazon_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#FF9933] text-white font-bold rounded-lg hover:bg-[#E68A00] transition-colors"
                  >
                    {book.cta_button_text} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  {book.price_text && (
                      <div className="flex items-center justify-center px-6 py-4 border border-white/20 rounded-lg text-sm font-semibold">
                          {book.price_text}
                      </div>
                  )}
              </div>
           </div>
           <div className="flex-1 flex justify-center relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#FF9933]/20 blur-3xl rounded-full" />
              {book.cover_image_url && (
                  <img 
                    src={book.cover_image_url} 
                    alt={book.hero_title} 
                    className="relative z-10 w-64 md:w-80 rounded-lg shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" 
                  />
              )}
           </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-[#0B1C3E] mb-8">{book.about_title}</h2>
            <div className="prose prose-lg mx-auto text-gray-600 whitespace-pre-wrap">
                {book.about_description}
            </div>
        </div>
      </section>

      {/* AUTHOR / QR SECTION */}
      <section className="py-20 bg-gray-50">
         <div className="container mx-auto px-4">
             <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                 <div>
                     <h3 className="text-2xl font-bold text-[#0B1C3E] mb-4">{book.author_title}</h3>
                     <p className="text-gray-600 leading-relaxed mb-6">
                         {book.author_bio}
                     </p>
                 </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                     {book.qr_image_url && (
                         <img src={book.qr_image_url} alt="QR Code" className="w-48 h-48 mx-auto mb-6" />
                     )}
                     <h4 className="font-bold text-[#0B1C3E] text-lg mb-2">{book.qr_title}</h4>
                     <p className="text-sm text-gray-500">{book.qr_description}</p>
                 </div>
             </div>
         </div>
      </section>
    </div>
  );
};
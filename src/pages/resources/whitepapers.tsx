import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { FileText, Download, ArrowRight } from "lucide-react";

export const WhitepapersPage = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase.from('whitepapers').select('*').order('created_at', { ascending: false });
      if (data) setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#0B1C3E] mb-12 text-center">Whitepapers & Guides</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              {item.cover_image_url ? (
                <img src={item.cover_image_url} alt={item.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-blue-50 flex items-center justify-center text-blue-200">
                    <FileText size={64} />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold text-[#FF9933] uppercase mb-2">{item.type || 'PDF Guide'}</div>
                <h3 className="text-xl font-bold text-[#0B1C3E] mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{item.description}</p>
                
                <a 
                    href={item.download_url || item.external_link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center font-bold text-[#0B1C3E] hover:text-[#FF9933] transition-colors mt-auto"
                >
                    {item.type === 'pdf' ? 'Download PDF' : 'Read Guide'} 
                    {item.type === 'pdf' ? <Download className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
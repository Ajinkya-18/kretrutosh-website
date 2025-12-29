import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Newspaper, ArrowRight, ExternalLink } from "lucide-react";
import dayjs from "dayjs";

export const ArticlesPage = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase.from('articles').select('*').order('publish_date', { ascending: false });
      if (data) setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#0B1C3E] mb-12 text-center">Articles & Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-300">
                    <Newspaper size={48} />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow relative bg-white">
                <div className="text-sm text-gray-400 mb-3 font-medium">
                    {dayjs(item.publish_date).format('MMMM D, YYYY')}
                </div>
                <h3 className="text-xl font-bold text-[#0B1C3E] mb-3 group-hover:text-[#FF9933] transition-colors">
                    {item.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{item.description}</p>
                
                <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center font-bold text-[#0B1C3E] hover:text-[#FF9933] transition-colors mt-auto"
                >
                    Read Article <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
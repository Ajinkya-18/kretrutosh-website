import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight, Newspaper, Calendar } from 'lucide-react';
import dayjs from 'dayjs';

export const ArticlesGrid = ({ title = "Latest Articles" }: { title?: string }) => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .order('publish_date', { ascending: false })
        .limit(3); // Show latest 3
      if (data) setArticles(data);
    };
    fetchArticles();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0B1C3E] mb-12 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <div key={item.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-48 bg-gray-50 flex items-center justify-center text-gray-300">
                    <Newspaper size={48} />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow relative bg-white">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                    <Calendar size={14} />
                    {dayjs(item.publish_date).format('MMM D, YYYY')}
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
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight, Layers, Trophy, Zap, Target, BookOpen } from 'lucide-react';

const IconMap: Record<string, any> = { Trophy, Zap, Layers, Target, BookOpen };

interface Framework {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon_name: string; 
}

export const FrameworkCarousel = ({ title = "Signature Proprietary Frameworks", subtitle }: { title?: string, subtitle?: string }) => {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);

  useEffect(() => {
    const fetchFrameworks = async () => {
      // REMOVED: .eq('is_featured', true) -> Now fetches ALL frameworks (limit 10)
      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(10); 

      if (error) {
        console.error("Error fetching carousel:", error);
      } else if (data) {
        console.log("Carousel loaded:", data.length, "frameworks"); // Check console if still empty
        setFrameworks(data);
      }
    };

    fetchFrameworks();
  }, []);

  // Safety check: If no data, hide the section to avoid awkward empty space
  if (frameworks.length === 0) {
    return (
      <section className="py-12 bg-white text-center">
        <p className="text-gray-400 italic">No frameworks found. Add them in Admin Panel.</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-[#0B1C3E] mb-2">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
          </div>
          <Link to="/frameworks" className="hidden md:inline-flex items-center font-semibold text-[#FF9933] hover:text-[#E68A00]">
            View All Frameworks <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* The Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {frameworks.map((fw) => {
              const IconComponent = IconMap[fw.icon_name] || Layers;
              
              return (
                <Link 
                  key={fw.id} 
                  to={`/frameworks/${fw.slug}`}
                  // Fixed width ensures cards render even if flex container tries to shrink them
                  className="snap-center shrink-0 w-[85vw] md:w-[350px] group block p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#FF9933]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-12 w-12 bg-blue-50 text-[#0B1C3E] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1C3E] mb-3 group-hover:text-[#FF9933] transition-colors truncate">
                    {fw.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 h-[4.5em]">
                    {fw.short_description}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-[#0B1C3E] group-hover:translate-x-1 transition-transform">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Mobile "View All" Button */}
          <div className="mt-6 md:hidden text-center">
             <Link to="/frameworks" className="inline-flex items-center font-semibold text-[#FF9933]">
                View All Frameworks <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
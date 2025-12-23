import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight, Layers } from 'lucide-react';

interface Framework {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon_name: string; // We will deal with dynamic icons later
}

export const FrameworkCarousel = ({ title = "Signature Proprietary Frameworks", subtitle }: { title?: string, subtitle?: string }) => {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);

  useEffect(() => {
    const fetchFrameworks = async () => {
      // Ensure you have this table. If not, run the SQL provided previously.
      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .limit(10); 

      if (!error && data) {
        setFrameworks(data);
      }
    };

    fetchFrameworks();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#0B1C3E] mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameworks.map((fw) => (
            <Link 
              key={fw.id} 
              to={`/frameworks/${fw.slug}`}
              className="group block p-8 rounded-2xl border border-gray-100 hover:border-[#FF9933]/30 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="h-12 w-12 bg-blue-50 text-[#0B1C3E] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
                <Layers size={24} /> {/* Placeholder icon */}
              </div>
              <h3 className="text-xl font-bold text-[#0B1C3E] mb-3 group-hover:text-[#FF9933] transition-colors">
                {fw.title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {fw.short_description}
              </p>
              <div className="flex items-center text-sm font-semibold text-[#0B1C3E] group-hover:translate-x-1 transition-transform">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
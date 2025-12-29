import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient"; // Adjust path if needed
import { ArrowRight, Layers, Trophy, Zap, Target, BookOpen } from "lucide-react";

// Helper to map string icon names to Lucide components
const IconMap: Record<string, any> = { Trophy, Zap, Layers, Target, BookOpen };

interface Framework {
  id: string;
  title: string;
  short_description: string;
  slug: string;
  icon_name: string;
  outcomes: string[];
}

const FrameworksIndex = () => {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFrameworks = async () => {
      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) console.error(error);
      else setFrameworks(data || []);
      setLoading(false);
    };

    fetchFrameworks();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading frameworks...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#0B1C3E] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Proprietary Frameworks</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our battle-tested methodologies for driving predictable, scalable growth.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frameworks.map((fw) => {
              // Dynamic Icon Lookup
              const IconComponent = IconMap[fw.icon_name] || Layers;

              return (
                <Link 
                  key={fw.id} 
                  to={`/frameworks/${fw.slug}`}
                  className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#FF9933]/30 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="h-12 w-12 bg-blue-50 text-[#0B1C3E] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
                    <IconComponent size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#0B1C3E] mb-3 group-hover:text-[#FF9933] transition-colors">
                    {fw.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                    {fw.short_description}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-[#0B1C3E] group-hover:translate-x-1 transition-transform mt-auto">
                    Explore Framework <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrameworksIndex;
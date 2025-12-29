import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { ArrowRight, Rocket, BarChart2, Users, Cpu, Heart } from "lucide-react";

// Icons for your 5 programs
const IconMap: Record<string, any> = { 
  Rocket, BarChart2, Users, Cpu, Heart 
};

export const ProgramGrid = ({ title = "Transformation Programs", subtitle }: { title?: string, subtitle?: string }) => {
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await supabase
        .from('programs')
        .select('*')
        .order('display_order', { ascending: true });
      if (data) setPrograms(data);
    };
    fetchPrograms();
  }, []);

  if (programs.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#0B1C3E] mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog) => {
            const IconComponent = IconMap[prog.icon_name] || Rocket;
            return (
              <div key={prog.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-orange-50 text-[#FF9933] rounded-lg flex items-center justify-center mb-6">
                  <IconComponent size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0B1C3E] mb-3">{prog.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{prog.short_description}</p>
                {/* Note: We will need a Detail Page for programs later */}
                <Link to={`/programs/${prog.slug}`} className="inline-flex items-center font-semibold text-[#0B1C3E] hover:text-[#FF9933]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
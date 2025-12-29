import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight, Building2, ShoppingBag, Globe, Smartphone, HeartPulse, GraduationCap } from 'lucide-react';

// Map specific icons to industries (adjust keys to match your DB titles or slugs)
const IconMap: Record<string, any> = {
  'saas': Globe,
  'retail': ShoppingBag,
  'banking': Building2,
  'telecom': Smartphone,
  'healthcare': HeartPulse,
  'edtech': GraduationCap
};

export const IndustriesGrid = () => {
  const [industries, setIndustries] = useState<any[]>([]);

  useEffect(() => {
    const fetchInd = async () => {
      const { data } = await supabase.from('industries').select('*').order('display_order', { ascending: true });
      if (data) setIndustries(data);
    };
    fetchInd();
  }, []);

  if (industries.length === 0) return null;

  return (
    <section className="py-20 bg-[#0B1C3E] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {industries.map((ind) => {
            // Fallback icon logic: try to find match by slug, else default
            const Icon = IconMap[ind.slug.split('-')[0]] || Building2;
            
            return (
              <Link key={ind.id} to={`/industries/${ind.slug}`} className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF9933]/50 transition-all flex flex-col items-center text-center">
                <Icon className="w-8 h-8 text-[#FF9933] mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-lg">{ind.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
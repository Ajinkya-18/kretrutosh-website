import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight, TrendingUp } from 'lucide-react';

export const CaseStudyStrip = ({ title = "Real Impact Stories" }: { title?: string }) => {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    const fetchCases = async () => {
      const { data } = await supabase
        .from('case_studies')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(4);
      if (data) setCases(data);
    };
    fetchCases();
  }, []);

  if (cases.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* HEADER WITH VIEW ALL LINK */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <h2 className="text-3xl font-bold text-[#0B1C3E]">{title}</h2>
            
            {/* NEW LINK TO IMPACT PAGE */}
            <Link to="/impact" className="hidden md:inline-flex items-center font-bold text-[#FF9933] hover:text-[#E68A00]">
                View All Success Stories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((cs) => (
            <div key={cs.id} className="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg hover:border-[#FF9933]/30 transition-all duration-300 flex flex-col h-full">
              {/* ... existing card content ... */}
              <div className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                {cs.industry}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="text-[#FF9933] w-5 h-5" />
                    <h3 className="text-lg font-bold text-[#0B1C3E] group-hover:text-[#FF9933] transition-colors">{cs.client_name}</h3>
                </div>
                <p className="text-xl font-bold text-[#0B1C3E] mb-3 leading-tight">
                    {cs.headline_metric}
                </p>
                <p className="text-sm text-gray-600 line-clamp-3">
                    {cs.summary}
                </p>
              </div>
              {cs.link_url && (
                  <Link to={cs.link_url} className="inline-flex items-center mt-6 text-sm font-bold text-[#0B1C3E] group-hover:translate-x-1 transition-transform">
                    View Case Study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE VIEW ALL LINK */}
        <div className="mt-8 md:hidden text-center">
            <Link to="/impact" className="inline-flex items-center font-bold text-[#FF9933]">
                View All Success Stories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>

      </div>
    </section>
  );
};
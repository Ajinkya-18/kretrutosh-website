import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight } from 'lucide-react';

export const CaseStudiesGrid = ({ title = "All Success Stories" }: { title?: string }) => {
  const [cases, setCases] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [industries, setIndustries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCases = async () => {
      const { data } = await supabase
        .from('case_studies')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (data) {
        setCases(data);
        // Extract unique industries for filter buttons
        const uniqueInd = Array.from(new Set(data.map(c => c.industry).filter(Boolean)));
        setIndustries(['All', ...uniqueInd]);
      }
    };
    fetchCases();
  }, []);

  const filteredCases = filter === 'All' 
    ? cases 
    : cases.filter(c => c.industry === filter);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#0B1C3E] mb-8 text-center">{title}</h1>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setFilter(ind)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                filter === ind 
                  ? 'bg-[#0B1C3E] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((cs) => (
            <div key={cs.id} className="group bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all flex flex-col">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF9933] mb-3">
                {cs.industry}
              </div>
              <h3 className="text-xl font-bold text-[#0B1C3E] mb-2">{cs.client_name}</h3>
              <div className="text-2xl font-bold text-[#0B1C3E] mb-4 font-mono">
                {cs.headline_metric}
              </div>
              <p className="text-gray-600 mb-6 flex-grow line-clamp-4">
                {cs.summary}
              </p>
              {cs.link_url && (
                  <Link to={cs.link_url} className="inline-flex items-center text-sm font-bold text-[#0B1C3E] group-hover:translate-x-1 transition-transform mt-auto">
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
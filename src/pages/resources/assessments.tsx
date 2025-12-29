import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ClipboardCheck, ArrowRight, Activity, BarChart, Target } from "lucide-react";

// Map for icons
const IconMap: Record<string, any> = { ClipboardCheck, Activity, BarChart, Target };

export const AssessmentsPage = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from('assessments')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
      if (data) setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#0B1C3E] mb-4 text-center">Maturity Assessments</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Benchmark your organization against industry standards and identify key areas for transformation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => {
            const Icon = IconMap[item.icon_name] || ClipboardCheck;
            return (
                <div key={item.id} className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all flex flex-col">
                    <div className="w-14 h-14 bg-[#FF9933]/10 text-[#FF9933] rounded-xl flex items-center justify-center mb-6">
                        <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B1C3E] mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow">{item.description}</p>
                    
                    <a 
                        href={item.external_link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block w-full text-center py-3 px-6 bg-[#0B1C3E] text-white font-bold rounded-lg hover:bg-[#1a3a6c] transition-colors"
                    >
                        Start Assessment
                    </a>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
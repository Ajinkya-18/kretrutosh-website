import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight, CheckCircle2, Rocket, BarChart2, Users, Cpu, Heart } from 'lucide-react';

// Icon mapping to match your DB icon_name fields
const IconMap: Record<string, any> = { 
  Rocket,      // For Pre-Sales
  BarChart2,   // For Sales Velocity
  Users,       // For Customer Success
  Cpu,         // For Digital Enablement
  Heart        // For Culture
};

export const ProgramsHome = () => {
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      // Fetches the 5 programs. Assumes they are sorted by display_order 1-5
      // 1: Pre-Sales, 2: Sales, 3: CS, 4: Digital, 5: Culture
      const { data } = await supabase
        .from('programs')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(5);
        
      if (data) setPrograms(data);
    };
    fetchPrograms();
  }, []);

  // Don't render until we have data (prevents layout shift)
  if (programs.length === 0) return null;

  // Split: First 3 are "Lifecycle Pillars" (Verticals), Last 2 are "Enablers" (Horizontals)
  const verticalPrograms = programs.slice(0, 3); 
  const horizontalPrograms = programs.slice(3, 5);

  return (
    <section className="py-24 bg-gray-50" id="growth-engine">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 mb-4 border border-[#FF9933]/50 rounded-full bg-[#FF9933]/10 text-[#FF9933] text-sm font-semibold tracking-wider uppercase">
            The KretruTosh Model
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C3E] mb-6">
            One Engine. Five Motions. Infinite Growth.
          </h2>
          <p className="text-xl text-gray-600">
            Your GTM Velocity model has three lifecycle pillars and two enabling horizontals. 
            All five together create sustainable, scalable growth.
          </p>
        </div>

        {/* PART 1: THE 3 VERTICAL PILLARS (Pre-Sales -> Sales -> CS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
          {verticalPrograms.map((prog, idx) => {
             const Icon = IconMap[prog.icon_name] || Rocket;
             
             // Extract outcomes safely from the JSONB column
             const outcomes = prog.page_content?.outcomes || [];

             return (
               <div key={prog.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative h-full">
                 
                 {/* Step Number Badge */}
                 <div className="absolute -top-4 left-8 bg-[#0B1C3E] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-4 border-gray-50">
                    {idx + 1}
                 </div>
                 
                 <div className="mt-4 mb-6 text-[#FF9933]">
                    <Icon size={40} strokeWidth={1.5} />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-[#0B1C3E] mb-3">{prog.title}</h3>
                 <p className="text-gray-600 mb-8 flex-grow">{prog.short_description}</p>
                 
                 {/* Mini Outcome List (Shows top 2 outcomes) */}
                 {outcomes.length > 0 && (
                   <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <p className="text-xs font-bold uppercase text-gray-400 mb-2">Key Outcomes</p>
                      <div className="space-y-2">
                          {outcomes.slice(0, 2).map((o: string, i: number) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-[#0B1C3E] font-medium">
                                  <CheckCircle2 size={16} className="text-[#FF9933] shrink-0 mt-0.5" />
                                  <span className="leading-tight">{o}</span>
                              </div>
                          ))}
                      </div>
                   </div>
                 )}

                 <Link to={`/programs/${prog.slug}`} className="inline-flex items-center font-bold text-[#0B1C3E] hover:text-[#FF9933] transition-colors mt-auto">
                   Explore Transformation <ArrowRight className="ml-2 h-4 w-4" />
                 </Link>
               </div>
             );
          })}
        </div>

        {/* PART 2: THE 2 HORIZONTAL ENABLERS (Digital & Culture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {horizontalPrograms.map((prog) => {
              const Icon = IconMap[prog.icon_name] || Cpu;
              return (
                 <div key={prog.id} className="bg-[#0B1C3E] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden group">
                    {/* Abstract Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-white/10 transition-colors" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-lg text-[#FF9933]">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold">{prog.title}</h3>
                            </div>
                            
                            <p className="text-gray-300 text-lg mb-8 max-w-lg">
                                {prog.short_description}
                            </p>
                        </div>
                        
                        <Link to={`/programs/${prog.slug}`} className="inline-flex items-center font-bold text-[#FF9933] hover:text-white transition-colors">
                           Explore Enabler <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                 </div>
              );
           })}
        </div>

      </div>
    </section>
  );
};
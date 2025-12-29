import { ArrowUpRight } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface StatItem {
  value: string; // e.g. "+24%" or "$4.5M"
  label: string;
}

export const StatsGrid = ({ title, background = 'white', items }: { title: string, background?: 'white' | 'light' | 'navy', items: StatItem[] }) => {
  const isNavy = background === 'navy';
  // Trigger animation only when component comes into view
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className={`py-20 ${isNavy ? 'bg-[#0B1C3E] text-white' : background === 'light' ? 'bg-gray-50 text-[#0B1C3E]' : 'bg-white text-[#0B1C3E]'}`}>
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-16">{title}</h2>}
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((stat, idx) => {
            // Regex to find the number in the string (e.g., extract "24" from "+24%")
            const numberMatch = stat.value.match(/[\d\.]+/);
            const number = numberMatch ? parseFloat(numberMatch[0]) : 0;
            // Split prefix/suffix (e.g., "+" and "%")
            const parts = stat.value.split(number.toString());
            const prefix = parts[0] || '';
            const suffix = parts[1] || '';

            return (
              <div key={idx} className={`p-8 rounded-2xl border ${isNavy ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white shadow-sm'} text-center group hover:-translate-y-1 transition-transform`}>
                <div className="text-4xl md:text-5xl font-bold text-[#FF9933] mb-4 font-mono">
                  {inView ? (
                    <>
                      {prefix}
                      <CountUp start={0} end={number} duration={2.5} decimals={number % 1 !== 0 ? 1 : 0} />
                      {suffix}
                    </>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className={`text-lg font-semibold ${isNavy ? 'text-gray-300' : 'text-gray-600'} flex items-center justify-center gap-2`}>
                  {stat.label}
                  <ArrowUpRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
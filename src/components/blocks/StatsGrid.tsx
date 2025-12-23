import React from 'react';
import { StatItem } from '../../types/blocks';

export const StatsGrid = ({ title, items, background = 'white' }: { title?: string, items: StatItem[], background?: 'white'|'light'|'navy' }) => {
  const bgColors = {
    white: 'bg-white',
    light: 'bg-gray-50',
    navy: 'bg-[#0B1C3E] text-white'
  };

  return (
    <section className={`py-16 ${bgColors[background]}`}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className={`text-3xl font-bold text-center mb-12 ${background === 'navy' ? 'text-white' : 'text-[#0B1C3E]'}`}>
            {title}
          </h2>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-lg border border-transparent hover:border-[#FF9933]/20 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-[#FF9933] mb-2">
                {stat.value}
              </div>
              <div className={`text-sm md:text-base font-medium uppercase tracking-wide ${background === 'navy' ? 'text-gray-300' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
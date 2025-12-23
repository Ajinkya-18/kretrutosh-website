import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FeatureItem } from '../../types/blocks';

export const FeaturesGrid = ({ title, subtitle, items }: { title: string, subtitle?: string, items: FeatureItem[] }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold text-[#0B1C3E] mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-xl font-bold text-[#0B1C3E] mb-3 group-hover:text-[#FF9933] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {item.description}
              </p>
              {item.linkUrl && (
                <Link to={item.linkUrl} className="inline-flex items-center text-sm font-semibold text-[#0B1C3E] hover:text-[#FF9933]">
                  {item.linkText || 'Learn more'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
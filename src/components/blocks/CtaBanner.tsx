import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CtaBanner = ({ 
  title = "Ready to Build a Customer-Led Growth Engine?", 
  btnText = "Schedule a Growth Strategy Review",
  btnLink = "/contact" // New Prop
}: any) => {
  return (
    <section className="py-20 bg-[#0B1C3E] border-t border-white/10 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 max-w-2xl mx-auto">{title}</h2>
        <Link 
          to={btnLink} 
          className="inline-flex items-center px-10 py-5 bg-[#FF9933] text-white text-lg font-bold rounded-lg hover:bg-[#E68A00] transition-transform hover:-translate-y-1 shadow-lg shadow-orange-900/20"
        >
          {btnText} <ArrowRight className="ml-2 h-6 w-6" />
        </Link>
      </div>
    </section>
  );
};
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  
  // Dropdown States
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Data States
  const [programs, setPrograms] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);

  const location = useLocation();

  // 1. Fetch Data for Dropdowns
  useEffect(() => {
    const fetchData = async () => {
      // Logo
      const { data: contact } = await supabase.from('page_contact').select('logo_url').limit(1).maybeSingle();
      if (contact?.logo_url) setLogoUrl(contact.logo_url);

      // Programs (Sorted)
      const { data: progData } = await supabase.from('programs').select('title, slug').order('display_order');
      if (progData) setPrograms(progData);

      // Industries (Sorted)
      const { data: indData } = await supabase.from('industries').select('title, slug').order('display_order');
      if (indData) setIndustries(indData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  // Helper for Dropdowns
  const renderDropdown = (title: string, mainPath: string, items: any[], type: 'dynamic' | 'static' = 'dynamic') => (
    <div 
      className="relative group h-full flex items-center"
      onMouseEnter={() => setOpenDropdown(title)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <Link 
        to={mainPath}
        className="flex items-center gap-1 text-sm font-medium hover:text-[#FF9933] transition-colors py-2"
      >
        {title} <ChevronDown size={14} className={`transition-transform ${openDropdown === title ? 'rotate-180' : ''}`} />
      </Link>
      
      <div 
        className={`absolute top-full left-0 w-64 bg-white text-[#0B1C3E] rounded-xl shadow-xl py-3 mt-0 transition-all duration-200 origin-top-left border border-gray-100 ${
          openDropdown === title ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        {items.map((item) => (
          <Link 
            key={item.slug || item.path}
            to={type === 'dynamic' ? `${mainPath}/${item.slug}` : item.path}
            className="block px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#FF9933] transition-colors"
          >
            {item.title || item.name}
          </Link>
        ))}
      </div>
    </div>
  );

  const resourceLinks = [
    { name: 'Articles & Insights', path: '/resources/articles' },
    { name: 'Case Studies', path: '/impact' },
    { name: 'Whitepapers', path: '/resources/whitepapers' },
    { name: 'Assessments', path: '/resources/assessments' },
    { name: 'The Book', path: '/book' },
    { name: 'Podcast', path: '/resources/podcast' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0B1C3E] shadow-lg py-4 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-white">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            {logoUrl ? (
                <img src={logoUrl} alt="KretruTosh" className="h-10 md:h-12 w-auto object-contain" />
            ) : (
                <span className="text-2xl font-bold tracking-tight">
                    Kretru<span className="text-[#FF9933]">Tosh</span>
                </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8">
            <Link to="/about" className="text-sm font-medium hover:text-[#FF9933] transition-colors">About</Link>
            
            {/* Dynamic Dropdowns */}
            {renderDropdown('Programs', '/services', programs)}
            {renderDropdown('Industries', '/industries', industries)}
            
            <Link to="/frameworks" className="text-sm font-medium hover:text-[#FF9933] transition-colors">Frameworks</Link>
            
            {/* Static Resources Dropdown */}
            {renderDropdown('Resources', '/home', resourceLinks, 'static')}

            <Link 
              to="/contact" 
              className="px-5 py-2.5 bg-[#FF9933] text-white text-sm font-bold rounded-lg hover:bg-[#E68A00] transition-colors shadow-lg shadow-orange-900/20"
            >
              Book Strategy Call
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden p-2 z-50" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Simplified Accordion) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#0B1C3E] border-t border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col p-6 space-y-4">
            <Link to="/about" className="text-lg font-medium border-b border-white/10 pb-2">About</Link>
            
            {/* Mobile Programs */}
            <div>
                <div className="text-[#FF9933] text-xs font-bold uppercase mb-2">Programs</div>
                {programs.map(p => (
                    <Link key={p.slug} to={`/services/${p.slug}`} className="block py-2 pl-4 text-gray-300 hover:text-white border-l border-white/10">{p.title}</Link>
                ))}
            </div>

            {/* Mobile Industries */}
            <div>
                <div className="text-[#FF9933] text-xs font-bold uppercase mb-2">Industries</div>
                {industries.map(ind => (
                    <Link key={ind.slug} to={`/industries/${ind.slug}`} className="block py-2 pl-4 text-gray-300 hover:text-white border-l border-white/10">{ind.title}</Link>
                ))}
            </div>

            {/* Mobile Resources */}
            <div>
                <div className="text-[#FF9933] text-xs font-bold uppercase mb-2">Resources</div>
                {resourceLinks.map(r => (
                    <Link key={r.path} to={r.path} className="block py-2 pl-4 text-gray-300 hover:text-white border-l border-white/10">{r.name}</Link>
                ))}
            </div>

            <Link to="/contact" className="text-center w-full px-5 py-4 mt-4 bg-[#FF9933] text-white font-bold rounded-lg">
              Book Strategy Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
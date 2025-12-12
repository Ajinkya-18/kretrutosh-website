import { Link, useNavigate, useLocation } from "react-router-dom";
import { Linkedin, Mail, MapPin, Phone, Youtube, Twitter } from "lucide-react";
import logo from "@/assets/kretrutosh-logo.png";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const fetchConfig = async () => {
        const { data } = await supabase.from('config_footer').select('*').single();
        if (data) setConfig(data);
    };
    fetchConfig();
  }, []);




  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "contact" } });
    }
  };

  const handleLinkClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const footerLinks = {
    solutions: [
      { name: "Pre-Sales Transformation", path: "/services/pre-sales" },
      { name: "Sales Velocity", path: "/services/sales-velocity" },
      { name: "Customer Success", path: "/services/customer-success" },
      { name: "Digital & AI Enablement", path: "/services/digital-ai" },
      { name: "Culture Transformation", path: "/services/culture-transformation" },
    ],
    industries: [
      { name: "Retail", path: "/industries/retail" },
      { name: "E-Commerce", path: "/industries/ecommerce" },
      { name: "SaaS", path: "/industries/saas" },
      { name: "Insurance", path: "/industries/insurance" },
      { name: "BFSI", path: "/industries/bfsi" },
      { name: "Manufacturing", path: "/industries/manufacturing" },
      { name: "Healthcare", path: "/industries/healthcare" },
      { name: "EdTech", path: "/industries/edtech" },
    ],
    frameworks: [
      { name: "CX Maturity", path: "/frameworks/cx-maturity" },
      { name: "EMM", path: "/frameworks/expectation-management" },
      { name: "HAND", path: "/frameworks/hand" },
      { name: "VRM", path: "/frameworks/value-realization-map" },
      { name: "Heatmap", path: "/frameworks/lifecycle-heatmap" },
      { name: "VICTORY", path: "/frameworks/victory" },
    ],
    resources: [
      { name: "Book", path: "/resources/book" },
      { name: "Podcast", path: "/resources/podcast" },
      { name: "Assessments", path: "/assessments" },
      { name: "Whitepapers", path: "/resources/whitepapers" },
      { name: "Articles", path: "/resources/articles" },
    ],
    company: [
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  };

  // Helper for Social
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'linkedin': return <Linkedin size={20} />;
        case 'youtube': return <Youtube size={20} />;
        case 'twitter': return <Twitter size={20} />;
        case 'x': return <Twitter size={20} />;
        default: return <Linkedin size={20} />;
    }
  };

  // If DB has social_links, use them. Otherwise fallback.
  const socialLinks = config?.social_links || [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/ashutosh-karandikar-ccxp/' },
      { platform: 'youtube', url: 'https://www.youtube.com/@theXTPodcast' },
      { platform: 'twitter', url: 'https://x.com/AshutoshCK' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section: Brand & Socials & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-3" onClick={() => handleLinkClick("/")}>
                <img src={logo} alt="Kretrutosh Consulting" className="h-20 w-auto bg-white/10 p-1 rounded-md backdrop-blur-sm" />
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold leading-none">
                    <span className="text-primary-foreground">Kretrutosh</span>
                    <span className="text-secondary"> Consulting</span>
                  </h3>
                  <p className="text-sm text-primary-foreground/70 mt-2 max-w-xs">
                    {config?.brand_description || 'Transforming businesses through Customer-Led Growth.'}
                  </p>
                </div>
              </Link>
              <div className="flex gap-4">
                {socialLinks.map((link: any, idx: number) => (
                    <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-primary-foreground/5 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110"
                    >
                        {getSocialIcon(link.platform)}
                    </a>
                ))}
              </div>
              
              {/* LinkedIn Script */}
              <div className="mt-4">
                 <div dangerouslySetInnerHTML={{ __html: `
                    <script src="https://platform.linkedin.com/in.js" type="text/javascript"> lang: en_US</script>
                    <script type="IN/FollowCompany" data-id="72285978" data-counter="bottom"></script>
                 `}} />
              </div>
          </div>


        </div>

        {/* Main Grid: 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Solutions */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors" onClick={() => handleLinkClick(link.path)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Industries */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">
              Industries
            </h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors" onClick={() => handleLinkClick(link.path)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Frameworks */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">
              Frameworks
            </h4>
            <ul className="space-y-3">
              {footerLinks.frameworks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors" onClick={() => handleLinkClick(link.path)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors" onClick={() => handleLinkClick(link.path)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.name === "Contact" ? (
                    <a href="/#contact" onClick={handleContactClick} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors" onClick={() => handleLinkClick(link.path)}>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Dynamic Contact Details */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="mt-1 shrink-0 text-secondary" size={16} />
                <span>{config?.address || 'Mumbai, Maharashtra, India'}</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Phone className="shrink-0 text-secondary" size={16} />
                <a href={`tel:${config?.phone || '+919591387838'}`} className="hover:text-white transition-colors">
                  {config?.phone || '+91 95913 87838'}
                </a>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Mail className="shrink-0 text-secondary" size={16} />
                <a href={`mailto:${config?.email || 'consult.ashutosh@kretru.com'}`} className="hover:text-white transition-colors">
                  {config?.email || 'consult.ashutosh@kretru.com'}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            {config?.copyright_text ? `© ${currentYear} ${config.copyright_text}` : `© ${currentYear} KretruTosh Consulting. All rights reserved.`}
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link to="/privacy" className="hover:text-secondary transition-colors" onClick={() => handleLinkClick("/privacy")}>Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary transition-colors" onClick={() => handleLinkClick("/terms")}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
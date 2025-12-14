import { Link, useNavigate, useLocation } from "react-router-dom";
import { Linkedin, Mail, MapPin, Phone, Youtube, Twitter } from "lucide-react";
import logo from "@/assets/kretrutosh-logo.png";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  // Data State
  const [config, setConfig] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  // Making Frameworks dynamic too for consistency
  const [frameworks, setFrameworks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        // 1. Config Footer (Socials, Copyright)
        const { data: configData, error: configError } = await supabase.from('config_footer').select('*').single();
        if (configError) {
             console.error("SUPABASE ERROR [Footer Config]:", configError);
             alert("Data Load Failed [Footer Config]: " + configError.message);
        }
        if (configData) setConfig(configData);

        // 2. Page Contact (Address, Email)
        const { data: contactData, error: contactError } = await supabase.from('page_contact').select('*').single();
        if (contactError) {
             console.error("SUPABASE ERROR [Footer Contact]:", contactError);
             // Optional: Alert for contact too, or keep it to one main alert if possible, but FAIL LOUD means valid alerts.
        }
        if (contactData) setContactInfo(contactData);

        // 3. Dynamic Lists (Limit 5)
        const { data: servicesData } = await supabase.from('services').select('title, slug').limit(6).order('title');
        if (servicesData) setServices(servicesData);

        const { data: industriesData } = await supabase.from('industries').select('title, slug').limit(6).order('title');
        if (industriesData) setIndustries(industriesData);
        
        const { data: frameworksData } = await supabase.from('frameworks').select('title, slug').limit(6).order('title');
        if (frameworksData) setFrameworks(frameworksData);
    };
    fetchData();

    // 4. Realtime Listeners
    const channel = supabase.channel('footer_global_sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'config_footer' }, (payload) => {
          if (payload.new) setConfig(payload.new);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'page_contact' }, (payload) => {
          if (payload.new) setContactInfo(payload.new);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, async () => {
          const { data } = await supabase.from('services').select('title, slug').limit(6).order('title');
          if (data) setServices(data);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'industries' }, async () => {
          const { data } = await supabase.from('industries').select('title, slug').limit(6).order('title');
          if (data) setIndustries(data);
      })
       .on('postgres_changes', { event: '*', schema: 'public', table: 'frameworks' }, async () => {
          const { data } = await supabase.from('frameworks').select('title, slug').limit(6).order('title');
          if (data) setFrameworks(data);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

  // Social Links Fallback
  const socialLinks = config?.social_links || [];

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section: Brand & Socials */}
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
                    {config?.brand_description}
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

        {/* Main Grid: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Solutions (Services) */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors" onClick={() => handleLinkClick(`/services/${item.slug}`)}>
                    {item.title}
                  </Link>
                </li>
              ))}
               {services.length === 0 && <li className="text-sm text-primary-foreground/50">Loading services...</li>}
            </ul>
          </div>

          {/* Column 2: Industries */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Industries</h4>
            <ul className="space-y-3">
              {industries.map((item) => (
                <li key={item.slug}>
                  <Link to={`/industries/${item.slug}`} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors" onClick={() => handleLinkClick(`/industries/${item.slug}`)}>
                    {item.title}
                  </Link>
                </li>
              ))}
              {industries.length === 0 && <li className="text-sm text-primary-foreground/50">Loading industries...</li>}
            </ul>
          </div>

          {/* Column 3: Frameworks */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Frameworks</h4>
            <ul className="space-y-3">
              {frameworks.map((item) => (
                <li key={item.slug}>
                  <Link to={`/frameworks/${item.slug}`} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors" onClick={() => handleLinkClick(`/frameworks/${item.slug}`)}>
                    {item.title}
                  </Link>
                </li>
              ))}
              {frameworks.length === 0 && <li className="text-sm text-primary-foreground/50">Loading frameworks...</li>}
            </ul>
          </div>

          {/* Column 4: Resources (Static for now) */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Resources</h4>
            <ul className="space-y-3">
                <li><Link to="/resources/book" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Book</Link></li>
                <li><Link to="/resources/podcast" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Podcast</Link></li>
                <li><Link to="/assessments" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Assessments</Link></li>
                <li><Link to="/resources/whitepapers" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Whitepapers</Link></li>
                <li><Link to="/case-studies" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          {/* Column 5: Company & Contact (Dynamic) */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Company</h4>
            <ul className="space-y-3 mb-6">
                 <li><Link to="/about" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">About Us</Link></li>
                 <li><Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
            
            {/* Dynamic Contact Details from page_contact */}
            <div className="space-y-3">
                {/* Address: Render HTML safely with minimal styling override */}
               <div className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                 <MapPin className="mt-1 shrink-0 text-secondary" size={16} />
                 {contactInfo?.address_html ? (
                     <div 
                        className="prose prose-invert prose-sm max-w-none [&>p]:m-0 [&>p]:leading-normal" 
                        dangerouslySetInnerHTML={{ __html: contactInfo.address_html }} 
                     />
                 ) : (
                    <span>{config?.address}</span>
                 )}
               </div>

               {/* Email: Check contactInfo first, then config */}
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Mail className="shrink-0 text-secondary" size={16} />
                <a href={`mailto:${contactInfo?.email || config?.email}`} className="hover:text-white transition-colors">
                  {contactInfo?.email || config?.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            {config?.copyright_text && `© ${currentYear} ${config.copyright_text}`}
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
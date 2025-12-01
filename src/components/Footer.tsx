import { Link, useNavigate, useLocation } from "react-router-dom";
import { Linkedin, Mail, MapPin, Phone, Youtube, Loader2 } from "lucide-react";
import logo from "@/assets/kretrutosh-logo.png";
import { useContent } from "@/hooks/useContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const { getText } = useContent('global');
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
        if (error.code === '23505') {
             toast({
                title: "Already Subscribed",
                description: "This email is already on our list.",
             });
        } else {
            toast({
                title: "Error",
                description: "Could not subscribe. Please try again.",
                variant: "destructive",
            });
        }
    } else {
      toast({
        title: "Success!",
        description: "You have been subscribed to our newsletter.",
      });
      setEmail("");
    }
    setIsSubscribing(false);
  };

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
      { name: "Pre-Sales Transformation", path: "/solutions/pre-sales" },
      { name: "Sales Velocity", path: "/solutions/sales-velocity" },
      { name: "Customer Success", path: "/solutions/customer-success" },
      { name: "Digital & AI Enablement", path: "/solutions/digital-ai" },
      { name: "Culture Transformation", path: "/solutions/culture-transformation" },
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
      { name: "EAR", path: "/frameworks/ear" },
      { name: "9Ps", path: "/frameworks/9ps" },
      { name: "PPP", path: "/frameworks/ppp" },
      { name: "ROI Calculator", path: "/frameworks/cx-roi-calculator" },
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

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section: Brand & Socials & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-3" onClick={() => handleLinkClick("/")}>
                <img src={logo} alt="Kretrutosh Consulting" className="h-12 w-auto bg-white/10 p-1 rounded-md backdrop-blur-sm" />
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold leading-none">
                    <span className="text-primary-foreground">Kretrutosh</span>
                    <span className="text-secondary"> Consulting</span>
                  </h3>
                </div>
              </Link>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/ashutosh-karandikar-ccxp/" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/5 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.youtube.com/@theXTPodcast" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/5 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110">
                  <Youtube size={20} />
                </a>
              </div>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-md bg-primary-foreground/5 p-6 rounded-xl border border-primary-foreground/10">
            <h4 className="text-lg font-semibold text-secondary mb-2">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">Get the latest insights on GTM velocity and culture transformation.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-primary/50 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" variant="secondary" disabled={isSubscribing}>
                    {isSubscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
            </form>
          </div>
        </div>

        {/* Main Grid: 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Solutions */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">
              {getText('footer.col_1_title', 'Solutions')}
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
              {getText('footer.col_2_title', 'Industries')}
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
              {getText('footer.col_3_title', 'Frameworks')}
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
              {getText('footer.col_4_title', 'Resources')}
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
              {getText('footer.col_5_title', 'Company')}
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
                <span>{getText('footer.address_city', 'Mumbai, Maharashtra, India')}</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Phone className="shrink-0 text-secondary" size={16} />
                <a href="tel:+919591387838" className="hover:text-white transition-colors">
                  {getText('footer.phone', '+91 95913 87838')}
                </a>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Mail className="shrink-0 text-secondary" size={16} />
                <a href="mailto:consult.ashutosh@kretru.com" className="hover:text-white transition-colors">
                  {getText('footer.email', 'consult.ashutosh@kretru.com')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            {getText('footer.copyright', `© ${currentYear} KretruTosh Consulting. All rights reserved.`)}
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
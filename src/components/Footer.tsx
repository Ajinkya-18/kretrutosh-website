import { Link, useNavigate } from "react-router-dom";
import { Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "@/assets/kretrutosh-logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "contact" } });
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
        {/* Top Section: Brand & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <Link to="/" className="flex items-center gap-3">
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

        {/* Main Grid: 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Solutions */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Industries */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Frameworks */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Frameworks</h4>
            <ul className="space-y-3">
              {footerLinks.frameworks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-secondary">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.name === "Contact" ? (
                    <a href="/#contact" onClick={handleContactClick} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="mt-1 shrink-0 text-secondary" size={16} />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Phone className="shrink-0 text-secondary" size={16} />
                <a href="tel:+919591387838" className="hover:text-white transition-colors">+91 95913 87838</a>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Mail className="shrink-0 text-secondary" size={16} />
                <a href="mailto:consult.ashutosh@kretru.com" className="hover:text-white transition-colors">consult.ashutosh@kretru.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} KretruTosh Consulting. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
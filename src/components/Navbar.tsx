import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/kretrutosh-logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "contact" } });
    }
  };

  const navItems = [
    {
      name: "Solutions",
      path: "/solutions",
      children: [
        { name: "Pre-Sales Transformation", path: "/solutions/pre-sales" },
        { name: "Sales Velocity Acceleration", path: "/solutions/sales-velocity" },
        { name: "Customer Success & Post-Sales", path: "/solutions/customer-success" },
        { name: "Digital & AI Enablement", path: "/solutions/digital-ai" },
        { name: "Culture & Leadership", path: "/solutions/culture-transformation" },
      ],
    },
    {
      name: "Frameworks",
      path: "/frameworks",
      children: [
        { name: "CX Maturity Framework", path: "/frameworks/cx-maturity" },
        { name: "Expectation Management (EMM)", path: "/frameworks/expectation-management" },
        { name: "HAND Culture Framework", path: "/frameworks/hand" },
        { name: "Value Realization Map (VRM)", path: "/frameworks/value-realization-map" },
        { name: "Customer Lifecycle Heatmap", path: "/frameworks/lifecycle-heatmap" },
        { name: "VICTORY™ Framework", path: "/frameworks/victory" },
        { name: "9Ps Advocacy Framework", path: "/frameworks/9ps" },
        { name: "EAR™ Empathy Framework", path: "/frameworks/ear" },
        { name: "PPP Playbook", path: "/frameworks/ppp" },
        { name: "CX ROI Calculator", path: "/frameworks/cx-roi-calculator" },
      ],
    },
    {
      name: "Industries",
      path: "/industries",
      children: [
        { name: "Retail", path: "/industries/retail" },
        { name: "E-Commerce / D2C", path: "/industries/ecommerce" },
        { name: "SaaS & B2B Tech", path: "/industries/saas" },
        { name: "Insurance (Life & General)", path: "/industries/insurance" },
        { name: "Banking & Financial Services", path: "/industries/bfsi" },
        { name: "Manufacturing / Healthcare / EdTech", path: "/industries/manufacturing" },
      ],
    },
    {
      name: "Impact & Case Studies",
      path: "/case-studies",
      children: [],
    },
    {
      name: "Resources",
      path: "/resources",
      children: [
        { name: "Book", path: "/resources/book" },
        { name: "The XT Podcast", path: "/resources/podcast" },
        { name: "Assessments", path: "/assessments" },
        { name: "Whitepapers", path: "/resources/whitepapers" },
        { name: "Articles / Insights", path: "/resources/articles" },
      ],
    },
    {
      name: "About",
      path: "/about",
      children: [
        { name: "Founder", path: "/about/founder" },
        { name: "Clients & Partners (Coming Soon)", path: "/about/clients" },
      ],
    },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-border/40 py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo - Text Removed */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl md:text-2xl tracking-tight text-primary transition-transform hover:scale-[1.02] z-50"
          >
            <img src={logo} alt="KretruTosh Consulting" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.children && item.children.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">{item.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className={cn(
                            "grid gap-3 p-4",
                            item.name === "Frameworks" ? "w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2" :
                            item.name === "About" ? "w-[200px] md:w-[300px]" :
                            "w-[400px] md:w-[500px] md:grid-cols-2"
                          )}>
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.path}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{child.name}</div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link to={item.path}>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-4">
              <Button 
                asChild 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={handleContactClick}
              >
                <a href="/#contact">Book Strategy Review</a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary hover:bg-primary/5 rounded-md transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg animate-fade-in-up max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col p-4 space-y-2">
              <Link
                to="/"
                className="px-4 py-3 text-base font-medium rounded-md hover:bg-primary/5 text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {navItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="px-4 py-2 text-sm font-semibold text-primary/80 uppercase tracking-wider">
                    {item.name}
                  </div>
                  <div className="pl-4 space-y-1 border-l-2 border-primary/10 ml-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.path}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 mt-2 border-t border-border">
                <Button className="w-full bg-primary text-primary-foreground" asChild onClick={handleContactClick}>
                  <a href="/#contact">
                    Book Strategy Review
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
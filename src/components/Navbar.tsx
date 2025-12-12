import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import defaultLogo from "@/assets/kretrutosh-logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { supabase } from "@/lib/supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [items, setItems] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);

  // Default Items (Fallback)
  const defaultNavItems = [
    {
      name: "Services",
      path: "/services",
      children: [
        { name: "Pre-Sales Transformation", path: "/services/pre-sales" },
        { name: "Sales Velocity Acceleration", path: "/services/sales-velocity" },
        { name: "Customer Success & Post-Sales", path: "/services/customer-success" },
        { name: "Digital & AI Enablement", path: "/services/digital-ai" },
        { name: "Culture & Leadership", path: "/services/culture-transformation" },
      ],
    },
    // ... (Keep existing structure if DB empty)
    {
        name: "Frameworks",
        path: "/frameworks",
        children: [] // Simplified for fallback brevity, full list in DB ideal
    },
    { name: "Industries", path: "/industries", children: [] },
    { name: "Impact", path: "/case-studies", children: [] },
    { name: "About", path: "/about", children: [] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch Config
    const fetchConfig = async () => {
        const { data } = await supabase.from('config_navbar').select('*').single();
        if (data) {
            setConfig(data);
            if (data.menu_items && Array.isArray(data.menu_items)) {
                setItems(data.menu_items);
            } else {
                setItems(defaultNavItems);
            }
        } else {
            setItems(defaultNavItems);
        }
    };
    fetchConfig();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = items.length > 0 ? items : defaultNavItems;

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
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl md:text-2xl tracking-tight text-primary transition-transform hover:scale-[1.02] z-50"
            onClick={() => handleLinkClick("/")}
          >
            <img src={config?.logo_url || defaultLogo} alt="KretruTosh Consulting" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" onClick={() => handleLinkClick("/")}>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                {navItems.map((item: any) => (
                  <NavigationMenuItem key={item.name}>
                    {item.children && item.children.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">{item.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className={cn(
                            "grid gap-3 p-4 w-[400px] md:w-[500px]",
                            item.children.length > 5 ? "md:grid-cols-2" : ""
                          )}>
                            {item.children.map((child: any) => (
                              <li key={child.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.path}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    onClick={() => handleLinkClick(child.path)}
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
                      <Link to={item.path} onClick={() => handleLinkClick(item.path)}>
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
              >
                <Link to={config?.cta_link || "/contact"}>{config?.cta_text || 'Schedule a Consultation'}</Link>
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
                onClick={() => handleLinkClick("/")}
              >
                Home
              </Link>
              
              {navItems.map((item: any) => (
                <div key={item.name} className="space-y-1">
                  <div className="px-4 py-2 text-sm font-semibold text-primary/80 uppercase tracking-wider">
                    {item.name}
                  </div>
                  <div className="pl-4 space-y-1 border-l-2 border-primary/10 ml-4">
                    {item.children && item.children.length > 0 ? (
                      item.children.map((child: any) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                          onClick={() => handleLinkClick(child.path)}
                        >
                          {child.name}
                        </Link>
                      ))
                    ) : (
                      <Link
                        to={item.path}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                        onClick={() => handleLinkClick(item.path)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-4 mt-2 border-t border-border">
                <Button className="w-full bg-primary text-primary-foreground" asChild>
                  <Link to={config?.cta_link || "/contact"}>
                    {config?.cta_text || 'Schedule a Consultation'}
                  </Link>
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

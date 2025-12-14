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
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { supabase } from "@/lib/supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [config, setConfig] = useState<any>(null);
  
  // Dynamic Data State
  const [services, setServices] = useState<any[]>([]);
  const [frameworks, setFrameworks] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const fetchData = async () => {
        // 1. Fetch Config
        const { data: configData } = await supabase.from('config_navbar').select('*').single();
        if (configData) setConfig(configData);

        // 2. Fetch Aggregates
        const { data: servicesData, error: servicesError } = await supabase.from('services').select('id, title, slug').order('title');
        if (servicesError) console.error("Navbar Services Error:", servicesError);
        if (servicesData) {
            console.log("Navbar Services Data:", servicesData); // Debug log
            setServices(servicesData);
        }

        const { data: frameworksData, error: frameworksError } = await supabase.from('frameworks').select('id, title, slug').order('title');
        if (frameworksError) console.error("Navbar Frameworks Error:", frameworksError);
        if (frameworksData) setFrameworks(frameworksData);

        const { data: industriesData } = await supabase.from('industries').select('id, title, slug').order('title');
        if (industriesData) setIndustries(industriesData);
    };
    fetchData();

    // 3. Realtime Listeners
    const channel = supabase.channel('navbar_global_sync')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'config_navbar' }, (payload) => {
            if (payload.new) setConfig(payload.new);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, async () => {
             const { data } = await supabase.from('services').select('id, title, slug').order('title');
             if (data) setServices(data);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'frameworks' }, async () => {
             const { data } = await supabase.from('frameworks').select('id, title, slug').order('title');
             if (data) setFrameworks(data);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'industries' }, async () => {
             const { data } = await supabase.from('industries').select('id, title, slug').order('title');
             if (data) setIndustries(data);
        })
        .subscribe();
    
    return () => { 
        window.removeEventListener("scroll", handleScroll);
        supabase.removeChannel(channel);    
    };
  }, []);

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
                {/* Home */}
                <NavigationMenuItem>
                  <Link to="/" onClick={() => handleLinkClick("/")}>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                {/* Services (Dynamic) */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className={cn("grid gap-3 p-4 w-[400px] md:w-[500px]", services.length > 5 ? "md:grid-cols-2" : "")}>
                            {services.map((item) => (
                                <li key={item.id}>
                                <NavigationMenuLink asChild>
                                    <Link
                                    to={`/services/${item.slug}`}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    onClick={() => handleLinkClick(`/services/${item.slug}`)}
                                    >
                                    <div className="text-sm font-medium leading-none">{item.title}</div>
                                    </Link>
                                </NavigationMenuLink>
                                </li>
                            ))}
                            {services.length === 0 && <li className="text-sm text-muted-foreground p-2">No services found.</li>}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Industries (Dynamic) */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">Industries</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className={cn("grid gap-3 p-4 w-[400px] md:w-[500px]", industries.length > 5 ? "md:grid-cols-2" : "")}>
                            {industries.map((item) => (
                                <li key={item.id}>
                                <NavigationMenuLink asChild>
                                    <Link
                                    to={`/industries/${item.slug}`}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    onClick={() => handleLinkClick(`/industries/${item.slug}`)}
                                    >
                                    <div className="text-sm font-medium leading-none">{item.title}</div>
                                    </Link>
                                </NavigationMenuLink>
                                </li>
                            ))}
                            {industries.length === 0 && <li className="text-sm text-muted-foreground p-2">No industries found.</li>}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Frameworks (Dynamic) */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">Frameworks</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className={cn("grid gap-3 p-4 w-[400px]", frameworks.length > 5 ? "md:grid-cols-2" : "")}>
                            {frameworks.map((item) => (
                                <li key={item.id}>
                                <NavigationMenuLink asChild>
                                    <Link
                                    to={`/frameworks/${item.slug}`}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    onClick={() => handleLinkClick(`/frameworks/${item.slug}`)}
                                    >
                                    <div className="text-sm font-medium leading-none">{item.title}</div>
                                    </Link>
                                </NavigationMenuLink>
                                </li>
                            ))}
                           {frameworks.length === 0 && <li className="text-sm text-muted-foreground p-2">No frameworks found.</li>}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Impact (Case Studies) */}
                <NavigationMenuItem>
                   <Link to="/case-studies" onClick={() => handleLinkClick("/case-studies")}>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                      Impact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* About (Static) */}
                <NavigationMenuItem>
                   <Link to="/about" onClick={() => handleLinkClick("/about")}>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
              <NavigationMenuViewport className="left-0" />
            </NavigationMenu>

            <div className="ml-4">
              <Button 
                asChild 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
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
              
              {/* Dynamic Sections Mobile */}
              {[
                { name: 'Services', items: services, pathPrefix: '/services' },
                { name: 'Industries', items: industries, pathPrefix: '/industries' },
                { name: 'Frameworks', items: frameworks, pathPrefix: '/frameworks' }
              ].map((section) => (
                 <div key={section.name} className="space-y-1">
                  <div className="px-4 py-2 text-sm font-semibold text-primary/80 uppercase tracking-wider">
                    {section.name}
                  </div>
                  <div className="pl-4 space-y-1 border-l-2 border-primary/10 ml-4">
                     {section.items.length > 0 ? section.items.map((item) => (
                        <Link
                          key={item.id}
                          to={`${section.pathPrefix}/${item.slug}`}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                          onClick={() => handleLinkClick(`${section.pathPrefix}/${item.slug}`)}
                        >
                          {item.title}
                        </Link>
                     )) : (
                        <div className="px-4 py-2 text-sm text-muted-foreground">None available</div>
                     )}
                  </div>
                </div>
              ))}

              <Link
                to="/case-studies"
                className="px-4 py-3 text-base font-medium rounded-md hover:bg-primary/5 text-muted-foreground hover:text-primary"
                onClick={() => handleLinkClick("/case-studies")}
              >
                Impact
              </Link>
               <Link
                to="/about"
                className="px-4 py-3 text-base font-medium rounded-md hover:bg-primary/5 text-muted-foreground hover:text-primary"
                onClick={() => handleLinkClick("/about")}
              >
                About
              </Link>

              <div className="pt-4 mt-2 border-t border-border">
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg" asChild>
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

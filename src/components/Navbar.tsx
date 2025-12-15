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

// Data source mapping for dropdown menus
const DATA_SOURCE_MAP: Record<string, { table: string; fields: string }> = {
  services: { table: "services", fields: "title, slug" },
  frameworks: { table: "frameworks", fields: "title, slug" },
  industries: { table: "industries", fields: "title, slug" },
  assessments: { table: "assessments", fields: "title, slug" },
  blogs: { table: "articles", fields: "title, id" }, // articles table uses id, not slug
  "case-studies": { table: "case_studies", fields: "title, id" }, // case_studies uses id, not slug
  videos: { table: "videos", fields: "title, id" }, // videos/podcasts
  whitepapers: { table: "whitepapers", fields: "title, id" }, // whitepapers
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [config, setConfig] = useState<any>(null);
  
  // Store dynamic data for each dropdown
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const fetchData = async () => {
        // Fetch navbar config
        const { data: configData, error: configError } = await supabase
          .from('config_navbar')
          .select('*')
          .single();
        
        if (configError) {
          console.error("SUPABASE ERROR [Navbar Config]:", configError);
          alert("Data Load Failed [Navbar Config]: " + configError.message);
        }
        
        if (configData) {
          setConfig(configData);
          
          // Parse menu_items and fetch data for dropdowns
          const menuItems = configData.menu_items || [];
          const dataPromises: Promise<void>[] = [];
          
          menuItems.forEach((item: any) => {
            // Check if item has explicit dataSource
            let dataSource = item.dataSource || item.data_source;
            
            // If no explicit dataSource, infer from item name
            if (!dataSource && item.name) {
              const itemNameLower = item.name.toLowerCase();
              if (itemNameLower.includes('service')) dataSource = 'services';
              else if (itemNameLower.includes('framework')) dataSource = 'frameworks';
              else if (itemNameLower.includes('industr')) dataSource = 'industries';
              else if (itemNameLower.includes('blog') || itemNameLower.includes('article')) dataSource = 'blogs';
              else if (itemNameLower.includes('assessment')) dataSource = 'assessments';
              else if (itemNameLower.includes('case') || itemNameLower.includes('impact')) dataSource = 'case-studies';
              else if (itemNameLower.includes('podcast') || itemNameLower.includes('video')) dataSource = 'videos';
              else if (itemNameLower.includes('whitepaper')) dataSource = 'whitepapers';
            }
            
            if (dataSource && DATA_SOURCE_MAP[dataSource]) {
              const { table, fields } = DATA_SOURCE_MAP[dataSource];
              const promise = (async () => {
                console.log(`📊 Fetching ${dataSource} from table: ${table}`);
                const { data, error } = await supabase
                  .from(table)
                  .select(fields)
                  .order('title');
                  
                if (error) {
                  console.error(`❌ Error fetching ${dataSource} from ${table}:`, error);
                  alert(`Data Load Failed [${dataSource}]: ${error.message}`);
                } else if (data) {
                  console.log(`✅ Fetched ${data.length} items for ${dataSource}:`, data);
                  setDropdownData(prev => ({ ...prev, [dataSource]: data }));
                } else {
                  console.warn(`⚠️ No data returned for ${dataSource} from ${table}`);
                }
              })();
              dataPromises.push(promise);
            }
          });
          
          await Promise.all(dataPromises);
          
          // Wait a tick for state updates to complete, then log final state
          setTimeout(() => {
            console.log("📋 NAVBAR DATA FETCHED (Final State):", dropdownData);
          }, 100);
        }
    };
    
    fetchData();

    // Realtime listeners for config and dynamic data
    const channel = supabase.channel('navbar_realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'config_navbar' }, () => {
            fetchData();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, async () => {
            const { data } = await supabase.from('services').select('title, slug').order('title');
            if (data) setDropdownData(prev => ({ ...prev, services: data }));
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'frameworks' }, async () => {
            const { data } = await supabase.from('frameworks').select('title, slug').order('title');
            if (data) setDropdownData(prev => ({ ...prev, frameworks: data }));
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'industries' }, async () => {
            const { data } = await supabase.from('industries').select('title, slug').order('title');
            if (data) setDropdownData(prev => ({ ...prev, industries: data }));
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, async () => {
            const { data } = await supabase.from('blogs').select('title, slug').order('title');
            if (data) setDropdownData(prev => ({ ...prev, blogs: data }));
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'assessments' }, async () => {
            const { data } = await supabase.from('assessments').select('title, slug').order('title');
            if (data) setDropdownData(prev => ({ ...prev, assessments: data }));
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, async () => {
            const { data } = await supabase.from('videos').select('title, id').order('title');
            if (data) setDropdownData(prev => ({ ...prev, videos: data }));
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'whitepapers' }, async () => {
            const { data } = await supabase.from('whitepapers').select('title, id').order('title');
            if (data) setDropdownData(prev => ({ ...prev, whitepapers: data }));
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

  // Render a dropdown menu item
  const renderDropdown = (item: any) => {
    // Infer dataSource if not explicitly set
    let dataSource = item.dataSource || item.data_source;
    if (!dataSource && item.name) {
      const itemNameLower = item.name.toLowerCase();
      if (itemNameLower.includes('service')) dataSource = 'services';
      else if (itemNameLower.includes('framework')) dataSource = 'frameworks';
      else if (itemNameLower.includes('industr')) dataSource = 'industries';
      else if (itemNameLower.includes('blog') || itemNameLower.includes('leadership') || itemNameLower.includes('article')) dataSource = 'blogs';
      else if (itemNameLower.includes('assessment')) dataSource = 'assessments';
      else if (itemNameLower.includes('case') || itemNameLower.includes('impact')) dataSource = 'case-studies';
    }
    
    // PREFER fetched data over hardcoded children for dynamic sources
    const items = (dataSource && dropdownData[dataSource]?.length > 0)
      ? dropdownData[dataSource]
      : (item.children || []);
    
    // Debug log for desktop rendering
    console.log(`🎨 Rendering dropdown for "${item.name}":`, {
      dataSource,
      fetchedCount: dropdownData[dataSource]?.length || 0,
      childrenCount: item.children?.length || 0,
      finalItemsCount: items.length,
      items: items
    });
    
    // Determine base path for dropdown items
    let basePath = "";
    if (dataSource === "services") basePath = "/services";
    else if (dataSource === "frameworks") basePath = "/frameworks";
    else if (dataSource === "industries") basePath = "/industries";
    else if (dataSource === "blogs") basePath = "/resources/blog";
    else if (dataSource === "assessments") basePath = "/assessments";
    else if (dataSource === "case-studies") basePath = "/case-studies";
    else if (dataSource === "videos") basePath = "/resources/videos";
    else if (dataSource === "whitepapers") basePath = "/resources/whitepapers";
    
    return (
      <NavigationMenuItem key={item.name || item.label}>
        <NavigationMenuTrigger className="bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          {item.name || item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="z-50 bg-white border border-border shadow-xl">
          <ul className={cn("grid gap-3 p-4 w-[400px] md:w-[500px]", items.length > 5 ? "md:grid-cols-2" : "")}>
            {items.map((child: any) => (
              <li key={child.slug || child.id || child.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={child.path || `${basePath}/${child.slug || child.id}`}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    onClick={() => handleLinkClick(child.path || `${basePath}/${child.slug || child.id}`)}
                  >
                    <div className="text-sm font-medium leading-none">{child.name || child.title}</div>
                    {child.description && (
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {child.description}
                      </p>
                    )}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
            {items.length === 0 && (
              <li className="text-sm text-red-500 p-2 font-mono border border-red-500">
                NULL: No {dataSource || 'items'} available (Check console for errors)
              </li>
            )}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  };

  // Render a simple link menu item
  const renderLink = (item: any) => {
    return (
      <NavigationMenuItem key={item.name || item.label}>
        <Link to={item.path} onClick={() => handleLinkClick(item.path)}>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
            {item.name || item.label}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  };

  // Render mobile menu section
  const renderMobileSection = (item: any) => {
    // Infer dataSource if not explicitly set
    let dataSource = item.dataSource || item.data_source;
    if (!dataSource && item.name) {
      const itemNameLower = item.name.toLowerCase();
      if (itemNameLower.includes('service')) dataSource = 'services';
      else if (itemNameLower.includes('framework')) dataSource = 'frameworks';
      else if (itemNameLower.includes('industr')) dataSource = 'industries';
      else if (itemNameLower.includes('blog') || itemNameLower.includes('article')) dataSource = 'blogs';
      else if (itemNameLower.includes('assessment')) dataSource = 'assessments';
      else if (itemNameLower.includes('case') || itemNameLower.includes('impact')) dataSource = 'case-studies';
      else if (itemNameLower.includes('podcast') || itemNameLower.includes('video')) dataSource = 'videos';
      else if (itemNameLower.includes('whitepaper')) dataSource = 'whitepapers';
    }
    
    // PREFER fetched data over hardcoded children for dynamic sources
    const items = (dataSource && dropdownData[dataSource]?.length > 0)
      ? dropdownData[dataSource]
      : (item.children || []);
    
    // Determine base path
    let basePath = "";
    if (dataSource === "services") basePath = "/services";
    else if (dataSource === "frameworks") basePath = "/frameworks";
    else if (dataSource === "industries") basePath = "/industries";
    else if (dataSource === "blogs") basePath = "/resources/blog";
    else if (dataSource === "assessments") basePath = "/assessments";
    else if (dataSource === "case-studies") basePath = "/case-studies";
    else if (dataSource === "videos") basePath = "/resources/videos";
    else if (dataSource === "whitepapers") basePath = "/resources/whitepapers";
    
    if (items.length > 0) {
      return (
        <div key={item.name || item.label} className="space-y-1">
          <div className="px-4 py-2 text-sm font-semibold text-primary/80 uppercase tracking-wider">
            {item.name || item.label}
          </div>
          <div className="pl-4 space-y-1 border-l-2 border-primary/10 ml-4">
            {items.map((child: any) => (
              <Link
                key={child.slug || child.id || child.path}
                to={child.path || `${basePath}/${child.slug || child.id}`}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                onClick={() => handleLinkClick(child.path || `${basePath}/${child.slug || child.id}`)}
              >
                {child.name || child.title}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const menuItems = config?.menu_items || [];

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
            {config?.logo_url ? (
              <img src={config.logo_url} alt="KretruTosh Consulting" className="h-16 w-auto" />
            ) : (
              <span className="text-red-500 font-mono text-sm border border-red-500 p-1">NULL: LOGO</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item: any) => {
                  const hasChildren = item.children?.length > 0 || item.dataSource || item.data_source;
                  
                  if (hasChildren) {
                    return renderDropdown(item);
                  } else {
                    return renderLink(item);
                  }
                })}
              </NavigationMenuList>
              <NavigationMenuViewport className="left-0" />
            </NavigationMenu>

            <div className="ml-4">
              <Button 
                asChild 
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Link to={config?.cta_link || "#"}>
                    {config?.cta_text || <span className="text-red-900 font-bold bg-white px-2">NULL: CTA TEXT</span>}
                </Link>
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
              {menuItems.map((item: any) => {
                const hasChildren = item.children?.length > 0 || item.dataSource || item.data_source;
                
                if (hasChildren) {
                  return renderMobileSection(item);
                } else {
                  return (
                    <Link
                      key={item.name || item.label}
                      to={item.path}
                      className="px-4 py-3 text-base font-medium rounded-md hover:bg-primary/5 text-muted-foreground hover:text-primary"
                      onClick={() => handleLinkClick(item.path)}
                    >
                      {item.name || item.label}
                    </Link>
                  );
                }
              })}

              <div className="pt-4 mt-2 border-t border-border">
                <Button className="w-full bg-[#FF9933] text-white hover:bg-[#FF9933]/90 shadow-lg" asChild>
                  <Link to={config?.cta_link || "#"}>
                    {config?.cta_text || 'NULL: CTA TEXT'}
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

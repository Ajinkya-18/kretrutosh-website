import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Building2, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface ClientLogo {
  id: number;
  client_name: string;
  logo_url: string;
}

const ClientLogos = () => {
  const [clients, setClients] = useState<ClientLogo[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error("Error fetching logos:", error);
      } else if (data) {
        setClients(data);
      }
    };

    fetchLogos();
  }, []);

  // Helper to render either Image or Text Fallback
  const renderLogo = (client: ClientLogo) => {
    // If we have a valid URL (longer than 5 chars), show image
    if (client.logo_url && client.logo_url.length > 5) {
      return (
        <img 
          src={client.logo_url} 
          alt={client.client_name}
          className="h-24 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer grayscale hover:grayscale-0 object-contain shrink-0"
        />
      );
    }

    // Fallback: Show Text + Icon
    return (
      <div className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity cursor-default group/item shrink-0">
        {/* Optional: Small icon next to text */}
        <Building2 className="h-12 w-12 text-muted-foreground group-hover/item:text-secondary" />
        <span className="text-4xl font-bold text-muted-foreground whitespace-nowrap group-hover/item:text-secondary transition-colors">
          {client.client_name}
        </span>
      </div>
    );
  };

  if (clients.length === 0) return null;

  // Calculate duration based on list length to ensure consistent speed
  // e.g. 2 seconds per item
  const duration = clients.length * 2.5;

  return (
    <section className="py-10 bg-background/50 overflow-hidden border-y border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
          Trusted by Industry Leaders
        </p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex overflow-hidden mask-linear-fade">
        
        {/* Framer Motion Loop */}
        <motion.div 
          className="flex items-center whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: duration 
          }}
          style={{ width: "fit-content" }}
        >
          {/* First Copy of List */}
          <div className="flex items-center gap-16 pr-16">
            {clients.map((client, index) => (
              <div key={client.id} className="flex items-center gap-16">
                {renderLogo(client)}
                {/* Dot Separator (Show after every item) */}
                <Circle className="h-1.5 w-1.5 fill-muted-foreground/30 text-transparent shrink-0" />
              </div>
            ))}
          </div>

          {/* Second Copy of List (For seamless loop) */}
          <div className="flex items-center gap-16 pr-16">
            {clients.map((client, index) => (
              <div key={`dup-${client.id}`} className="flex items-center gap-16">
                {renderLogo(client)}
                {/* Dot Separator */}
                <Circle className="h-1.5 w-1.5 fill-muted-foreground/30 text-transparent shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gradient Fades on Edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default ClientLogos;
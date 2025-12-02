import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

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

  // Fallback if no logos are uploaded yet
  if (clients.length === 0) return null;

  return (
    <section className="py-12 bg-muted/50 overflow-hidden border-y border-border/50">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Trusted by Industry Leaders
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4 group-hover:pause">
          {clients.map((client) => (
            // Use image tag instead of text for the logos
            <img 
              key={client.id} 
              src={client.logo_url} 
              alt={client.client_name}
              className="h-12 w-auto opacity-50 hover:opacity-100 transition-opacity cursor-default grayscale hover:grayscale-0"
            />
          ))}
          {/* Duplicate for seamless loop */}
          {clients.map((client) => (
            <img 
              key={`dup-${client.id}`} 
              src={client.logo_url} 
              alt={client.client_name}
              className="h-12 w-auto opacity-50 hover:opacity-100 transition-opacity cursor-default grayscale hover:grayscale-0"
            />
          ))}
        </div>
        
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  );
};

export default ClientLogos;
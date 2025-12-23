import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface ClientLogo {
  id: number;
  client_name: string | null;
  logo_url: string | null;
  display_order: number;
}

export const LogoStrip = ({ title = "Trusted by Global Organizations" }: { title?: string }) => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching logos:', error);
      } else if (data) {
        setLogos(data);
      }
      setLoading(false);
    };

    fetchLogos();
  }, []);

  if (loading) return <div className="py-12 text-center">Loading partners...</div>;
  if (logos.length === 0) return null;

  // Duplicate the logos to create a seamless infinite scroll
  // If you have very few logos (e.g. < 5), you might want to duplicate this array 4 times instead of 2.
  const duplicatedLogos = [...logos, ...logos]; 

  return (
    <section className="py-12 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* The Scrolling Wrapper */}
        <div className="flex w-max animate-scroll">
          {duplicatedLogos.map((logo, index) => (
            logo.logo_url && (
              <div 
                key={`${logo.id}-${index}`} 
                className="mx-8 md:mx-12 flex items-center justify-center min-w-[200px]"
              >
                <img 
                  src={logo.logo_url} 
                  alt={logo.client_name || 'Client Logo'} 
                  className="h-16 md:h-24 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};
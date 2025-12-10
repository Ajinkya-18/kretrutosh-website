import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export const useContent = (pageName: string) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      // Fetch global text (like Navbar/Footer) AND page-specific text
      const { data, error } = await supabase
        .from('website_content')
        .select('section_name, element_key, content_text')
        .or(`page_name.eq.${pageName},page_name.eq.global`);

      if (!error && data) {
        const contentMap: Record<string, string> = {};
        data.forEach((item) => {
          // Creates keys like "hero.title" or "navbar.cta"
          const key = `${item.section_name}.${item.element_key}`;
          contentMap[key] = item.content_text;
        });
        setContent(contentMap);
      }
      setLoading(false);
    };

    fetchContent();

    // Subscribe to changes
    const channel = supabase
      .channel(`content-${pageName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_content',
          filter: `page_name=in.(${pageName},global)` // Note: complex filters might not work in realtime consistently with 'or', so we might just listen to table
        },
        () => {
            fetchContent();
        }
      )
      .subscribe();

      // Actually, simple filter on table is safer
      const globalChannel = supabase
        .channel(`content-global-all`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'website_content' }, () => fetchContent())
        .subscribe();


    return () => {
        supabase.removeChannel(channel);
        supabase.removeChannel(globalChannel);
    };
  }, [pageName]);

  // Helper to get text safely with a default fallback
  const getText = (key: string, defaultText: string) => {
    return content[key] || defaultText;
  };

  return { getText, loading };
};
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
  }, [pageName]);

  // Helper to get text safely with a default fallback
  const getText = (key: string, defaultText: string) => {
    return content[key] || defaultText;
  };

  return { getText, loading };
};
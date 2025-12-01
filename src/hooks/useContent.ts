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
        // Convert the database rows into a simple dictionary
        // Example: content['hero.title'] = "New Headline"
        const contentMap: Record<string, string> = {};
        data.forEach((item) => {
          const key = `${item.section_name}.${item.element_key}`;
          contentMap[key] = item.content_text;
        });
        setContent(contentMap);
      }
      setLoading(false);
    };

    fetchContent();
  }, [pageName]);

  // This is the function you will use in your components
  // key: The identifier in the DB (e.g., 'hero.title')
  // defaultText: What to show if the DB is empty or loading
  const getText = (key: string, defaultText: string) => {
    return content[key] || defaultText;
  };

  return { getText, loading };
};
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { BlockRenderer } from '../components/BlockRenderer';
import { PageBlock } from '../types/blocks';

interface PageData {
  id: string;
  title: string;
  blocks: PageBlock[];
  meta_title?: string;
  meta_description?: string;
}

const DynamicPage = () => {
  const { slug } = useParams(); // Get URL segment (e.g. 'about')
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setError(false);
      
      // Default to 'home' if no slug provided
      const currentSlug = slug || 'home';

      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', currentSlug)
        .eq('status', 'published') // Only fetch published pages
        .single();

      if (error || !data) {
        console.error('Page fetch error:', error);
        setError(true);
      } else {
        setPage(data);
      }
      setLoading(false);
    };

    fetchPage();
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center text-[#0B1C3E]">Loading...</div>;
  
  if (error || !page) return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-[#0B1C3E] mb-4">404</h1>
      <p className="text-gray-600">Page not found</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Here you would add a <SEO /> component using page.meta_title 
         For now, we just render the blocks
      */}
      <BlockRenderer blocks={page.blocks} />
    </main>
  );
};

export default DynamicPage;
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export const PodcastPage = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true }); // Respects your manual order
      if (data) setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#0B1C3E] mb-12 text-center">The XT Podcast</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <div key={vid.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="aspect-video">
                <iframe 
                  width="100%" height="100%" 
                  src={`https://www.youtube.com/embed/${vid.youtube_id}`} 
                  title={vid.title} frameBorder="0" allowFullScreen 
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0B1C3E] mb-2">{vid.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{vid.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
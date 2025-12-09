import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import podcastLogo from "@/assets/xt-podcast-logo.jpeg";
import bookCover from "@/assets/3d-book-cover.jpeg";
import whitepaperImage from "@/assets/whitepaper-articles.jpeg";
import { useContent } from "@/hooks/useContent";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface CardData {
  id: string;
  badge: string;
  title: string;
  description: string;
  cta_text: string;
  link: string;
  image_key: string;
}

interface ThoughtLeadershipProps {
  title?: string;
  description?: string;
  cards?: CardData[];
  getText?: (key: string, defaultText: string) => string;
}

const imageMap: Record<string, string> = {
  podcast: podcastLogo,
  book: bookCover,
  whitepapers: whitepaperImage,
};

const ThoughtLeadership = ({ title, description, cards, getText: propGetText }: ThoughtLeadershipProps) => {
  const { getText: hookGetText } = useContent('home');
  const getText = propGetText || hookGetText;

  const [displayCards, setDisplayCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Default Static Items
  const podcastCard: CardData = {
      id: 'podcast',
      badge: getText('thought_leadership.podcast.badge', 'Podcast'),
      title: getText('thought_leadership.podcast.title', 'The XT Podcast'),
      description: getText('thought_leadership.podcast.desc', 'Conversations with industry leaders on experience transformation.'),
      cta_text: getText('thought_leadership.podcast.cta', 'Listen Now'),
      link: '/resources/podcast',
      image_key: 'podcast'
  };

  const bookCard: CardData = {
      id: 'book',
      badge: getText('thought_leadership.book.badge', 'Book'),
      title: getText('thought_leadership.book.title', 'Beyond Customer Satisfaction'),
      description: getText('thought_leadership.book.desc', 'The definitive guide to customer-centric growth in the modern era.'),
      cta_text: getText('thought_leadership.book.cta', 'Read More'),
      link: '/book',
      image_key: 'book'
  };

  useEffect(() => {
    const fetchData = async () => {
       try {
          // Fetch latest 2 whitepapers
          const { data: whitepapers, error } = await supabase
            .from('whitepapers') // Assuming table exists based on admin-panel
            .select('*')
            .order('created_at', { ascending: false }) // Latest first
            .limit(2);

          const whitepaperCards: CardData[] = (whitepapers || []).map((wp: any) => ({
             id: wp.id || 'wp',
             badge: 'Whitepaper',
             title: wp.title,
             description: wp.summary || wp.description || 'Download our latest insights.',
             cta_text: 'Read Article',
             link: `/resources/${wp.slug}`,
             image_key: 'whitepapers' // Fallback image
          }));

          // Combine: Podcast, Book, WP1, WP2
          setDisplayCards([podcastCard, bookCard, ...whitepaperCards]);
       } catch (err) {
          console.error("Error fetching thought leadership:", err);
          // Fallback
          setDisplayCards([podcastCard, bookCard]);
       } finally {
          setLoading(false);
       }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title || getText('thought_leadership.title', 'Thought Leadership Hub')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {description || getText('thought_leadership.description', 'Insights, strategies, and conversations shaping the future of growth.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {displayCards.map((card) => (
            <div key={card.id} className="bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all group flex flex-col h-full">
              <div className={`h-40 flex items-center justify-center overflow-hidden ${card.id === 'book' ? 'bg-primary/5' : 'bg-black'}`}>
                <img 
                  src={imageMap[card.image_key] || whitepaperImage} 
                  alt={card.title} 
                  className={`w-full h-full object-cover ${card.id === 'podcast' ? 'opacity-90 group-hover:opacity-100' : 'group-hover:scale-105'} transition-all duration-300`}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                  {card.badge}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                  {card.description}
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-primary group-hover:text-secondary self-start mt-auto">
                  <Link to={card.link}>
                    {card.cta_text} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThoughtLeadership;

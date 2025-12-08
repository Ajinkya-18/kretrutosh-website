import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import podcastLogo from "@/assets/xt-podcast-logo.jpeg";
import bookCover from "@/assets/3d-book-cover.jpeg";
import whitepaperImage from "@/assets/whitepaper-articles.jpeg";
import { useContent } from "@/hooks/useContent";

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

  // Default cards if not provided (fallback or during migration)
  const defaultCards: CardData[] = [
    {
      id: 'podcast',
      badge: getText('thought_leadership.podcast.badge', 'Podcast'),
      title: getText('thought_leadership.podcast.title', 'The XT Podcast'),
      description: getText('thought_leadership.podcast.desc', 'Conversations with industry leaders on experience transformation.'),
      cta_text: getText('thought_leadership.podcast.cta', 'Listen Now'),
      link: '/resources/podcast',
      image_key: 'podcast'
    },
    {
      id: 'book',
      badge: getText('thought_leadership.book.badge', 'Book'),
      title: getText('thought_leadership.book.title', 'Beyond Customer Satisfaction'),
      description: getText('thought_leadership.book.desc', 'The definitive guide to customer-centric growth in the modern era.'),
      cta_text: getText('thought_leadership.book.cta', 'Read More'),
      link: '/book',
      image_key: 'book'
    },
    {
      id: 'resources',
      badge: getText('thought_leadership.resources.badge', 'Resources'),
      title: getText('thought_leadership.resources.title', 'Whitepapers & Articles'),
      description: getText('thought_leadership.resources.desc', 'Deep dives into GTM strategies, CS operations, and AI enablement.'),
      cta_text: getText('thought_leadership.resources.cta', 'Explore Resources'),
      link: '/resources',
      image_key: 'whitepapers'
    }
  ];

  const displayCards = cards && cards.length > 0 ? cards : defaultCards;

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayCards.map((card) => (
            <div key={card.id} className="bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all group">
              <div className={`h-48 flex items-center justify-center overflow-hidden ${card.id === 'book' ? 'bg-primary/5' : 'bg-black'}`}>
                <img 
                  src={imageMap[card.image_key] || whitepaperImage} 
                  alt={card.title} 
                  className={`w-full h-full object-cover ${card.id === 'podcast' || card.id === 'resources' ? 'opacity-90 group-hover:opacity-100 transition-opacity' : 'group-hover:scale-105 transition-transform duration-300'}`}
                />
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
                  {card.badge}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {card.description}
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-primary group-hover:text-secondary">
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

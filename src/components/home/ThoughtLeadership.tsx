import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import podcastLogo from "@/assets/xt-podcast-logo.jpeg";
import bookCover from "@/assets/3d-book-cover.jpeg";
import whitepaperImage from "@/assets/whitepaper-articles.jpeg";
import { useContent } from "@/hooks/useContent";

const ThoughtLeadership = () => {
  const { getText } = useContent('home');

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {getText('thought_leadership.title', 'Thought Leadership Hub')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {getText('thought_leadership.description', 'Insights, strategies, and conversations shaping the future of growth.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Podcast */}
          <div className="bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all group">
            <div className="h-48 bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={podcastLogo} 
                alt="The XT Podcast Logo" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
                {getText('thought_leadership.podcast.badge', 'Podcast')}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {getText('thought_leadership.podcast.title', 'The XT Podcast')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {getText('thought_leadership.podcast.desc', 'Conversations with industry leaders on experience transformation.')}
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary group-hover:text-secondary">
                <Link to="/resources/podcast">
                  {getText('thought_leadership.podcast.cta', 'Listen Now')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Book */}
          <div className="bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all group">
            <div className="h-48 bg-primary/5 flex items-center justify-center overflow-hidden">
              <img 
                src={bookCover} 
                alt="Beyond Customer Satisfaction Book Cover" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
                {getText('thought_leadership.book.badge', 'Book')}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {getText('thought_leadership.book.title', 'Beyond Customer Satisfaction')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {getText('thought_leadership.book.desc', 'The definitive guide to customer-centric growth in the modern era.')}
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary group-hover:text-secondary">
                <Link to="/book">
                  {getText('thought_leadership.book.cta', 'Read More')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Whitepapers & Articles */}
          <div className="bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all group">
            <div className="h-48 bg-primary/5 flex items-center justify-center overflow-hidden">
              <img 
                src={whitepaperImage} 
                alt="Whitepapers & Articles" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
                {getText('thought_leadership.resources.badge', 'Resources')}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {getText('thought_leadership.resources.title', 'Whitepapers & Articles')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {getText('thought_leadership.resources.desc', 'Deep dives into GTM strategies, CS operations, and AI enablement.')}
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary group-hover:text-secondary">
                <Link to="/resources">
                  {getText('thought_leadership.resources.cta', 'Explore Resources')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThoughtLeadership;

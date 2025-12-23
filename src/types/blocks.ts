// The core structure of any block in your DB
export interface PageBlock {
  id: string;       // Unique ID for React keys (uuid)
  type: BlockType;  // Determines which component renders
  props: any;       // The data specific to that component
}

// The Registry of all available blocks
export type BlockType = 
  | 'hero_simple'       // Standard Title + Subtitle + Image
  | 'hero_complex'      // The "Home" hero with abstract visuals & 2 CTAs
  | 'rich_text'         // HTML content
  | 'stats_grid'        // 3x3 Grid of outcomes (NRR, ROI, etc)
  | 'framework_carousel'// Rotating list of frameworks
  | 'logo_strip'        // Client logos
  | 'cta_banner'        // "Ready to build...?" strip
  | 'cards_grid'        // Generic grid for features/services
  | 'accordion_list'    // FAQ or "Problem/Solution" toggles
  | 'resource_feed'    // Dynamic list of recent podcasts/articles
  | 'features_grid';    // Generic grid for features/services

// Example Data Structure for a Hero Block
export interface HeroBlockProps {
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  alignment: 'left' | 'center';
}

export interface StatItem{
  value: string; // eg "+25%"
  label: string; // eg "NRR Improvement"
}

export interface LogoStripProps {
  title?: string;
}
// Example Data Structure for the Framework Carousel
// Note: We don't type the content here, we reference the DB ID!
export interface FrameworkCarouselProps {
  title?: string;
  subtitle?: string;
  //selectedFrameworkIds?: string[]; // If empty, show all. If set, show specific ones.
}

export interface StatsGridProps {
  title?: string;
  items: StatItem[];
  background?: 'white' | 'light' | 'navy';
}

export interface FeatureItem{
  title: string;
  description: string;
  linkUrl?: string;
  linkText?: string;
}

export interface FeaturesGridProps{
  title: string;
  subtitle?: string;
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
}

export interface RichTextProps{
  content: string;
  align?: 'left' | 'center';
}
// The core structure of any block in your DB
export interface PageBlock {
  id: string;       // Unique ID for React keys (uuid)
  type: BlockType;  // Determines which component renders
  props: any;       // The data specific to that component
}

// The Registry of all available blocks
export type BlockType = 
  // --- Core Layouts ---
  | 'hero_simple'       // Standard Hero (Internal Pages)
  | 'hero_home'         // Homepage Hero (Fold 1)
  | 'rich_text'         // HTML Content
  | 'content_split'     // Image + Text (Book/Philosophy)

  // --- Lists & Grids ---
  | 'stats_grid'        // 3x3 Outcomes Grid
  | 'features_grid'     // Manual Feature Cards
  | 'logo_strip'        // Client Logos (Smart)
  
  // --- Frameworks ---
  | 'framework_carousel' // Homepage Horizontal Slider
  | 'framework_grid'     // Full Grid Page

  // --- Programs ---
  | 'programs_home'      // Complex Engine Layout (3 Vert + 2 Horiz)
  | 'program_grid'       // Simple Card List

  // --- Resources & Cases ---
  | 'case_study_strip'   // (Building Next)
  | 'resource_hub'       // (Building Next)
  | 'industry_grid'      // (Building Next)
    
  // --- Global ---
  | 'cta_banner'        // (Simple "Ready to start?" strip)
  | 'articles_grid'     // (Latest Articles Grid)
  | 'case_studies_grid' // (Case Studies Grid)
  | 'philosophy_block';

export interface HeroHomeProps{
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;  
}

export interface ContentSplitProps{
  label?: string;
  title: string;
  content: string;
  image_url: string;
  image_position: 'left' | 'right';
  cta_text?: string;
  cta_link?: string;
  background: 'white' | 'light' | 'navy';
}

export interface ResourceHubProps{
  title: string;
}

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
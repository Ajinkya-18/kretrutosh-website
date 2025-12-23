import * as React from 'react';
import { LogoStrip } from './blocks/LogoStrip';
import { HeroSimple } from './blocks/HeroSimple';
import { FrameworkCarousel } from './blocks/FrameworkCarousel';
import { PageBlock } from '../types/blocks'; // Ensure this matches your file path
import { StatsGrid } from './blocks/StatsGrid';
import { FeaturesGrid } from './blocks/FeaturesGrid';

// 1. Map your "Database String" to "React Component"
const BLOCK_COMPONENTS: Record<string, React.FC<any>> = {
  'hero_simple': HeroSimple,
  'logo_strip': LogoStrip,                // <--- Register
  'framework_carousel': FrameworkCarousel, // <--- Register
  'stats_grid': StatsGrid,
  'features_grid': FeaturesGrid,
};

export const BlockRenderer = ({ blocks }: { blocks: PageBlock[] }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {blocks.map((block) => {
        const Component = BLOCK_COMPONENTS[block.type];

        if (!Component) {
          console.warn(`Unknown block type: ${block.type}`);
          return (
            <div key={block.id} className="p-4 bg-red-100 text-red-800 border border-red-300 my-4 rounded">
              ⚠️ Developer Warning: Block type <strong>{block.type}</strong> not implemented yet.
            </div>
          );
        }

        // Render the component and pass the JSON props into it
        return <Component key={block.id} {...block.props} />;
      })}
    </div>
  );
};
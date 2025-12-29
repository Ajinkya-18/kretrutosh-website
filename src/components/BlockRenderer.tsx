import * as React from 'react';
import { LogoStrip } from './blocks/LogoStrip';
import { HeroSimple } from './blocks/HeroSimple';
import { FrameworkCarousel } from './blocks/FrameworkCarousel';
import { PageBlock } from '../types/blocks'; // Ensure this matches your file path
import { StatsGrid } from './blocks/StatsGrid';
import { FeaturesGrid } from './blocks/FeaturesGrid';
import { RichText } from './blocks/RichText';
import { FrameworkGrid } from './blocks/FrameworkGrid';
import { ProgramGrid } from './blocks/ProgramGrid';
import { HeroHome } from './blocks/HeroHome';
import { ContentSplit } from './blocks/ContentSplit';
import { CaseStudyStrip } from './blocks/CaseStudyStrip';
import { IndustriesGrid } from './blocks/IndustriesGrid';
import { ResourceHub } from './blocks/ResourceHub';
import { CtaBanner } from './blocks/CtaBanner';
import { ProgramsHome } from './blocks/ProgramsHome';
import { ArticlesGrid } from './blocks/ArticlesGrid';
import { PhilosophyBlock } from './blocks/PhilosophyBlock';
import { CaseStudiesGrid } from './blocks/CaseStudiesGrid';
import { motion } from 'framer-motion';

// 1. Map your "Database String" to "React Component"
const BLOCK_COMPONENTS: Record<string, React.FC<any>> = {
  'hero_simple': HeroSimple,
  'hero_home': HeroHome,
  'logo_strip': LogoStrip,                // <--- Register
  'framework_carousel': FrameworkCarousel, // <--- Register
  'stats_grid': StatsGrid,
  'features_grid': FeaturesGrid,
  'framework_grid': FrameworkGrid,
  'rich_text': RichText,
  'program_grid': ProgramGrid,
  'content_split': ContentSplit,
  'case_study_strip': CaseStudyStrip,
  'industry_grid': IndustriesGrid, // Note the key name 'industry_grid'
  'resource_hub': ResourceHub,
  'cta_banner': CtaBanner,
  'programs_home': ProgramsHome,
  'articles_grid': ArticlesGrid,
  'philosophy_block': PhilosophyBlock,
  'case_studies_grid': CaseStudiesGrid,
};

export const BlockRenderer = ({ blocks }: { blocks: PageBlock[] }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {blocks.map((block, index) => {
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
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index === 0 ? 0 : 0.1 }} // Instant for first block (Hero), delayed for others
          >
            <Component {...block.props} />
          </motion.div>
        );
      })}
    </div>
  );
};
import { CaseStudiesGrid } from "../../components/blocks/CaseStudiesGrid";
import { HeroSimple } from "../../components/blocks/HeroSimple";

export const ImpactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Static Hero using the component directly */}
      <HeroSimple 
        headline="Transformation That Moves the Numbers"
        subheadline="Real-world outcomes from our engagements across SaaS, Retail, BFSI, and more."
        primaryCtaText="Book a Strategy Review"
        primaryCtaLink="/contact"
      />

      {/* 2. The Full Grid with Filters */}
      <CaseStudiesGrid title="Success Stories" />
    </div>
  );
};
-- Phase 2: Update Case Studies w/ Schema Check
-- Fixed column names: 'outcomes' -> 'results'

-- 1. SCHEMA: Ensure columns exist
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS link_url text;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS results text[]; -- Codebase uses 'results', Brief used 'outcomes'
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- 2. DATA: Clear and Repopulate
TRUNCATE TABLE public.case_studies RESTART IDENTITY CASCADE;

INSERT INTO public.case_studies (client_name, title, industry, results, challenge, solution, link_url, is_featured) VALUES
(
  'Insular Life',
  'Optimizing the Digital Quote Journey',
  'Insurance',
  ARRAY['Drop-off reduced 61.8% → 57.6%', '₱2.96M ROI in 7 months', 'Underwriting time 3.8 days → 10 mins'],
  'High drop-offs in the digital quote-to-buy journey due to complex forms and expectation gaps.',
  'Applied EMM + VRM to redesign the quote flow and underwriting logic.',
  '#',
  true
),
(
  'Value Retail (UK)',
  'Omnichannel Experience Transformation',
  'Retail',
  ARRAY['AOV +24%', 'Improved Frontline Consistency', 'Higher NPS'],
  'Inconsistent experience between digital channels and physical outlet villages.',
  'Journey orchestration and store-digital connection using VoC loops.',
  '#',
  true
),
(
  'Zykrr / Alida',
  'SaaS Retention & NRR Growth',
  'SaaS',
  ARRAY['NRR improved +18%', 'Churn reduced 22%', 'Upsell increased to 26% ARR'],
  'High churn and low expansion revenue despite good product usage.',
  'Implemented Value Dashboards and Customer Lifecycle Heatmap to identify risk.',
  '#',
  true
),
(
  'Symega Foods',
  'Culture & GTM Alignment',
  'Manufacturing',
  ARRAY['Cross-sell +18%', 'Retention +8%', 'Internal alignment improved'],
  'Siloed teams (R&D vs Sales) causing inconsistent customer delivery.',
  'HAND™ values actualization workshops aligned with GTM strategy.',
  '#',
  true
),
(
  'Suyati Technologies',
  'CX-Led Sales Transformation',
  'B2B Tech',
  ARRAY['Revenue $2M → $4.5M (2.25x)', 'Sales Velocity 2x-7x', 'Higher Win Rates'],
  'Stagnant revenue growth and commoditized sales pitch.',
  'Redesigned GTM narrative using Persona-Product-Pitch and CX storytelling.',
  '#',
  true
);

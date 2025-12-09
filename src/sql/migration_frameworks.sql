-- 1. Create Frameworks Table (Idempotent)
CREATE TABLE IF NOT EXISTS public.frameworks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Ensure columns exist
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS short_description text;
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS icon_name text;
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS outcomes text[]; -- Array of strings
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;

-- Ensure Unique Constraint on Slug
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'frameworks_slug_key') THEN
        ALTER TABLE public.frameworks ADD CONSTRAINT frameworks_slug_key UNIQUE (slug);
    END IF;
END $$;

-- Enable RLS
ALTER TABLE public.frameworks ENABLE ROW LEVEL SECURITY;

-- Public Read Policy
DROP POLICY IF EXISTS "Enable read access for all users" ON public.frameworks;
CREATE POLICY "Enable read access for all users" ON public.frameworks FOR SELECT USING (true);


-- 2. Populate Frameworks Data (Upsert)

INSERT INTO public.frameworks (display_order, title, short_description, slug, icon_name, outcomes) VALUES
(
  1,
  '9Ps Framework for Advocacy',
  'A 9-step orchestration model connecting Persona to Advocacy, bridging GTM storytelling and delivery.',
  '9ps-framework',
  'Share2',
  ARRAY['+15–25% conversion', '+18–25% referral growth', '+15–20% marketing ROI']
),
(
  2,
  'EAR Framework',
  'A behavioral model to make empathy measurable and repeatable: Engage, Acknowledge, Respond.',
  'ear-framework',
  'Heart',
  ARRAY['+12–25% retention', '+20–25% first-contact resolution', '–15–20% complaints']
),
(
  3,
  'Persona–Product–Pitch Playbook',
  'Converts persona insights into actionable GTM motions to ensure the right message at the right time.',
  'persona-product-pitch',
  'Target',
  ARRAY['+15–25% conversion', '+15–25% cross/upsell', '+15–25% BD ROI']
),
(
  4,
  'CX Maturity Framework',
  'A diagnostic model measuring Customer Experience readiness across 8 dimensions.',
  'cx-maturity',
  'BarChart',
  ARRAY['+12–25% retention', '+15–20 pp NPS uplift', '20–30% efficiency gain']
),
(
  5,
  'Expectation Management (EMM)',
  'Maps customer expectations to organizational delivery competencies to identify gaps.',
  'emm-framework',
  'CheckCircle',
  ARRAY['+10–15% CSAT', '+12–25% retention', '–20–24% escalations']
),
(
  6,
  'H.A.N.D.™ Framework',
  'Values actualization framework: Humanized, Aligned, Nimble, Data-backed culture.',
  'hand-framework',
  'Users',
  ARRAY['Reduced early attrition', 'eNPS +10–15 pp', 'Collaboration +12–18%']
),
(
  7,
  'Customer Lifecycle Heatmap',
  'Identifies renewal risk and cross/upsell opportunity zones across lifecycle stages.',
  'lifecycle-heatmap',
  'Layout',
  ARRAY['+15–30% cross/upsell', '+10–20% NRR', '+15–25% CLV']
),
(
  8,
  'V.I.C.T.O.R.Y.™ Framework',
  '7-stage model transforming Customer Success from cost center to revenue & innovation hub.',
  'victory-framework',
  'Award',
  ARRAY['+12–25% retention', '+20–40% expansion', '2–3× advocacy']
),
(
  9,
  'Value Realization Map (VRM)',
  'Links CX and CS initiatives to measurable business KPIs and brand promise.',
  'value-realization-map',
  'TrendingUp',
  ARRAY['+23–28% platform adoption', 'Leadership buy-in', '+15–20% decision speed']
),
(
  10,
  'CX ROI Calculator',
  'Data model converting experience metrics (CSAT, NPS) into financial impact.',
  'cx-roi-calculator',
  'PieChart',
  ARRAY['+12–18% CX ROI', '+25–30% insight-to-action', 'Quantified Impact']
)
ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  icon_name = EXCLUDED.icon_name,
  outcomes = EXCLUDED.outcomes,
  is_visible = true;

-- 1. Create Assessments Table (Idempotent)
CREATE TABLE IF NOT EXISTS public.assessments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Ensure columns exist
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS slug text; -- Unique key for idempotency & URLs
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS external_link text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS icon_name text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;

-- Ensure Unique Constraint on Slug
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'assessments_slug_key') THEN
        ALTER TABLE public.assessments ADD CONSTRAINT assessments_slug_key UNIQUE (slug);
    END IF;
END $$;

-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Public Read Policy
DROP POLICY IF EXISTS "Enable read access for all users" ON public.assessments;
CREATE POLICY "Enable read access for all users" ON public.assessments FOR SELECT USING (true);


-- 2. Populate Assessments Data (Upsert)

INSERT INTO public.assessments (display_order, title, slug, description, icon_name, external_link) VALUES
(
  1,
  'CX Maturity Framework Diagnostic',
  'cx-maturity-diagnostic',
  'Baselines how well the organization articulates, communicates, and delivers its Brand Promise across journeys.',
  'BarChart',
  '#'
),
(
  2,
  'Customer Success Maturity Model (31Q)',
  'cs-maturity-model',
  'The canonical 10-domain Customer Success diagnostic to identify maturity gaps and opportunities.',
  'CheckCircle',
  '#'
),
(
  3,
  'Culture Maturity Assessment',
  'culture-maturity-assessment',
  'Baseline collaboration, accountability, customer-orientation, and agility within your organization.',
  'Users',
  '#'
)
ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name,
  external_link = EXCLUDED.external_link,
  is_visible = true;

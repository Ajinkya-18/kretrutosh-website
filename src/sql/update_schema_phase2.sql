-- Phase 2 Schema Updates
-- Add HTML columns to sections_industry_details and link_url to case_studies

-- 1. Update sections_industry_details
CREATE TABLE IF NOT EXISTS public.sections_industry_details (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS challenges_html text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS approach_html text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS page_slug text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS section_key text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS content_body text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS parent_slug text; -- Ensure this exists for relation or match with page_slug logic
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;

-- Ensure logic consistency: The brief implies 'page_slug' is used to identify the industry page.
-- Existing codebase might use 'parent_slug' or 'slug'. Let's ensure we have a standard way.
-- In IndustryDetail.tsx:  .eq('parent_slug', slug) is used. So let's stick to parent_slug or make sure they match.
-- For the industry scripts provided by user, they use 'page_slug'. I should probably standardize or allow both/alias.
-- Let's add parent_slug and update it from page_slug if null.

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sections_industry_details' AND column_name = 'page_slug') THEN
        UPDATE public.sections_industry_details SET parent_slug = page_slug WHERE parent_slug IS NULL;
    END IF;
END $$;


-- 2. Update case_studies
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS link_url text;

-- 3. Enable RLS for industry details
ALTER TABLE public.sections_industry_details ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sections_industry_details;
CREATE POLICY "Enable read access for all users" ON public.sections_industry_details FOR SELECT USING (true);

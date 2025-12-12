-- GROUP B: THE "EVOLUTION" TABLES (Modify/Validate)

-- 6. services
CREATE TABLE IF NOT EXISTS public.services (
    slug text PRIMARY KEY,
    created_at timestamptz DEFAULT now()
);

-- Ensure columns exist
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS title text; -- Basic field needed
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS subtitle text; -- Basic field needed
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS hero_image text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS problem_html text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS approach_html text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS outcomes_list jsonb DEFAULT '[]'::jsonb;

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.services;
CREATE POLICY "Enable read access for all users" ON public.services FOR SELECT USING (true);


-- 7. frameworks
-- Table likely exists, but ensure structure
CREATE TABLE IF NOT EXISTS public.frameworks (
    slug text PRIMARY KEY,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS diagram_url text;
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS description_html text;
ALTER TABLE public.frameworks ADD COLUMN IF NOT EXISTS title text;
-- Ensure RLS
ALTER TABLE public.frameworks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.frameworks;
CREATE POLICY "Enable read access for all users" ON public.frameworks FOR SELECT USING (true);


-- 8. industries
CREATE TABLE IF NOT EXISTS public.industries (
    slug text PRIMARY KEY,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.industries ADD COLUMN IF NOT EXISTS challenges_html text;
ALTER TABLE public.industries ADD COLUMN IF NOT EXISTS approach_html text;
ALTER TABLE public.industries ADD COLUMN IF NOT EXISTS title text;
-- Ensure RLS
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.industries;
CREATE POLICY "Enable read access for all users" ON public.industries FOR SELECT USING (true);


-- 9. assessments
-- Matches Design Brief (3 items)
CREATE TABLE IF NOT EXISTS public.assessments (
    slug text PRIMARY KEY,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS icon_name text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS external_link text;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;
-- Ensure RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.assessments;
CREATE POLICY "Enable read access for all users" ON public.assessments FOR SELECT USING (true);



-- GROUP C: THE "NEW CONFIG" TABLES (Create/Reset)

-- 10. config_navbar
CREATE TABLE IF NOT EXISTS public.config_navbar (
    id SERIAL PRIMARY KEY, -- Single row usually, but ID helps
    logo_url text,
    menu_items jsonb DEFAULT '[]'::jsonb,
    cta_link text
);
ALTER TABLE public.config_navbar ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.config_navbar;
CREATE POLICY "Enable read access for all users" ON public.config_navbar FOR SELECT USING (true);

-- 11. config_footer
CREATE TABLE IF NOT EXISTS public.config_footer (
    id SERIAL PRIMARY KEY,
    social_links jsonb DEFAULT '[]'::jsonb,
    copyright_text text
);
ALTER TABLE public.config_footer ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.config_footer;
CREATE POLICY "Enable read access for all users" ON public.config_footer FOR SELECT USING (true);

-- 12. page_home
CREATE TABLE IF NOT EXISTS public.page_home (
    id SERIAL PRIMARY KEY,
    hero_title text,
    hero_subtitle text,
    hero_video_url text,
    growth_engine_title text,
    frameworks_title text
);
ALTER TABLE public.page_home ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.page_home;
CREATE POLICY "Enable read access for all users" ON public.page_home FOR SELECT USING (true);

-- 13. page_about
CREATE TABLE IF NOT EXISTS public.page_about (
    id SERIAL PRIMARY KEY,
    hero_title text,
    story_html text,
    founder_image_url text
);
ALTER TABLE public.page_about ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.page_about;
CREATE POLICY "Enable read access for all users" ON public.page_about FOR SELECT USING (true);

-- 14. page_contact
CREATE TABLE IF NOT EXISTS public.page_contact (
    id SERIAL PRIMARY KEY,
    hero_title text,
    address_html text,
    map_embed text
);
ALTER TABLE public.page_contact ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.page_contact;
CREATE POLICY "Enable read access for all users" ON public.page_contact FOR SELECT USING (true);

-- 15. book
CREATE TABLE IF NOT EXISTS public.book (
    id SERIAL PRIMARY KEY,
    title text,
    cover_image text,
    amazon_link text,
    description_html text
);
ALTER TABLE public.book ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.book;
CREATE POLICY "Enable read access for all users" ON public.book FOR SELECT USING (true);


-- ---------------------------------------------------------
-- DATA MIGRATION LOGIC (Attempt to preserve data from sections_*)
-- ---------------------------------------------------------

-- Migrate Services (from sections_services to services)
-- Logic: Aggregate rows by page_slug
INSERT INTO public.services (slug, title, subtitle, problem_html, approach_html, outcomes_list)
SELECT
    page_slug as slug,
    MAX(CASE WHEN section_key = 'hero' THEN title END) as title,
    MAX(CASE WHEN section_key = 'hero' THEN subtitle END) as subtitle,
    MAX((CASE WHEN section_key = 'problem_block' THEN specific_data->'list' END)::text) as problem_html, 
    MAX((CASE WHEN section_key = 'approach_steps' THEN specific_data->'steps' END)::text) as approach_html,
    MAX((CASE WHEN section_key = 'outcomes_grid' THEN specific_data->'stats' END)::text)::jsonb as outcomes_list
FROM public.sections_services
GROUP BY page_slug
ON CONFLICT (slug) DO NOTHING;

-- Note: The JSONB data from sections_services (list/steps) needs to be converted to HTML manually in Admin Panel later if strict HTML is required. 
-- But this preserves the raw JSON data in the new columns for now (as text/jsonb compat).
-- Ideally, we'd iterate and format it, but SQL is limited for JSON->HTML formatting without functions.
-- Leaving as text representation of JSON for now.


-- Migrate Config Home (from sections_home)
INSERT INTO public.page_home (hero_title, hero_subtitle, growth_engine_title, frameworks_title)
SELECT
    MAX(CASE WHEN section_key = 'hero' THEN title END) as hero_title,
    MAX(CASE WHEN section_key = 'hero' THEN subtitle END) as hero_subtitle,
    'Growth Engine' as growth_engine_title, -- Default
    'Our Frameworks' as frameworks_title -- Default
FROM public.sections_home
limit 1;


-- Migrate Page About
INSERT INTO public.page_about (hero_title, story_html)
SELECT
    MAX(CASE WHEN section_key = 'hero' THEN title END) as hero_title,
    MAX(CASE WHEN section_key = 'founder_story' THEN content_body END) as story_html
FROM public.sections_about
limit 1;


-- Migrate Page Contact
INSERT INTO public.page_contact (hero_title, address_html)
SELECT
    MAX(CASE WHEN section_key = 'hero' THEN title END) as hero_title,
    MAX(CASE WHEN section_key = 'info_block' THEN content_body END) as address_html
FROM public.sections_contact
limit 1;


-- ========================================
-- UNLOCK PUBLIC READ ACCESS - RLS Policies
-- ========================================
-- Purpose: Allow anonymous (public) users to read data for website display
-- This fixes empty navbar dropdowns and other data fetch issues

-- Enable RLS and create public read policies for all website tables

-- 1. CONFIG TABLES
ALTER TABLE public.config_navbar ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.config_navbar;
CREATE POLICY "Public Read Access" ON public.config_navbar FOR SELECT TO anon USING (true);

ALTER TABLE public.config_footer ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.config_footer;
CREATE POLICY "Public Read Access" ON public.config_footer FOR SELECT TO anon USING (true);

-- 2. CONTENT TABLES
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.services;
CREATE POLICY "Public Read Access" ON public.services FOR SELECT TO anon USING (true);

ALTER TABLE public.frameworks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.frameworks;
CREATE POLICY "Public Read Access" ON public.frameworks FOR SELECT TO anon USING (true);

ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.industries;
CREATE POLICY "Public Read Access" ON public.industries FOR SELECT TO anon USING (true);

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.assessments;
CREATE POLICY "Public Read Access" ON public.assessments FOR SELECT TO anon USING (true);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.case_studies;
CREATE POLICY "Public Read Access" ON public.case_studies FOR SELECT TO anon USING (true);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.articles;
CREATE POLICY "Public Read Access" ON public.articles FOR SELECT TO anon USING (true);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.videos;
CREATE POLICY "Public Read Access" ON public.videos FOR SELECT TO anon USING (true);

ALTER TABLE public.whitepapers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.whitepapers;
CREATE POLICY "Public Read Access" ON public.whitepapers FOR SELECT TO anon USING (true);

ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.client_logos;
CREATE POLICY "Public Read Access" ON public.client_logos FOR SELECT TO anon USING (true);

-- 3. PAGE CONTENT TABLES
ALTER TABLE public.page_home ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.page_home;
CREATE POLICY "Public Read Access" ON public.page_home FOR SELECT TO anon USING (true);

ALTER TABLE public.page_about ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.page_about;
CREATE POLICY "Public Read Access" ON public.page_about FOR SELECT TO anon USING (true);

ALTER TABLE public.page_contact ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.page_contact;
CREATE POLICY "Public Read Access" ON public.page_contact FOR SELECT TO anon USING (true);

ALTER TABLE public.book ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.book;
CREATE POLICY "Public Read Access" ON public.book FOR SELECT TO anon USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
  AND policyname = 'Public Read Access'
ORDER BY tablename;

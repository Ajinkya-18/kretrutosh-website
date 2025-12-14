-- =====================================================
-- CMS LAYOUT ENGINE: Enable No-Code Section Reordering
-- =====================================================
-- Purpose: Allow admin users to reorder homepage sections
-- without touching code, creating a true CMS experience.
-- =====================================================

-- 1. ADD LAYOUT_ORDER COLUMN TO page_home
-- This JSONB array controls the sequence of homepage sections
ALTER TABLE public.page_home 
ADD COLUMN IF NOT EXISTS layout_order JSONB DEFAULT '["hero", "growth_engine", "frameworks", "outcomes", "clients", "case_studies", "thought_leadership"]'::jsonb;

COMMENT ON COLUMN public.page_home.layout_order IS 'Order of homepage sections. Array of section keys that frontend will render sequentially.';

-- 2. ADD SECTION_VISIBILITY TO page_home
-- Allows toggling sections on/off without deleting data
ALTER TABLE public.page_home
ADD COLUMN IF NOT EXISTS section_visibility JSONB DEFAULT '{
  "hero": true,
  "growth_engine": true,
  "frameworks": true,
  "outcomes": true,
  "clients": true,
  "case_studies": true,
  "thought_leadership": true
}'::jsonb;

COMMENT ON COLUMN public.page_home.section_visibility IS 'Controls which sections are visible on homepage. Key-value pairs of section_key: boolean.';

-- 3. ADD LAYOUT COLUMNS TO page_about
ALTER TABLE public.page_about
ADD COLUMN IF NOT EXISTS layout_order JSONB DEFAULT '["hero", "story", "team", "clients"]'::jsonb;

ALTER TABLE public.page_about
ADD COLUMN IF NOT EXISTS section_visibility JSONB DEFAULT '{
  "hero": true,
  "story": true,
  "team": true,
  "clients": true
}'::jsonb;

COMMENT ON COLUMN public.page_about.layout_order IS 'Order of About page sections.';
COMMENT ON COLUMN public.page_about.section_visibility IS 'Controls which sections are visible on About page.';

-- 4. ADD LAYOUT COLUMNS TO page_contact
ALTER TABLE public.page_contact
ADD COLUMN IF NOT EXISTS layout_order JSONB DEFAULT '["hero", "form", "map", "calendly"]'::jsonb;

ALTER TABLE public.page_contact
ADD COLUMN IF NOT EXISTS section_visibility JSONB DEFAULT '{
  "hero": true,
  "form": true,
  "map": true,
  "calendly": true
}'::jsonb;

COMMENT ON COLUMN public.page_contact.layout_order IS 'Order of Contact page sections.';

-- 5. ENSURE book TABLE HAS ALL REQUIRED FIELDS
-- (Matching what frontend expects from design brief)
ALTER TABLE public.book
ADD COLUMN IF NOT EXISTS hero_title TEXT,
ADD COLUMN IF NOT EXISTS hero_subtitle TEXT,
ADD COLUMN IF NOT EXISTS about_title TEXT DEFAULT 'About the Book',
ADD COLUMN IF NOT EXISTS about_description TEXT,
ADD COLUMN IF NOT EXISTS price_text TEXT DEFAULT 'Now FREE on Amazon',
ADD COLUMN IF NOT EXISTS cta_title TEXT DEFAULT 'Get Your Copy',
ADD COLUMN IF NOT EXISTS cta_button_text TEXT DEFAULT 'Download from Amazon',
ADD COLUMN IF NOT EXISTS amazon_url TEXT,
ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
ADD COLUMN IF NOT EXISTS qr_image_url TEXT,
ADD COLUMN IF NOT EXISTS qr_title TEXT DEFAULT 'Scan to Download',
ADD COLUMN IF NOT EXISTS qr_description TEXT DEFAULT 'Scan this QR code with your mobile device to quickly access the book on Amazon',
ADD COLUMN IF NOT EXISTS author_title TEXT DEFAULT 'About the Author',
ADD COLUMN IF NOT EXISTS author_bio TEXT;

-- Drop old columns if they exist (from previous schema)
ALTER TABLE public.book
DROP COLUMN IF EXISTS title,
DROP COLUMN IF EXISTS amazon_link,
DROP COLUMN IF EXISTS description_html,
DROP COLUMN IF EXISTS cover_image;

COMMENT ON TABLE public.book IS 'Book content for "Beyond Customer Satisfaction" including hero, about, CTA, QR code, and author sections.';

-- 6. UPDATE ASSESSMENTS TABLE TO SUPPORT SEQUENCING
ALTER TABLE public.assessments
ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;

COMMENT ON COLUMN public.assessments.display_order IS 'Controls the display order of assessment cards. Lower numbers appear first.';

-- Create index for faster ordering queries
CREATE INDEX IF NOT EXISTS idx_assessments_display_order ON public.assessments(display_order);

-- 7. ADD DISPLAY_ORDER TO OTHER SECTION TABLES
-- (For future CMS control on detail pages)
-- NOTE: sections_* tables have been replaced with page_* tables in the current schema
-- These alterations are commented out as they reference tables that no longer exist

-- ALTER TABLE public.sections_about
-- ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
-- ADD COLUMN IF NOT EXISTS alignment TEXT DEFAULT 'left' CHECK (alignment IN ('left', 'center', 'right', 'justified'));

-- ALTER TABLE public.sections_frameworks
-- ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
-- ADD COLUMN IF NOT EXISTS alignment TEXT DEFAULT 'left' CHECK (alignment IN ('left', 'center', 'right', 'justified'));

-- ALTER TABLE public.sections_assessments
-- ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
-- ADD COLUMN IF NOT EXISTS alignment TEXT DEFAULT 'left' CHECK (alignment IN ('left', 'center', 'right', 'justified'));

-- Create indexes
-- CREATE INDEX IF NOT EXISTS idx_sections_about_display_order ON public.sections_about(display_order);
-- CREATE INDEX IF NOT EXISTS idx_sections_frameworks_display_order ON public.sections_frameworks(display_order);
-- CREATE INDEX IF NOT EXISTS idx_sections_assessments_display_order ON public.sections_assessments(display_order);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the schema updates:

-- Check page_home layout_order:
-- SELECT id, layout_order, section_visibility FROM public.page_home;

-- Check book table structure:
-- SELECT column_name, data_type, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'book' AND table_schema = 'public';

-- Check assessments display_order:
-- SELECT id, title, display_order FROM public.assessments ORDER BY display_order;

-- =====================================================
-- END OF LAYOUT ENGINE SCHEMA
-- =====================================================

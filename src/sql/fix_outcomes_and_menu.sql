-- ================================================
-- FIX OUTCOMES AND THOUGHT LEADERSHIP MENU
-- ================================================
-- Run these queries in Supabase SQL Editor to:
-- 1. Add sample outcomes to page_home
-- 2. Check and fix navbar config for Thought Leadership structure

-- ================================================
-- 1. ADD SAMPLE OUTCOMES TO PAGE_HOME
-- ================================================
-- Update page_home to include outcomes_items as a JSON array
UPDATE public.page_home
SET outcomes_items = '[
  "Increased Revenue",
  "Higher Retention",
  "Reduced Churn",
  "Faster Growth",
  "Better Customer Satisfaction"
]'::jsonb
WHERE id = (SELECT id FROM public.page_home LIMIT 1);

-- Verify outcomes were added
SELECT id, outcomes_title, outcomes_description, outcomes_items 
FROM public.page_home 
LIMIT 1;

-- ================================================
-- 2. CHECK CURRENT NAVBAR CONFIG
-- ================================================
SELECT id, menu_items 
FROM public.config_navbar 
LIMIT 1;

-- ================================================
-- 3. RESTRUCTURE THOUGHT LEADERSHIP MENU (EXAMPLE)
-- ================================================
-- This shows the desired structure. You'll need to update the actual menu_items JSON.
-- The structure should be:
-- 
-- {
--   "name": "Thought Leadership",
--   "children": [
--     {
--       "name": "Podcasts",
--       "path": "/resources/podcasts",
--       "dataSource": "videos"
--     },
--     {
--       "name": "Articles",
--       "path": "/resources/articles",
--       "dataSource": "blogs"
--     },
--     {
--       "name": "Case Studies",
--       "path": "/case-studies",
--       "dataSource": "case-studies"
--     },
--     {
--       "name": "Whitepapers",
--       "path": "/resources/whitepapers",
--       "dataSource": "whitepapers"
--     }
--   ]
-- }

-- Example of how to manually update if needed:
-- UPDATE public.config_navbar
-- SET menu_items = '[
--   {
--     "name": "Home",
--     "path": "/"
--   },
--   {
--     "name": "Services",
--     "dataSource": "services"
--   },
--   {
--     "name": "Frameworks",
--     "dataSource": "frameworks"
--   },
--   {
--     "name": "Industries",
--     "dataSource": "industries"
--   },
--   {
--     "name": "Assessments",
--     "dataSource": "assessments"
--   },
--   {
--     "name": "Thought Leadership",
--     "children": [
--       {
--         "name": "Podcasts",
--         "path": "/resources/videos"
--       },
--       {
--         "name": "Articles",
--         "dataSource": "blogs"
--       },
--       {
--         "name": "Case Studies",
--         "dataSource": "case-studies"
--       },
--       {
--         "name": "Whitepapers",
--         "path": "/resources/whitepapers"
--       }
--     ]
--   },
--   {
--     "name": "Book",
--     "path": "/book"
--   },
--   {
--     "name": "About",
--     "path": "/about"
--   }
-- ]'::jsonb
-- WHERE id = (SELECT id FROM public.config_navbar LIMIT 1);

-- ================================================
-- 4. CHECK WHITEPAPERS TABLE
-- ================================================
SELECT 'whitepapers' as table_name, COUNT(*) as row_count 
FROM public.whitepapers;

SELECT id, title, file_url 
FROM public.whitepapers 
LIMIT 5;

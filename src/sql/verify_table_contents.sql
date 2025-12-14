-- ========================================
-- VERIFY TABLE CONTENTS
-- ========================================
-- Purpose: Check if tables actually contain data
-- Run these queries in Supabase SQL Editor to see if tables are empty

-- 1. Check config_navbar
SELECT 'config_navbar' as table_name, COUNT(*) as row_count FROM public.config_navbar;
SELECT * FROM public.config_navbar LIMIT 1;

-- 2. Check services
SELECT 'services' as table_name, COUNT(*) as row_count FROM public.services;
SELECT id, title, slug, subtitle FROM public.services ORDER BY id LIMIT 5;

-- 3. Check frameworks
SELECT 'frameworks' as table_name, COUNT(*) as row_count FROM public.frameworks;
SELECT id, title, slug FROM public.frameworks ORDER BY id LIMIT 5;

-- 4. Check industries
SELECT 'industries' as table_name, COUNT(*) as row_count FROM public.industries;
SELECT id, title, slug FROM public.industries ORDER BY id LIMIT 5;

-- 5. Check page_home
SELECT 'page_home' as table_name, COUNT(*) as row_count FROM public.page_home;
SELECT id, outcomes_items FROM public.page_home LIMIT 1;

-- 6. Check assessments  
SELECT 'assessments' as table_name, COUNT(*) as row_count FROM public.assessments;

-- 7. Check articles (blogs)
SELECT 'articles' as table_name, COUNT(*) as row_count FROM public.articles;

-- 8. Check case_studies
SELECT 'case_studies' as table_name, COUNT(*) as row_count FROM public.case_studies;

-- 9. Summary - All table counts
SELECT 
    'config_navbar' as table_name, 
    (SELECT COUNT(*) FROM public.config_navbar) as row_count
UNION ALL
SELECT 
    'services', 
    (SELECT COUNT(*) FROM public.services)
UNION ALL
SELECT 
    'frameworks', 
    (SELECT COUNT(*) FROM public.frameworks)
UNION ALL
SELECT 
    'industries', 
    (SELECT COUNT(*) FROM public.industries)
UNION ALL
SELECT 
    'assessments', 
    (SELECT COUNT(*) FROM public.assessments)
UNION ALL
SELECT 
    'articles', 
    (SELECT COUNT(*) FROM public.articles)
UNION ALL
SELECT 
    'case_studies', 
    (SELECT COUNT(*) FROM public.case_studies)
UNION ALL
SELECT 
    'page_home', 
    (SELECT COUNT(*) FROM public.page_home)
UNION ALL
SELECT 
    'page_contact', 
    (SELECT COUNT(*) FROM public.page_contact)
UNION ALL
SELECT 
    'client_logos', 
    (SELECT COUNT(*) FROM public.client_logos)
ORDER BY row_count DESC;

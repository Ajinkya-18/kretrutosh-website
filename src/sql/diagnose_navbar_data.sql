-- =====================================================
-- DIAGNOSTIC: Check Navbar Data
-- =====================================================
-- Run this to see what data exists in your navbar-related tables
-- =====================================================

-- 1. Check config_navbar
SELECT 'config_navbar' as table_name, * FROM public.config_navbar;

-- 2. Check services count
SELECT 'services' as table_name, COUNT(*) as total_rows FROM public.services;
SELECT * FROM public.services LIMIT 10;

-- 3. Check frameworks count
SELECT 'frameworks' as table_name, COUNT(*) as total_rows FROM public.frameworks;
SELECT * FROM public.frameworks LIMIT 10;

-- 4. Check industries count
SELECT 'industries' as table_name, COUNT(*) as total_rows FROM public.industries;
SELECT * FROM public.industries LIMIT 10;

-- 5. Check assessments count
SELECT 'assessments' as table_name, COUNT(*) as total_rows FROM public.assessments;
SELECT * FROM public.assessments LIMIT 10;

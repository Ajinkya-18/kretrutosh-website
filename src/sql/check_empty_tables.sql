-- Quick check: Are services, frameworks, industries empty?
-- Also check config_navbar menu_items

SELECT 'services' as table_name, COUNT(*) as row_count FROM public.services
UNION ALL
SELECT 'frameworks', COUNT(*) FROM public.frameworks
UNION ALL
SELECT 'industries', COUNT(*) FROM public.industries;

-- Check config_navbar menu_items
SELECT id, menu_items, cta_text, cta_link FROM public.config_navbar;

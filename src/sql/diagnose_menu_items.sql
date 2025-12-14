-- Diagnostic: Check current menu_items structure
SELECT 
    id,
    menu_items,
    jsonb_pretty(menu_items) as formatted_menu_items
FROM public.config_navbar;

-- This will show you the exact structure of your menu_items
-- Check if items have 'dataSource' or 'data_source' properties

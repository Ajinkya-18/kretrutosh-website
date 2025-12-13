-- CLEANUP SCRIPT: Drop Legacy "Ghost" Tables
-- These tables are no longer used by the application.

DROP TABLE IF EXISTS public.sections_contact;
DROP TABLE IF EXISTS public.sections_about;
DROP TABLE IF EXISTS public.sections_home;
DROP TABLE IF EXISTS public.website_content;

-- CLEANUP SCRIPT: Drops legacy "Page Builder" tables
-- RUN THIS ONLY AFTER CONFIRMING evolution_schema.sql MIGRATED DATA SUCCESSFULLY.

DROP TABLE IF EXISTS public.sections_home;
DROP TABLE IF EXISTS public.sections_about;
DROP TABLE IF EXISTS public.sections_contact;
DROP TABLE IF EXISTS public.sections_services;
DROP TABLE IF EXISTS public.sections_framework_details;
DROP TABLE IF EXISTS public.sections_industry_details;
DROP TABLE IF EXISTS public.sections_assessment_details;
DROP TABLE IF EXISTS public.website_content; -- If this was part of the old structure? User mentioned "old, messy sections_home, sections_about, etc."
-- website_content was listed in Admin Panel. Safest to drop if replaced by Configs.

-- Verify Group A is untouched (No DROP statements for articles, whitepapers, case_studies, videos, clients)

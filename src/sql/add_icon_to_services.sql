-- Add 'icon' column to sections_services for Centralized Icon Management
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS icon text;

-- Populate initial icons for known services (based on Homepage Growth Engine default)
UPDATE public.sections_services SET icon = 'Target' WHERE page_slug = 'pre-sales' AND section_key = 'hero';
UPDATE public.sections_services SET icon = 'TrendingUp' WHERE page_slug = 'sales-velocity' AND section_key = 'hero';
UPDATE public.sections_services SET icon = 'Users' WHERE page_slug = 'customer-success' AND section_key = 'hero';
UPDATE public.sections_services SET icon = 'Zap' WHERE page_slug = 'digital-ai' AND section_key = 'hero';
UPDATE public.sections_services SET icon = 'Heart' WHERE page_slug = 'culture-transformation' AND section_key = 'hero';

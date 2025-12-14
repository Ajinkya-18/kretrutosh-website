-- =====================================================
-- ADD OUTCOMES FIELDS TO page_home
-- =====================================================
-- Purpose: Add outcomes section configuration fields to the
-- page_home table to support the Outcomes component
-- =====================================================

ALTER TABLE public.page_home 
ADD COLUMN IF NOT EXISTS outcomes_title TEXT DEFAULT 'Measurable Outcomes',
ADD COLUMN IF NOT EXISTS outcomes_description TEXT DEFAULT 'Results-driven approach to customer-led growth',
ADD COLUMN IF NOT EXISTS outcomes_items JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.page_home.outcomes_title IS 'Title for the Outcomes section on the homepage';
COMMENT ON COLUMN public.page_home.outcomes_description IS 'Description text for the Outcomes section';
COMMENT ON COLUMN public.page_home.outcomes_items IS 'Array of outcome items to display (e.g., ["Increased Revenue", "Higher Retention"])';

-- Update existing rows with default values if they exist
UPDATE public.page_home
SET 
  outcomes_title = COALESCE(outcomes_title, 'Measurable Outcomes'),
  outcomes_description = COALESCE(outcomes_description, 'Results-driven approach to customer-led growth'),
  outcomes_items = COALESCE(outcomes_items, '["Increased Customer Lifetime Value", "Reduced Churn Rate", "Higher Net Promoter Score", "Accelerated Revenue Growth", "Improved Customer Retention"]'::jsonb)
WHERE outcomes_items IS NULL OR outcomes_items = '[]'::jsonb;

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================
-- Run this to verify the schema updates:
-- SELECT id, outcomes_title, outcomes_description, outcomes_items FROM public.page_home;

-- =====================================================
-- CREATE OUTCOMES TABLE
-- =====================================================
-- This script creates a dedicated outcomes table for managing
-- measurable outcomes displayed on the homepage

-- Create outcomes table
CREATE TABLE IF NOT EXISTS public.outcomes (
  id serial PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT DEFAULT 'check-circle',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_outcomes_display_order ON public.outcomes(display_order);

-- Enable RLS (Row Level Security)
ALTER TABLE public.outcomes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
DROP POLICY IF EXISTS "Allow public read access" ON public.outcomes;
CREATE POLICY "Allow public read access" ON public.outcomes
  FOR SELECT USING (true);

-- =====================================================
-- MIGRATE EXISTING DATA
-- =====================================================
-- Migrate existing outcomes from page_home.outcomes_items to outcomes table

-- First, check if there's data to migrate
DO $$
DECLARE
  items_count INTEGER;
BEGIN
  -- Count existing items in outcomes_items
  SELECT COUNT(*) INTO items_count
  FROM (
    SELECT jsonb_array_elements_text(outcomes_items) 
    FROM public.page_home 
    WHERE outcomes_items IS NOT NULL 
    LIMIT 1
  ) subquery;

  -- Only migrate if there's data and outcomes table is empty
  IF items_count > 0 AND NOT EXISTS (SELECT 1 FROM public.outcomes LIMIT 1) THEN
    INSERT INTO public.outcomes (title, display_order)
    SELECT 
      outcome_item::text,
      (row_number() OVER ()) - 1 as display_order
    FROM (
      SELECT jsonb_array_elements_text(outcomes_items) as outcome_item
      FROM public.page_home
      WHERE outcomes_items IS NOT NULL
      LIMIT 1
    ) migration_data;
    
    RAISE NOTICE 'Migrated % outcomes from page_home to outcomes table', items_count;
  ELSE
    RAISE NOTICE 'No migration needed - outcomes table already has data or no source data found';
  END IF;
END $$;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check the outcomes table
SELECT id, title, icon, display_order FROM public.outcomes ORDER BY display_order;

-- Check count
SELECT COUNT(*) as total_outcomes FROM public.outcomes;

-- Show the original data from page_home (for comparison)
SELECT outcomes_items FROM public.page_home LIMIT 1;

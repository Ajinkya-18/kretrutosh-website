-- Universal Ordering System - Database Migration
-- Adds display_order column to all orderable collections
-- Safe to run multiple times (uses IF NOT EXISTS)

-- SERVICES: Add display_order (uses slug as primary key)
ALTER TABLE services ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- FRAMEWORKS: Add display_order
ALTER TABLE frameworks ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- INDUSTRIES: Add display_order
ALTER TABLE industries ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- CASE STUDIES: Add display_order
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- CLIENT LOGOS: Add display_order
ALTER TABLE client_logos ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- VIDEOS: Add display_order
ALTER TABLE videos ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Verification: Show column was added successfully
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE column_name = 'display_order'
  AND table_schema = 'public'
  AND table_name IN ('services', 'frameworks', 'industries', 'case_studies', 'client_logos', 'videos')
ORDER BY table_name;

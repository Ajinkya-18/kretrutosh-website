-- =====================================================
-- ADD DRAG-AND-DROP SUPPORT TO page_contact TABLE
-- =====================================================

-- Add layout_order column (JSONB array of section keys)
ALTER TABLE page_contact 
ADD COLUMN IF NOT EXISTS layout_order JSONB DEFAULT '["hero", "form", "calendly", "address", "map"]'::jsonb;

-- Add section_visibility column (JSONB object with boolean values)
ALTER TABLE page_contact 
ADD COLUMN IF NOT EXISTS section_visibility JSONB DEFAULT '{"hero": true, "form": true, "calendly": true, "address": true, "map": true}'::jsonb;

-- Update existing rows to have the default values if they're null
UPDATE page_contact 
SET layout_order = '["hero", "form", "calendly", "address", "map"]'::jsonb
WHERE layout_order IS NULL;

UPDATE page_contact 
SET section_visibility = '{"hero": true, "form": true, "calendly": true, "address": true, "map": true}'::jsonb
WHERE section_visibility IS NULL;

-- =====================================================
-- ADD DRAG-AND-DROP SUPPORT TO book TABLE
-- =====================================================

-- Add layout_order column (JSONB array of section keys)
ALTER TABLE book 
ADD COLUMN IF NOT EXISTS layout_order JSONB DEFAULT '["hero", "content", "author"]'::jsonb;

-- Add section_visibility column (JSONB object with boolean values)
ALTER TABLE book 
ADD COLUMN IF NOT EXISTS section_visibility JSONB DEFAULT '{"hero": true, "content": true, "author": true}'::jsonb;

-- Update existing rows to have the default values if they're null
UPDATE book 
SET layout_order = '["hero", "content", "author"]'::jsonb
WHERE layout_order IS NULL;

UPDATE book 
SET section_visibility = '{"hero": true, "content": true, "author": true}'::jsonb
WHERE section_visibility IS NULL;

-- =====================================================
-- VERIFY THE CHANGES
-- =====================================================

-- Check page_contact structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'page_contact' 
  AND column_name IN ('layout_order', 'section_visibility');

-- Check book structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'book' 
  AND column_name IN ('layout_order', 'section_visibility');

-- View current data
SELECT id, layout_order, section_visibility FROM page_contact;
SELECT id, layout_order, section_visibility FROM book;

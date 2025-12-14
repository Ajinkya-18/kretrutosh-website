-- ================================================
-- ADD WHITEPAPERS SUPPORT TO NAVBAR DATA FETCHING
-- ================================================
-- Purpose: Enable navbar to fetch whitepapers data
-- This needs to be added to DATA_SOURCE_MAP in Navbar.tsx

-- First, verify whitepapers table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'whitepapers'
ORDER BY ordinal_position;

-- Check if whitepapers have title and slug/id fields
SELECT id, title, COALESCE(slug, id::text) as slug_or_id
FROM public.whitepapers 
LIMIT 5;

-- Verify RLS policy exists for whitepapers (should already be there from unlock_public_access.sql)
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'whitepapers';

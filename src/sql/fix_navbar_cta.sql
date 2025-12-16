-- Fix Navbar CTA Button Data
-- This SQL script adds CTA columns if they don't exist, then sets proper values

-- Step 1: Add cta_text column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='config_navbar' AND column_name='cta_text') THEN
        ALTER TABLE config_navbar ADD COLUMN cta_text TEXT;
    END IF;
END $$;

-- Step 2: Add cta_link column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='config_navbar' AND column_name='cta_link') THEN
        ALTER TABLE config_navbar ADD COLUMN cta_link TEXT;
    END IF;
END $$;

-- Step 3: Update the existing navbar configuration row with CTA data
UPDATE config_navbar
SET 
  cta_text = 'Book Strategy Call',
  cta_link = '/contact'
WHERE id = (SELECT id FROM config_navbar LIMIT 1);

-- Step 4: Verify the update
SELECT id, cta_text, cta_link, logo_url FROM config_navbar;

-- 1. Dynamic SEO System
-- Add meta_title and meta_description to frameworks
ALTER TABLE frameworks 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Add meta_title and meta_description to industries
ALTER TABLE industries 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Add meta_title and meta_description to case_studies
ALTER TABLE case_studies 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Add meta_title and meta_description to pages (if table exists, otherwise create it or skip)
-- Assuming 'pages' table exists as per prompt
ALTER TABLE pages 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT;


-- 2. "Smart" Cross-Linking Engine
-- Add industry_slugs to frameworks (array of text)
ALTER TABLE frameworks
ADD COLUMN IF NOT EXISTS industry_slugs TEXT[] DEFAULT '{}';


-- 3. Homepage "Featured" Logic
-- Add is_featured to case_studies
ALTER TABLE case_studies
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Add is_featured to frameworks
ALTER TABLE frameworks
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Add is_featured to testimonials
ALTER TABLE testimonials
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;


-- 4. Functional Newsletter & Contact
-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on subscribers
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserting subscribers (public)
CREATE POLICY "Allow public insert to subscribers" ON subscribers
    FOR INSERT WITH CHECK (true);

-- Policy to allow reading subscribers (only authenticated/admin)
-- Adjust this based on your actual auth setup
CREATE POLICY "Allow read access to subscribers for authenticated users" ON subscribers
    FOR SELECT USING (auth.role() = 'authenticated');

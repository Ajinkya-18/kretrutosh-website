-- Enable RLS and Create Permissive Policies for All Tables

-- 1. Config Navbar
ALTER TABLE config_navbar ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON config_navbar;
CREATE POLICY "Enable all access for authenticated users" ON config_navbar FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON config_navbar;
CREATE POLICY "Enable read access for public" ON config_navbar FOR SELECT TO anon USING (true);

-- 2. Config Footer
ALTER TABLE config_footer ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON config_footer;
CREATE POLICY "Enable all access for authenticated users" ON config_footer FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON config_footer;
CREATE POLICY "Enable read access for public" ON config_footer FOR SELECT TO anon USING (true);

-- 3. Page Home
ALTER TABLE page_home ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON page_home;
CREATE POLICY "Enable all access for authenticated users" ON page_home FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON page_home;
CREATE POLICY "Enable read access for public" ON page_home FOR SELECT TO anon USING (true);

-- 4. Page About
ALTER TABLE page_about ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON page_about;
CREATE POLICY "Enable all access for authenticated users" ON page_about FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON page_about;
CREATE POLICY "Enable read access for public" ON page_about FOR SELECT TO anon USING (true);

-- 5. Page Contact
ALTER TABLE page_contact ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON page_contact;
CREATE POLICY "Enable all access for authenticated users" ON page_contact FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON page_contact;
CREATE POLICY "Enable read access for public" ON page_contact FOR SELECT TO anon USING (true);

-- 6. Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON services;
CREATE POLICY "Enable all access for authenticated users" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON services;
CREATE POLICY "Enable read access for public" ON services FOR SELECT TO anon USING (true);

-- 7. Industries
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON industries;
CREATE POLICY "Enable all access for authenticated users" ON industries FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON industries;
CREATE POLICY "Enable read access for public" ON industries FOR SELECT TO anon USING (true);

-- 8. Frameworks
ALTER TABLE frameworks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON frameworks;
CREATE POLICY "Enable all access for authenticated users" ON frameworks FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON frameworks;
CREATE POLICY "Enable read access for public" ON frameworks FOR SELECT TO anon USING (true);

-- 9. Case Studies
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON case_studies;
CREATE POLICY "Enable all access for authenticated users" ON case_studies FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON case_studies;
CREATE POLICY "Enable read access for public" ON case_studies FOR SELECT TO anon USING (true);

-- 10. Client Logos (Verify table name, assuming 'client_logos' based on App.tsx)
ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON client_logos;
CREATE POLICY "Enable all access for authenticated users" ON client_logos FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON client_logos;
CREATE POLICY "Enable read access for public" ON client_logos FOR SELECT TO anon USING (true);

-- 11. Videos
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON videos;
CREATE POLICY "Enable all access for authenticated users" ON videos FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON videos;
CREATE POLICY "Enable read access for public" ON videos FOR SELECT TO anon USING (true);

-- 12. Blogs (Articles)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON blogs;
CREATE POLICY "Enable all access for authenticated users" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON blogs;
CREATE POLICY "Enable read access for public" ON blogs FOR SELECT TO anon USING (true);

-- 13. Whitepapers
ALTER TABLE whitepapers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON whitepapers;
CREATE POLICY "Enable all access for authenticated users" ON whitepapers FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON whitepapers;
CREATE POLICY "Enable read access for public" ON whitepapers FOR SELECT TO anon USING (true);

-- 14. Book
ALTER TABLE book ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON book;
CREATE POLICY "Enable all access for authenticated users" ON book FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON book;
CREATE POLICY "Enable read access for public" ON book FOR SELECT TO anon USING (true);

-- 15. Assessments
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON assessments;
CREATE POLICY "Enable all access for authenticated users" ON assessments FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Enable read access for public" ON assessments;
CREATE POLICY "Enable read access for public" ON assessments FOR SELECT TO anon USING (true);

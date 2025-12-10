-- Phase 2: Schema & Data for Industries & Case Studies Link
-- Combined Schema Schema + Data to prevent "missing column" errors.

-- 1. SCHEMA: Ensure 'sections_industry_details' Table and Columns Exist
CREATE TABLE IF NOT EXISTS public.sections_industry_details (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS parent_slug text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS section_key text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS content_body text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS challenges_html text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS approach_html text;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;
ALTER TABLE public.sections_industry_details ADD COLUMN IF NOT EXISTS image_url text; -- Added for completeness

-- Remove 'page_slug' dependency as we use 'parent_slug' in code.

-- 2. SCHEMA: Permissions
ALTER TABLE public.sections_industry_details ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sections_industry_details;
CREATE POLICY "Enable read access for all users" ON public.sections_industry_details FOR SELECT USING (true);


-- 3. DATA: Industries
TRUNCATE TABLE public.industries RESTART IDENTITY CASCADE;
DELETE FROM public.sections_industry_details;

INSERT INTO public.industries (title, slug, subtitle, description, icon_name) VALUES
('Retail & Omni-channel', 'retail', 'Consumer Centric', 'Unify the Store and Digital Experience.', 'ShoppingBag'),
('E-Commerce & D2C', 'ecommerce', 'Digital First', 'Reduce Drop-Offs & Build Sticky Journeys.', 'ShoppingCart'),
('SaaS & B2B Tech', 'saas', 'High Growth', 'Scale ARR, NRR, and Valuation with Customer-Led Growth.', 'Server'),
('Insurance (Life & General)', 'insurance', 'Financial Protection', 'Trust, Transparency, and Digital Ease.', 'Shield'),
('Banking & Financial Services', 'bfsi', 'BFSI', 'Digital Transformation with a Human Core.', 'Landmark'),
('Consumer Goods & Manufacturing', 'manufacturing', 'FMCG / CPG', 'Brand Promise Delivery at Scale.', 'Factory'),
('Healthcare & HealthTech', 'healthcare', 'Health & Wellness', 'Patient-Centric Care Models.', 'Stethoscope'),
('Education & EdTech', 'edtech', 'Learning', 'Student Success as a Growth Driver.', 'GraduationCap');

-- 4. DATA: Industry Sections (Using parent_slug)
INSERT INTO public.sections_industry_details (parent_slug, section_key, title, content_body, challenges_html, approach_html, display_order) VALUES

-- 1. RETAIL
('retail', 'hero', 'Reinvent Retail Around Customer Expectations', 'From store experience to digital journeys, we help retail brands increase conversions, AOV, and retention.', NULL, NULL, 1),
('retail', 'challenges', 'Why Retail is Broken', NULL, 
 '<ul><li><strong>Discovery Gap:</strong> Customers expect intuitive search; retailers deliver generic catalogs.</li><li><strong>Store Experience Gap:</strong> Variable staff behavior vs. consistent service expectations.</li><li><strong>Omnichannel Gap:</strong> Digital and store data do not talk to each other.</li></ul>', NULL, 2),
('retail', 'approach', 'Our Approach', NULL, NULL, 
 '<ul><li><strong>Behavioral Persona Mapping:</strong> Segmenting by buying triggers, not just demographics.</li><li><strong>Store & Digital Journey Mapping:</strong> End-to-end redesign using EMM.</li><li><strong>HAND™ Culture Transformation:</strong> Aligning frontline staff behavior to brand promises.</li></ul>', 3),

-- 2. E-COMMERCE
('ecommerce', 'hero', 'Reduce Drop-Offs & Build Sticky Journeys', 'Expectation-aligned journey design that improves acquisition, conversion, and LTV.', NULL, NULL, 1),
('ecommerce', 'challenges', 'E-Commerce Expectation Gaps', NULL, 
 '<ul><li><strong>Add-to-Cart Drop-off:</strong> Hidden charges and lack of trust signals.</li><li><strong>Post-Purchase Gap:</strong> Poor communication on delivery and returns.</li><li><strong>Retention Gap:</strong> Generic automation instead of personalized value loops.</li></ul>', NULL, 2),
('ecommerce', 'approach', 'Our Approach', NULL, NULL, 
 '<ul><li><strong>Full-Funnel Redesign:</strong> Using EMM on PDP, Checkout, and Unboxing.</li><li><strong>VRM™ for CRO:</strong> Connecting experience improvements to economic outcomes.</li><li><strong>9Ps Advocacy Engine:</strong> turning buyers into storytellers.</li></ul>', 3),

-- 3. SAAS
('saas', 'hero', 'Increase NRR, Reduce Churn & Accelerate Value', 'Align GTM, Sales, and CS to a unified lifecycle using Heatmaps and VICTORY™.', NULL, NULL, 1),
('saas', 'challenges', 'The State of SaaS', NULL, 
 '<ul><li><strong>Onboarding Gap:</strong> Feature dumps instead of value delivery.</li><li><strong>Value Gap:</strong> Usage dashboards that don''t show business outcomes.</li><li><strong>Expansion Gap:</strong> No structured cross-sell motions.</li></ul>', NULL, 2),
('saas', 'approach', 'Our Approach', NULL, NULL, 
 '<ul><li><strong>Lifecycle Heatmap:</strong> Identifying risk and expansion zones.</li><li><strong>VICTORY™ Framework:</strong> A 7-stage engine for renewal and upsell.</li><li><strong>CS Maturity Model (31Q):</strong> Diagnosing and fixing operational gaps.</li></ul>', 3),

-- 4. INSURANCE
('insurance', 'hero', 'Design Expectation-Led Insurance Journeys', 'From quote-to-issue drop-offs to claims pain-points—we build digital-first insurance journeys.', NULL, NULL, 1),
('insurance', 'challenges', 'Insurance Expectation Gaps', NULL, 
 '<ul><li><strong>Quote Drop-off:</strong> Complex forms and unclear premiums.</li><li><strong>Underwriting Delay:</strong> Manual processes causing days of wait time.</li><li><strong>Claims Friction:</strong> Lack of empathy and transparency in moments of truth.</li></ul>', NULL, 2),
('insurance', 'approach', 'Our Approach', NULL, NULL, 
 '<ul><li><strong>Insurance 360:</strong> Unified customer view for better risk/renewal decisions.</li><li><strong>VRM + AI:</strong> Reducing underwriting time (e.g., 3.8 days to 10 mins).</li><li><strong>EAR™ Framework:</strong> Empathy training for claims teams.</li></ul>', 3),

-- 5. BFSI
('bfsi', 'hero', 'Accelerate Digital Banking Adoption', 'Improve Customer Lifetime Value across Accounts, Cards, Loans & Wealth.', NULL, NULL, 1),
('bfsi', 'challenges', 'Banking Trust & Speed Gaps', NULL, 
 '<ul><li><strong>Onboarding Friction:</strong> Multi-step KYC and slow approvals.</li><li><strong>Loan Processing:</strong> Opaque timelines and heavy documentation.</li><li><strong>Siloed Service:</strong> Branch and digital experiences are disconnected.</li></ul>', NULL, 2),
('bfsi', 'approach', 'Our Approach', NULL, NULL, 
 '<ul><li><strong>BFSI 360:</strong> Unified view of accounts, loans, and interactions.</li><li><strong>Digital Journey Redesign:</strong> Frictionless account opening and loan flows.</li><li><strong>HAND™ Culture:</strong> Aligning branch and contact center behaviors.</li></ul>', 3),

-- 6. MANUFACTURING
('manufacturing', 'hero', 'Design B2B Experiences That Improve Trust', 'Improve cross-sell, distributor engagement, and operational consistency.', NULL, NULL, 1),
('manufacturing', 'challenges', 'B2B & Channel Gaps', NULL, 
 '<ul><li><strong>Distributor Gap:</strong> Lack of visibility and predictability in orders.</li><li><strong>Internal Silos:</strong> R&D, Sales, and Ops not aligned on customer promise.</li><li><strong>Value Gap:</strong> Products sold on specs, not business outcomes.</li></ul>', NULL, 2),
('manufacturing', 'approach', 'Our Approach', NULL, NULL, 
 '<ul><li><strong>Partner Persona Mapping:</strong> Understanding distributor motivations.</li><li><strong>VRM™ for B2B:</strong> Linking product features to customer economic gain.</li><li><strong>Symega Method:</strong> Culture transformation to align silos.</li></ul>', 3),

-- 7. HEALTHCARE
('healthcare', 'hero', 'Humanize Patient & Caregiver Journeys', 'Redesign healthcare experiences to improve trust, satisfaction, and outcomes.', NULL, NULL, 1),
('healthcare', 'challenges', 'Healthcare Empathy Gaps', NULL, 
 '<ul><li><strong>Admissions Friction:</strong> Confusing paperwork and high anxiety.</li><li><strong>Communication Gap:</strong> Technical jargon instead of clear guidance.</li><li><strong>Discharge Gap:</strong> Lack of clarity on post-care steps.</li></ul>', NULL, 2),
('healthcare', 'approach', 'Our Approach', NULL, NULL, 
 '<ul><li><strong>EAR™ Framework:</strong> Operationalizing empathy for clinical teams.</li><li><strong>Patient Journey Mapping:</strong> Reducing anxiety at every touchpoint.</li><li><strong>Digital Triage:</strong> AI-enabled booking and follow-up flows.</li></ul>', 3),

-- 8. EDTECH
('edtech', 'hero', 'Improve Student Success & Retention', 'From enrollment to engagement, improve retention and learning outcomes.', NULL, NULL, 1),
('edtech', 'challenges', 'Learning Journey Gaps', NULL, 
 '<ul><li><strong>Drop-out Gap:</strong> Students lose momentum without personalized nudges.</li><li><strong>Freemium Gap:</strong> High signups but low conversion to premium.</li><li><strong>Support Gap:</strong> Delayed responses to academic queries.</li></ul>', NULL, 2),
('edtech', 'approach', 'Our Approach', NULL, NULL, 
 '<ul><li><strong>Behavioral Personas:</strong> Mapping learning styles and motivations.</li><li><strong>Adoption Engine:</strong> Automated nudges based on student progress.</li><li><strong>VRM™ for Education:</strong> Visualizing progress to drive premium conversion.</li></ul>', 3);

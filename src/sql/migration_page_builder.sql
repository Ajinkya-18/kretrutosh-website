-- 1. Create Tables (Idempotent Pattern)

-- Table A: sections_about
CREATE TABLE IF NOT EXISTS public.sections_about (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);
-- Ensure columns exist
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS section_key text;
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS subtitle text;
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS content_body text;
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS grid_columns int4 DEFAULT 1;
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS alignment text DEFAULT 'left';
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS bg_theme text DEFAULT 'light';
ALTER TABLE public.sections_about ADD COLUMN IF NOT EXISTS admin_instruction text;

-- Ensure Unique Constraint for sections_about
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'sections_about_section_key_key') THEN
        ALTER TABLE public.sections_about ADD CONSTRAINT sections_about_section_key_key UNIQUE (section_key);
    END IF;
END $$;


-- Table B: sections_contact
CREATE TABLE IF NOT EXISTS public.sections_contact (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);
-- Ensure columns exist
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS section_key text;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS subtitle text;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS content_body text;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS specific_data jsonb;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS grid_columns int4 DEFAULT 1;
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS alignment text DEFAULT 'left';
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS bg_theme text DEFAULT 'light';
ALTER TABLE public.sections_contact ADD COLUMN IF NOT EXISTS admin_instruction text;

-- Ensure Unique Constraint for sections_contact
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'sections_contact_section_key_key') THEN
        ALTER TABLE public.sections_contact ADD CONSTRAINT sections_contact_section_key_key UNIQUE (section_key);
    END IF;
END $$;


-- Table C: sections_services
CREATE TABLE IF NOT EXISTS public.sections_services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Standardize sections_services column (service_slug -> page_slug)
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sections_services' AND column_name = 'service_slug') THEN
        ALTER TABLE public.sections_services RENAME COLUMN service_slug TO page_slug;
    END IF;
END $$;

-- Ensure columns exist
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS page_slug text;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS section_key text;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS subtitle text;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS specific_data jsonb;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS primary_cta_text text;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS primary_cta_link text;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS grid_columns int4 DEFAULT 1;
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS alignment text DEFAULT 'left';
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS bg_theme text DEFAULT 'light';
ALTER TABLE public.sections_services ADD COLUMN IF NOT EXISTS admin_instruction text;

-- Ensure Unique Constraint for sections_services (Composite Key)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'sections_services_slug_key_unique') THEN
        ALTER TABLE public.sections_services ADD CONSTRAINT sections_services_slug_key_unique UNIQUE (page_slug, section_key);
    END IF;
END $$;


-- Table D: sections_industries
CREATE TABLE IF NOT EXISTS public.sections_industries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Standardize sections_industries column (industry_slug -> page_slug)
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sections_industries' AND column_name = 'industry_slug') THEN
        ALTER TABLE public.sections_industries RENAME COLUMN industry_slug TO page_slug;
    END IF;
END $$;

-- Ensure columns exist
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS display_order int4 DEFAULT 0;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS page_slug text;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS section_key text;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS subtitle text;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS specific_data jsonb;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS primary_cta_text text;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS primary_cta_link text;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS grid_columns int4 DEFAULT 1;
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS alignment text DEFAULT 'left';
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS bg_theme text DEFAULT 'light';
ALTER TABLE public.sections_industries ADD COLUMN IF NOT EXISTS admin_instruction text;

-- Ensure Unique Constraint for sections_industries (Composite Key)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'sections_industries_slug_key_unique') THEN
        ALTER TABLE public.sections_industries ADD CONSTRAINT sections_industries_slug_key_unique UNIQUE (page_slug, section_key);
    END IF;
END $$;


-- Enable RLS (Safe to run consistently)
ALTER TABLE public.sections_about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections_contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections_industries ENABLE ROW LEVEL SECURITY;

-- Policies (Drop and Recreate for Safety)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sections_about;
CREATE POLICY "Enable read access for all users" ON public.sections_about FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable read access for all users" ON public.sections_contact;
CREATE POLICY "Enable read access for all users" ON public.sections_contact FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable read access for all users" ON public.sections_services;
CREATE POLICY "Enable read access for all users" ON public.sections_services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable read access for all users" ON public.sections_industries;
CREATE POLICY "Enable read access for all users" ON public.sections_industries FOR SELECT USING (true);

-- 2. Data Migration (Upsert Pattern)

-- About Page
INSERT INTO public.sections_about (display_order, section_key, title, subtitle, content_body, bg_theme, admin_instruction) VALUES
(1, 'hero', 'About KretruTosh Consulting', 'Founder-Led. Outcome-Obsessed. Transformation Partners.', NULL, 'navy', 'Hero Section: Main headline and subheadline for the About page.'),
(2, 'founder_story', 'The Story', NULL, 'KretruTosh Consulting was born from a simple observation: Most consulting stops at strategy. We started to bridge the gap between "Slide Decks" and "Balance Sheets". Our founder, with 20+ years of experience unlocking $80M+ in revenue, realized that true growth comes from connecting the dots between Customer Experience, Sales Velocity, and Culture.', 'light', 'Founder Story: Edit the rich text content body to update the story.'),
(3, 'philosophy', 'Our Philosophy', 'Kretru + Tosh', 'Kretru (Customer) + Tosh (Delight). It is not just our name, it is our operating model. We believe that when you align your internal culture and processes to deliver on customer expectations, revenue is the inevitable outcome.', 'gray', 'Philosophy Section: Explain the brand name and core belief.'),
(4, 'who_we_are', 'Who We Are', NULL, 'We are a collective of GTM strategists, CX architects, and Culture transformers. We do not just advise; we execute. We work alongside your teams to build the engines that drive sustainable growth.', 'light', 'Who We Are: Description of the team and approach.')
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  content_body = EXCLUDED.content_body,
  bg_theme = EXCLUDED.bg_theme,
  admin_instruction = EXCLUDED.admin_instruction;


-- Contact Page
INSERT INTO public.sections_contact (display_order, section_key, title, subtitle, content_body, bg_theme, admin_instruction) VALUES
(1, 'hero', 'Let''s Build Your Growth Engine',  'Ready to transform your Go-To-Market velocity? Schedule a conversation with our team.', NULL, 'navy', 'Hero Section: Contact page header.'),
(2, 'info_block', 'Contact Information', NULL, 'Email: hello@kretrutosh.com\nLocation: Global (Remote-First)\nConnect on LinkedIn for daily insights.', 'light', 'Info Block: Email, location, and social prompts.'),
(3, 'strategy_block', 'Why Book a Strategy Review?', NULL, '• Get a clear assessment of your current GTM velocity.\n• Identify the #1 bottleneck slowing you down.\n• Walk away with 3 actionable next steps.\n\nNo pitch. Just value.', 'gray', 'Strategy Block: Explains the value of the consultation.')
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  content_body = EXCLUDED.content_body,
  bg_theme = EXCLUDED.bg_theme,
  admin_instruction = EXCLUDED.admin_instruction;


-- Services
INSERT INTO public.sections_services (page_slug, display_order, section_key, title, subtitle, bg_theme, specific_data, primary_cta_text, admin_instruction) VALUES
-- Pre-Sales
('pre-sales', 1, 'hero', 'Build a High-Accuracy Go-To-Market Foundation', 'Align your brand promise, personas, messaging and expectation frameworks to consistently bring the right customers into your pipeline.', 'navy', '{"badge": "Pre-Sales Transformation"}', 'Book a GTM Strategy Review', 'Hero for Pre-Sales page.'),
('pre-sales', 2, 'problem_block', 'Why Pre-Sales Fails', 'Most systems fail due to lack of clarity, alignment, and expectation matching.', 'light', '{"list": ["Clarity of promise missing", "Demographic instead of behavioral personas", "Feature-first pitching", "Marketing-Sales misalignment", "Expectation-Delivery gaps"]}', NULL, 'Problem statement with bullet points.'),
('pre-sales', 3, 'approach_steps', 'Our Approach: Anchored in Frameworks', 'Using your actual frameworks to drive alignment.', 'gray', '{"steps": [{"title": "CX Maturity Diagnostic", "desc": "Baselines Brand Promise delivery."}, {"title": "Expectation Management (EMM)", "desc": "Maps expectations to delivery."}, {"title": "Persona-Product-Pitch", "desc": "Defines who, what, and how we pitch."}, {"title": "Peak Purpose Workshops", "desc": "Aligns leadership on Vision/Mission."}, {"title": "Discovery Storylines", "desc": "Repeatable GTM structure."}]}', NULL, 'Outcome/Approach steps.'),
('pre-sales', 4, 'outcomes_grid', 'Measurable Impact', 'Real outcomes from our engagements.', 'light', '{"stats": [{"label": "Marketing ROI", "value": "+15-25%"}, {"label": "Retention", "value": "+12-25%"}, {"label": "Funnel Predictability", "value": "+20-30%"}, {"label": "Decision Speed", "value": "+25%"}]}', 'Explore Case Studies', 'Key metrics grid.'),

-- Sales Velocity
('sales-velocity', 1, 'hero', 'Accelerate Sales Velocity With Value-Led Selling', 'Shorten sales cycles, improve conversion, and increase predictability using expectation-led, value-driven storytelling.', 'navy', '{"badge": "Sales Velocity"}', 'Book a Sales Velocity Audit', 'Hero'),
('sales-velocity', 2, 'problem_block', 'When Sales Velocity Suffers', 'Common bottlenecks in the sales process.', 'light', '{"list": ["Shallow discovery", "Misaligned expectations", "Inconsistent pitching", "Value not tied to KPIs", "Broken Sales-CS handoff"]}', NULL, 'Problem list'),
('sales-velocity', 3, 'approach_steps', 'Our Approach', 'Systematic intervention for speed and quality.', 'gray', '{"steps": [{"title": "PPP Playbook", "desc": "From feature demo to expectation alignment."}, {"title": "Value Realization Map", "desc": "Links capabilities to business KPIs."}, {"title": "Expectation Management", "desc": "Anticipates friction points."}, {"title": "Sales Governance", "desc": "Forecast accuracy structures."}, {"title": "Sales-CS Alignment", "desc": "Integrated lifecycle flow."}]}', NULL, 'Approach steps'),
('sales-velocity', 4, 'outcomes_grid', 'Outcomes', NULL, 'light', '{"stats": [{"label": "Sales Velocity", "value": "2x-5x"}, {"label": "Conversion", "value": "+15-30%"}, {"label": "Forecast Accuracy", "value": "+15-32%"}]}', NULL, 'Outcomes'),

-- Customer Success
('customer-success', 1, 'hero', 'Transform Customer Success Into a Revenue Engine', 'Design segmentation, journeys, value realization, health scoring and advocacy motions that increase retention, expansion and NRR.', 'navy', '{"badge": "Customer Success"}', 'Take CS Maturity Assessment', 'Hero'),
('customer-success', 2, 'problem_block', 'The CS Struggle', 'Why CS teams get stuck in reactive modes.', 'light', '{"list": ["Trapped in ticket-solving", "No lifecycle view", "Last-minute renewals", "Value not communicated", "No advocacy program"]}', NULL, 'Problems'),
('customer-success', 3, 'approach_steps', 'Our Approach: The Post-Sales System', 'Operationalizing success for revenue.', 'gray', '{"steps": [{"title": "CS Maturity Model", "desc": "10-domain diagnostic."}, {"title": "Lifecycle Heatmap", "desc": "Maps risk and expansion signals."}, {"title": "VICTORY Framework", "desc": "CS-to-Revenue methodology."}, {"title": "VRM", "desc": "Connects outcomes to economics."}, {"title": "9Ps Advocacy", "desc": "Turns customers into advocates."}]}', NULL, 'Approach'),
('customer-success', 4, 'outcomes_grid', 'Outcomes', NULL, 'light', '{"stats": [{"label": "Retention", "value": "+12-25%"}, {"label": "NRR", "value": "+10-25%"}, {"label": "Churn Reduction", "value": "20-35%"}, {"label": "Advocacy", "value": "2-3x"}]}', NULL, 'Stats'),

-- Digital & AI
('digital-ai', 1, 'hero', 'Digitize Journeys. Unify Data. Amplify Impact.', 'Design digital journeys, feedback loops, AI automation, and Customer 360 systems that improve decision-making.', 'navy', '{"badge": "Digital & AI Enablement"}', 'Book Digital Review', 'Hero'),
('digital-ai', 2, 'problem_block', 'Why Digital Fails', 'Common pitfalls in tech implementation.', 'light', '{"list": ["Tools without value definition", "Data silos", "Insights not actionable", "Superficial AI", "No ROI measurement"]}', NULL, 'Problems'),
('digital-ai', 3, 'approach_steps', 'Our Approach: Digital System', 'Unifying data and experience.', 'gray', '{"steps": [{"title": "Customer 360", "desc": "Unifies sentiment and interaction data."}, {"title": "Journey Digitization", "desc": "Mapping quote-to-claim journeys."}, {"title": "Feedback Loops", "desc": "NPS/CSAT to action."}, {"title": "AI Enablement", "desc": "Predictive churn & propensity modles."}, {"title": "ROI Measurement", "desc": "Using CX ROI Calculator."}]}', NULL, 'Approach'),
('digital-ai', 4, 'outcomes_grid', 'Outcomes', NULL, 'light', '{"stats": [{"label": "Platform Adoption", "value": "+23-28%"}, {"label": "Platform ROI", "value": "+12-18%"}, {"label": "Action Conversion", "value": "+25-30%"}]}', NULL, 'Stats'),

-- Culture Transformation
('culture-transformation', 1, 'hero', 'Build a Humanized, Aligned, Nimble & Data-Backed Culture', 'Translate core values into daily behaviors, performance systems, and rituals that sustain customer-led growth.', 'navy', '{"badge": "Culture Transformation"}', 'Book Culture Conversation', 'Hero'),
('culture-transformation', 2, 'problem_block', 'Why Culture Breaks', 'Barriers to a high-performance culture.', 'light', '{"list": ["Values are just posters", "Leadership misalignment", "No unified purpose", "Hiring mismatches", "High attrition"]}', NULL, 'Problems'),
('culture-transformation', 3, 'approach_steps', 'Our Approach: HAND Framework', 'Making culture measurable and actionable.', 'gray', '{"steps": [{"title": "Culture Maturity Assessment", "desc": "Baseline collaboration & agility."}, {"title": "HAND Framework", "desc": "Humanized, Aligned, Nimble, Data-backed."}, {"title": "Values Actualization", "desc": "Workshops to live the values."}, {"title": "Hiring Alignment", "desc": "Scorecards aligned to values."}, {"title": "Leadership Rituals", "desc": "Storytelling and communication."}]}', NULL, 'Approach'),
('culture-transformation', 4, 'outcomes_grid', 'Outcomes', NULL, 'light', '{"stats": [{"label": "eNPS", "value": "+10-15pp"}, {"label": "Attrition", "value": "Reduced"}, {"label": "Collaboration", "value": "Improved"}, {"label": "Innovation Speed", "value": "Increased"}]}', NULL, 'Stats')
ON CONFLICT (page_slug, section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  bg_theme = EXCLUDED.bg_theme,
  specific_data = EXCLUDED.specific_data,
  primary_cta_text = EXCLUDED.primary_cta_text,
  admin_instruction = EXCLUDED.admin_instruction;


-- Industries: Samples (Retail, SaaS, BFSI, Insurance, Telecom, Consumer, Healthcare, Education)
INSERT INTO public.sections_industries (page_slug, display_order, section_key, title, description, bg_theme, specific_data, admin_instruction) VALUES
-- 1. SaaS & B2B Tech
('saas', 1, 'hero', 'SaaS & B2B Tech', 'Scale ARR, NRR, and Valuation with Customer-Led Growth.', 'navy', '{"subtitle": "High Growth"}', 'Hero'),
('saas', 2, 'challenges', 'Key Challenges', NULL, 'light', '{"list": ["High Churn / Low Retention", "Stagnant NRR", "Feature-centric Sales Pitch", "Low Adoption of New Features"]}', 'Challenges'),
('saas', 3, 'approach', 'The KretruTosh Approach', 'We help SaaS companies shift from "Growth at all costs" to "Efficient, Durable Growth". By optimizing the post-sales motion and aligning GTM strategies, we unlock Net Revenue Retention and Advocacy.', 'light', NULL, 'Approach'),
('saas', 4, 'outcomes', 'Industry Outcomes', NULL, 'accent', '{"list": ["ARR Growth +20-45%", "NRR Improvement +10-25%", "Churn Reduction 20-35%", "Sales Velocity 2-5x"]}', 'Outcomes'),

-- 2. Retail
('retail', 1, 'hero', 'Retail & Omni-channel', 'Unify the Store and Digital Experience.', 'navy', '{"subtitle": "Consumer Centric"}', 'Hero'),
('retail', 2, 'challenges', 'Key Challenges', NULL, 'light', '{"list": ["Disconnected Online/Offline Journeys", "Low Footfall Conversion", "Inconsistent Service Quality", "Employee Attrition"]}', 'Challenges'),
('retail', 3, 'approach', 'The KretruTosh Approach', 'We bring the "Human Touch" to digital and "Digital Intelligence" to the store. Our frameworks help you measure and manage experience consistency across every channel.', 'light', NULL, 'Approach'),
('retail', 4, 'outcomes', 'Industry Outcomes', NULL, 'accent', '{"list": ["Like-for-Like Sales +31%", "Footfall Conversion +14-31%", "Average Spend Uplift", "CSAT +18-33%"]}', 'Outcomes'),

-- 3. Insurance
('insurance', 1, 'hero', 'Insurance (Life & General)', 'Trust, Transparency, and Digital Ease.', 'navy', '{"subtitle": "Financial Protection"}', 'Hero'),
('insurance', 2, 'challenges', 'Key Challenges', NULL, 'light', '{"list": ["High Drop-off in Quote Journey", "Complex Claims Process", "Low Customer Engagement", "Legacy Systems"]}', 'Challenges'),
('insurance', 3, 'approach', 'The KretruTosh Approach', 'We simplify the complex. By mapping the customer''s emotional journey against your digital processes, we remove friction and build trust at moments of truth.', 'light', NULL, 'Approach'),
('insurance', 4, 'outcomes', 'Industry Outcomes', NULL, 'accent', '{"list": ["Drop-off Reduced 15-22%", "Quote-to-Issue Conversion Uplift", "NPS +12-20 points", "Claims Automation Efficiency"]}', 'Outcomes'),

-- Placeholder for others
('bfsi', 1, 'hero', 'Banking & Financial Services', 'Digital Transformation with a Human Core.', 'navy', '{"subtitle": "BFSI"}', 'Hero'),
('telecom', 1, 'hero', 'Telecom & Digital', 'Connecting Experience to Loyalty.', 'navy', '{"subtitle": "Connectivity"}', 'Hero'),
('consumer', 1, 'hero', 'Consumer Goods', 'Brand Promise Delivery at Scale.', 'navy', '{"subtitle": "FMCG / CPG"}', 'Hero'),
('healthcare', 1, 'hero', 'Healthcare & HealthTech', 'Patient-Centric Care Models.', 'navy', '{"subtitle": "Health & Wellness"}', 'Hero'),
('education', 1, 'hero', 'Education & EdTech', 'Student Success as a Growth Driver.', 'navy', '{"subtitle": "Learning"}', 'Hero')
ON CONFLICT (page_slug, section_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  bg_theme = EXCLUDED.bg_theme,
  specific_data = EXCLUDED.specific_data,
  admin_instruction = EXCLUDED.admin_instruction;

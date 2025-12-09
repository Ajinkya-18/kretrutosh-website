-- Ensure 'admin_instruction' column exists in sections_home (Fix for missing column error)
ALTER TABLE public.sections_home ADD COLUMN IF NOT EXISTS admin_instruction text;

-- Ensure 'assessments' section exists in Homepage
INSERT INTO public.sections_home (
  section_key, 
  title, 
  description, 
  display_order, 
  grid_columns, 
  bg_theme, 
  is_visible,
  admin_instruction
)
SELECT 
  'assessments', 
  'Assess Your Maturity', 
  'Identify gaps and opportunities with our proprietary diagnostic tools.', 
  60, -- Adjust as needed
  3, 
  'light', 
  true,
  'This section displays the top 3 items from the Assessments table.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.sections_home WHERE section_key = 'assessments'
);

-- Ensure 'thought_leadership' section exists in Homepage with 4 columns
INSERT INTO public.sections_home (
  section_key, 
  title, 
  description, 
  display_order, 
  grid_columns, 
  bg_theme, 
  is_visible,
  admin_instruction
)
SELECT 
  'thought_leadership', 
  'Thought Leadership Hub', 
  'Insights, strategies, and conversations shaping the future of growth.', 
  70, -- Below Assessments
  4, -- Updated to 4 columns (Podcast, Book, WP1, WP2)
  'muted', 
  true,
  'This section automatically pulls the Book, Podcast link, and latest 2 Whitepapers.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.sections_home WHERE section_key = 'thought_leadership'
);

-- Update thought_leadership to have 4 columns if it already exists (fix legacy 3 col)
UPDATE public.sections_home 
SET grid_columns = 4, bg_theme = 'muted'
WHERE section_key = 'thought_leadership';
-- Migration Content Sweep: Moving Hardcoded Content to DB

-- 1. Growth Engine Motions (Structured Data)
-- We update the 'growth_engine' section in sections_home with the specific_data JSON.
UPDATE public.sections_home
SET specific_data = '{
  "motions": [
    {
      "icon": "Target",
      "title": "Pre-Sales Transformation",
      "description": "Aligning brand purpose with market needs.",
      "link": "/services/pre-sales"
    },
    {
      "icon": "TrendingUp",
      "title": "Sales Velocity",
      "description": "Accelerating acquisition and conversion.",
      "link": "/services/sales"
    },
    {
      "icon": "Users",
      "title": "Post Sales / CS",
      "description": "Driving retention and expansion.",
      "link": "/services/post-sales"
    },
    {
      "icon": "Zap",
      "title": "Digital & AI Enablement",
      "description": "Empowering teams with unified data.",
      "link": "/services/digital-enablement"
    },
    {
      "icon": "Heart",
      "title": "Culture Transformation",
      "description": "Building a customer-centric DNA.",
      "link": "/services/culture-transformation"
    }
  ]
}'::jsonb
WHERE section_key = 'growth_engine';

-- 2. Outcomes Items (Structured List)
-- Update outcomes section with specific items found in code/brief
UPDATE public.sections_home
SET specific_data = '{
  "items": [
    "Predictable Revenue Growth",
    "Increased Customer Lifetime Value",
    "Reduced Churn Rate",
    "Aligned Go-To-Market Teams",
    "Data-Driven Decision Making"
  ]
}'::jsonb
WHERE section_key = 'outcomes';

-- 3. Age of Kretru (Book) Quote
UPDATE public.sections_home
SET specific_data = '{
  "quote": "If you are not delivering value at every touchpoint, you are not just losing a sale; you are losing a relationship."
}'::jsonb
WHERE section_key = 'age_of_kretru';
-- Migration Integrity Restore: Fixing discrepancies between Brief and DB

-- 1. Retail "Expectation Gaps" (Replace generic challenges with specific gaps)
-- The Brief lists 6 specific gaps: Discovery, Store, Digital, Feedback, Culture, Omnichannel.
UPDATE public.sections_industries
SET specific_data = '{
  "list": [
    "Discovery Expectation Gap: Customers expect intuitive search & personalization, but often face generic experiences.",
    "Store Experience Gap: Customers expect informed staff vs. the reality of inconsistent service variability.",
    "Digital Experience Gap: Customers expect seamless checkout vs. multi-step friction and unclear returns.",
    "Feedback & VOC Gap: Insights are often collected but rarely converted into revenue outcomes.",
    "Culture Gap: Frontline values are not operationalized, leading to 80% of the experience being unmanaged.",
    "Omnichannel Gap: Digital and store systems do not talk to each other, creating disconnected journeys."
  ]
}'::jsonb
WHERE page_slug = 'retail' AND section_key = 'challenges';


-- 2. Pre-Sales "Measurable Outcomes" (Precision Update)
-- Brief Logic: +20–25% BD ROI, +15% qualification, faster pitch-to-close.
UPDATE public.sections_services
SET specific_data = '{
  "stats": [
    { "label": "BD / Mktg ROI", "value": "+20-25%" },
    { "label": "Qualification", "value": "+15%" },
    { "label": "GTM Velocity", "value": "Faster" },
    { "label": "Decision Speed", "value": "+25%" }
  ]
}'::jsonb
WHERE page_slug = 'pre-sales' AND section_key = 'outcomes_grid';

-- SEED SCRIPT: Populate Industries Content directly
-- Bypasses missing 'sections_industry_details' table.
-- Source: update_industries.sql content.

-- 1. RETAIL
UPDATE public.industries
SET 
    challenges_html = '<ul><li><strong>Discovery Gap:</strong> Customers expect intuitive search; retailers deliver generic catalogs.</li><li><strong>Store Experience Gap:</strong> Variable staff behavior vs. consistent service expectations.</li><li><strong>Omnichannel Gap:</strong> Digital and store data do not talk to each other.</li></ul>',
    approach_html = '<ul><li><strong>Behavioral Persona Mapping:</strong> Segmenting by buying triggers, not just demographics.</li><li><strong>Store & Digital Journey Mapping:</strong> End-to-end redesign using EMM.</li><li><strong>HAND™ Culture Transformation:</strong> Aligning frontline staff behavior to brand promises.</li></ul>'
WHERE slug = 'retail';

-- 2. E-COMMERCE
UPDATE public.industries
SET 
    challenges_html = '<ul><li><strong>Add-to-Cart Drop-off:</strong> Hidden charges and lack of trust signals.</li><li><strong>Post-Purchase Gap:</strong> Poor communication on delivery and returns.</li><li><strong>Retention Gap:</strong> Generic automation instead of personalized value loops.</li></ul>',
    approach_html = '<ul><li><strong>Full-Funnel Redesign:</strong> Using EMM on PDP, Checkout, and Unboxing.</li><li><strong>VRM™ for CRO:</strong> Connecting experience improvements to economic outcomes.</li><li><strong>9Ps Advocacy Engine:</strong> turning buyers into storytellers.</li></ul>'
WHERE slug = 'ecommerce';

-- 3. SAAS
UPDATE public.industries
SET 
    challenges_html = '<ul><li><strong>Onboarding Gap:</strong> Feature dumps instead of value delivery.</li><li><strong>Value Gap:</strong> Usage dashboards that don''t show business outcomes.</li><li><strong>Expansion Gap:</strong> No structured cross-sell motions.</li></ul>',
    approach_html = '<ul><li><strong>Lifecycle Heatmap:</strong> Identifying risk and expansion zones.</li><li><strong>VICTORY™ Framework:</strong> A 7-stage engine for renewal and upsell.</li><li><strong>CS Maturity Model (31Q):</strong> Diagnosing and fixing operational gaps.</li></ul>'
WHERE slug = 'saas';

-- 4. INSURANCE
UPDATE public.industries
SET 
    challenges_html = '<ul><li><strong>Quote Drop-off:</strong> Complex forms and unclear premiums.</li><li><strong>Underwriting Delay:</strong> Manual processes causing days of wait time.</li><li><strong>Claims Friction:</strong> Lack of empathy and transparency in moments of truth.</li></ul>',
    approach_html = '<ul><li><strong>Insurance 360:</strong> Unified customer view for better risk/renewal decisions.</li><li><strong>VRM + AI:</strong> Reducing underwriting time (e.g., 3.8 days to 10 mins).</li><li><strong>EAR™ Framework:</strong> Empathy training for claims teams.</li></ul>'
WHERE slug = 'insurance';

-- 5. BFSI
UPDATE public.industries
SET 
    challenges_html = '<ul><li><strong>Onboarding Friction:</strong> Multi-step KYC and slow approvals.</li><li><strong>Loan Processing:</strong> Opaque timelines and heavy documentation.</li><li><strong>Siloed Service:</strong> Branch and digital experiences are disconnected.</li></ul>',
    approach_html = '<ul><li><strong>BFSI 360:</strong> Unified view of accounts, loans, and interactions.</li><li><strong>Digital Journey Redesign:</strong> Frictionless account opening and loan flows.</li><li><strong>HAND™ Culture:</strong> Aligning branch and contact center behaviors.</li></ul>'
WHERE slug = 'bfsi';

-- 6. MANUFACTURING
UPDATE public.industries
SET 
    challenges_html = '<ul><li><strong>Distributor Gap:</strong> Lack of visibility and predictability in orders.</li><li><strong>Internal Silos:</strong> R&D, Sales, and Ops not aligned on customer promise.</li><li><strong>Value Gap:</strong> Products sold on specs, not business outcomes.</li></ul>',
    approach_html = '<ul><li><strong>Partner Persona Mapping:</strong> Understanding distributor motivations.</li><li><strong>VRM™ for B2B:</strong> Linking product features to customer economic gain.</li><li><strong>Symega Method:</strong> Culture transformation to align silos.</li></ul>'
WHERE slug = 'manufacturing';

-- 7. HEALTHCARE
UPDATE public.industries
SET 
    challenges_html = '<ul><li><strong>Admissions Friction:</strong> Confusing paperwork and high anxiety.</li><li><strong>Communication Gap:</strong> Technical jargon instead of clear guidance.</li><li><strong>Discharge Gap:</strong> Lack of clarity on post-care steps.</li></ul>',
    approach_html = '<ul><li><strong>EAR™ Framework:</strong> Operationalizing empathy for clinical teams.</li><li><strong>Patient Journey Mapping:</strong> Reducing anxiety at every touchpoint.</li><li><strong>Digital Triage:</strong> AI-enabled booking and follow-up flows.</li></ul>'
WHERE slug = 'healthcare';

-- 8. EDTECH
UPDATE public.industries
SET 
    challenges_html = '<ul><li><strong>Drop-out Gap:</strong> Students lose momentum without personalized nudges.</li><li><strong>Freemium Gap:</strong> High signups but low conversion to premium.</li><li><strong>Support Gap:</strong> Delayed responses to academic queries.</li></ul>',
    approach_html = '<ul><li><strong>Behavioral Personas:</strong> Mapping learning styles and motivations.</li><li><strong>Adoption Engine:</strong> Automated nudges based on student progress.</li><li><strong>VRM™ for Education:</strong> Visualizing progress to drive premium conversion.</li></ul>'
WHERE slug = 'edtech';

-- DROP LEGACY TABLES (If they exist)
DROP TABLE IF EXISTS public.sections_industry_details;
DROP TABLE IF EXISTS public.sections_industries;

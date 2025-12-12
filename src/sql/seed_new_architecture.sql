-- MASTER SEED SCRIPT: Populates Group C tables and updates Services with HTML content
-- Idempotent: Can be run multiple times.

-- 1. Config Navbar
-- Clear existing to ensure fresh state (optional, or use ON CONFLICT)
TRUNCATE TABLE public.config_navbar;
INSERT INTO public.config_navbar (logo_url, menu_items, cta_link)
VALUES (
    '/assets/kretrutosh-logo.png',
    '[
        {
            "name": "Solutions",
            "path": "/services",
            "children": [
                {"name": "Pre-Sales Transformation", "path": "/services/pre-sales"},
                {"name": "Sales Velocity Acceleration", "path": "/services/sales-velocity"},
                {"name": "Customer Success & Post-Sales", "path": "/services/customer-success"},
                {"name": "Digital & AI Enablement", "path": "/services/digital-ai"},
                {"name": "Culture & Leadership", "path": "/services/culture-transformation"}
            ]
        },
        {
            "name": "Frameworks",
            "path": "/frameworks",
            "children": [
                {"name": "CX Maturity Framework", "path": "/frameworks/cx-maturity"},
                {"name": "VICTORY™ Framework", "path": "/frameworks/victory"},
                {"name": "Value Realization Map", "path": "/frameworks/value-realization-map"}
            ]
        },
        {
            "name": "Industries",
            "path": "/industries",
            "children": [
                {"name": "SaaS & B2B Tech", "path": "/industries/saas"},
                {"name": "Retail", "path": "/industries/retail"},
                {"name": "BFSI", "path": "/industries/bfsi"}
            ]
        },
        {
            "name": "Impact",
            "path": "/case-studies",
            "children": []
        },
        {
            "name": "Resources",
            "path": "/resources",
            "children": [
                 {"name": "Book", "path": "/resources/book"},
                 {"name": "Podcast", "path": "/resources/podcast"}
            ]
        },
        {
            "name": "About",
            "path": "/about",
            "children": []
        }
    ]'::jsonb,
    '/contact'
);

-- 2. Config Footer
TRUNCATE TABLE public.config_footer;
INSERT INTO public.config_footer (social_links, copyright_text)
VALUES (
    '[
        {"platform": "linkedin", "url": "https://www.linkedin.com/in/ashutosh-karandikar-ccxp/"},
        {"platform": "youtube", "url": "https://www.youtube.com/@theXTPodcast"},
        {"platform": "twitter", "url": "https://x.com/AshutoshCK"}
    ]'::jsonb,
    'KretruTosh Consulting. All rights reserved.'
);

-- 3. Page Home
TRUNCATE TABLE public.page_home;
INSERT INTO public.page_home (hero_title, hero_subtitle, growth_engine_title, frameworks_title)
VALUES (
    'Build a Customer-Led Growth Engine That Scales',
    'Integrated Go-To-Market, Customer Experience, and Sales Velocity strategies for the modern enterprise.',
    'The KretruTosh Growth Engine',
    'Our Proven Frameworks'
);

-- 4. Page About
TRUNCATE TABLE public.page_about;
INSERT INTO public.page_about (hero_title, story_html, founder_image_url)
VALUES (
    'About KretruTosh Consulting',
    '<p>KretruTosh Consulting was born from a simple observation: Most consulting stops at strategy. We started to bridge the gap between "Slide Decks" and "Balance Sheets".</p><p>Our founder, with 20+ years of experience unlocking $80M+ in revenue, realized that true growth comes from connecting the dots between Customer Experience, Sales Velocity, and Culture.</p><p>We are a collective of GTM strategists, CX architects, and Culture transformers. We do not just advise; we execute.</p>',
    'https://placehold.co/400x400/0B1C3E/FFF?text=Ashutosh+K'
);

-- 5. Page Contact
TRUNCATE TABLE public.page_contact;
INSERT INTO public.page_contact (hero_title, address_html)
VALUES (
    'Let''s Build Your Growth Engine',
    '<p><strong>Email:</strong> hello@kretrutosh.com</p><p><strong>Location:</strong> Global (Remote-First)</p><p>Connect on LinkedIn for daily insights.</p>'
);


-- 6. Services (Upsert with HTML content)
-- Pre-Sales
INSERT INTO public.services (slug, title, subtitle, problem_html, approach_html, outcomes_list, hero_image)
VALUES (
    'pre-sales',
    'Pre-Sales Transformation',
    'Build a High-Accuracy Go-To-Market Foundation.',
    '<h3>Why Pre-Sales Fails</h3><ul><li>Clarity of promise missing</li><li>Demographic instead of behavioral personas</li><li>Feature-first pitching</li><li>Marketing-Sales misalignment</li><li>Expectation-Delivery gaps</li></ul>',
    '<h3>Our Approach</h3><ul><li><strong>CX Maturity Diagnostic:</strong> Baselines Brand Promise delivery.</li><li><strong>Expectation Management (EMM):</strong> Maps expectations to delivery.</li><li><strong>Persona-Product-Pitch:</strong> Defines who, what, and how we pitch.</li></ul>',
    '[{"label": "Marketing ROI", "value": "+15-25%"}, {"label": "Retention", "value": "+12-25%"}, {"label": "Funnel Predictability", "value": "+20-30%"}]'::jsonb,
    NULL
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    problem_html = EXCLUDED.problem_html,
    approach_html = EXCLUDED.approach_html,
    outcomes_list = EXCLUDED.outcomes_list;

-- Sales Velocity
INSERT INTO public.services (slug, title, subtitle, problem_html, approach_html, outcomes_list)
VALUES (
    'sales-velocity',
    'Sales Velocity Acceleration',
    'Shorten sales cycles, improve conversion, and increase predictability.',
    '<h3>When Sales Velocity Suffers</h3><ul><li>Shallow discovery</li><li>Misaligned expectations</li><li>Inconsistent pitching</li><li>Value not tied to KPIs</li></ul>',
    '<h3>Our Approach</h3><ul><li><strong>PPP Playbook:</strong> From feature demo to expectation alignment.</li><li><strong>Value Realization Map:</strong> Links capabilities to business KPIs.</li><li><strong>Sales Governance:</strong> Forecast accuracy structures.</li></ul>',
    '[{"label": "Sales Velocity", "value": "2x-5x"}, {"label": "Conversion", "value": "+15-30%"}, {"label": "Forecast Accuracy", "value": "+15-32%"}]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    problem_html = EXCLUDED.problem_html,
    approach_html = EXCLUDED.approach_html,
    outcomes_list = EXCLUDED.outcomes_list;

-- Customer Success
INSERT INTO public.services (slug, title, subtitle, problem_html, approach_html, outcomes_list)
VALUES (
    'customer-success',
    'Customer Success & Post-Sales',
    'Transform Customer Success Into a Revenue Engine.',
    '<h3>The CS Struggle</h3><ul><li>Trapped in ticket-solving</li><li>No lifecycle view</li><li>Last-minute renewals</li><li>Value not communicated</li></ul>',
    '<h3>Our Approach</h3><ul><li><strong>CS Maturity Model:</strong> 10-domain diagnostic.</li><li><strong>Lifecycle Heatmap:</strong> Maps risk and expansion signals.</li><li><strong>VICTORY Framework:</strong> CS-to-Revenue methodology.</li></ul>',
    '[{"label": "Retention", "value": "+12-25%"}, {"label": "NRR", "value": "+10-25%"}, {"label": "Churn Reduction", "value": "20-35%"}]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    problem_html = EXCLUDED.problem_html,
    approach_html = EXCLUDED.approach_html,
    outcomes_list = EXCLUDED.outcomes_list;

-- Digital & AI
INSERT INTO public.services (slug, title, subtitle, problem_html, approach_html, outcomes_list)
VALUES (
    'digital-ai',
    'Digital & AI Enablement',
    'Digitize Journeys. Unify Data. Amplify Impact.',
    '<h3>Why Digital Fails</h3><ul><li>Tools without value definition</li><li>Data silos</li><li>Insights not actionable</li><li>Superficial AI</li></ul>',
    '<h3>Our Approach</h3><ul><li><strong>Customer 360:</strong> Unifies sentiment and interaction data.</li><li><strong>Journey Digitization:</strong> Mapping quote-to-claim journeys.</li><li><strong>AI Enablement:</strong> Predictive churn & propensity models.</li></ul>',
    '[{"label": "Platform Adoption", "value": "+23-28%"}, {"label": "Platform ROI", "value": "+12-18%"}, {"label": "Action Conversion", "value": "+25-30%"}]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    problem_html = EXCLUDED.problem_html,
    approach_html = EXCLUDED.approach_html,
    outcomes_list = EXCLUDED.outcomes_list;

-- Culture
INSERT INTO public.services (slug, title, subtitle, problem_html, approach_html, outcomes_list)
VALUES (
    'culture-transformation',
    'Culture & Leadership',
    'Build a Humanized, Aligned, Nimble & Data-Backed Culture.',
    '<h3>Why Culture Breaks</h3><ul><li>Values are just posters</li><li>Leadership misalignment</li><li>No unified purpose</li><li>Hiring mismatches</li></ul>',
    '<h3>Our Approach</h3><ul><li><strong>Culture Maturity Assessment:</strong> Baseline collaboration & agility.</li><li><strong>HAND Framework:</strong> Humanized, Aligned, Nimble, Data-backed.</li><li><strong>Values Actualization:</strong> Workshops to live the values.</li></ul>',
    '[{"label": "eNPS", "value": "+10-15pp"}, {"label": "Attrition", "value": "Reduced"}, {"label": "Collaboration", "value": "Improved"}]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    problem_html = EXCLUDED.problem_html,
    approach_html = EXCLUDED.approach_html,
    outcomes_list = EXCLUDED.outcomes_list;

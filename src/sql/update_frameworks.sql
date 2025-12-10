-- Update Frameworks Data
-- Source: Section 1.8 & 3.5 of website-design-brief.md

INSERT INTO public.frameworks (display_order, title, short_description, slug, icon_name, outcomes) VALUES
(
  1,
  '9Ps Framework for Word-of-Mouth (Advocacy)',
  'A brand and experience orchestration model connecting Persona to Promise to Process, bridging GTM storytelling and delivery.',
  '9ps-framework',
  'Share2',
  ARRAY['+15–25% conversion', '+18–25% referral/advocacy growth', '+15–20% marketing/BD ROI']
),
(
  2,
  'EAR Framework for Operationalizing Empathy',
  'A behavioral model to make empathy measurable and repeatable across teams by improving how they Engage, Acknowledge, and Respond.',
  'ear-framework',
  'Heart',
  ARRAY['+12–25% retention', '+20–25% first-contact resolution', '–15–20% complaints']
),
(
  3,
  'Persona–Product–Pitch Playbook',
  'Converts persona and segment insights into actionable GTM and Customer Success motions — ensuring the right message, to the right customer.',
  'persona-product-pitch',
  'Target',
  ARRAY['+15–25% conversion', '+15–25% cross/upsell', '+15–25% marketing/BD ROI']
),
(
  4,
  'CX Maturity Framework',
  'A diagnostic model measuring Customer Experience readiness across 8 dimensions, baselining how brand promise is articulated, communicated, and delivered.',
  'cx-maturity',
  'BarChart',
  ARRAY['+12–25% retention', '+15–20 pp uplift in NPS/CSAT', '20–30% increase in CX/CS operational efficiency', 'Increase in NRR / CLV']
),
(
  5,
  'Expectation Management Framework (EMM)',
  'Maps customer expectations across journeys/touchpoints to organizational delivery competencies, surfacing specific gaps for prioritized interventions.',
  'emm-framework',
  'CheckCircle',
  ARRAY['+10–15% CSAT', '+12–25% retention', '–20–24% rework/escalations']
),
(
  6,
  'H.A.N.D.™ Framework',
  'A core values actualization framework to instil the right values and embed model behaviors: Humanized, Aligned, Nimble, Data-backed.',
  'hand-framework',
  'Users',
  ARRAY['Reduced early attrition', 'Enhanced collaboration', 'Accelerated innovation cycle time', 'eNPS +10–15 pp; Employee engagement +12–18%']
),
(
  7,
  'Customer Lifecycle Heatmap',
  'A visual mapping tool that identifies renewal risk and cross/upsell opportunity zones across lifecycle stages for key customers/accounts.',
  'lifecycle-heatmap',
  'Layout',
  ARRAY['+15–30% cross/upsell', '+10–20% NRR', '+15–25% CLV']
),
(
  8,
  'V.I.C.T.O.R.Y.™ Framework',
  'A structured 7-stage model that transforms Customer Success from a cost center into a revenue center and innovation hub through customer co-creation.',
  'victory-framework',
  'Award',
  ARRAY['+12–25% retention', '+20–40% expansion', '+10–25% NRR', '2–3× referrals/advocacy']
),
(
  9,
  'Value Realization Map (VRM)',
  'A mapping framework that links CX and Customer Success initiatives to measurable business KPIs by connecting brand promise to function/team/individual KRAs.',
  'value-realization-map',
  'TrendingUp',
  ARRAY['+23–28% platform adoption', 'Assured cross-functional leadership buy-in', '+15–20% decision-making speed']
),
(
  10,
  'CX ROI Calculator',
  'A data model that converts experience metrics (CSAT, CES, NPS, etc.) into financial impact, quantifying the ROI of CX and CS initiatives.',
  'cx-roi-calculator',
  'PieChart',
  ARRAY['+12–18% CX ROI', '+25–30% insight-to-action conversion']
)
ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  icon_name = EXCLUDED.icon_name,
  outcomes = EXCLUDED.outcomes,
  is_visible = true;

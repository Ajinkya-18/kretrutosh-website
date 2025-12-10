-- Update Assessments Data
-- Source: Section 3.9 & 4 of website-design-brief.md

INSERT INTO public.assessments (display_order, title, slug, description, icon_name, external_link) VALUES
(
  1,
  'CX Maturity Framework Diagnostic',
  'cx-maturity-diagnostic',
  'Baselines how well the organization articulates, communicates, and delivers its Brand Promise across journeys.',
  'BarChart',
  '#'
),
(
  2,
  'Customer Success Maturity Model (31Q)',
  'cs-maturity-model',
  'The canonical 10-domain Customer Success diagnostic to identify maturity gaps and opportunities.',
  'CheckCircle',
  '#'
),
(
  3,
  'Culture Maturity Assessment',
  'culture-maturity-assessment',
  'Baseline collaboration, accountability, customer-orientation, and agility within your organization.',
  'Users',
  '#'
)
ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name,
  external_link = EXCLUDED.external_link,
  is_visible = true;

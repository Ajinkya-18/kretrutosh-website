-- Fix Homepage Service Links (404 Errors)
-- Updates the Growth Engine section to point to the correct Service Page slugs.

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
      "link": "/services/sales-velocity"
    },
    {
      "icon": "Users",
      "title": "Post Sales / CS",
      "description": "Driving retention and expansion.",
      "link": "/services/customer-success"
    },
    {
      "icon": "Zap",
      "title": "Digital & AI Enablement",
      "description": "Empowering teams with unified data.",
      "link": "/services/digital-ai"
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

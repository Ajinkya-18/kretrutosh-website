-- Migrate Thought Leadership data to JSONB for full editability
-- This allows the Admin Panel to control the tabs/cards completely.

UPDATE public.sections_home
SET specific_data = '{
  "cards": [
    {
      "id": "podcast",
      "badge": "Podcast",
      "title": "The XT Podcast",
      "description": "Conversations with industry leaders on experience transformation.",
      "cta_text": "Listen Now",
      "link": "/resources/podcast",
      "image_key": "podcast"
    },
    {
      "id": "book",
      "badge": "Book",
      "title": "Beyond Customer Satisfaction",
      "description": "The definitive guide to customer-centric growth in the modern era.",
      "cta_text": "Read More",
      "link": "/book",
      "image_key": "book"
    },
    {
      "id": "blogs",
      "badge": "LinkedIn Articles",
      "title": "Expert Perspectives",
      "description": "Deep dives into CX, Culture, and Growth Strategy on LinkedIn.",
      "cta_text": "Read Articles",
      "link": "/resources/articles",
      "image_key": "whitepapers"
    },
    {
      "id": "whitepaper_general",
      "badge": "Whitepapers",
      "title": "Latest Insights",
      "description": "Download our latest research and frameworks.",
      "cta_text": "Explore All",
      "link": "/resources/whitepapers",
      "image_key": "whitepapers"
    }
  ]
}'
WHERE section_key = 'thought_leadership';

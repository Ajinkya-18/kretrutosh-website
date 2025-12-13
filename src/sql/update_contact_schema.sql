-- UPGRADE SCRIPT: Add Google Form and Calendly support to Contact Page
-- Adds columns to public.page_contact

ALTER TABLE public.page_contact 
ADD COLUMN IF NOT EXISTS google_form_url text,
ADD COLUMN IF NOT EXISTS calendly_url text,
ADD COLUMN IF NOT EXISTS calendly_cta_text text DEFAULT 'Book a Strategy Call';

-- Force a refresh of the schema cache if needed by notifying
COMMENT ON COLUMN public.page_contact.google_form_url IS 'Src URL for Google Form Embed';
COMMENT ON COLUMN public.page_contact.calendly_url IS 'Public Calendly Booking Link';

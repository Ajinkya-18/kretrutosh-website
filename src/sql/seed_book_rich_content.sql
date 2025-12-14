-- =====================================================
-- SEED: RICH BOOK CONTENT
-- =====================================================
-- Purpose: Populate the book table with complete content
-- from the Design Brief for "Beyond Customer Satisfaction"
-- =====================================================

-- Clear existing data (optional - remove if you want to preserve)
TRUNCATE TABLE public.book CASCADE;

-- Insert rich book content
INSERT INTO public.book (
    hero_title,
    hero_subtitle,
    about_title,
    about_description,
    price_text,
    cta_title,
    cta_button_text,
    amazon_url,
    cover_image_url,
    qr_image_url,
    qr_title,
    qr_description,
    author_title,
    author_bio
)
VALUES (
    -- Hero Section
    'Beyond Customer Satisfaction',
    'Crafting Exceptional Customer Experiences in the Age of Kretru',
    
    -- About Section
    'About the Book',
    '<p>In an era where customer expectations have never been higher, "Beyond Customer Satisfaction" provides a roadmap for businesses seeking to create truly exceptional customer experiences.</p>
    <p>This book introduces the concept of the "Age of Kretru" - a new paradigm where customer-led growth drives sustainable business success. Through practical frameworks and real-world examples, you''ll learn how to:</p>
    <ul>
        <li>Transform customer experience from a cost center to a revenue driver</li>
        <li>Build a customer-centric culture that permeates every level of your organization</li>
        <li>Implement proven frameworks like the 9Ps, EMM, and VRM to measure and optimize customer value</li>
        <li>Create moments that matter across the entire customer lifecycle</li>
        <li>Turn satisfied customers into passionate advocates</li>
    </ul>
    <p>Whether you''re a startup founder, a seasoned executive, or a customer success professional, this book offers actionable insights to elevate your customer experience strategy.</p>',
    
    -- CTA Section
    'Now FREE on Amazon',
    'Get Your Copy',
    'Download from Amazon',
    'https://www.amazon.com/dp/B0CNH611F7',
    
    -- Images
    'https://qxbdjyzwvwtfzsadwvs.supabase.co/storage/v1/object/public/assets/book-cover.jpg', -- Placeholder - replace with actual cover image
    'https://qxbdjyzwvwtfzsadwvs.supabase.co/storage/v1/object/public/assets/qr-code.png', -- Placeholder - replace with actual QR code
    
    -- QR Code Section
    'Scan to Download',
    'Scan this QR code with your mobile device to quickly access the book on Amazon',
    
    -- Author Section  
    'About the Author',
    '<p>Ashutosh Karandikar is a GTM & CX strategist with over 20 years of experience helping B2B and B2C companies transform their customer experience strategies.</p>
    <p>As the founder of KretruTosh Consulting, he has worked with leading organizations across insurance, retail, SaaS, and manufacturing industries to build customer-led growth engines that drive sustainable revenue.</p>
    <p>Ashutosh developed the proprietary VRM™ (Value Realization Metric) framework and the 9Ps Advocacy Engine, both of which have been instrumental in helping clients achieve measurable outcomes including reduced churn, increased NPS, and accelerated expansion revenue.</p>
    <p>He is a frequent speaker at industry conferences and has been featured in leading business publications for his innovative approaches to customer success and experience management.</p>
    <p>When not working with clients, Ashutosh enjoys teaching CX masterclasses and mentoring next-generation customer success leaders.</p>'
)
ON CONFLICT (id) DO UPDATE SET
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle,
    about_title = EXCLUDED.about_title,
    about_description = EXCLUDED.about_description,
    price_text = EXCLUDED.price_text,
    cta_title = EXCLUDED.cta_title,
    cta_button_text = EXCLUDED.cta_button_text,
    amazon_url = EXCLUDED.amazon_url,
    cover_image_url = EXCLUDED.cover_image_url,
    qr_image_url = EXCLUDED.qr_image_url,
    qr_title = EXCLUDED.qr_title,
    qr_description = EXCLUDED.qr_description,
    author_title = EXCLUDED.author_title,
    author_bio = EXCLUDED.author_bio;

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================
-- Run this to verify the data was inserted:
-- SELECT hero_title, hero_subtitle, author_title FROM public.book;

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Replace placeholder URLs with actual image URLs
-- 2. Update amazon_url with the actual Amazon product link
-- 3. The book table should have only 1 row (single book)

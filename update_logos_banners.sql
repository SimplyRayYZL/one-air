-- =====================================================
-- One Air - Update Brand Logos to use Dream Storage URLs
-- Run this in Supabase SQL Editor
-- =====================================================

-- Update brand logos to use Dream's Supabase storage
UPDATE brands SET logo_url = 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/brand-logos/haier-1768149656970.svg' WHERE name = 'Haier';
UPDATE brands SET logo_url = 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/brand-logos/sharp-1768149682834.png' WHERE name = 'Sharp';
UPDATE brands SET logo_url = 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/brand-logos/tornado-1768149688592.png' WHERE name = 'Tornado';
UPDATE brands SET logo_url = 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/brand-logos/carrier-1768149700737.svg' WHERE name = 'Carrier';
UPDATE brands SET logo_url = 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/brand-logos/midea-1768149789681.png' WHERE name = 'Midea';
UPDATE brands SET logo_url = 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/brand-logos/free-air-1768149946826.png' WHERE name = 'Free air';

-- =====================================================
-- Add sample hero banner using Dream's storage
-- =====================================================
INSERT INTO hero_banners (image_url, mobile_image_url, link_url, display_order, is_active)
VALUES (
    'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/banner-images/hero/1768467720955-kbo6lc.svg',
    NULL,
    '/products',
    1,
    true
);

INSERT INTO hero_banners (image_url, mobile_image_url, link_url, display_order, is_active)
VALUES (
    'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/banner-images/hero/1768424093526-2yn58v.png',
    'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/banner-images/hero-mobile/1768424099944-5lfd16.png',
    '/products',
    2,
    true
);

-- =====================================================
-- Add promo banners
-- =====================================================
INSERT INTO promo_banners (section_type, position, title, image_url, link_url, is_active, banner_group)
VALUES 
('half', 1, 'بانر كاريير', 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/banner-images/promo/1768467127852-m3nvtq.png', '/products?brand=Carrier', true, 'group1'),
('half', 2, 'بانر شارب', 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/banner-images/promo/1768468513542-lhj03.png', '/products?brand=Sharp', true, 'group1'),
('half', 3, 'بانر هاير', 'https://ddebombdcqzjwtmvbrbb.supabase.co/storage/v1/object/public/banner-images/promo/1768469001709-rvqgs.png', '/products?brand=Haier', true, 'group1');

-- =====================================================
-- VERIFICATION
-- =====================================================
SELECT name, logo_url FROM brands;
SELECT COUNT(*) as hero_banners_count FROM hero_banners;
SELECT COUNT(*) as promo_banners_count FROM promo_banners;

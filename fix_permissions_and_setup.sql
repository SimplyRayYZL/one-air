-- 0. Schema Migration: Add missing columns and Relax Constraints
DO $$
BEGIN
    -- Add columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'page_banners' AND column_name = 'title') THEN
        ALTER TABLE public.page_banners ADD COLUMN title text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'page_banners' AND column_name = 'subtitle') THEN
        ALTER TABLE public.page_banners ADD COLUMN subtitle text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'page_banners' AND column_name = 'image_url') THEN
        ALTER TABLE public.page_banners ADD COLUMN image_url text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'page_banners' AND column_name = 'is_active') THEN
        ALTER TABLE public.page_banners ADD COLUMN is_active boolean DEFAULT true;
    END IF;
      
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'page_banners' AND column_name = 'page_name') THEN
        ALTER TABLE public.page_banners ADD COLUMN page_name text;
    END IF;

    -- Ensure columns allow NULLs (since our logic handles nulls, and we want to allow partial updates)
    -- This fixes the "violates not-null constraint" error
    ALTER TABLE public.page_banners ALTER COLUMN image_url DROP NOT NULL;
    ALTER TABLE public.page_banners ALTER COLUMN title DROP NOT NULL;
    ALTER TABLE public.page_banners ALTER COLUMN subtitle DROP NOT NULL;
END $$;

-- 0.5 Ensure Unique Constraint on page_name (Required for ON CONFLICT)
-- We clean up duplicates first to avoid errors when creating the index
DELETE FROM public.page_banners a USING public.page_banners b
WHERE a.id < b.id AND a.page_name = b.page_name;

CREATE UNIQUE INDEX IF NOT EXISTS idx_page_banners_page_name ON public.page_banners (page_name);

-- Enable RLS on relevant tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_banners ENABLE ROW LEVEL SECURITY;

-- 1. Site Settings Policies
DROP POLICY IF EXISTS "Allow full access to site_settings for authenticated users" ON public.site_settings;
CREATE POLICY "Allow full access to site_settings for authenticated users"
ON public.site_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow public read access to settings
DROP POLICY IF EXISTS "Allow public read access to site_settings" ON public.site_settings;
CREATE POLICY "Allow public read access to site_settings"
ON public.site_settings
FOR SELECT
TO anon
USING (true);

-- 2. Page Banners Policies
DROP POLICY IF EXISTS "Allow full access to page_banners for authenticated users" ON public.page_banners;
CREATE POLICY "Allow full access to page_banners for authenticated users"
ON public.page_banners
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow public read access to banners
DROP POLICY IF EXISTS "Allow public read access to page_banners" ON public.page_banners;
CREATE POLICY "Allow public read access to page_banners"
ON public.page_banners
FOR SELECT
TO anon
USING (true);

-- 3. Storage Bucket Policies (for banner images)
-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('banner-images', 'banner-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DROP POLICY IF EXISTS "Allow public read access to banner images" ON storage.objects;
CREATE POLICY "Allow public read access to banner images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'banner-images');

DROP POLICY IF EXISTS "Allow authenticated uploads to banner images" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to banner images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'banner-images');

DROP POLICY IF EXISTS "Allow authenticated updates to banner images" ON storage.objects;
CREATE POLICY "Allow authenticated updates to banner images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'banner-images');

DROP POLICY IF EXISTS "Allow authenticated deletes to banner images" ON storage.objects;
CREATE POLICY "Allow authenticated deletes to banner images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'banner-images');

-- 4. Initial seed for 'about' banner if missing
INSERT INTO public.page_banners (id, page_name, title, subtitle, is_active)
VALUES 
    (gen_random_uuid(), 'about', 'من نحن', 'نقدم أفضل حلول التكييف في مصر منذ سنوات', true),
    (gen_random_uuid(), 'calculator', 'حاسبة التكييف', 'احسب قدرة التكييف المناسبة لمساحتك', true)
ON CONFLICT (page_name) DO UPDATE 
SET title = EXCLUDED.title, subtitle = EXCLUDED.subtitle; 

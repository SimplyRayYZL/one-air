-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, -- Storing plain text as requested for simplicity, ideally hashed
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin')),
    permissions JSONB DEFAULT '[]'::jsonb, -- Array of page keys: ['products', 'orders', 'settings']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid "policy already exists" errors when re-running
DROP POLICY IF EXISTS "Admins can read all users" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage users" ON public.admin_users;
DROP POLICY IF EXISTS "Enable all access" ON public.admin_users;

-- Create a simplified policy to avoid infinite recursion
-- Since we are using a custom auth table without Supabase Auth sessions, 
-- we cannot securely check "who" is making the request at the DB level easily to prevent recursion.
-- We will rely on the frontend application security for now.
CREATE POLICY "Enable all access" 
ON public.admin_users 
FOR ALL 
USING (true)
WITH CHECK (true); 
-- Note: RLS with custom auth is tricky. For this prototype, we'll rely on client-side checks + generic SELECT access.
-- Since we are querying this table to login, we need public SELECT or at least a service key. 
-- For client-side query (anon key), we need a policy that allows SELECT.
-- DANGEROUS: This allows anyone with the anon key to dump the admin table (names/passwords). 
-- ideally we use Supabase Auth. But for "custom table" request:
-- We will enable read access for now to make login work.

-- Seed the Super Admin if not exists
INSERT INTO public.admin_users (username, password, role, permissions)
VALUES (
    'oneair', 
    'oneair', 
    'super_admin', 
    '["products", "orders", "brands", "banners", "hero_banners", "promo_banners", "delivery", "settings", "page_banners", "sections", "manage_admins", "store_settings", "social_settings", "analytics_settings", "seo_settings"]'::jsonb
)
ON CONFLICT (username) DO NOTHING;

-- Seed a test Sub Admin (optional, for demo)
-- INSERT INTO public.admin_users (username, password, role, permissions)
-- VALUES ('editor', 'editor', 'admin', '["products", "orders"]')
-- ON CONFLICT (username) DO NOTHING;

-- Enable RLS on site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON site_settings;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON site_settings;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON site_settings;

-- Create comprehensive policies
CREATE POLICY "Enable read access for all users" ON site_settings
    FOR SELECT USING (true);

-- Allow any authenticated user to UPDATE site_settings
CREATE POLICY "Enable update for authenticated users only" ON site_settings
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow any authenticated user to INSERT site_settings (for upsert)
CREATE POLICY "Enable insert for authenticated users only" ON site_settings
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Ensure there is at least one row with id 'main'
INSERT INTO site_settings (id, settings)
VALUES ('main', '{}')
ON CONFLICT (id) DO NOTHING;

-- Grant permissions to authenticated role explicitly
GRANT ALL ON site_settings TO authenticated;
GRANT ALL ON site_settings TO service_role;

-- Enable RLS on all relevant tables
ALTER TABLE IF EXISTS public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.page_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.order_items ENABLE ROW LEVEL SECURITY;

-- 1. Policies for site_settings
DROP POLICY IF EXISTS "Anyone can read site_settings" ON public.site_settings;
CREATE POLICY "Anyone can read site_settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can update site_settings" ON public.site_settings;
CREATE POLICY "Authenticated users can update site_settings" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can insert site_settings" ON public.site_settings;
CREATE POLICY "Authenticated users can insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 2. Policies for products
DROP POLICY IF EXISTS "Anyone can read products" ON public.products;
CREATE POLICY "Anyone can read products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage products" ON public.products;
CREATE POLICY "Authenticated users can manage products" ON public.products FOR ALL USING (auth.role() = 'authenticated');

-- 3. Policies for brands
DROP POLICY IF EXISTS "Anyone can read brands" ON public.brands;
CREATE POLICY "Anyone can read brands" ON public.brands FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage brands" ON public.brands;
CREATE POLICY "Authenticated users can manage brands" ON public.brands FOR ALL USING (auth.role() = 'authenticated');

-- 4. Policies for page_banners
DROP POLICY IF EXISTS "Anyone can read page_banners" ON public.page_banners;
CREATE POLICY "Anyone can read page_banners" ON public.page_banners FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage page_banners" ON public.page_banners;
CREATE POLICY "Authenticated users can manage page_banners" ON public.page_banners FOR ALL USING (auth.role() = 'authenticated');

-- 5. Policies for orders (conditional to avoid errors if table missing)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'orders') THEN
        DROP POLICY IF EXISTS "Authenticated users can manage orders" ON public.orders;
        CREATE POLICY "Authenticated users can manage orders" ON public.orders FOR ALL USING (auth.role() = 'authenticated');
        
        DROP POLICY IF EXISTS "Public can create orders" ON public.orders;
        CREATE POLICY "Public can create orders" ON public.orders FOR INSERT WITH CHECK (true);
    END IF;

    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'order_items') THEN
        DROP POLICY IF EXISTS "Authenticated users can manage order_items" ON public.order_items;
        CREATE POLICY "Authenticated users can manage order_items" ON public.order_items FOR ALL USING (auth.role() = 'authenticated');
        
        DROP POLICY IF EXISTS "Public can create order_items" ON public.order_items;
        CREATE POLICY "Public can create order_items" ON public.order_items FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

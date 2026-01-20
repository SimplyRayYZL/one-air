-- Ensure Brands Exist
INSERT INTO brands (name, name_ar) VALUES ('Carrier', 'كاريير') ON CONFLICT (name) DO NOTHING;
INSERT INTO brands (name, name_ar) VALUES ('Midea', 'ميديا') ON CONFLICT (name) DO NOTHING;

-- Insert Products
INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير أرضى سقفى 2.25 حصان بارد ساخن Prestige Pro', 
    46500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/07/Prestige-Console_Ceiling-300x225.png', 
    'floor_ceiling', 
    '2.25', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/floor-wall-under-ceiling-2-25ph/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير فرى ستند 5 حصان بارد ساخن Prestige Pro', 
    104000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/07/IndoorUnit36K-300x225.png', 
    'freestand', 
    '5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/floor-standing-36ph/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير فرى ستند 7.5 حصان بارد فقط Prestige Pro', 
    134000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/07/%D8%AA%D9%83%D9%8A%D9%8A%D9%81-%D9%83%D8%A7%D8%B1%D9%8A%D9%8A%D8%B1-%D9%81%D8%B1%D9%89-%D8%B3%D8%AA%D9%86%D8%AF-7.5-%D8%AD%D8%B5%D8%A7%D9%86-%D8%A8%D8%A7%D8%B1%D8%AF-%D8%B3%D8%A7%D8%AE%D9%86-Prestige-Pro-scaled-300x912.jpg', 
    'freestand', 
    '7.5', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/floor-standing-60ph/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 1.5 حصان بارد انفرتر cool only Optimax Inverter', 
    33500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Optimax-Inverter-IDU12-18-24K-1-300x225.png', 
    'wall', 
    '1.5', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-1-5-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d9%81%d9%82%d8%b7-cool-only-optimax-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 1.5 حصان بارد انفرتر cool only X COOL Inverter', 
    26500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2025/08/9de330f3-9a0f-4844-b21b-39b78e817af2-300x149.jpg', 
    'wall', 
    '1.5', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-1-5-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1-cool-only-x-cool/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 1.5 حصان بارد ساخن Heat Pump Optimax Pro', 
    25500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/%D9%81%D8%A7%D9%86%D8%A9-%D9%83%D8%A7%D8%B1%D9%8A%D9%8A%D8%B1-2-300x109.png', 
    'wall', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-1-5hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 1.5 حصان بارد ساخن انفرتر Heat Pump Optimax Inverter', 
    34000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Optimax-Inverter-IDU12-18-24K-1-300x225.png', 
    'wall', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-1-5hp-cool-hot-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 1.5 حصان بارد فقط Optimax Pro', 
    23500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/%D9%81%D8%A7%D9%86%D8%A9-%D9%83%D8%A7%D8%B1%D9%8A%D9%8A%D8%B1-2-300x109.png', 
    'wall', 
    '1.5', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-1-5hp-cool-only/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 2.25 حصان بارد انفرتر X COOL Inverter', 
    41700, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2025/08/9de330f3-9a0f-4844-b21b-39b78e817af2-300x149.jpg', 
    'wall', 
    '2.25', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-2-25-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1-cool-only-x-co/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 2.25 حصان بارد انفرتر cool only Optimax Inverter', 
    40700, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Optimax-Inverter-IDU12-18-24K-1-300x225.png', 
    'wall', 
    '2.25', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-2-25-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1-cool-only-optim/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 2.25 حصان بارد ساخن Heat Pump Optimax Pro', 
    37500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/%D9%81%D8%A7%D9%86%D8%A9-%D9%83%D8%A7%D8%B1%D9%8A%D9%8A%D8%B1-2-300x109.png', 
    'wall', 
    '2.25', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-2-25hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 2.25 حصان بارد ساخن انفرتر Heat Pump Optimax Inverter', 
    42000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Optimax-Inverter-IDU12-18-24K-1-300x225.png', 
    'wall', 
    '2.25', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-2-25hp-cool-hot-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 2.25 حصان بارد فقط Optimax Pro', 
    35000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/%D9%81%D8%A7%D9%86%D8%A9-%D9%83%D8%A7%D8%B1%D9%8A%D9%8A%D8%B1-2-300x109.png', 
    'wall', 
    '2.25', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-2-25hp-cool-only/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 3 حصان بارد انفرتر cool only Optimax Inverter', 
    46000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Optimax-Inverter-IDU12-18-24K-1-300x225.png', 
    'wall', 
    '3', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-3-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1-cool-only-opt/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 3 حصان بارد ساخن Heat Pump Optimax Pro', 
    43500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/%D9%81%D8%A7%D9%86%D8%A9-%D9%83%D8%A7%D8%B1%D9%8A%D9%8A%D8%B1-2-300x109.png', 
    'wall', 
    '3', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-3hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 3 حصان بارد ساخن انفرتر Heat Pump Optimax Inverter', 
    49000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Optimax-Inverter-IDU12-18-24K-1-300x225.png', 
    'wall', 
    '3', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-3hp-cool-hot-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 3 حصان بارد فقط Optimax Pro', 
    42500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/%D9%81%D8%A7%D9%86%D8%A9-%D9%83%D8%A7%D8%B1%D9%8A%D9%8A%D8%B1-2-300x109.png', 
    'wall', 
    '3', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-3hp-cool-only/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 3حصان بارد انفرتر X COOL Inverter', 
    47000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2025/08/9de330f3-9a0f-4844-b21b-39b78e817af2-300x149.jpg', 
    'wall', 
    '3', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-3-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1-x-cool-inverte/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 4 حصان بارد ساخن Heat Pump Optimax Pro', 
    72000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/OptimaxInverter_30K-36K_C10-2-scaled-300x77.jpg', 
    'wall', 
    '4', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-4hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 4 حصان بارد ساخن انفرتر Heat Pump Optimax Inverter', 
    78000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/OptimaxInverter_30K-36K_C10-2-scaled-300x77.jpg', 
    'wall', 
    '4', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-4hp-cool-hot-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 5 حصان بارد ساخن Heat Pump Optimax Pro', 
    84000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/OptimaxInverter_30K-36K_C10-2-scaled-300x77.jpg', 
    'wall', 
    '5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-5-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-heat-pump-optimax-pro/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف كاريير قدرة 5 حصان بارد ساخن انفرتر Heat Pump Optimax Inverter', 
    94000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/OptimaxInverter_30K-36K_C10-2-scaled-300x77.jpg', 
    'wall', 
    '5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/carrier-5hp-cool-hot-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير انفرتر 2.25 بارد ساخن ClassiCool Inverter', 
    56000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-2-25-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير انفرتر 3 بارد ساخن ClassiCool Inverter', 
    69500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-3-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير انفرتر 5 بارد ساخن ClassiCool Inverter', 
    105000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-5-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير انفرتر 6 بارد ساخن ClassiCool Inverter', 
    135000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-6-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير انفرتر 7.5 بارد ساخن ClassiCool Inverter', 
    147500, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d9%82%d8%af%d8%b1%d8%a9-7-5-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير عادي 1.5 بارد ساخن ClassiCool Pro', 
    40000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d8%b9%d8%a7%d8%af%d9%8a-1-5-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-pro/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير عادي 2.25 بارد ساخن ClassiCool Pro', 
    46700, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d8%b9%d8%a7%d8%af%d9%8a-2-25-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-pro/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير عادي 3 حصان بارد ساخن ClassiCool Pro', 
    56000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '3', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d8%b9%d8%a7%d8%af%d9%8a-3-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-pro/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير عادي 4 حصان بارد ساخن ClassiCool Pro', 
    72000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '4', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d8%b9%d8%a7%d8%af%d9%8a-3-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-pro-2/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'كونسيلد كارير عادي 5.5 حصان بارد ساخن ClassiCool Pro', 
    92000, 
    (SELECT id FROM brands WHERE name = 'Carrier' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%B1-300x140.jpg', 
    'concealed', 
    '5.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d9%83%d9%88%d9%86%d8%b3%d9%8a%d9%84%d8%af-%d9%83%d8%a7%d8%b1%d9%8a%d9%8a%d8%b1-%d8%b9%d8%a7%d8%af%d9%8a-5-5-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-classicool-pro/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا أنفرتر قدرة 1.5 حصان بارد ساخن Inverter – Heat Pump', 
    32000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionInverterC3-HP-12-18-24-300x225.png', 
    'wall', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-1-5hp-inverter-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا أنفرتر قدرة 2.25 حصان بارد ساخن Inverter – Heat Pump', 
    39500, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionInverterC3-HP-12-18-24-300x225.png', 
    'wall', 
    '2.25', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-2-25hp-inverter-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا أنفرتر قدرة 3 حصان بارد ساخن Inverter – Heat Pump', 
    43500, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionInverterC3-HP-12-18-24-300x225.png', 
    'wall', 
    '3', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-3hp-inverter-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 1.5 حصان بارد انفرتر Mission Pro INVERTER', 
    27000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2024/12/MissionInverterC3-HP-12-18-24-300x225.png', 
    'wall', 
    '1.5', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%85%d9%8a%d8%af%d9%8a%d8%a7-%d9%82%d8%af%d8%b1%d8%a9-1-5-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1-mission-pro-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 1.5 حصان بارد ساخن Mission Pro', 
    22500, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionProC3-300x111.jpg', 
    'wall', 
    '1.5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-1-5hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 1.5 حصان بارد فقط Mission Pro', 
    19800, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionProC3-300x111.jpg', 
    'wall', 
    '1.5', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-1-5hp-cool-only/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 2.25 حصان بارد انفرتر Mission Pro INVERTER', 
    37000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionInverterC3-HP-12-18-24-300x225.png', 
    'wall', 
    '2.25', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%85%d9%8a%d8%af%d9%8a%d8%a7-%d9%82%d8%af%d8%b1%d8%a9-2-25-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1-mission-pro-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 2.25 حصان بارد ساخن Mission Pro', 
    37000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionProC3-300x111.jpg', 
    'wall', 
    '2.25', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-2-25hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 2.25 حصان بارد فقط Mission Pro', 
    32000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionProC3-300x111.jpg', 
    'wall', 
    '2.25', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-2-25hp-cool-only/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 3 حصان بارد انفرتر Mission Pro INVERTER', 
    47000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionInverterC3-HP-12-18-24-300x225.png', 
    'wall', 
    '3', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%85%d9%8a%d8%af%d9%8a%d8%a7-%d9%82%d8%af%d8%b1%d8%a9-3-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1-mission-pro-inverter/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 3 حصان بارد ساخن Mission Pro', 
    42000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionProC3-300x111.jpg', 
    'wall', 
    '3', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-3hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 3 حصان بارد فقط Mission Pro', 
    38500, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/MissionProC3-300x111.jpg', 
    'wall', 
    '3', 
    'cool_only', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-3hp-cool-only-2/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 4 حصان بارد ساخن Mission Pro', 
    66000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Mission30K-1-300x225.png', 
    'wall', 
    '4', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-4hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 4 حصان بارد ساخن انفرتر Mission Pro Inverter', 
    69000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Mission30K-1-300x225.png', 
    'wall', 
    '4', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%85%d9%8a%d8%af%d9%8a%d8%a7-%d9%82%d8%af%d8%b1%d8%a9-4-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 5 حصان بارد ساخن Mission Pro', 
    75000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Mission30K-1-300x225.png', 
    'wall', 
    '5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/midea-5hp-cool-hot/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();

INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    'تكييف ميديا قدرة 5 حصان بارد ساخن انفرتر Mission Pro Inverter', 
    86000, 
    (SELECT id FROM brands WHERE name = 'Midea' LIMIT 1), 
    'https://www.moderncool.net/wp-content/uploads/2022/06/Mission30K-1-300x225.png', 
    'wall', 
    '5', 
    'cool_heat', 
    'Scraped from ModernCool: https://www.moderncool.net/product/%d8%aa%d9%83%d9%8a%d9%8a%d9%81-%d9%85%d9%8a%d8%af%d9%8a%d8%a7-%d9%82%d8%af%d8%b1%d8%a9-5-%d8%ad%d8%b5%d8%a7%d9%86-%d8%a8%d8%a7%d8%b1%d8%af-%d8%b3%d8%a7%d8%ae%d9%86-%d8%a7%d9%86%d9%81%d8%b1%d8%aa%d8%b1/', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();


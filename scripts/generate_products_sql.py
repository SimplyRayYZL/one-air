import json
import re

def parse_price(price_str):
    # Extract all price matches
    # Input format examples: 
    # "EGP47,280.00 \n..."
    # "EGP34,000.00"
    matches = re.findall(r'EGP\s*([\d,]+\.?\d*)', price_str)
    if matches:
        # Return the last one (usually the discounted/current price)
        # Remove commas
        try:
            return float(matches[-1].replace(',', ''))
        except ValueError:
            return 0.0
    return 0.0

def parse_attributes(title):
    title_lower = title.lower()
    
    # Horsepower
    hp = "1.5" # Default
    # Look for 1.5, 2.25, 3, 4, 5, 6, 7.5
    hp_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:hp|حصان)', title_lower)
    if hp_match:
        hp = hp_match.group(1)
    
    # Type
    p_type = "wall" # Default (Split)
    if "stand" in title_lower or "ستند" in title_lower:
        p_type = "freestand"
    elif "ceiling" in title_lower or "سقفى" in title_lower or "floor" in title_lower or "أرضى" in title_lower:
        p_type = "floor_ceiling"
    elif "concealed" in title_lower or "كونسيلد" in title_lower:
        p_type = "concealed"
    
    # Cooling Type
    cooling = "cool_only"
    if "heat" in title_lower or "ساخن" in title_lower:
        cooling = "cool_heat"
        
    return hp, p_type, cooling

def generate_sql():
    try:
        with open('scraped_products.json', 'r', encoding='utf-8') as f:
            products = json.load(f)
    except FileNotFoundError:
        print("Error: scraped_products.json not found.")
        return

    sql_statements = []
    
    # 1. Ensure Brands Exist
    sql_statements.append("-- Ensure Brands Exist (Carrier, Midea)")
    sql_statements.append("INSERT INTO brands (name, name_ar) VALUES ('Carrier', 'كاريير') ON CONFLICT (name) DO NOTHING;")
    sql_statements.append("INSERT INTO brands (name, name_ar) VALUES ('Midea', 'ميديا') ON CONFLICT (name) DO NOTHING;")
    sql_statements.append("")

    sql_statements.append("-- Insert Products")
    
    for p in products:
        title = p.get('title', '').replace("'", "''") # Escape single quotes
        brand_name = p.get('brand', 'Carrier')
        price_str = p.get('price', '')
        image_url = p.get('image_url', '')
        product_link = p.get('link', '')
        
        price = parse_price(price_str)
        hp, p_type, cooling = parse_attributes(title)
        
        # Determine features array (optional, but good for backup)
        features_json = json.dumps([hp + " HP", p_type, cooling], ensure_ascii=False)
        
        # Prepare INSERT statement
        # We assume columns: name, price, brand_id, image_url, is_active, type, horsepower, cooling_type, description
        # Using ON CONFLICT (name) to update if exists
        
        # Note: We need to handle the subquery for brand_id
        
        sql = f"""
INSERT INTO products (
    name, 
    price, 
    brand_id, 
    image_url, 
    type, 
    horsepower, 
    cooling_type, 
    description, 
    is_active,
    stock
) VALUES (
    '{title}', 
    {price}, 
    (SELECT id FROM brands WHERE name = '{brand_name}' LIMIT 1), 
    '{image_url}', 
    '{p_type}', 
    '{hp}', 
    '{cooling}', 
    'Scraped from ModernCool: {product_link}', 
    true,
    10
)
ON CONFLICT (name) DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();
"""
        sql_statements.append(sql.strip())

    # Write to file
    with open('supabase_seed_products.sql', 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(sql_statements))
    
    print(f"Generated {len(products)} product insert statements in supabase_seed_products.sql")

if __name__ == "__main__":
    generate_sql()

import requests
from bs4 import BeautifulSoup
import re
import os
from supabase import create_client, Client
import json
import time

# --- Configuration ---
SUPABASE_URL = "https://pnjjmoncbbgdsxnhclbk.supabase.co"
# KEY is expected to be in environment or hardcoded by user if needed. 
# Ideally we read from .env but for simplicity in this scratch env we might need to ask or use what we have.
# Assuming ANON key is enough for INSERT if RLS allows, or we need SERVICE_ROLE.
# For now, I will use a placeholder and ask the user to fill it or I will try to read it from a file.
SUPABASE_KEY = "" 

# Brand Names to ID mapping (Will fetch dynamically if possible)
BRANDS = {
    "Carrier": "carrier",
    "Midea": "midea"
}

URLS = {
    "Carrier": "https://www.moderncool.net/product-category/brand/carrier/",
    "Midea": "https://www.moderncool.net/product-category/brand/midea/"
}

# Regex Patterns for Extraction
HP_PATTERN = r"(\d\.?\d*)\s*(?:حصان|hp)"
TYPE_PATTERNS = {
    "freestand": [r"فري ستاند", r"فرى ستاند", r"عمودي", r"Free Stand"],
    "concealed": [r"كونسيلد", r"Concealed", r"مركزي"],
    "floor_ceiling": [r"أرضي سقفي", r"ارضي سقفي", r"Floor Ceiling"],
    "cassette": [r"كاسيت", r"Cassette"],
    "split": [r"سبليت", r"حائطي", r"Wall Mounted"] # Default to split if nothing else matches
}
COOLING_PATTERNS = {
    "cool_heat": [r"بارد ساخن", r"Cool Heat", r"Heat Pump"],
    "cool_only": [r"بارد فقط", r"بارد", r"Cool Only"]
}

def get_supabase_client():
    # Try to read env file or use hardcoded (placeholders here)
    try:
        with open("../.env", "r") as f:
            for line in f:
                if "VITE_SUPABASE_ANON_KEY" in line:
                    global SUPABASE_KEY
                    SUPABASE_KEY = line.split("=")[1].strip().strip('"')
                    break
    except:
        pass
    
    if not SUPABASE_KEY:
        print("CRITICAL: Could not find Supabase Key. Please set SUPABASE_KEY variable.")
        return None
        
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def extract_metadata(title):
    # Horsepower
    hp_match = re.search(HP_PATTERN, title, re.IGNORECASE)
    horsepower = hp_match.group(1) if hp_match else "1.5" # Default fallback
    
    # Type
    ac_type = "split" # Default
    for type_key, keywords in TYPE_PATTERNS.items():
        if any(re.search(kw, title, re.IGNORECASE) for kw in keywords):
            ac_type = type_key
            break
            
    # Cooling
    cooling = "cool_heat" # Default
    for cool_key, keywords in COOLING_PATTERNS.items():
        if any(re.search(kw, title, re.IGNORECASE) for kw in keywords):
            cooling = cool_key
            break
            
    return horsepower, ac_type, cooling

def scrape_brand(brand_name, url, supabase):
    print(f"--- Scraping {brand_name} ---")
    
    # 1. Get Brand ID
    response = supabase.table("brands").select("id").ilike("name", f"%{brand_name}%").execute()
    if not response.data:
        print(f"Brand {brand_name} not found in DB. Skipping.")
        return
    brand_id = response.data[0]['id']
    print(f"Found {brand_name} ID: {brand_id}")
    
    # 2. Scrape Pages
    products_to_insert = []
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.content, 'html.parser')
        
        product_cards = soup.select('li.product')
        print(f"Found {len(product_cards)} products on page.")
        
        for card in product_cards:
            try:
                title_elem = card.select_one('.woocommerce-loop-product__title')
                if not title_elem: continue
                title = title_elem.get_text(strip=True)
                
                price_elem = card.select_one('.price')
                price = 0
                old_price = None
                
                if price_elem:
                    ins_tag = price_elem.select_one('ins')
                    del_tag = price_elem.select_one('del')
                    
                    if ins_tag:
                        # Has sale price
                        price_text = ins_tag.get_text(strip=True).replace('EGP', '').replace(',', '')
                        price = float(price_text)
                        
                        if del_tag:
                            old_price_text = del_tag.get_text(strip=True).replace('EGP', '').replace(',', '')
                            old_price = float(old_price_text)
                    else:
                        # Normal price
                        price_text = price_elem.get_text(strip=True).replace('EGP', '').replace(',', '')
                        # Handle potential range or simple text
                        clean_price = re.search(r'[\d,]+\.?\d*', price_text)
                        if clean_price:
                            price = float(clean_price.group().replace(',', ''))

                image_elem = card.select_one('.astra-shop-thumbnail-wrap img')
                image_url = image_elem['src'] if image_elem else None
                
                # Metadata extraction
                hp, ac_type, cooling = extract_metadata(title)
                
                product = {
                    "name": title,
                    "brand_id": brand_id,
                    "price": price,
                    "old_price": old_price,
                    "image_url": image_url,
                    "horsepower": hp,
                    "type": ac_type,
                    "cooling_type": cooling,
                    "is_active": True,
                    "description": title, # Use title as desc for now
                    "features": [f"{hp} حصان", "بارد ساخن" if cooling == "cool_heat" else "بارد فقط", "ديجيتال", "انفرتر" if "Inverter" in title or "انفرتر" in title else "غير انفرتر"]
                }
                
                products_to_insert.append(product)
                print(f"Prepared: {title} | {hp}HP | {ac_type} | {cooling}")
                
            except Exception as e:
                print(f"Error parsing card: {e}")
                continue
                
    except Exception as e:
        print(f"Error fetching page: {e}")

    # 3. Insert to DB
    if products_to_insert:
        print(f"Inserting {len(products_to_insert)} products...")
        try:
            # We insert one by one or batch? Batch is better.
            # However, supabase-py insert returns data.
            # Upsert is safer to avoid duplicates if name is unique constraint (unlikely for products).
            # We'll just insert for now. 
            result = supabase.table("products").upsert(products_to_insert, on_conflict="name").execute()
            print("Success!")
        except Exception as e:
            print(f"Insert Error: {e}")
    else:
        print("No products prepared.")

def main():
    print("Starting scraped...")
    supabase = get_supabase_client()
    if not supabase: return

    for brand_name, url in URLS.items():
        scrape_brand(brand_name, url, supabase)

if __name__ == "__main__":
    main()

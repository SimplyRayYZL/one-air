import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants from .env (hardcoded here for script execution context)
const SUPABASE_URL = "https://ilfyzdjyidblcamwyjdn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZnl6ZGp5aWRibGNhbXd5amRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0Njc4MDksImV4cCI6MjA4NDA0MzgwOX0.8JU2CMOJLA_dUeXnbfatVvQgs9CsVJxVZhg31TffEFk";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function parsePrice(priceStr) {
    if (!priceStr) return 0;
    const matches = priceStr.match(/EGP\s*([\d,]+\.?\d*)/g);
    if (matches && matches.length > 0) {
        const last = matches[matches.length - 1];
        const numStr = last.replace(/EGP\s*/, '').replace(/,/g, '');
        return parseFloat(numStr) || 0;
    }
    return 0;
}

function parseAttributes(title) {
    if (!title) return { hp: "1.5", type: "wall", cooling: "cool_only" };
    const titleLower = title.toLowerCase();

    // HP
    let hp = "1.5";
    const hpMatch = titleLower.match(/(\d+(?:\.\d+)?)\s*(?:hp|حصان)/);
    if (hpMatch) hp = hpMatch[1];

    // Type
    let type = "wall";
    if (titleLower.includes("stand") || titleLower.includes("ستند")) type = "freestand";
    else if (titleLower.includes("ceiling") || titleLower.includes("سقفى") || titleLower.includes("floor") || titleLower.includes("أرضى")) type = "floor_ceiling";
    else if (titleLower.includes("concealed") || titleLower.includes("كونسيلد")) type = "concealed";

    // Cooling
    let cooling = "cool_only";
    if (titleLower.includes("heat") || titleLower.includes("ساخن")) cooling = "cool_heat";

    return { hp, type, cooling };
}

async function main() {
    try {
        const jsonPath = path.join(__dirname, '../scraped_products.json');
        console.log(`Reading products from ${jsonPath}`);

        if (!fs.existsSync(jsonPath)) {
            throw new Error("scraped_products.json not found");
        }

        const productsRaw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

        console.log(`Fetching brands...`);
        // Ensure brands exist first
        const brandsToEnsure = ['Carrier', 'Midea'];
        const brandsMap = {};

        for (const brandName of brandsToEnsure) {
            let { data: existing } = await supabase.from('brands').select('id').eq('name', brandName).single();
            if (!existing) {
                console.log(`Creating brand: ${brandName}`);
                const { data: newBrand, error } = await supabase.from('brands').insert({
                    name: brandName,
                    name_ar: brandName === 'Carrier' ? 'كاريير' : 'ميديا'
                }).select().single();

                if (error) {
                    console.error(`Error creating brand ${brandName}:`, error);
                    continue;
                }
                brandsMap[brandName] = newBrand.id;
            } else {
                brandsMap[brandName] = existing.id;
            }
        }

        console.log('Brands Map:', brandsMap);

        const productsToInsert = productsRaw.map(p => {
            const title = p.title || '';
            if (!title) return null;

            const price = parsePrice(p.price || '');
            const { hp, type, cooling } = parseAttributes(title);
            const brand = p.brand || 'Carrier';
            const brandId = brandsMap[brand];

            // Stock defaulted to 10 if not present
            return {
                name: title,
                price: price,
                brand_id: brandId,
                image_url: p.image_url,
                type: type,
                horsepower: hp,
                cooling_type: cooling,
                description: `Scraped from ModernCool: ${p.link}`,
                is_active: true,
                stock: 10
            };
        }).filter(p => p !== null);

        console.log(`Upserting ${productsToInsert.length} products...`);

        // Upsert in batches of 10
        const batchSize = 10;
        for (let i = 0; i < productsToInsert.length; i += batchSize) {
            const batch = productsToInsert.slice(i, i + batchSize);
            const { error } = await supabase.from('products').upsert(batch, { onConflict: 'name' });

            if (error) {
                console.error(`Error upserting batch ${i}:`, error);
            } else {
                console.log(`Upserted batch ${i / batchSize + 1}`);
            }
        }

        console.log("Seeding completed successfully.");

    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

main();

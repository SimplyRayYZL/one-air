import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parsePrice(priceStr) {
    if (!priceStr) return 0;
    // Match "EGP" followed by numbers/commas
    const matches = priceStr.match(/EGP\s*([\d,]+\.?\d*)/g);
    if (matches && matches.length > 0) {
        // Use the last match (often "Current Price")
        const last = matches[matches.length - 1];
        const numStr = last.replace(/EGP\s*/, '').replace(/,/g, '');
        return parseFloat(numStr) || 0;
    }
    // Fallback if no EGP prefix but assumes it's a number string
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

try {
    const jsonPath = path.join(__dirname, '../scraped_products.json');
    const outPath = path.join(__dirname, '../supabase_seed_products.sql');

    console.log(`Reading from ${jsonPath}`);
    if (!fs.existsSync(jsonPath)) {
        console.error("JSON file not found!");
        process.exit(1);
    }

    const data = fs.readFileSync(jsonPath, 'utf8');
    const products = JSON.parse(data);

    let sql = "-- Ensure Brands Exist\n";
    sql += "INSERT INTO brands (name, name_ar) VALUES ('Carrier', 'كاريير') ON CONFLICT (name) DO NOTHING;\n";
    sql += "INSERT INTO brands (name, name_ar) VALUES ('Midea', 'ميديا') ON CONFLICT (name) DO NOTHING;\n\n";
    sql += "-- Insert Products\n";

    let count = 0;
    products.forEach(p => {
        const title = (p.title || '').replace(/'/g, "''");
        const price = parsePrice(p.price || '');
        const { hp, type, cooling } = parseAttributes(p.title || '');
        const brand = p.brand || 'Carrier';

        // Skip if almost empty
        if (!title) return;

        sql += `INSERT INTO products (name, price, brand_id, image_url, type, horsepower, cooling_type, description, is_active, stock) VALUES (
    '${title}', 
    ${price}, 
    (SELECT id FROM brands WHERE name = '${brand}' LIMIT 1), 
    '${p.image_url}', 
    '${type}', 
    '${hp}', 
    '${cooling}', 
    'Scraped from ModernCool: ${p.link}', 
    true,
    10
) ON CONFLICT ON CONSTRAINT products_name_unique DO UPDATE SET 
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    type = EXCLUDED.type,
    horsepower = EXCLUDED.horsepower,
    cooling_type = EXCLUDED.cooling_type,
    updated_at = NOW();\n\n`;
        count++;
    });

    fs.writeFileSync(outPath, sql);
    console.log(`Successfully generated SQL for ${count} products at ${outPath}`);

} catch (e) {
    console.error("Error generating SQL:", e);
    process.exit(1);
}

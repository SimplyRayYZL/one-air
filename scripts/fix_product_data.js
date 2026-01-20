import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ilfyzdjyidblcamwyjdn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZnl6ZGp5aWRibGNhbXd5amRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0Njc4MDksImV4cCI6MjA4NDA0MzgwOX0.8JU2CMOJLA_dUeXnbfatVvQgs9CsVJxVZhg31TffEFk";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const typeMap = {
    'wall': 'حائطي',
    'split': 'حائطي',
    'freestand': 'فري ستاند',
    'floor_ceiling': 'أرضي سقفي',
    'concealed': 'كونسيلد',
    'central': 'مركزي'
};

const coolingMap = {
    'cool_only': 'بارد فقط',
    'cool_heat': 'بارد ساخن'
};

async function fixData() {
    console.error('Starting Fix Script...');

    // 1. Fetch Brands for Carrier/Midea check
    const { data: brands, error: brandsError } = await supabase.from('brands').select('id, name');
    if (brandsError) throw brandsError;
    const brandMap = {};
    const targetBrandIds = [];
    brands.forEach(b => {
        brandMap[b.id] = b.name;
        if (b.name === 'Carrier' || b.name === 'Midea' || b.name === 'كاريير' || b.name === 'ميديا') {
            targetBrandIds.push(b.id);
        }
    });

    console.error(`Target Brands (Legacy Hide): ${targetBrandIds.join(', ')}`);

    // 2. Fetch All Products
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, name, brand_id, type, horsepower, cooling_type, description, price, created_at');

    if (productsError) throw productsError;

    console.error(`Total Products: ${products.length}`);

    let sql = '';
    const seenMap = new Map();
    const legacyToHide = [];
    const descriptionsToFix = [];
    const exactDeletes = [];

    for (const p of products) {
        // A. Legacy Check (Created before 2026)
        // Assuming Scraped data is > 2026-01-01 (It is today 2026-01-20)
        // Legacy data is < 2026-01-01
        const createdDate = new Date(p.created_at);
        const splitDate = new Date('2026-01-01');
        const isLegacy = createdDate < splitDate;

        // If Legacy AND Brand match Carrier/Midea -> Hide it
        if (isLegacy && targetBrandIds.includes(p.brand_id)) {
            legacyToHide.push(p.id);
            continue; // Don't process description update for legacy hidden items
        }

        // B. Fix Descriptions (Only for Scraped/New items)
        if (!isLegacy) {
            if (!p.description || p.description.includes('Scraped from ModernCool') || p.description.length < 50) {
                const brandName = brandMap[p.brand_id] || 'تكييف';
                const typeAr = typeMap[p.type] || (p.type === 'wall' ? 'حائطي' : p.type);
                const hp = p.horsepower ? `${p.horsepower} حصان` : '';
                const coolingAr = coolingMap[p.cooling_type] || p.cooling_type || '';

                const newDesc = `تكييف ${brandName} ${typeAr} ${hp} ${coolingAr}. يتميز بتكنولوجيا متطورة لتوفير الطاقة وتبريد سريع ومثالي للأجواء الحارة. تصميم عصري يناسب جميع الديكورات.`;

                descriptionsToFix.push({ id: p.id, description: newDesc });
            }

            // C. Exact Name Duplicates in New Data
            const key = p.name.trim().toLowerCase();
            if (seenMap.has(key)) {
                // Duplicate found. Delete this one (p) as it is "later" in loop?
                // Or check created_at?
                // Since we just fetched, default sort is usually ID or insert order.
                // We'll just delete the redundant one.
                exactDeletes.push(p.id);
            } else {
                seenMap.set(key, p.id);
            }
        }
    }

    // Generate SQL
    if (legacyToHide.length > 0) {
        console.error(`Hiding ${legacyToHide.length} legacy products...`);
        const ids = legacyToHide.map(id => `'${id}'`).join(',');
        sql += `UPDATE products SET is_active = false WHERE id IN (${ids});\n\n`;
    }

    if (exactDeletes.length > 0) {
        console.error(`Deleting ${exactDeletes.length} exact duplicates...`);
        const ids = exactDeletes.map(id => `'${id}'`).join(',');
        sql += `DELETE FROM products WHERE id IN (${ids});\n\n`;
    }

    for (const item of descriptionsToFix) {
        // Escape single quotes for SQL
        const safeDesc = item.description.replace(/'/g, "''");
        sql += `UPDATE products SET description = '${safeDesc}' WHERE id = '${item.id}';\n`;
    }

    console.log(sql);
}

fixData().catch(e => console.error(e));

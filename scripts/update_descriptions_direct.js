
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

async function updateDescriptions() {
    console.log('Starting Description Update...');

    // 1. Fetch Brands
    const { data: brands, error: brandsError } = await supabase.from('brands').select('id, name');
    if (brandsError) throw brandsError;
    const brandMap = {};
    brands.forEach(b => brandMap[b.id] = b.name);

    // 2. Fetch Active Products (only need to fix active ones usually, but let's fix all scraped ones)
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, name, brand_id, type, horsepower, cooling_type, description')
        .ilike('description', '%Scraped from ModernCool%'); // Only fetch those needing fix

    if (productsError) throw productsError;

    console.log(`Found ${products.length} products to update.`);

    let updatedCount = 0;
    for (const p of products) {
        const brandName = brandMap[p.brand_id] || 'تكييف';
        const typeAr = typeMap[p.type] || (p.type === 'wall' ? 'حائطي' : p.type) || 'تكييف';
        const hp = p.horsepower ? `${p.horsepower} حصان` : '';
        const coolingAr = coolingMap[p.cooling_type] || p.cooling_type || '';

        const newDesc = `تكييف ${brandName} ${typeAr} ${hp} ${coolingAr}. يتميز بتكنولوجيا متطورة لتوفير الطاقة وتبريد سريع ومثالي للأجواء الحارة. تصميم عصري يناسب جميع الديكورات ويضمن توزيع هواء مثالي.`;

        const { error } = await supabase
            .from('products')
            .update({ description: newDesc })
            .eq('id', p.id);

        if (error) {
            console.error(`Failed to update ${p.id}:`, error);
        } else {
            updatedCount++;
        }
    }

    console.log(`Successfully updated ${updatedCount} products.`);
}

updateDescriptions().catch(e => console.error(e));

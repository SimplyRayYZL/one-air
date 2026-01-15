-- Force add 'about' section to homepage_sections INSIDE the settings JSON column
-- Corrects the previous error by targeting the 'settings' column instead of a non-existent 'homepage_sections' column.

DO $$
DECLARE
    current_settings jsonb;
    current_sections jsonb;
    new_section jsonb;
    updated_sections jsonb;
BEGIN
    -- Define the new About section object
    new_section := '{
        "id": "about",
        "type": "about",
        "title": "من نحن",
        "subtitle": "نقدم أفضل حلول التكييف في مصر",
        "content": "شركة وان اير هي شركة رائدة في مجال تكييف الهواء، نسعى دائماً لتقديم أفضل المنتجات والخدمات لعملائنا.",
        "isEnabled": true,
        "order": 3
    }'::jsonb;

    -- Get the current 'settings' JSON blob from the row with id='main'
    -- (Assuming 'main' is the ID used by the app, based on useSettings.ts)
    SELECT settings INTO current_settings 
    FROM public.site_settings 
    WHERE id = 'main';

    -- If no row found with id='main', try to get any row (fallback)
    IF current_settings IS NULL THEN
        SELECT settings INTO current_settings FROM public.site_settings LIMIT 1;
    END IF;

    -- If we found settings
    IF current_settings IS NOT NULL THEN
        -- Extract the homepage_sections array
        current_sections := current_settings->'homepage_sections';

        -- If homepage_sections exists in the JSON
        IF current_sections IS NOT NULL THEN
            -- Check if 'about' type already exists to avoid duplicates
            IF NOT (current_sections @> '[{"type": "about"}]') THEN
                -- Append the new section to the existing array
                updated_sections := current_sections || new_section;
                
                -- Update the database with the modified JSON
                -- We use jsonb_set to replace just the homepage_sections key
                UPDATE public.site_settings
                SET settings = jsonb_set(settings, '{homepage_sections}', updated_sections)
                WHERE id = 'main' OR id = (SELECT id FROM public.site_settings LIMIT 1);
                
                RAISE NOTICE 'Successfully added About section to settings JSON.';
            ELSE
                RAISE NOTICE 'About section already exists in JSON.';
            END IF;
        ELSE
            -- If homepage_sections key is missing, add it with just our new section (and maybe defaults if we wanted, but safer to add just this)
            updated_sections := jsonb_build_array(new_section);
            
            UPDATE public.site_settings
            SET settings = jsonb_set(settings, '{homepage_sections}', updated_sections)
            WHERE id = 'main' OR id = (SELECT id FROM public.site_settings LIMIT 1);
            
            RAISE NOTICE 'Created homepage_sections array with About section.';
        END IF;
    ELSE
        RAISE NOTICE 'No settings found in site_settings table. Please check if the table is empty.';
    END IF;
END $$;

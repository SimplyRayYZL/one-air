import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageBanner {
    id: string;
    page_name: string;
    title: string | null;
    subtitle: string | null;
    image_url: string | null;
    is_active: boolean;
}

// Hook to fetch a specific page banner
export const usePageBanner = (pageId: string) => {
    return useQuery({
        queryKey: ["page-banner", pageId],
        queryFn: async (): Promise<PageBanner | null> => {
            const { data, error } = await (supabase as any)
                .from("page_banners")
                .select("*")
                .eq("page_name", pageId)
                .maybeSingle(); // Use maybeSingle to avoid 406 if not found, though single() is typically fine if we handle error

            if (error) {
                console.error("Error fetching page banner:", error);
                return null;
            }

            return data;
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};

// Default banners for fallback
export const defaultPageBanners: Record<string, { title: string; subtitle: string }> = {
    products: { title: "منتجاتنا", subtitle: "اكتشف مجموعتنا الواسعة من أجهزة التكييف" },
    blog: { title: "المدونة", subtitle: "نصائح ومقالات متخصصة عن التكييفات" },
    about: { title: "من نحن", subtitle: "تعرف على وان اير للتكييف" },
    contact: { title: "اتصل بنا", subtitle: "نحن هنا لمساعدتك" },
};

export default usePageBanner;

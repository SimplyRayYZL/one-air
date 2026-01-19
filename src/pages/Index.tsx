import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import BrandsSection from "@/components/home/BrandsSection";
import ProductsSection from "@/components/home/ProductsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ACCalculatorSection from "@/components/home/ACCalculatorSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import AboutUsHomeSection from "@/components/home/AboutUsHomeSection";
import PromoBanner from "@/components/home/PromoBanner";
import PromoSection from "@/components/home/PromoSection";
import { useSiteSettings } from "@/hooks/useSettings";
import { supabase } from "@/integrations/supabase/client";
import CountUp from "react-countup";
import { useState, useEffect } from "react";

const Index = () => {
  const { data: settings } = useSiteSettings();

  // Fetch CTA banner background
  const { data: ctaBanner } = useQuery({
    queryKey: ["cta_banner"],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("page_banners")
        .select("*")
        .eq("page_name", "cta_section")
        .eq("is_active", true)
        .single();
      return data as { image_url: string | null; title: string | null; subtitle: string | null } | null;
    },
  });

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "One Air Conditioning",
    "description": "شركة وان اير للتكييف - تكييفات شارب، كاريير، جنرال، ميديا، تورنيدو في مصر",
    "url": "https://oneair-eg.com",
    "telephone": "+201289006310",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "القاهرة",
      "addressCountry": "EG"
    },
    "priceRange": "$$",
    "openingHours": ["Sa-Th 09:00-22:00", "Fr 14:00-22:00"],
    "sameAs": [
      "https://www.facebook.com/OneAirconditioner",
      "https://wa.me/201289006310"
    ]
  };

  return (
    <>
      <Helmet>
        <title>وان اير للتكييف | تكييفات في مصر</title>
        <meta
          name="description"
          content="شركة وان اير للتكييف - تكييفات شارب، كاريير، جنرال، ميديا، تورنيدو في مصر. أفضل الأسعار، ضمان شامل، وتوصيل سريع."
        />
        <meta name="keywords" content="تكييفات, شارب, كاريير, جنرال, ميديا, تورنيدو, مصر, وان اير" />
        <link rel="canonical" href="https://oneair-eg.com" />

        {/* Open Graph */}
        <meta property="og:title" content="وان اير للتكييف | تكييفات في مصر" />
        <meta property="og:description" content="أفضل أسعار التكييفات في مصر مع ضمان شامل وتوصيل سريع" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://oneair-eg.com" />
        <meta property="og:locale" content="ar_EG" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="وان اير للتكييف | تكييفات بأفضل الأسعار" />
        <meta name="twitter:description" content="شركة وان اير للتكييف في مصر" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {/* Dynamic Sections Rendering */}
          {(() => {
            const sections = settings?.homepage_sections || [
              { id: 'hero', type: 'hero', title: 'الرئيسية', order: 1, isEnabled: true },
              { id: 'features', type: 'features', title: 'مميزاتنا', order: 2, isEnabled: true },
              { id: 'how_it_works', type: 'how_it_works', title: 'كيف نعمل', order: 3, isEnabled: true },
              { id: 'promo_1', type: 'promo_1', title: 'بانر عريض 1', order: 4, isEnabled: true },
              { id: 'brands', type: 'brands', title: 'ماركاتنا', order: 5, isEnabled: true },
              { id: 'products', type: 'products', title: 'منتجاتنا', order: 6, isEnabled: true },
              { id: 'calculator', type: 'calculator', title: 'حاسبة التكييف', order: 7, isEnabled: true },
              { id: 'promo_2', type: 'promo_2', title: 'بانر عريض 2', order: 8, isEnabled: true },
              { id: 'faq', type: 'faq', title: 'الأسئلة الشائعة', order: 9, isEnabled: true },
              { id: 'testimonials', type: 'testimonials', title: 'آراء العملاء', order: 10, isEnabled: true },
              { id: 'cta', type: 'cta', title: 'تواصل معنا', order: 11, isEnabled: true },
              { id: 'about_us_home', type: 'about_us_home', title: 'من نحن', order: 12, isEnabled: true },
            ];

            return sections
              .filter(section => section.isEnabled)
              .sort((a, b) => a.order - b.order)
              .map(section => {
                switch (section.type) {
                  case 'hero':
                    return <HeroBanner key={section.id} {...section} />;
                  case 'features':
                    return <FeaturesSection key={section.id} {...section} />;
                  case 'how_it_works':
                    return <HowItWorksSection key={section.id} {...section} />;
                  case 'promo_1':
                    return <PromoSection key={section.id} group="group1" {...section} />;
                  case 'brands':
                    return <BrandsSection key={section.id} {...section} />;
                  case 'products':
                    return <ProductsSection key={section.id} {...section} />;
                  case 'calculator':
                    return <ACCalculatorSection key={section.id} {...section} />;
                  case 'promo_2':
                    return <PromoSection key={section.id} group="group2" {...section} />;
                  case 'faq':
                    return <FAQSection key={section.id} {...section} />;
                  case 'testimonials':
                    return <TestimonialsSection key={section.id} {...section} />;
                  case 'cta':
                    return <CTASection key={section.id} {...section} />;
                  case 'about':
                  case 'about_us_home':
                    return <AboutUsHomeSection key={section.id} />;
                  default:
                    return null;
                }
              });
          })()}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;


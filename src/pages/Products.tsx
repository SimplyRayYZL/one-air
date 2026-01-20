import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/common/PageBanner";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, Loader2, X, SlidersHorizontal } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts, useBrands } from "@/hooks/useProducts";
import ProductCard from "@/components/products/ProductCard";
import { usePageBanner, defaultPageBanners } from "@/hooks/usePageBanner";
import productsBanner from "@/assets/banners/products-banner.jpg";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterSidebar from "@/components/products/FilterSidebar";

const horsepowers = ["1.5", "2.25", "3", "4", "5", "6", "7.5"];
const types = [
  { value: "split", label: "سبليت (حائطي)" },
  { value: "freestand", label: "فري ستاند (عمودي)" },
  { value: "concealed", label: "كونسيلد (مخفي)" },
  { value: "floor_ceiling", label: "أرضي سقفي" },
  { value: "cassette", label: "كاسيت" }
];
const coolingTypes = [
  { value: "cool_only", label: "بارد فقط" },
  { value: "cool_heat", label: "بارد ساخن" }
];
const inverterOptions = ["عادي", "انفرتر"];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch dynamic page banner
  const { data: pageBanner } = usePageBanner("products");

  // Read all filters from URL
  const brandFromUrl = searchParams.get("brand") || "الكل";
  const hpFromUrl = searchParams.get("hp") || "الكل";
  const typeFromUrl = searchParams.get("type") || "الكل";
  const coolingFromUrl = searchParams.get("cooling") || "الكل";
  const inverterFromUrl = searchParams.get("inverter") || "الكل";

  const [selectedBrand, setSelectedBrand] = useState(brandFromUrl);
  const [selectedHp, setSelectedHp] = useState(hpFromUrl);
  const [selectedType, setSelectedType] = useState(typeFromUrl);
  const [selectedCooling, setSelectedCooling] = useState(coolingFromUrl);
  const [selectedInverter, setSelectedInverter] = useState(inverterFromUrl);

  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: brands = [], isLoading: brandsLoading } = useBrands();

  // Sync state with URL on mount and URL changes
  useEffect(() => {
    setSelectedBrand(searchParams.get("brand") || "الكل");
    setSelectedHp(searchParams.get("hp") || "الكل");
    setSelectedType(searchParams.get("type") || "الكل");
    setSelectedCooling(searchParams.get("cooling") || "الكل");
    setSelectedInverter(searchParams.get("inverter") || "الكل");
  }, [searchParams]);

  // Generic function to update URL params
  const updateUrlParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "الكل") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Filter handlers
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    updateUrlParam("brand", brand);
  };

  const handleHpChange = (hp: string) => {
    setSelectedHp(hp);
    updateUrlParam("hp", hp);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    updateUrlParam("type", type);
  };

  const handleCoolingChange = (cooling: string) => {
    setSelectedCooling(cooling);
    updateUrlParam("cooling", cooling);
  };

  const handleInverterChange = (inverter: string) => {
    setSelectedInverter(inverter);
    updateUrlParam("inverter", inverter);
  };

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch = selectedBrand === "الكل" || product.brand === selectedBrand;

      // HP Match: Check new 'horsepower' column OR fallback to capacity string match
      const hpMatch = selectedHp === "الكل" ||
        (product.horsepower === selectedHp) ||
        (product.capacity && product.capacity.includes(selectedHp));

      const typeMatch = selectedType === "الكل" || product.type === selectedType;

      const coolingMatch = selectedCooling === "الكل" ||
        product.cooling_type === selectedCooling ||
        (selectedCooling === "cool_only" && product.name.includes("بارد")) || // Legacy fallback
        (selectedCooling === "cool_heat" && product.name.includes("ساخن"));

      // Inverter filter logic - check if product name contains "انفرتر" or "Inverter"
      let inverterMatch = true;
      if (selectedInverter === "انفرتر") {
        inverterMatch = product.name?.toLowerCase().includes("انفرتر") ||
          product.name?.toLowerCase().includes("inverter");
      } else if (selectedInverter === "عادي") {
        inverterMatch = !product.name?.toLowerCase().includes("انفرتر") &&
          !product.name?.toLowerCase().includes("inverter");
      }

      return brandMatch && hpMatch && typeMatch && coolingMatch && inverterMatch;
    });
  }, [products, selectedBrand, selectedHp, selectedType, selectedCooling, selectedInverter]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedBrand, selectedHp, selectedType, selectedCooling, selectedInverter]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const brandOptions = useMemo(() => {
    return ["الكل", ...brands.map(b => b.name)];
  }, [brands]);

  const hpOptions = ["الكل", ...horsepowers];
  const typeFilterOptions = [{ value: "الكل", label: "كل الأنواع" }, ...types];
  const coolingFilterOptions = [{ value: "الكل", label: "خيار التبريد" }, ...coolingTypes];
  const inverterFilterOptions = ["الكل", ...inverterOptions];

  const resetFilters = () => {
    setSelectedBrand("الكل");
    setSelectedHp("الكل");
    setSelectedType("الكل");
    setSelectedCooling("الكل");
    setSelectedInverter("الكل");
    setSearchParams({});
  };

  const hasActiveFilters = selectedBrand !== "الكل" || selectedHp !== "الكل" ||
    selectedType !== "الكل" || selectedCooling !== "الكل" || selectedInverter !== "الكل";

  const isLoading = productsLoading || brandsLoading;

  return (
    <>
      <Helmet>
        <title>منتجاتنا | وان اير للتكييف - أفضل تكييفات كاريير، هاير، ميديا</title>
        <meta name="description" content="تصفح مجموعتنا الواسعة من التكييفات من أشهر الماركات العالمية في مصر. كاريير، هاير، ميديا بأسعار تبدأ من 15,000 جنيه. توصيل وتركيب مجاني." />
        <meta name="keywords" content="تكييفات, تكييف كاريير, تكييف هاير, تكييف ميديا, تكييف انفرتر, اسعار التكييفات في مصر 2025" />
        <link rel="canonical" href="https://oneair-eg.com/products" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {/* Page Banner */}
          <PageBanner
            title={selectedBrand !== "الكل" ? `تكييفات ${selectedBrand}` : (pageBanner?.title || defaultPageBanners.products.title)}
            subtitle={pageBanner?.subtitle || defaultPageBanners.products.subtitle}
            backgroundImage={pageBanner?.image_url || productsBanner}
            showCTA={false}
            overlayColor={pageBanner?.overlay_color}
            overlayOpacity={pageBanner?.overlay_opacity}
          />

          {/* Main Content Grid */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Desktop Sidebar (Left) */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <FilterSidebar
                    selectedBrand={selectedBrand}
                    selectedHp={selectedHp}
                    selectedType={selectedType}
                    selectedCooling={selectedCooling}
                    selectedInverter={selectedInverter}
                    onBrandChange={handleBrandChange}
                    onHpChange={handleHpChange}
                    onTypeChange={handleTypeChange}
                    onCoolingChange={handleCoolingChange}
                    onInverterChange={handleInverterChange}
                    onReset={resetFilters}
                    brands={brandOptions.filter(b => b !== "الكل")}
                  />
                </div>
              </aside>

              {/* Product Grid Area */}
              <div className="flex-1">
                {/* Mobile Filter & Sort Bar */}
                <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Filter className="h-4 w-4" />
                        تصفية المنتجات
                        {hasActiveFilters && (
                          <div className="bg-secondary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">!</div>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0">
                      <div className="h-full py-4">
                        <FilterSidebar
                          selectedBrand={selectedBrand}
                          selectedHp={selectedHp}
                          selectedType={selectedType}
                          selectedCooling={selectedCooling}
                          selectedInverter={selectedInverter}
                          onBrandChange={(val) => { handleBrandChange(val); }} // Sheet stays open for multiple selects usually
                          onHpChange={handleHpChange}
                          onTypeChange={handleTypeChange}
                          onCoolingChange={handleCoolingChange}
                          onInverterChange={handleInverterChange}
                          onReset={resetFilters}
                          brands={brandOptions.filter(b => b !== "الكل")}
                          className="border-none shadow-none h-full"
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                    {filteredProducts.length} منتج
                  </div>
                </div>

                {/* Active Filters Bar (Desktop) - REMOVED AS REQUESTED */}

                {/* Products Grid */}
                <section className="py-6 bg-background">
                  <div className="container mx-auto px-0"> {/* Removed padding for wider look */}
                    <div className="flex flex-col gap-6">
                      {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                          <Loader2 className="h-10 w-10 animate-spin text-secondary" />
                        </div>
                      ) : (
                        <>
                          {/* Changed to 3 columns max for larger cards */}
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {filteredProducts.slice(0, visibleCount).map((product, index) => (
                              <ProductCard key={product.id} product={product} index={index} />
                            ))}
                          </div>

                          {/* Load More Button */}
                          {visibleCount < filteredProducts.length && (
                            <div className="flex justify-center mt-8">
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={handleLoadMore}
                                className="min-w-[200px] border-secondary text-secondary hover:bg-secondary hover:text-white transition-all transform hover:scale-105"
                              >
                                عرض المزيد من المنتجات ({filteredProducts.length - visibleCount})
                              </Button>
                            </div>
                          )}
                        </>
                      )}

                      {!isLoading && filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                          <p className="text-xl text-muted-foreground">لا توجد منتجات تطابق معايير البحث</p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={resetFilters}
                          >
                            إعادة تعيين الفلاتر
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Products;


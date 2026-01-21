
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterSidebarProps {
    selectedBrand: string;
    selectedHp: string;
    selectedType: string;
    selectedCooling: string;
    selectedInverter: string;
    onBrandChange: (value: string) => void;
    onHpChange: (value: string) => void;
    onTypeChange: (value: string) => void;
    onCoolingChange: (value: string) => void;
    onInverterChange: (value: string) => void;
    onReset: () => void;
    brands: string[];
    className?: string;
}

const horsepowers = ["1.5", "2.25", "3", "4", "5", "6", "7.5"];
const types = [
    { value: "wall", label: "سبليت (حائطي)" },
    { value: "freestand", label: "فري ستاند (عمودي)" },
    { value: "concealed", label: "كونسيلد (مخفي)" },
    { value: "floor_ceiling", label: "أرضي سقفي" },
    { value: "central", label: "مركزي" },
    { value: "cassette", label: "كاسيت" }
];
const coolingTypes = [
    { value: "cold", label: "بارد فقط" },
    { value: "hot_cold", label: "بارد ساخن" }
];
const inverterOptions = ["عادي", "انفرتر"];

const FilterSidebar = ({
    selectedBrand,
    selectedHp,
    selectedType,
    selectedCooling,
    selectedInverter,
    onBrandChange,
    onHpChange,
    onTypeChange,
    onCoolingChange,
    onInverterChange,
    onReset,
    brands,
    className = ""
}: FilterSidebarProps) => {
    const hasActiveFilters = selectedBrand !== "الكل" || selectedHp !== "الكل" ||
        selectedType !== "الكل" || selectedCooling !== "الكل" || selectedInverter !== "الكل";

    return (
        <div className={`flex flex-col h-full bg-card border rounded-xl overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-lg">
                    <Filter className="w-5 h-5 text-secondary" />
                    <span>تصفية النتائج</span>
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs h-8 px-2"
                    >
                        مسح الكل
                    </Button>
                )}
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    <Accordion type="multiple" defaultValue={["brand", "hp", "type", "cooling", "tech"]} className="w-full">

                        {/* Brand Filter */}
                        <AccordionItem value="brand" className="border-none">
                            <AccordionTrigger className="hover:no-underline py-3 text-base font-bold bg-muted/20 px-4 rounded-lg data-[state=open]:rounded-b-none transition-colors">
                                الماركة
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 px-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => onBrandChange("الكل")}
                                        className={`h-auto py-2 px-1 whitespace-normal text-xs font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedBrand === "الكل" ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                    >
                                        الكل
                                    </Button>
                                    {brands.map((brand) => (
                                        <Button
                                            key={brand}
                                            variant="outline"
                                            onClick={() => onBrandChange(brand)}
                                            className={`h-auto py-2 px-1 whitespace-normal text-xs font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedBrand === brand ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                        >
                                            {brand}
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <Separator className="my-2" />

                        {/* HP Filter */}
                        <AccordionItem value="hp" className="border-none">
                            <AccordionTrigger className="hover:no-underline py-3 text-base font-bold bg-muted/20 px-4 rounded-lg data-[state=open]:rounded-b-none transition-colors">
                                القدرة (حصان)
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 px-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => onHpChange("الكل")}
                                        className={`h-auto py-2 px-1 whitespace-normal text-xs font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedHp === "الكل" ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                    >
                                        الكل
                                    </Button>
                                    {horsepowers.map((hp) => (
                                        <Button
                                            key={hp}
                                            variant="outline"
                                            onClick={() => onHpChange(hp)}
                                            className={`h-auto py-2 px-1 whitespace-normal text-xs font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedHp === hp ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                        >
                                            {hp} حصان
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <Separator className="my-2" />

                        {/* Type Filter */}
                        <AccordionItem value="type" className="border-none">
                            <AccordionTrigger className="hover:no-underline py-3 text-base font-bold bg-muted/20 px-4 rounded-lg data-[state=open]:rounded-b-none transition-colors">
                                نوع التكييف
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 px-2">
                                <div className="grid grid-cols-1 gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => onTypeChange("الكل")}
                                        className={`h-auto py-3 justify-start px-4 text-sm font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedType === "الكل" ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                    >
                                        كل الأنواع
                                    </Button>
                                    {types.map((type) => (
                                        <Button
                                            key={type.value}
                                            variant="outline"
                                            onClick={() => onTypeChange(type.value)}
                                            className={`h-auto py-3 justify-start px-4 text-sm font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedType === type.value ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                        >
                                            {type.label}
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <Separator className="my-2" />

                        {/* Cooling Filter */}
                        <AccordionItem value="cooling" className="border-none">
                            <AccordionTrigger className="hover:no-underline py-3 text-base font-bold bg-muted/20 px-4 rounded-lg data-[state=open]:rounded-b-none transition-colors">
                                نظام التبريد
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 px-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => onCoolingChange("الكل")}
                                        className={`h-auto py-2 px-1 whitespace-normal text-xs font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedCooling === "الكل" ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                    >
                                        الكل
                                    </Button>
                                    {coolingTypes.map((cool) => (
                                        <Button
                                            key={cool.value}
                                            variant="outline"
                                            onClick={() => onCoolingChange(cool.value)}
                                            className={`h-auto py-2 px-1 whitespace-normal text-xs font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedCooling === cool.value ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                        >
                                            {cool.label}
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <Separator className="my-2" />

                        {/* Inverter Filter */}
                        <AccordionItem value="tech" className="border-none">
                            <AccordionTrigger className="hover:no-underline py-3 text-base font-bold bg-muted/20 px-4 rounded-lg data-[state=open]:rounded-b-none transition-colors">
                                تكنولوجيا الانفرتر
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 px-2">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => onInverterChange("الكل")}
                                        className={`flex-1 h-auto py-2 text-xs font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedInverter === "الكل" ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                    >
                                        الكل
                                    </Button>
                                    {inverterOptions.map((opt) => (
                                        <Button
                                            key={opt}
                                            variant="outline"
                                            onClick={() => onInverterChange(opt)}
                                            className={`flex-1 h-auto py-2 text-xs font-semibold rounded-xl border-2 shadow-sm transition-all hover:text-secondary hover:border-secondary/50 ${selectedInverter === opt ? 'bg-secondary/5 text-secondary border-secondary ring-1 ring-secondary' : 'text-muted-foreground border-slate-200'}`}
                                        >
                                            {opt}
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </ScrollArea>
        </div>
    );
};

export default FilterSidebar;

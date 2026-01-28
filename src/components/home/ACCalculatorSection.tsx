import { useState } from "react";
import { usePageBanner } from "@/hooks/usePageBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BedDouble, Armchair, Briefcase, Store, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const calculateHP = (area: number, location: string, floor: string, sun: string, type: string) => {
    let hp = 1.5;
    let units = 1;

    if (location === 'south' || location === 'lastfloor') {
        // For southern direction or last floor (more heat exposure)
        // 1.5HP: up to 10 sqm
        // 2.25HP: 11-16 sqm
        // 3HP: 17-20 sqm
        // 4HP: 21-30 sqm
        // 5HP: 31-40 sqm
        // 2x3HP: 41-50 sqm
        if (area > 10) hp = 2.25;
        if (area > 16) hp = 3;
        if (area > 20) hp = 4;
        if (area > 30) hp = 5;
        if (area > 40) { hp = 3; units = 2; }
    } else {
        // For northern direction (less heat)
        // 1.5HP: up to 15 sqm
        // 2.25HP: 16-24 sqm
        // 3HP: 25-30 sqm
        // 4HP: 31-40 sqm
        // 5HP: 41-50 sqm
        if (area > 15) hp = 2.25;
        if (area > 24) hp = 3;
        if (area > 30) hp = 4;
        if (area > 40) hp = 5;
    }

    const btu = area * 2.8 * 300;

    return { hp, btu, units };
};

const ROOM_TYPES = [
    { id: "bedroom", label: "غرفة نوم", icon: BedDouble },
    { id: "living", label: "غرفة معيشة", icon: Armchair },
    { id: "office", label: "مكتب", icon: Briefcase },
    { id: "store", label: "محل تجاري", icon: Store },
];

const ACCalculatorSection = ({ title, subtitle }: { title?: string, subtitle?: string }) => {
    const navigate = useNavigate();
    const { data: banner } = usePageBanner('calculator');

    const [roomType, setRoomType] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [location, setLocation] = useState<string>("north");
    const [floor, setFloor] = useState<string>("middle"); // kept for logic, simpler UI

    const [result, setResult] = useState<{ hp: number, btu: number, units: number } | null>(null);

    const handleCalculate = () => {
        if (!roomType || !area) {
            toast.error("يرجى اختيار نوع الغرفة والمساحة");
            return;
        }

        // Use default values for floor/sun if not exposed in refined UI
        const res = calculateHP(Number(area), location, floor, "average", roomType);
        setResult(res);
    };

    const goToProducts = () => {
        if (result) {
            navigate(`/products?capacity=${result.hp} حصان`);
        }
    };

    return (
        <section className="py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                <div
                    className="rounded-3xl p-8 md:p-12 lg:p-16 relative min-h-[400px] flex items-center justify-center overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, #152C73 0%, #1e40af 50%, #3b82f6 100%)",
                    }}
                >
                    {/* Content Overlay - Search Widget Style */}
                    <div className="w-full relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-5xl mx-auto"
                        >
                            {/* Header Text */}
                            <div className="text-center mb-8 text-white drop-shadow-lg">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                    {title || banner?.title || "حاسبة قدرة التكييف"}
                                </h2>
                                <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                                    {subtitle || banner?.subtitle || "احسب قدرة التكييف المناسبة لمساحتك بخطوات بسيطة"}
                                </p>
                            </div>

                            {/* Widget Container */}
                            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                                <CardContent className="p-6 md:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">

                                        {/* 1. Room Type */}
                                        <div className="md:col-span-3 space-y-2">
                                            <label className="text-white text-sm font-medium pr-1">نوع الغرفة</label>
                                            <Select value={roomType} onValueChange={setRoomType}>
                                                <SelectTrigger className="h-12 bg-white/90 border-0 text-slate-900 focus:ring-2 focus:ring-primary/50 font-medium text-right">
                                                    <SelectValue placeholder="اختر النوع" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {ROOM_TYPES.map(type => (
                                                        <SelectItem key={type.id} value={type.id} className="cursor-pointer text-right dir-rtl flex-row-reverse">
                                                            <div className="flex items-center gap-2">
                                                                <type.icon className="w-4 h-4 text-primary" />
                                                                <span>{type.label}</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* 2. Area */}
                                        <div className="md:col-span-3 space-y-2">
                                            <label className="text-white text-sm font-medium pr-1">المساحة (متر مربع)</label>
                                            <Select value={area} onValueChange={setArea}>
                                                <SelectTrigger className="h-12 bg-white/90 border-0 text-slate-900 focus:ring-2 focus:ring-primary/50 font-medium text-right">
                                                    <SelectValue placeholder="اختر المساحة" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[200px]">
                                                    {[...Array(10)].map((_, i) => {
                                                        const val = (i + 1) * 5; // 5, 10, 15... up to 50
                                                        return (
                                                            <SelectItem key={val} value={val.toString()} className="cursor-pointer text-right">
                                                                {val} متر مربع
                                                            </SelectItem>
                                                        )
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* 3. Location/Direction */}
                                        <div className="md:col-span-3 space-y-2">
                                            <label className="text-white text-sm font-medium pr-1">موقع الشقة</label>
                                            <Select value={location} onValueChange={setLocation}>
                                                <SelectTrigger className="h-12 bg-white/90 border-0 text-slate-900 focus:ring-2 focus:ring-primary/50 font-medium text-right">
                                                    <SelectValue placeholder="اختر الموقع" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="north" className="text-right">جهة بحري</SelectItem>
                                                    <SelectItem value="south" className="text-right">جهة قبلي</SelectItem>
                                                    <SelectItem value="lastfloor" className="text-right">دور أخير</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Action Button */}
                                        <div className="md:col-span-3">
                                            <Button
                                                onClick={handleCalculate}
                                                className="w-full h-12 text-lg font-bold shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <Calculator className="mr-2 h-5 w-5" />
                                                احسب القدرة
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Result Area - Expands when calculated */}
                                    <AnimatePresence>
                                        {result && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-white/95 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/50 shadow-inner">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-green-100 text-green-700 rounded-full">
                                                            <CheckCircle2 className="h-8 w-8" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-muted-foreground font-medium">القدرة المناسبة لك</p>
                                                            <h3 className="text-2xl font-bold text-gray-900">
                                                                {result.units > 1 ? `${result.units} × ${result.hp} حصان` : `${result.hp} حصان`}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        onClick={goToProducts}
                                                        className="w-full md:w-auto bg-slate-900 text-white hover:bg-slate-800 gap-2"
                                                    >
                                                        عرض التكييفات المناسبة
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ACCalculatorSection;


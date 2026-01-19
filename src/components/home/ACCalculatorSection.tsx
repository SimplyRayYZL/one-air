import { useState } from "react";
import { usePageBanner } from "@/hooks/usePageBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BedDouble, Armchair, Briefcase, Store, Calculator, ArrowRight, CheckCircle2, Snowflake } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const calculateHP = (area: number, height: number, floor: string, sun: string, type: string) => {
    const btu = area * height * 300;
    let hp = 1.5;
    if (btu > 12000) hp = 2.25;
    if (btu > 18000) hp = 3;
    if (btu > 24000) hp = 4;
    if (btu > 36000) hp = 5;

    return { hp, btu };
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
    const [height, setHeight] = useState<string>("2.8");
    const [floor, setFloor] = useState<string>("middle");

    const [result, setResult] = useState<{ hp: number, btu: number } | null>(null);

    const handleCalculate = () => {
        if (!roomType || !area) {
            toast.error("يرجى اختيار نوع الغرفة والمساحة");
            return;
        }

        const res = calculateHP(Number(area), Number(height), floor, "average", roomType);
        setResult(res);
    };

    const goToProducts = () => {
        if (result) {
            navigate(`/products?capacity=${result.hp} حصان`);
        }
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-100 via-slate-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Contained Banner Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                        {banner?.image_url ? (
                            <>
                                <motion.img
                                    src={banner.image_url}
                                    alt={banner.title || "Calculator Background"}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.15 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-slate-900/90" />
                            </>
                        ) : (
                            <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-800 via-slate-900 to-slate-950" />
                        )}

                        {/* Animated Snowflakes/Particles */}
                        <motion.div
                            className="absolute top-16 left-[10%] text-white/20"
                            animate={{ y: [0, 15, 0], rotate: [0, 180, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <Snowflake className="w-8 h-8" />
                        </motion.div>
                        <motion.div
                            className="absolute top-24 right-[15%] text-white/15"
                            animate={{ y: [0, -10, 0], rotate: [0, -180, -360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <Snowflake className="w-6 h-6" />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-20 left-[20%] text-white/10"
                            animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 6, repeat: Infinity }}
                        >
                            <Snowflake className="w-10 h-10" />
                        </motion.div>

                        {/* Glowing orbs */}
                        <motion.div
                            className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-400/15 rounded-full blur-3xl"
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
                            transition={{ duration: 7, repeat: Infinity }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12 lg:p-16">
                        {/* Header Text */}
                        <motion.div
                            className="text-center mb-10 text-white"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20"
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                            >
                                <Calculator className="w-4 h-4" />
                                <span>حاسبة ذكية</span>
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                {title || banner?.title || "حاسبة قدرة التكييف"}
                            </h2>
                            <p className="text-lg text-white/80 max-w-2xl mx-auto">
                                {subtitle || banner?.subtitle || "احسب قدرة التكييف المناسبة لمساحتك بخطوات بسيطة"}
                            </p>
                        </motion.div>

                        {/* Widget Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden">
                                <CardContent className="p-6 md:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">

                                        {/* 1. Room Type */}
                                        <div className="md:col-span-3 space-y-2">
                                            <label className="text-white/90 text-sm font-medium pr-1">نوع الغرفة</label>
                                            <Select value={roomType} onValueChange={setRoomType}>
                                                <SelectTrigger className="h-12 bg-white/95 border-0 text-slate-900 focus:ring-2 focus:ring-primary/50 font-medium text-right shadow-sm">
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
                                            <label className="text-white/90 text-sm font-medium pr-1">المساحة (متر مربع)</label>
                                            <Select value={area} onValueChange={setArea}>
                                                <SelectTrigger className="h-12 bg-white/95 border-0 text-slate-900 focus:ring-2 focus:ring-primary/50 font-medium text-right shadow-sm">
                                                    <SelectValue placeholder="اختر المساحة" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[200px]">
                                                    {[...Array(20)].map((_, i) => {
                                                        const val = (i + 1) * 5;
                                                        return (
                                                            <SelectItem key={val} value={val.toString()} className="cursor-pointer text-right">
                                                                {val} متر مربع
                                                            </SelectItem>
                                                        )
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* 3. Height */}
                                        <div className="md:col-span-3 space-y-2">
                                            <label className="text-white/90 text-sm font-medium pr-1">ارتفاع السقف</label>
                                            <Select value={height} onValueChange={setHeight}>
                                                <SelectTrigger className="h-12 bg-white/95 border-0 text-slate-900 focus:ring-2 focus:ring-primary/50 font-medium text-right shadow-sm">
                                                    <SelectValue placeholder="الارتفاع" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="2.8" className="text-right">عادي (2.8م)</SelectItem>
                                                    <SelectItem value="3.5" className="text-right">عالي (3.5م)</SelectItem>
                                                    <SelectItem value="4.0" className="text-right">مرتفع جداً (4م+)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Action Button */}
                                        <div className="md:col-span-3">
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    onClick={handleCalculate}
                                                    className="w-full h-12 text-lg font-bold shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300"
                                                >
                                                    <Calculator className="mr-2 h-5 w-5" />
                                                    احسب القدرة
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Result Area */}
                                    <AnimatePresence>
                                        {result && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-white rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner border border-slate-100">
                                                    <div className="flex items-center gap-4">
                                                        <motion.div
                                                            className="p-3 bg-green-100 text-green-700 rounded-full"
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                                        >
                                                            <CheckCircle2 className="h-8 w-8" />
                                                        </motion.div>
                                                        <div>
                                                            <p className="text-sm text-muted-foreground font-medium">القدرة المناسبة لك</p>
                                                            <motion.h3
                                                                className="text-2xl font-bold text-gray-900"
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.2 }}
                                                            >
                                                                {result.hp} حصان
                                                            </motion.h3>
                                                        </div>
                                                    </div>

                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <Button
                                                            onClick={goToProducts}
                                                            className="w-full md:w-auto bg-slate-900 text-white hover:bg-slate-800 gap-2 shadow-md"
                                                        >
                                                            عرض التكييفات المناسبة
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Button>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ACCalculatorSection;

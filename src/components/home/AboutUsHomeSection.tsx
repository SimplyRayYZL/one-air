import { motion } from "framer-motion";
import { usePageBanner } from "@/hooks/usePageBanner";
import { Building2, Users, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
    { icon: Building2, value: "10+", label: "سنوات خبرة" },
    { icon: Users, value: "5000+", label: "عميل سعيد" },
    { icon: Award, value: "15+", label: "علامة تجارية" },
    { icon: Target, value: "100%", label: "ضمان الجودة" },
];

const floatingAnimation = {
    initial: { y: 0 },
    animate: {
        y: [-5, 5, -5],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const AboutUsHomeSection = () => {
    const { data: banner } = usePageBanner('about_us_home');

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Contained Banner Card with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Background Image/Gradient - Contained */}
                    <div className="absolute inset-0 z-0">
                        {banner?.image_url ? (
                            <>
                                <motion.img
                                    src={banner.image_url}
                                    alt="About Us Background"
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.1 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/80 to-blue-900/85" />
                            </>
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary via-blue-700 to-blue-900" />
                        )}

                        {/* Animated Decorative Elements */}
                        <motion.div
                            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 6, repeat: Infinity }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12 lg:p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-white text-right"
                            >
                                <motion.span
                                    className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4"
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                                >
                                    من نحن
                                </motion.span>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                    {banner?.title || "وان اير للتكييف"}
                                </h2>

                                <p className="text-lg text-white/90 mb-4 leading-relaxed">
                                    {banner?.subtitle || "نسعى لتقديم أفضل حلول التكييف بأعلى جودة وأفضل سعر. نحن وكلاء معتمدون لأكبر العلامات التجارية العالمية."}
                                </p>

                                <p className="text-white/75 mb-8 leading-relaxed text-sm md:text-base">
                                    تأسست شركة وان اير لتكون الخيار الأول للعملاء الباحثين عن الجودة والسعر المناسب.
                                    نقدم تشكيلة واسعة من التكييفات مع ضمان شامل وخدمة توصيل وتركيب متميزة.
                                </p>

                                <Link to="/about">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            size="lg"
                                            className="bg-white text-primary hover:bg-white/90 font-bold px-8 shadow-lg"
                                        >
                                            اعرف المزيد عنا
                                        </Button>
                                    </motion.div>
                                </Link>
                            </motion.div>

                            {/* Stats Grid */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                        whileHover={{
                                            y: -5,
                                            backgroundColor: "rgba(255,255,255,0.25)",
                                            transition: { duration: 0.2 }
                                        }}
                                        className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 cursor-default"
                                    >
                                        <motion.div
                                            className="inline-flex p-3 bg-white/20 rounded-full mb-3"
                                            variants={floatingAnimation}
                                            initial="initial"
                                            animate="animate"
                                        >
                                            <stat.icon className="w-5 h-5 text-white" />
                                        </motion.div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            {stat.value}
                                        </h3>
                                        <p className="text-white/75 text-xs md:text-sm">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUsHomeSection;

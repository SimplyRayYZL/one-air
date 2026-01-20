import { useSiteSettings } from "@/hooks/useSettings";
import { usePageBanner } from "@/hooks/usePageBanner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { Users, Clock, Award, ShieldCheck } from "lucide-react";

interface StatCard {
    icon: React.ReactNode;
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
}

interface AboutSectionProps {
    title?: string;
    subtitle?: string;
    content?: any;
}

const AboutSection = ({ title, subtitle, content }: AboutSectionProps) => {
    const { data: settings } = useSiteSettings();
    const { data: banner } = usePageBanner('home_about_section');

    // Get content from props (section-level) or settings (global)
    const sectionContent = typeof content === 'object' ? content : {};

    // Main text content
    const badgeText = sectionContent.badge || "من نحن";
    const mainTitle = title || sectionContent.title || settings?.about_title || "من نحن";
    const mainSubtitle = subtitle || sectionContent.subtitle || settings?.about_mission || "نسعى لتقديم أفضل حلول التكييف بأعلى جودة وأفضل سعر";
    const description = sectionContent.description || settings?.about_content || "تأسست شركة وان اير لتكون الخيار الأول للعملاء الباحثين عن الجودة والسعر المناسب. نقدم تشكيلة واسعة من التكييفات مع ضمان شامل وخدمة توصيل وتركيب متميزة.";
    const buttonText = sectionContent.buttonText || "اعرف المزيد عنا";
    const buttonLink = sectionContent.buttonLink || "/about";

    // Stats data with defaults
    const defaultStats = [
        { value: 5000, prefix: "+", label: "عميل سعيد", iconType: "users" },
        { value: 10, prefix: "+", label: "سنوات خبرة", iconType: "clock" },
        { value: 15, prefix: "+", label: "علامة تجارية", iconType: "award" },
        { value: 100, suffix: "%", label: "ضمان الجودة", iconType: "shield" },
    ];

    const stats = sectionContent.stats || defaultStats;

    const getIcon = (iconType: string) => {
        const iconClass = "h-6 w-6 text-blue-300";
        switch (iconType) {
            case "users": return <Users className={iconClass} />;
            case "clock": return <Clock className={iconClass} />;
            case "award": return <Award className={iconClass} />;
            case "shield": return <ShieldCheck className={iconClass} />;
            default: return <Users className={iconClass} />;
        }
    };

    return (
        <section className="py-16 md:py-24 overflow-hidden" id="about">
            <div className="container mx-auto px-4">
                <div
                    className="rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
                >
                    {/* Background: Banner Image or Gradient */}
                    <div className="absolute inset-0 z-0">
                        {banner?.image_url ? (
                            <>
                                <img
                                    src={banner.image_url}
                                    alt="About Background"
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                {banner.overlay_color ? (
                                    <div
                                        className="absolute inset-0 transition-all duration-300"
                                        style={{ backgroundColor: banner.overlay_color, opacity: banner.overlay_opacity ?? 0.5 }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/80 mix-blend-multiply" />
                                )}
                            </>
                        ) : (
                            <div
                                className="w-full h-full"
                                style={{
                                    background: banner?.overlay_color || "linear-gradient(135deg, #152C73 0%, #1e40af 50%, #3b82f6 100%)",
                                    opacity: banner?.overlay_color && banner?.overlay_opacity ? banner.overlay_opacity : 1
                                }}
                            />
                        )}
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">

                        {/* Stats Grid (Left Side) */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/2 w-full order-2 lg:order-1"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-4">
                                            {getIcon(stat.iconType)}
                                        </div>
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                            {stat.prefix && <span>{stat.prefix}</span>}
                                            <CountUp
                                                end={stat.value}
                                                duration={2.5}
                                                enableScrollSpy
                                                scrollSpyOnce
                                            />
                                            {stat.suffix && <span>{stat.suffix}</span>}
                                        </div>
                                        <p className="text-blue-100 text-sm md:text-base">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Text Content (Right Side) */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/2 text-right order-1 lg:order-2"
                        >
                            {/* Badge */}
                            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/20 text-white text-sm font-medium">
                                {badgeText}
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                {mainTitle}
                            </h2>

                            {/* Subtitle */}
                            <p className="text-xl md:text-2xl text-blue-100 mb-6 font-medium">
                                {mainSubtitle}
                            </p>

                            {/* Description */}
                            <p className="text-blue-50/90 leading-relaxed mb-8 text-base md:text-lg">
                                {description}
                            </p>

                            {/* CTA Button */}
                            <Button
                                asChild
                                variant="outline"
                                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg rounded-full transition-all duration-300"
                            >
                                <Link to={buttonLink}>
                                    {buttonText}
                                </Link>
                            </Button>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

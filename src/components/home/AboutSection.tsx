import { useSiteSettings } from "@/hooks/useSettings";
import { usePageBanner } from "@/hooks/usePageBanner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutSection = ({ title, subtitle, content: sectionContent }: { title?: string, subtitle?: string, content?: any }) => {
    const { data: settings } = useSiteSettings();
    const { data: banner } = usePageBanner('about');

    // Default content if not set
    const mainTitle = title || settings?.about_title || "وان اير للتكييف";
    const subTitle = subtitle || settings?.about_mission || "نقدم أفضل حلول التكييف في مصر منذ سنوات";
    // Prefer section content (string), then global setting, then default
    const textContent = (typeof sectionContent === 'string' ? sectionContent : sectionContent?.text) || settings?.about_content || "شركة وان اير هي شركة رائدة في مجال تكييف الهواء، نسعى دائماً لتقديم أفضل المنتجات والخدمات لعملائنا. نحن وكلاء معتمدون لكبرى الماركات العالمية مثل كاريير، ميديا، وميسوتشوبيشي.";

    const aboutImage = banner?.image_url || "/about-us-placeholder.jpg"; // Fallback image

    return (
        <section className="py-20 bg-[#002B5B] text-white overflow-hidden relative">
            {/* Background Pattern Overlay (Optional) */}
            <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 text-right order-2 lg:order-1"
                    >
                        <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold border border-blue-500/30">
                            من نحن
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                            {mainTitle}
                        </h2>
                        <h3 className="text-xl text-blue-200 mb-6 font-medium">
                            {subTitle}
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                            {textContent}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-blue-400 h-6 w-6 shrink-0" />
                                <span className="text-gray-200">وكيل معتمد لأكبر الماركات العالمية</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-blue-400 h-6 w-6 shrink-0" />
                                <span className="text-gray-200">فريق فني متخصص للتركيب والصيانة</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-blue-400 h-6 w-6 shrink-0" />
                                <span className="text-gray-200">أفضل خدمة ما بعد البيع في مصر</span>
                            </div>
                        </div>

                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-900/50 hover:shadow-blue-900/80 transition-all duration-300">
                            <Link to="/about">
                                اقرأ المزيد
                                <ArrowLeft className="mr-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Image Content (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 order-1 lg:order-2"
                    >
                        <div className="relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

                            <img
                                src={aboutImage}
                                alt="عن وان اير"
                                className="relative z-10 w-full rounded-2xl shadow-2xl border-4 border-white/10"
                            />

                            {/* Floating Badge (Example) */}
                            <div className="absolute -bottom-6 -right-6 bg-white text-blue-900 p-4 rounded-xl shadow-xl z-20 hidden md:block animate-bounce-slow">
                                <p className="text-center font-bold text-sm">خبرة أكثر من</p>
                                <p className="text-center font-black text-3xl">10</p>
                                <p className="text-center font-bold text-sm">سنوات</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;

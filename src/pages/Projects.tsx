import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, Building2, Snowflake, Wind, Thermometer, CheckCircle2, Users, Wrench, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSettings";

const systemTypes = [
    {
        title: "أنظمة VRF",
        subtitle: "Variable Refrigerant Flow",
        description: "أحدث تقنيات التكييف للمباني الكبيرة والمجمعات التجارية. تحكم فردي في كل وحدة مع كفاءة طاقة عالية.",
        icon: Wind,
        features: ["تحكم فردي لكل غرفة", "توفير طاقة حتى 50%", "تبريد وتدفئة متزامن", "صيانة سهلة"],
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
        title: "تكييف مركزي",
        subtitle: "Central Air Conditioning",
        description: "الحل الأمثل للفنادق والمستشفيات والمولات التجارية. توزيع متساوي للهواء في جميع الأماكن.",
        icon: Building2,
        features: ["تغطية مساحات كبيرة", "جودة هواء فائقة", "تحكم مركزي متقدم", "عمر افتراضي طويل"],
        color: "from-emerald-500 to-green-500",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    {
        title: "أنظمة Chiller",
        subtitle: "Water Cooled Systems",
        description: "أنظمة التبريد بالماء للمشروعات الصناعية والمصانع. كفاءة عالية للاستخدام المكثف.",
        icon: Snowflake,
        features: ["كفاءة تبريد قصوى", "مناسب للمصانع", "استهلاك اقتصادي", "أداء مستقر"],
        color: "from-purple-500 to-violet-500",
        bgColor: "bg-purple-50 dark:bg-purple-950/30"
    }
];

const whyChooseUs = [
    {
        icon: Users,
        title: "فريق متخصص",
        description: "مهندسون ذوو خبرة في تصميم وتنفيذ أنظمة التكييف المركزي"
    },
    {
        icon: Wrench,
        title: "صيانة دورية",
        description: "عقود صيانة شاملة لضمان استمرار كفاءة الأنظمة"
    },
    {
        icon: Shield,
        title: "ضمان شامل",
        description: "ضمان على جميع الأجهزة وخدمات ما بعد البيع"
    },
    {
        icon: Thermometer,
        title: "دراسة حرارية",
        description: "دراسة الأحمال الحرارية لاختيار النظام الأمثل"
    }
];

const Projects = () => {
    const { data: settings } = useSiteSettings();
    const phoneNumber = settings?.store_phone || "01289006310";
    const whatsappLink = `https://wa.me/2${phoneNumber}?text=${encodeURIComponent("مرحباً، أريد طلب معاينة لمشروع تكييف مركزي")}`;

    return (
        <>
            <Helmet>
                <title>المشروعات الكبرى - VRF والتكييف المركزي | One Air</title>
                <meta name="description" content="One Air متخصصون في أنظمة التكييف المركزي و VRF للمشروعات الكبرى - فنادق، مستشفيات، مولات، مصانع. اطلب معاينة مجانية." />
                <meta name="keywords" content="تكييف مركزي, VRF, مشروعات كبرى, تكييف فنادق, تكييف مستشفيات, تكييف مولات, chiller" />
            </Helmet>

            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] bg-gradient-to-br from-primary via-primary/90 to-secondary flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10 py-20">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <span
                            data-aos="fade-down"
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-medium mb-6"
                        >
                            <Building2 className="w-4 h-4" />
                            للمشروعات الكبرى والتجارية
                        </span>
                        <h1
                            data-aos="fade-up"
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        >
                            حلول تكييف متكاملة
                            <br />
                            <span className="text-secondary">للمشروعات الكبرى</span>
                        </h1>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-xl text-white/80 mb-8 leading-relaxed"
                        >
                            متخصصون في تصميم وتركيب أنظمة التكييف المركزي و VRF
                            <br />
                            للفنادق والمستشفيات والمولات والمصانع
                        </p>
                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <a href={`tel:${phoneNumber}`}>
                                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg gap-2">
                                    <Phone className="w-5 h-5" />
                                    اتصل الآن: {phoneNumber}
                                </Button>
                            </a>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-8 py-6 text-lg">
                                    طلب معاينة مجانية
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* System Types Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <span
                            data-aos="fade-down"
                            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4"
                        >
                            أنظمة التكييف
                        </span>
                        <h2
                            data-aos="fade-up"
                            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                        >
                            أنواع الأنظمة <span className="text-secondary">المتاحة</span>
                        </h2>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        >
                            نوفر أحدث أنظمة التكييف المركزي من أفضل الماركات العالمية
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {systemTypes.map((system, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className={`${system.bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${system.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <system.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">{system.title}</h3>
                                <p className="text-sm text-secondary font-medium mb-4">{system.subtitle}</p>
                                <p className="text-muted-foreground mb-6 leading-relaxed">{system.description}</p>
                                <ul className="space-y-3">
                                    {system.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-foreground">
                                            <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2
                            data-aos="fade-up"
                            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                        >
                            لماذا <span className="text-secondary">One Air</span>؟
                        </h2>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        >
                            خبرة سنوات في تنفيذ المشروعات الكبرى مع أفضل ماركات التكييف العالمية
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyChooseUs.map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-card rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center mb-4 shadow-md">
                                    <item.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands We Work With */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2
                            data-aos="fade-up"
                            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                        >
                            الماركات المعتمدة
                        </h2>
                        <p className="text-muted-foreground">وكلاء معتمدون لأفضل ماركات التكييف المركزي في مصر</p>
                    </div>
                    <div
                        data-aos="fade-up"
                        className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
                    >
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">Carrier</div>
                            <span className="text-muted-foreground text-sm">وكيل معتمد</span>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">Midea</div>
                            <span className="text-muted-foreground text-sm">وكيل معتمد</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2
                            data-aos="fade-up"
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                        >
                            اطلب معاينة مجانية
                            <br />
                            <span className="text-secondary">لمشروعك</span>
                        </h2>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-xl text-white/80 mb-8"
                        >
                            فريقنا الفني جاهز لزيارة موقعك وتقديم دراسة متكاملة
                            <br />
                            للحل الأمثل لاحتياجات التكييف
                        </p>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <Phone className="w-8 h-8 text-secondary" />
                                <span className="text-3xl md:text-4xl font-bold">{phoneNumber}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={`tel:${phoneNumber}`}>
                                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg gap-2 w-full sm:w-auto">
                                        <Phone className="w-5 h-5" />
                                        اتصل الآن
                                    </Button>
                                </a>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-8 py-6 text-lg w-full sm:w-auto">
                                        واتساب
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Link to="/contact" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                                أو تواصل معنا عبر صفحة التواصل
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Projects;

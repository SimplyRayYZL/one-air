import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react";

interface Step {
    number: string;
    icon: string;
    title: string;
    description: string;
    color?: string;
    borderColor?: string;
    circleBg?: string;
}

interface HowItWorksSectionProps {
    title?: string;
    subtitle?: string;
    content?: {
        steps?: Step[];
    };
}

const DEFAULT_STEPS = [
    {
        number: "01",
        icon: "Search",
        title: "اختر تكييفك",
        description: "تصفح مجموعتنا الواسعة من التكييفات واختر ما يناسب احتياجاتك",
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-500",
        circleBg: "#3b82f6"
    },
    {
        number: "02",
        icon: "ShoppingCart",
        title: "أضف للسلة",
        description: "اختر الكمية المطلوبة وأضف المنتجات لسلة التسوق",
        color: "from-green-500 to-emerald-600",
        borderColor: "border-green-500",
        circleBg: "#22c55e"
    },
    {
        number: "03",
        icon: "Truck",
        title: "نوصلك",
        description: "توصيل سريع لباب منزلك في جميع المحافظات",
        color: "from-orange-500 to-amber-600",
        borderColor: "border-orange-500",
        circleBg: "#f97316"
    },
    {
        number: "04",
        icon: "CheckCircle",
        title: "تركيب احترافي",
        description: "فريق متخصص يقوم بالتركيب وضمان التشغيل",
        color: "from-purple-500 to-violet-600",
        borderColor: "border-purple-500",
        circleBg: "#a855f7"
    },
];

const ICON_MAP: any = { Search, ShoppingCart, Truck, CheckCircle };

const HowItWorksSection = ({ title, subtitle, content }: HowItWorksSectionProps) => {
    const steps = content?.steps || DEFAULT_STEPS;
    const displayTitle = title || "كيف نعمل";
    const displaySubtitle = subtitle || "أربع خطوات بسيطة";

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-muted/50 to-background relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span
                        data-aos="fade-down"
                        className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4"
                    >
                        {displayTitle}
                    </span>
                    <h2
                        data-aos="fade-up"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                    >
                        {displaySubtitle}
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        نسهّل عليك كل شيء من الاختيار للتركيب
                    </p>
                </div>

                {/* Steps with Timeline - Desktop */}
                <div className="hidden lg:block relative mb-12">
                    {/* Container for line and circles */}
                    <div className="relative flex items-center justify-between px-[8%]">
                        {/* The Connecting Line - Behind circles */}
                        <div className="absolute top-1/2 left-[10%] right-[10%] h-2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full z-0">
                            <div className="h-full w-full bg-gradient-to-r from-blue-500 via-emerald-500 via-orange-500 to-purple-500 rounded-full"></div>
                        </div>

                        {/* Number Circles */}
                        {steps.map((step, index) => (
                            <div
                                key={`num-${index}`}
                                className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900"
                                style={{ backgroundColor: step.circleBg || '#3b82f6' }}
                            >
                                <span className="text-white text-lg font-bold">{step.number}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {steps.map((step, index) => {
                        const IconComp = ICON_MAP[step.icon] || Search;
                        return (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="group relative"
                            >
                                {/* Mobile Number Badge */}
                                <div
                                    className="lg:hidden absolute -top-3 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10"
                                    style={{ backgroundColor: step.circleBg || '#3b82f6' }}
                                >
                                    <span className="text-white text-sm font-bold">{step.number}</span>
                                </div>

                                {/* Card */}
                                <div className={`bg-card rounded-2xl p-6 md:p-8 border-t-4 ${step.borderColor || 'border-blue-500'} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full text-center`}>
                                    {/* Icon */}
                                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${step.color || 'from-blue-500 to-blue-600'} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                        <IconComp className="h-8 w-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;

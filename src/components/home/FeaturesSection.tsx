import { Shield, Truck, Headphones, Award, Clock, CreditCard } from "lucide-react";

interface FeaturesSectionProps {
    id?: string;
    type?: string;
    title?: string;
    order?: number;
    isEnabled?: boolean;
}

const FeaturesSection = (props: FeaturesSectionProps) => {
    const features = [
        {
            icon: Shield,
            title: "ضمان شامل",
            description: "ضمان الوكيل الرسمي على جميع التكييفات",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: Truck,
            title: "توصيل سريع",
            description: "توصيل مجاني لجميع المحافظات",
            color: "from-green-500 to-green-600",
        },
        {
            icon: Headphones,
            title: "دعم فني متواصل",
            description: "فريق دعم متاح على مدار الساعة",
            color: "from-purple-500 to-purple-600",
        },
        {
            icon: Award,
            title: "جودة مضمونة",
            description: "منتجات أصلية 100% من الوكيل",
            color: "from-amber-500 to-amber-600",
        },
        {
            icon: Clock,
            title: "تركيب فوري",
            description: "تركيب احترافي خلال 24 ساعة",
            color: "from-red-500 to-red-600",
        },
        {
            icon: CreditCard,
            title: "تقسيط مريح",
            description: "خيارات دفع متعددة وتقسيط بدون فوائد",
            color: "from-teal-500 to-teal-600",
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        لماذا تختار وان اير؟
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        نقدم لك أفضل خدمة مع ضمان الجودة والأسعار التنافسية
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-1"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                            />
                            <div
                                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-lg`}
                            >
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;

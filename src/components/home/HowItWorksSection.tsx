import { Phone, Truck, Wrench, CheckCircle } from "lucide-react";

interface HowItWorksSectionProps {
    id?: string;
    type?: string;
    title?: string;
    order?: number;
    isEnabled?: boolean;
}

const HowItWorksSection = (props: HowItWorksSectionProps) => {
    const steps = [
        {
            icon: Phone,
            step: "1",
            title: "تواصل معنا",
            description: "اتصل بنا أو تواصل عبر الواتساب لطلب التكييف المناسب",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: CheckCircle,
            step: "2",
            title: "اختر التكييف",
            description: "فريقنا يساعدك في اختيار التكييف الأنسب لاحتياجاتك",
            color: "from-green-500 to-green-600",
        },
        {
            icon: Truck,
            step: "3",
            title: "التوصيل السريع",
            description: "نوصل التكييف لباب بيتك في أسرع وقت ممكن",
            color: "from-purple-500 to-purple-600",
        },
        {
            icon: Wrench,
            step: "4",
            title: "التركيب الاحترافي",
            description: "فنيين متخصصين يركبوا التكييف باحترافية تامة",
            color: "from-amber-500 to-amber-600",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        كيف تطلب تكييفك؟
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        4 خطوات بسيطة للحصول على تكييفك الجديد
                    </p>
                </div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-amber-500 transform -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div
                                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl mb-4`}
                                >
                                    <step.icon className="w-10 h-10" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                                        <span className="text-sm font-bold text-gray-800">
                                            {step.step}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;

import { useState } from "react";
import { HelpCircle, MessageCircle, ChevronDown } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSettings";

const faqs = [
    {
        question: "كم مدة الضمان على التكييفات؟",
        answer: "نوفر ضمان رسمي يصل إلى 5 سنوات على جميع التكييفات من الوكيل المعتمد، ويشمل الضمان الكمبروسور والأجزاء الداخلية."
    },
    {
        question: "كم يستغرق التوصيل؟",
        answer: "يتم التوصيل خلال 2-5 أيام عمل حسب المنطقة. للمناطق داخل القاهرة والجيزة، يمكن التوصيل في نفس اليوم أو اليوم التالي."
    },
    {
        question: "هل يمكنني التقسيط؟",
        answer: "نعم، نوفر خيارات التقسيط بالتعاون مع البنوك الكبرى. تواصل معنا لمعرفة التفاصيل والأوراق المطلوبة."
    },
    {
        question: "كيف أختار حجم التكييف المناسب؟",
        answer: "نساعدك في اختيار الحجم المناسب بناءً على مساحة الغرفة. بشكل عام: 1.5 حصان للغرف حتى 16 متر، 2.25 حصان للغرف حتى 24 متر، و 3 حصان للغرف الأكبر. يمكنك استخدام حاسبة قدرة التكييف في الموقع."
    },
    {
        question: "ما هي طرق الدفع المتاحة؟",
        answer: "نقبل الدفع النقدي عند الاستلام، الدفع بالبطاقة الائتمانية، والتحويل البنكي. كما نوفر خيارات التقسيط."
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { data: settings } = useSiteSettings();

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Side - Title and CTA */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <span
                            data-aos="fade-right"
                            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
                        >
                            <HelpCircle className="h-4 w-4" />
                            الأسئلة الشائعة
                        </span>
                        <h2
                            data-aos="fade-right"
                            data-aos-delay="100"
                            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                        >
                            عندك سؤال؟
                            <br />
                            <span className="text-primary">عندنا الإجابة</span>
                        </h2>
                        <p
                            data-aos="fade-right"
                            data-aos-delay="200"
                            className="text-muted-foreground mb-8"
                        >
                            إجابات لأكثر الأسئلة شيوعاً عن خدماتنا ومنتجاتنا
                        </p>

                        {/* Contact Card */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="bg-white rounded-2xl p-6 border shadow-lg"
                        >
                            <h3 className="font-bold text-foreground mb-2">لم تجد إجابتك؟</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                تواصل معنا مباشرة وسنرد عليك في أسرع وقت
                            </p>
                            <a
                                href={`https://wa.me/${settings?.store_whatsapp || "201027775001"}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-all hover:scale-105 shadow-lg"
                            >
                                <MessageCircle className="h-5 w-5" />
                                تواصل عبر واتساب
                            </a>
                        </div>
                    </div>

                    {/* Right Side - FAQ Accordion */}
                    <div className="lg:col-span-2 space-y-3">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                                className="bg-white rounded-2xl border shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-right gap-4 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-foreground text-base md:text-lg flex-1 text-right">
                                        {faq.question}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${openIndex === index
                                            ? 'bg-primary text-white rotate-180'
                                            : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        <ChevronDown className="h-5 w-5" />
                                    </div>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                            <p className="text-muted-foreground leading-relaxed text-right">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;

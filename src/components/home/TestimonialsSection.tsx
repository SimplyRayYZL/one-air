import { useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
    {
        id: 1,
        name: "أحمد محمد",
        location: "القاهرة الجديدة",
        rating: 5,
        content: "تجربة ممتازة مع وان اير. الفريق كان محترف جداً في التركيب والالتزام بالمواعيد. التكييف شغال بكفاءة عالية.",
        image: "https://i.pravatar.cc/150?u=1",
        date: "منذ أسبوعين"
    },
    {
        id: 2,
        name: "سارة محمود",
        location: "الشيخ زايد",
        rating: 5,
        content: "أفضل خدمة عملاء تعاملت معاها. ساعدوني اختار التكييف المناسب لمساحة شقتي والأسعار كانت ممتازة مقارنة بالسوق.",
        image: "https://i.pravatar.cc/150?u=2",
        date: "منذ شهر"
    },
    {
        id: 3,
        name: "م. كريم حسن",
        location: "مدينة نصر",
        rating: 4,
        content: "اشتريت تكييف كاريير 3 حصان، التوريد كان في نفس اليوم والتركيب تاني يوم. سرعة في التنفيذ واهتمام بالتفاصيل.",
        image: "https://i.pravatar.cc/150?u=3",
        date: "منذ 3 أيام"
    },
    {
        id: 4,
        name: "د. ريهام علي",
        location: "المعادي",
        rating: 5,
        content: "شكراً لفريق وان اير على المصداقية. التكييفات أصلية والضمان مفعل. أنصح أي حد يتعامل معاهم.",
        image: "https://i.pravatar.cc/150?u=4",
        date: "منذ شهرين"
    }
];

const TestimonialsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden relative" id="reviews">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                            <Star className="w-4 h-4 fill-blue-700" />
                            <span>رأي عملاؤنا</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            ماذا يقول عملاؤنا عنا؟
                        </h2>
                        <p className="text-gray-600 text-lg">
                            نفخر بثقة الآلاف من العملاء في جميع أنحاء مصر. اقرأ تجاربهم الحقيقية مع خدماتنا.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                            direction: "rtl",
                        }}
                        plugins={[
                            Autoplay({
                                delay: 12000,
                            }),
                        ]}
                        className="w-full max-w-6xl mx-auto"
                        dir="rtl"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {testimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    {/* ... item content ... */}
                                    <div className="h-full">
                                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow duration-300 relative group">
                                            {/* Quote Icon */}
                                            <div className="absolute top-6 left-6 text-blue-100 group-hover:text-blue-50 transition-colors">
                                                <Quote className="w-10 h-10 fill-current" />
                                            </div>

                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 relative">
                                                    {/* Fallback avatar if image fails or for better privacy/mockup look, we'll use a gradient div or the image */}
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                            ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
                                                        }}
                                                    />
                                                    <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 items-center justify-center text-white font-bold text-lg">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                                        {testimonial.location}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-0.5 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-gray-600 leading-relaxed mb-4 relative z-10">
                                                "{testimonial.content}"
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-gray-50 text-xs text-gray-400">
                                                {testimonial.date}
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="flex items-center justify-center gap-2 mt-8">
                            <CarouselNext className="static translate-y-0 hover:bg-blue-600 hover:text-white transition-colors" />
                            <CarouselPrevious className="static translate-y-0 hover:bg-blue-600 hover:text-white transition-colors" />
                        </div>

                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;

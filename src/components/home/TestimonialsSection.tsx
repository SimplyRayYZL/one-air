import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    location: "القاهرة",
    rating: 5,
    text: "تجربة ممتازة من أول تواصل لحد التركيب. التكييف شغال زي الفل والتركيب كان احترافي جداً. شكراً ليكم!",
    product: "كاريير 1.5 حصان انفرتر",
    date: "منذ أسبوع",
    avatar: "أ",
  },
  {
    id: 2,
    name: "سارة أحمد",
    location: "الإسكندرية",
    rating: 5,
    text: "أفضل أسعار لقيتها في السوق والتوصيل كان سريع جداً. الضمان 5 سنين وده بيديني اطمئنان كبير.",
    product: "شارب 2.25 حصان بارد ساخن",
    date: "منذ أسبوع",
    avatar: "س",
  },
  {
    id: 3,
    name: "محمود علي",
    location: "المنصورة",
    rating: 5,
    text: "التعامل معاهم كان راقي جداً. ساعدوني أختار التكييف المناسب لمساحة الغرفة وكل حاجة تمام.",
    product: "تورنيدو 1.5 حصان",
    date: "منذ أسبوع",
    avatar: "م",
  },
  {
    id: 4,
    name: "نورهان السيد",
    location: "مدينة نصر",
    rating: 5,
    text: "اشتريت 3 تكييفات للشقة كلها من وان اير. الأسعار ممتازة والتركيب كان في نفس اليوم.",
    product: "ميديا 2.25 حصان انفرتر",
    date: "منذ أسبوعين",
    avatar: "ن",
  },
  {
    id: 5,
    name: "كريم عبدالله",
    location: "الهرم",
    rating: 5,
    text: "خدمة ما بعد البيع ممتازة! حصلت مشكلة بسيطة وجم في نفس اليوم وصلحوها بسرعة.",
    product: "شارب 3 حصان بارد فقط",
    date: "منذ أسبوعين",
    avatar: "ك",
  },
  {
    id: 6,
    name: "ياسمين فؤاد",
    location: "الدقي",
    rating: 5,
    text: "فريق محترم ومتعاون جداً. التكييف وصل معبأ كويس والتركيب كان نظيف بدون أي فوضى.",
    product: "كاريير 2.25 حصان",
    date: "منذ شهر",
    avatar: "ي",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Get 3 testimonials to show (current, next, next+1)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            data-aos="zoom-in"
            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="h-4 w-4" />
            <span>آراء عملائنا</span>
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            ماذا يقول <span className="text-primary">عملاؤنا؟</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            +5000 عميل راضي يثقون بنا في اختيار تكييفاتهم
          </p>
        </div>

        {/* Testimonials Cards - Desktop: 3 cards, Mobile: 1 card */}
        <div className="relative">
          {/* Desktop View - 3 Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-border/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative group overflow-hidden"
              >
                {/* Decorative Quote Mark */}
                <div className="absolute top-4 right-4 text-primary/10 font-serif text-8xl leading-none select-none group-hover:text-primary/20 transition-colors">
                  &rdquo;
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted"
                        }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-foreground/90 leading-relaxed mb-6 min-h-[80px] relative z-10 text-lg">
                  "{testimonial.text}"
                </p>

                {/* Product tag */}
                <div className="inline-flex items-center gap-2 bg-secondary/5 text-secondary rounded-full px-3 py-1.5 text-xs font-medium mb-6 relative z-10 ring-1 ring-secondary/10">
                  <span>{testimonial.product}</span>
                </div>

                {/* Author info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50 relative z-10">
                  <div className="w-12 h-12 rounded-full ring-2 ring-primary/20 p-0.5">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">
                      {testimonial.avatar}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{testimonial.location}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View - Single Card */}
          <div className="md:hidden">
            <div className="bg-card rounded-2xl p-6 shadow-lg border mx-4">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonials[currentIndex].rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted"
                      }`}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-foreground leading-relaxed mb-4">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Product tag */}
              <div className="inline-flex items-center gap-2 bg-muted rounded-full px-3 py-1.5 text-sm text-muted-foreground mb-4">
                <span>{testimonials[currentIndex].product}</span>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-lg font-bold">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <p className="font-bold text-foreground">{testimonials[currentIndex].name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{testimonials[currentIndex].location}</span>
                    <span>•</span>
                    <span>{testimonials[currentIndex].date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="rounded-full bg-card shadow-lg hover:bg-primary hover:text-white border-0 h-12 w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                  }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full bg-card shadow-lg hover:bg-primary hover:text-white border-0 h-12 w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

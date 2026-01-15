import { Phone, MessageCircle, Sparkles, CheckCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSettings";
import CountUp from "react-countup";

const CTASection = () => {
  const { data: settings } = useSiteSettings();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a]">
        {/* Animated particles/dots */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center text-white max-w-3xl mx-auto">
          {/* Badge */}
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium mb-6 border border-white/20"
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
            تواصل معنا الآن
          </div>

          {/* Main Title */}
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            جاهز لتبريد منزلك؟
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            تواصل معنا الآن واحصل على أفضل عرض سعر مع استشارة مجانية لاختيار التكييف المناسب
          </p>

          {/* CTA Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-wrap gap-4 justify-center mb-10"
          >
            <a
              href={`https://wa.me/${settings?.store_whatsapp || "201289006310"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-4 font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-green-500/30">
                <MessageCircle className="h-6 w-6" />
                تواصل عبر واتساب
              </button>
            </a>
            <a
              href={`tel:${settings?.store_phone || "+201289006310"}`}
              className="group"
            >
              <button className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-full px-8 py-4 font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 backdrop-blur-sm">
                <Phone className="h-6 w-6" />
                اتصل الآن
              </button>
            </a>
          </div>

          {/* Features Pills */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-wrap gap-4 justify-center"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              متاحين الآن
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              رد فوري
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              استشارة مجانية
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

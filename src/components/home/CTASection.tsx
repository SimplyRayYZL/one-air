import { Phone, MessageCircle, Sparkles, CheckCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSettings";
import { motion } from "framer-motion";

const CTASection = () => {
  const { data: settings } = useSiteSettings();

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #152C73 0%, #1e40af 50%, #3b82f6 100%)",
          }}
        >
          <div className="text-center text-white max-w-3xl mx-auto relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium mb-6 border border-white/20"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
              تواصل معنا الآن
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              جاهز لتبريد منزلك؟
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              تواصل معنا الآن واحصل على أفضل عرض سعر مع استشارة مجانية لاختيار التكييف المناسب
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
            </motion.div>

            {/* Features Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import { Truck, Shield, Headphones, Wrench, Award, Star, Heart, Zap, Clock, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, any> = {
  Truck,
  Shield,
  Headphones,
  Wrench,
  Award,
  Star,
  Heart,
  Zap,
  Clock,
  ThumbsUp
};

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  color?: string;
  bg?: string;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  content?: {
    features?: FeatureItem[];
  };
}

const DEFAULT_FEATURES = [
  {
    icon: "Truck",
    title: "توصيل سريع",
    description: "لجميع الطلبات",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: "Shield",
    title: "ضمان شامل",
    description: "5 سنوات ضمان",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: "Headphones",
    title: "دعم فني 24/7",
    description: "خدمة متواصلة",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: "Wrench",
    title: "اسعار منافسة",
    description: "أفضل سعر",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

const FeaturesSection = ({ title, subtitle, content }: FeaturesSectionProps) => {
  const features = content?.features || DEFAULT_FEATURES;
  const SectionTitle = title || "مميزاتنا";

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{SectionTitle}</h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.icon] || Star;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group"
              >
                <div className={`mb-6 inline-flex p-4 rounded-full bg-white shadow-sm transition-all duration-300 group-hover:scale-110 ${feature.color ? feature.color : "text-primary"} ${feature.bg ? feature.bg : "bg-primary/5"}`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

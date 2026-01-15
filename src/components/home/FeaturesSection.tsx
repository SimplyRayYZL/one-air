import { Truck, Shield, Headphones, Wrench, Award } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "لجميع الطلبات",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "ضمان شامل",
    description: "5 سنوات ضمان",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Headphones,
    title: "دعم فني 24/7",
    description: "خدمة متواصلة",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Wrench,
    title: "اسعار منافسة",
    description: "أفضل سعر",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className="mb-6 inline-flex p-4 rounded-full bg-white shadow-sm text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

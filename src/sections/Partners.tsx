import { motion } from "framer-motion";
import {
  Building2,
  Microscope,
  HeartPulse,
  Truck,
  ShieldCheck,
  Leaf,
  Globe,
  Sparkles,
} from "lucide-react";

const partners = [
  { name: "PharmaCare Distribution", icon: Truck },
  { name: "GlobalHealth Labs", icon: Microscope },
  { name: "BeautyWell Enterprises", icon: Sparkles },
  { name: "NutraLife Partners", icon: Leaf },
  { name: "DermaScience Inc.", icon: HeartPulse },
  { name: "WellnessFirst Corp", icon: ShieldCheck },
  { name: "PureNature Organics", icon: Building2 },
  { name: "MediSupply Global", icon: Globe },
];

export default function Partners() {
  return (
    <section className="py-24 lg:py-32 bg-[#FDF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#9C5A4A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
            PARTNERSHIPS
          </p>
          <h2
            className="font-semibold text-[#2A1E1A] mb-4"
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
            }}
          >
            Loved by Beauty Leaders
          </h2>
          <p className="text-[#6B5C56] text-base max-w-md mx-auto">
            Curated collaborations with the names that define modern beauty.
          </p>
        </motion.div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((partner, i) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{
                  y: -4,
                  borderColor: "#9C5A4A",
                  transition: { duration: 0.3 },
                }}
                className="group bg-white rounded-3xl p-8 border border-[#F2E7E4] flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors hover:shadow-xl hover:shadow-[#EBC7BF]/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F8EEEA] flex items-center justify-center">
                  <Icon
                    size={24}
                    className="text-[#B08E86]"
                  />
                </div>
                <span className="text-sm font-medium text-[#5C4A43] text-center leading-tight">
                  {partner.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

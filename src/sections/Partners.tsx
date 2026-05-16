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
    <section className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#FF7900] text-xs uppercase tracking-[0.15em] font-medium mb-4">
            PARTNERSHIPS
          </p>
          <h2
            className="font-bold text-[#0A1628] mb-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(28px, 3vw, 44px)",
            }}
          >
            Trusted by Industry Leaders
          </h2>
          <p className="text-slate-500 text-base max-w-md mx-auto">
            We collaborate with leading brands and distributors worldwide
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
                  borderColor: "#FF7900",
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-xl p-8 border border-slate-200 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors hover:shadow-lg hover:shadow-orange-500/5"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center transition-all group-hover:bg-orange-50">
                  <Icon
                    size={24}
                    className="text-slate-400 hover:text-[#FF7900] transition-colors"
                  />
                </div>
                <span className="text-sm font-medium text-slate-600 text-center leading-tight">
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

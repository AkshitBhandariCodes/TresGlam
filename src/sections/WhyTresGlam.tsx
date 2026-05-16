import { motion } from "framer-motion";
import { Sparkles, Leaf, Droplets, ShieldCheck, Heart } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Radiance Rituals",
    description:
      "Curated routines that elevate every step of your skincare moment.",
  },
  {
    icon: ShieldCheck,
    title: "Skin-Loving Standards",
    description:
      "Gentle, dermatologist-aligned blends crafted for daily confidence.",
  },
  {
    icon: Leaf,
    title: "Botanical Purity",
    description:
      "Thoughtfully sourced botanicals, refined for velvety textures.",
  },
  {
    icon: Droplets,
    title: "Hydration First",
    description:
      "Moisture-rich formulas that keep skin supple and luminous.",
  },
  {
    icon: Heart,
    title: "Carefully Curated",
    description:
      "Signature blends designed for sensitive, radiant, and balanced skin.",
  },
];

export default function WhyTresGlam() {
  return (
    <section className="py-24 lg:py-32 bg-[#FFF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left Column - Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-[#9C5A4A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
              WHY TRESGLAM
            </p>
            <h2
              className="font-semibold text-[#2A1E1A] mb-6"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1.1,
              }}
            >
              Pure, soft, and luminous by design.
            </h2>
            <p className="text-[#6B5C56] text-base leading-relaxed max-w-sm">
              Intentional formulas, sensory textures, and a glow-first approach
              inspired by modern beauty rituals.
            </p>
          </motion.div>

          {/* Right Column - Scrolling Cards */}
          <div className="lg:w-[60%] flex flex-col gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="flex items-start gap-5 p-6 bg-white rounded-3xl border border-[#F2E7E4] hover:border-[#E7B7AE] hover:shadow-xl hover:shadow-[#EBC7BF]/30 transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="w-12 h-12 rounded-2xl bg-[#F3E1DB] flex items-center justify-center flex-shrink-0"
                  >
                    <Icon size={22} className="text-[#9C5A4A]" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-[#2A1E1A] text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#6B5C56] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

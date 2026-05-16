import { motion } from "framer-motion";
import {
  FlaskConical,
  Stethoscope,
  Leaf,
  Recycle,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    title: "Clinically Proven",
    description:
      "Every formulation undergoes rigorous clinical testing to ensure safety and efficacy before reaching you.",
  },
  {
    icon: Stethoscope,
    title: "Dermatologist Tested",
    description:
      "Our cosmetic and pharmaceutical products are reviewed by certified dermatologists for skin safety.",
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description:
      "We source the finest natural extracts, combining them with scientific precision for optimal results.",
  },
  {
    icon: Recycle,
    title: "Sustainable Packaging",
    description:
      "Eco-friendly packaging solutions that protect our planet without compromising product quality.",
  },
  {
    icon: Zap,
    title: "Fast Absorption",
    description:
      "Advanced delivery systems ensure rapid absorption and maximum bioavailability.",
  },
];

export default function WhyTresGlam() {
  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC]">
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
            <p className="text-[#FF7900] text-xs uppercase tracking-[0.15em] font-medium mb-4">
              WHY TRESGLAM
            </p>
            <h2
              className="font-bold text-[#0A1628] mb-6"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1.1,
              }}
            >
              Purity backed by Science
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-sm">
              We combine cutting-edge research with premium ingredients to
              deliver products that transform lives.
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
                  className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-slate-100 hover:border-orange-100 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300"
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
                    className="w-12 h-12 rounded-xl bg-[#FF7900]/10 flex items-center justify-center flex-shrink-0"
                  >
                    <Icon size={22} className="text-[#FF7900]" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-[#0A1628] text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
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

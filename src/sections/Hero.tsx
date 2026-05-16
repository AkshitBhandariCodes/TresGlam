import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FDF7F4] pt-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FBE9E2] via-[#FDF7F4] to-[#EAF4F1]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#EAD6CF]/60 blur-3xl" />
        <div className="absolute bottom-10 -left-20 h-80 w-80 rounded-full bg-[#CFE7DE]/70 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9C5A4A] shadow-sm">
              <Sparkles size={14} />
              Pure botanical glow
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2A1E1A] leading-tight">
              Beauty crafted
              <span className="block text-[#9C5A4A]">with ritual-grade care.</span>
            </h1>
            <p className="text-lg text-[#6B5C56] max-w-xl leading-relaxed">
              TresGlam blends clean ingredients with sensorial textures for skin that feels
              luminous, hydrated, and calm. Discover a softer, more elevated daily routine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/pharmaceutical"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#2A1E1A] text-white font-semibold hover:bg-[#3B2B25] transition-colors"
              >
                Shop Skincare
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#D8C3BC] text-[#5C4A43] font-semibold hover:border-[#9C5A4A] hover:text-[#9C5A4A] transition-colors"
              >
                Book a Consult
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { value: "120k+", label: "glowing clients" },
                { value: "98%", label: "repeat love" },
                { value: "Clean", label: "ingredient promise" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold text-[#2A1E1A]">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A58A82]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[#F3DDD6]" />
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[#D8EEE7]" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/70 shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/TresGlam%20snow%20white.png"
                className="h-[460px] w-full object-cover"
              >
                <source src="/images/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

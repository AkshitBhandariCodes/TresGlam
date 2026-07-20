import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Microscope,
  FlaskConical,
  Factory,
  ShieldCheck,
  Search,
  Activity,
  Sparkles,
  CheckCircle,
  Globe,
  HeartPulse,
  Droplets,
  Award,
  ChevronRight,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface CategoryConfig {
  title: string;
  description: string;
  heroImage: string;
  introHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  stats: { value: string; label: string }[];
  steps: Step[];
  subcategories: string[];
  categoryKey: string;
}

const categoryConfigs: Record<string, CategoryConfig> = {
  pharmaceutical: {
    title: "Skincare",
    description:
      "Refined skincare essentials for luminous, balanced, and hydrated skin. Thoughtfully crafted for daily rituals.",
    heroImage: "/images/tresglam-herbal-avocado-whitening-cream/TresGlam herbal avacado.png",
    introHeading: "Soft, hydrated, and glow-ready",
    introParagraph1:
      "TresGlam Skincare is built on calming botanicals, cushiony textures, and a glow-first philosophy. Every product is designed to work gently yet effectively.",
    introParagraph2:
      "From repairing creams to glow rituals, our formulas support hydration, barrier care, and long-lasting radiance.",
    stats: [
      { value: "120+", label: "Glow Rituals" },
      { value: "98%", label: "Customer Love" },
      { value: "Clean", label: "Ingredient Promise" },
    ],
    steps: [
      {
        icon: Microscope,
        title: "Skin Analysis",
        description:
          "We study skin needs to shape formulas that feel soft and effective.",
      },
      {
        icon: FlaskConical,
        title: "Botanical Blending",
        description:
          "Natural extracts are balanced for gentle daily use.",
      },
      {
        icon: Factory,
        title: "Texture Craft",
        description:
          "Creams and masks are refined for a luxe finish.",
      },
      {
        icon: ShieldCheck,
        title: "Glow Assurance",
        description:
          "Every batch is checked for safety, sensorial feel, and results.",
      },
    ],
    subcategories: ["All", "Creams", "Treatments", "Eye Care"],
    categoryKey: "pharmaceutical",
  },
  nutraceutical: {
    title: "Nutraceuticals",
    description:
      "Beauty and wellness rituals designed to support daily care, protection and radiance.",
    heroImage: "/images/tresglam-herbal-sunblock-oil-free-cream-spf-30/TresGlam Herbal Sunblock.png",
    introHeading: "Daily beauty and wellness rituals",
    introParagraph1:
      "TresGlam Bodycare pampers skin with rich moisturizers, brightening care, and sensorial textures that feel like spa-level indulgence.",
    introParagraph2:
      "From sun care to pigmentation treatments, each formula is designed for softness, comfort, and glow.",
    stats: [
      { value: "80+", label: "Body Rituals" },
      { value: "4.9", label: "Average Rating" },
      { value: "100%", label: "Comfort Focused" },
    ],
    steps: [
      {
        icon: Search,
        title: "Texture Study",
        description:
          "We test sensorial finishes for smooth, never-greasy wear.",
      },
      {
        icon: Activity,
        title: "Moisture Lock",
        description:
          "Hydration-focused blends that stay comfortable all day.",
      },
      {
        icon: Sparkles,
        title: "Glow Finish",
        description: "Soft sheen and an elevated, spa-like feel.",
      },
      {
        icon: CheckCircle,
        title: "Comfort Check",
        description: "Gentle formulas designed for everyday rituals.",
      },
    ],
    subcategories: ["All", "Moisturizers", "Sun Care", "Brightening", "Masks"],
    categoryKey: "nutraceutical",
  },
  cosmetics: {
    title: "Cleansers",
    description:
      "Refreshing cleansers and face washes that leave skin clear, balanced, and luminous.",
    heroImage: "/images/tresglam-kiwi-whitening-glowing-face-wash/TresGlam kiwi glowing face wash.png",
    introHeading: "Fresh, clarified, and renewed",
    introParagraph1:
      "Every cleanser is designed to lift away impurities while keeping skin hydrated and calm.",
    introParagraph2:
      "Fruit-forward extracts and soothing botanicals make cleansing a moment of indulgence.",
    stats: [
      { value: "60+", label: "Cleanse Rituals" },
      { value: "24/7", label: "Skin Comfort" },
      { value: "0%", label: "Harsh Sulfates" },
    ],
    steps: [
      {
        icon: Globe,
        title: "Fresh Botanicals",
        description:
          "Carefully sourced fruit extracts for a soft, clean finish.",
      },
      {
        icon: HeartPulse,
        title: "Skin Balance",
        description:
          "Formulas designed to maintain a healthy moisture barrier.",
      },
      {
        icon: Droplets,
        title: "Gentle Purification",
        description:
          "Low-foam textures that cleanse without stripping.",
      },
      {
        icon: Award,
        title: "Glow Ready",
        description:
          "Refreshing finishes that prep skin for the rest of your ritual.",
      },
    ],
    subcategories: ["All", "Foam", "Gel", "Brightening", "Daily"],
    categoryKey: "cosmetics",
  },
};

interface CategoryPageProps {
  category: "pharmaceutical" | "nutraceutical" | "cosmetics";
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const config = categoryConfigs[category];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    const categoryProducts = products.filter(
      (p) => p.category === config.categoryKey
    );
    if (activeFilter === "All") return categoryProducts;
    return categoryProducts.filter(
      (p) => p.subcategory.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, config.categoryKey]);

  return (
    <div className="min-h-screen">
      {/* Category Hero */}
      <section className="relative pt-32 pb-20 bg-[#FDF7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          >
            <Link to="/" className="hover:text-[#9C5A4A] transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#0A1628] font-medium">{config.title}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-bold text-[#0A1628] mb-6"
            style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: 1.1,
            }}
          >
            {config.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-500 text-lg max-w-2xl leading-relaxed"
          >
            {config.description}
          </motion.p>
        </div>
      </section>

      {/* Business Intro */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <img
                src={config.heroImage}
                alt={`${config.title} manufacturing`}
                className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <p className="text-[#9C5A4A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
                OUR EXPERTISE
              </p>
              <h2
                className="font-bold text-[#0A1628] mb-6"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  lineHeight: 1.2,
                }}
              >
                {config.introHeading}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                {config.introParagraph1}
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                {config.introParagraph2}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {config.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                    className="text-center"
                  >
                    <p className="text-2xl lg:text-3xl font-semibold text-[#9C5A4A]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Products Are Made */}
      <section className="py-20 lg:py-28 bg-[#FDF7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#9C5A4A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
              PROCESS
            </p>
            <h2
              className="font-bold text-[#0A1628]"
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
              }}
            >
              How Our Products Are Made
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#E7B7AE]/30 via-[#E7B7AE]/60 to-[#E7B7AE]/30" />

            {config.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#F3E1DB] flex items-center justify-center mx-auto mb-5 relative z-10">
                    <Icon size={28} className="text-[#9C5A4A]" />
                  </div>
                  <h3 className="font-semibold text-[#0A1628] text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[#9C5A4A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
              PRODUCTS
            </p>
            <h2
              className="font-bold text-[#0A1628]"
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
              }}
            >
              Our {config.title} Products
            </h2>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {config.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveFilter(sub)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === sub
                    ? "bg-[#9C5A4A] text-white shadow-lg shadow-[#E7B7AE]/40"
                    : "bg-[#F3E8E4] text-[#6B5C56] hover:bg-[#EAD6CF]"
                }`}
              >
                {sub}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  images={product.images}
                  category={product.category}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

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
    title: "Pharmaceutical",
    description:
      "Cutting-edge pharmaceutical formulations developed with precision and care. Our products meet the highest standards of safety, efficacy, and regulatory compliance.",
    heroImage: "/images/pharma-lab.jpg",
    introHeading: "Precision in Every Formulation",
    introParagraph1:
      "At TresGlam, our pharmaceutical division combines decades of research expertise with state-of-the-art manufacturing facilities. We develop formulations that span tablets, capsules, injectables, syrups, and topical preparations.",
    introParagraph2:
      "Every product undergoes stringent quality control measures, from raw material testing to finished product validation. Our facilities are GMP-certified and follow international pharmacopeial standards.",
    stats: [
      { value: "150+", label: "Formulations Developed" },
      { value: "50+", label: "GMP Certifications" },
      { value: "99.9%", label: "Quality Pass Rate" },
    ],
    steps: [
      {
        icon: Microscope,
        title: "Research & Development",
        description:
          "Our scientists identify active compounds and develop optimal formulations through extensive research.",
      },
      {
        icon: FlaskConical,
        title: "Quality Testing",
        description:
          "Raw materials and intermediates undergo rigorous testing in our NABL-accredited laboratories.",
      },
      {
        icon: Factory,
        title: "Precision Manufacturing",
        description:
          "GMP-certified facilities ensure every batch meets exact specifications and purity standards.",
      },
      {
        icon: ShieldCheck,
        title: "Final Validation",
        description:
          "Finished products are tested for potency, stability, and safety before release.",
      },
    ],
    subcategories: ["All", "Tablets", "Capsules", "Injectables", "Syrups"],
    categoryKey: "pharmaceutical",
  },
  nutraceutical: {
    title: "Nutraceutical",
    description:
      "Science-backed nutritional supplements designed to enhance your health and well-being. From vitamins to specialized wellness formulations.",
    heroImage: "/images/nutra-lab.jpg",
    introHeading: "Wellness Through Science",
    introParagraph1:
      "Our nutraceutical division develops advanced dietary supplements that bridge the gap between food and medicine. We create targeted formulations for immune support, cognitive health, joint care, and overall wellness.",
    introParagraph2:
      "Using bioavailable forms of vitamins, minerals, and botanical extracts, our products ensure maximum absorption and efficacy.",
    stats: [
      { value: "200+", label: "Supplement Variants" },
      { value: "30+", label: "Clinical Studies" },
      { value: "100%", label: "Natural Sources" },
    ],
    steps: [
      {
        icon: Search,
        title: "Nutraceutical Research",
        description:
          "Identifying potent natural compounds with proven health benefits.",
      },
      {
        icon: Activity,
        title: "Bioavailability Testing",
        description:
          "Ensuring optimal absorption and utilization by the body.",
      },
      {
        icon: Sparkles,
        title: "Clean Manufacturing",
        description: "Produced in allergen-free, certified facilities.",
      },
      {
        icon: CheckCircle,
        title: "Potency Verification",
        description: "Third-party tested for purity and label accuracy.",
      },
    ],
    subcategories: ["All", "Vitamins", "Protein", "Herbal", "Specialty"],
    categoryKey: "nutraceutical",
  },
  cosmetics: {
    title: "Cosmetics",
    description:
      "Luxury cosmetic formulations that blend nature's finest ingredients with cutting-edge dermatological science for radiant, healthy skin.",
    heroImage: "/images/cosmetic-lab.jpg",
    introHeading: "Beauty Meets Innovation",
    introParagraph1:
      "TresGlam Cosmetics combines the art of beauty with the precision of science. Our dermatologically-tested skincare, haircare, and personal care products are formulated with premium active ingredients.",
    introParagraph2:
      "From anti-aging serums to hydrating moisturizers, each product is designed to deliver visible results while being gentle on your skin.",
    stats: [
      { value: "100+", label: "Product SKUs" },
      { value: "Dermatologist", label: "Approved" },
      { value: "0%", label: "Harmful Chemicals" },
    ],
    steps: [
      {
        icon: Globe,
        title: "Ingredient Sourcing",
        description:
          "Premium natural and synthetic ingredients sourced from trusted global suppliers.",
      },
      {
        icon: HeartPulse,
        title: "Dermatological Testing",
        description:
          "Patch testing and clinical trials for skin compatibility and safety.",
      },
      {
        icon: Droplets,
        title: "Luxury Formulation",
        description:
          "Creams, serums, and lotions crafted with optimal texture and absorption.",
      },
      {
        icon: Award,
        title: "Quality Assurance",
        description:
          "Stability testing and microbial validation before packaging.",
      },
    ],
    subcategories: ["All", "Skincare", "Haircare", "Bodycare", "Serums"],
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
      <section className="relative pt-32 pb-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          >
            <Link to="/" className="hover:text-[#FF7900] transition-colors">
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
              fontFamily: "Poppins, sans-serif",
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
              <p className="text-[#FF7900] text-xs uppercase tracking-[0.15em] font-medium mb-4">
                OUR EXPERTISE
              </p>
              <h2
                className="font-bold text-[#0A1628] mb-6"
                style={{
                  fontFamily: "Poppins, sans-serif",
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
                    <p className="text-2xl lg:text-3xl font-bold text-[#FF7900]">
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
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#FF7900] text-xs uppercase tracking-[0.15em] font-medium mb-4">
              PROCESS
            </p>
            <h2
              className="font-bold text-[#0A1628]"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(28px, 3vw, 44px)",
              }}
            >
              How Our Products Are Made
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#FF7900]/20 via-[#FF7900]/40 to-[#FF7900]/20" />

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
                  <div className="w-16 h-16 rounded-2xl bg-[#FF7900]/10 flex items-center justify-center mx-auto mb-5 relative z-10">
                    <Icon size={28} className="text-[#FF7900]" />
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
            <p className="text-[#FF7900] text-xs uppercase tracking-[0.15em] font-medium mb-4">
              PRODUCTS
            </p>
            <h2
              className="font-bold text-[#0A1628]"
              style={{
                fontFamily: "Poppins, sans-serif",
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
                    ? "bg-[#FF7900] text-white shadow-lg shadow-orange-500/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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

import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

const featuredProducts = products.slice(0, 6);

export default function FeaturedProducts() {
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
            OUR PRODUCTS
          </p>
          <h2
            className="font-bold text-[#0A1628] mb-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(28px, 3.5vw, 48px)",
            }}
          >
            Discover Our Range
          </h2>
          <p className="text-slate-500 text-base max-w-md mx-auto">
            Explore premium products across all three categories
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product, i) => (
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/pharmaceutical"
            className="inline-flex items-center gap-2 text-[#FF7900] font-semibold hover:gap-3 transition-all"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

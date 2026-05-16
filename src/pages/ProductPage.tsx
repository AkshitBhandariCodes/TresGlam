import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import products from "@/data/products.json";
import { WHATSAPP_NUMBER } from "@/const";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#FDF7F4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-semibold text-[#2A1E1A] mb-4">
            Product not found
          </h1>
          <p className="text-[#6B5C56] mb-8">
            The product you are looking for is not available.
          </p>
          <Link
            to="/pharmaceutical"
            className="inline-flex items-center gap-2 text-[#9C5A4A] font-semibold"
          >
            Back to skincare
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const orderMessage = `Hi TresGlam, I want to order ${product.name} (Rs. ${product.price}). Please share payment details.`;
  const orderLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    orderMessage
  )}`;

  const categoryPath =
    product.category === "pharmaceutical"
      ? "/pharmaceutical"
      : product.category === "nutraceutical"
      ? "/nutraceutical"
      : "/cosmetics";

  const highlights = [
    "Botanical extracts for daily comfort",
    "Soft, non-sticky finish",
    "Designed for sensitive skin",
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FDF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-[#A58A82] mb-8">
          <Link to="/" className="hover:text-[#9C5A4A] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            to={categoryPath}
            className="hover:text-[#9C5A4A] transition-colors"
          >
            Collection
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#2A1E1A] font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[36px] bg-white border border-[#F2E7E4] p-8 shadow-2xl shadow-[#EAD6CF]/40"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[380px] object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#9C5A4A]">
              TresGlam Ritual
            </p>
            <h1 className="text-4xl font-semibold text-[#2A1E1A]">
              {product.name}
            </h1>
            <p className="text-[#6B5C56] leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-[#9C5A4A]">
                Rs. {product.price}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#A58A82]">
                Signature formula
              </span>
            </div>
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#2A1E1A] px-7 py-3 text-sm font-semibold text-white hover:bg-[#3B2B25] transition-colors"
            >
              <MessageCircle size={16} />
              Order on WhatsApp
            </a>

            <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
              <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">
                Why you will love it
              </h3>
              <ul className="space-y-2 text-sm text-[#6B5C56]">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#E7B7AE]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

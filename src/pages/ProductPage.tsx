import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, MessageCircle, CheckCircle, List } from "lucide-react";
import products from "@/data/products.json";
import { WHATSAPP_NUMBER } from "@/const";
import ProductImageCarousel from "@/components/ProductImageCarousel";

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

  const highlights = product.highlights || [
    "Botanical extracts for daily comfort",
    "Soft, non-sticky finish",
    "Designed for sensitive skin",
  ];

  const gallery = Array.from(
    new Set(
      (product.images && product.images.length > 0
        ? product.images
        : [product.image, product.poster])
        .filter(Boolean)
    )
  ) as string[];

  const details = product.details;
  const benefits = product.benefits as string[] | undefined;
  const tags = product.tags as string[] | undefined;

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
            <div className="h-[440px]">
              <ProductImageCarousel
                images={gallery}
                alt={product.name}
                className="h-full"
                imageClassName="rounded-2xl"
              />
            </div>
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
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="text-[#E7B7AE]" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {details && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">Details</h3>
                <p className="text-sm text-[#6B5C56]">{details}</p>
              </div>
            )}

            {benefits && benefits.length > 0 && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">Benefits</h3>
                <ul className="space-y-2 text-sm text-[#6B5C56]">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="text-[#E7B7AE]" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.ingredients && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3 flex items-center gap-2">
                  <List size={18} /> Ingredients
                </h3>
                <ul className="grid grid-cols-2 gap-2 text-sm text-[#6B5C56]">
                  {product.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#E7B7AE]" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.howToUse && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">How to use</h3>
                <p className="text-sm text-[#6B5C56]">{product.howToUse}</p>
              </div>
            )}

            {(product.netQuantity || product.mrp) && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">Pack info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#6B5C56]">
                  {product.netQuantity && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#A58A82] mb-1">
                        Net quantity
                      </p>
                      <p>{product.netQuantity}</p>
                    </div>
                  )}
                  {product.mrp && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#A58A82] mb-1">
                        MRP
                      </p>
                      <p>{product.mrp}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {product.warnings && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">
                  Warnings & storage
                </h3>
                <p className="text-sm text-[#6B5C56]">{product.warnings}</p>
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#E7B7AE] px-3 py-1 text-xs font-semibold text-[#9C5A4A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.note && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">Note</h3>
                <p className="text-sm text-[#6B5C56]">{product.note}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

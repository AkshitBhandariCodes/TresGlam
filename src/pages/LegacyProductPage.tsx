import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight, List, MessageCircle } from "lucide-react";
import productsData from "@/data/products.json";
import { WHATSAPP_NUMBER } from "@/const";
import ProductImageCarousel from "@/components/ProductImageCarousel";

interface LegacyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  poster?: string;
  images?: string[];
  category: string;
  highlights?: string[];
  details?: string;
  benefits?: string[];
  ingredients?: string[];
  howToUse?: string;
  netQuantity?: string;
  mrp?: string;
  warnings?: string;
  tags?: string[];
  note?: string;
}

const products = productsData as LegacyProduct[];

export default function LegacyProductPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#FDF7F4] text-center">
        <h1 className="text-3xl font-semibold text-[#2A1E1A] mb-4">Product not found</h1>
        <Link to="/" className="inline-flex items-center gap-2 text-[#9C5A4A] font-semibold">
          Back to home <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const categoryPath = product.category === "pharmaceutical"
    ? "/pharmaceutical"
    : product.category === "nutraceutical"
      ? "/nutraceutical"
      : "/cosmetics";
  const gallery = Array.from(new Set((product.images?.length ? product.images : [product.image, product.poster]).filter(Boolean))) as string[];
  const orderMessage = `Hi TresGlam, I want to order ${product.name} (Rs. ${product.price}). Please share payment details.`;
  const orderLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="min-h-screen pt-16 pb-20 bg-[#FDF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-[#A58A82] py-8">
          <Link to="/">Home</Link><ChevronRight size={14} />
          <Link to={categoryPath}>Collection</Link><ChevronRight size={14} />
          <span className="text-[#2A1E1A] font-medium line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[36px] bg-white border border-[#F2E7E4] p-8 shadow-2xl shadow-[#EAD6CF]/40">
            <div className="h-[440px]">
              <ProductImageCarousel images={gallery} alt={product.name} className="h-full" imageClassName="rounded-2xl" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9C5A4A]">TresGlam Ritual</p>
            <h1 className="text-4xl font-semibold text-[#2A1E1A]">{product.name}</h1>
            <p className="text-[#6B5C56] leading-relaxed">{product.description}</p>
            <span className="block text-2xl font-semibold text-[#9C5A4A]">Rs. {product.price}</span>
            <a href={orderLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#2A1E1A] px-7 py-3 text-sm font-semibold text-white hover:bg-[#3B2B25] transition-colors">
              <MessageCircle size={16} /> Order on WhatsApp
            </a>

            <InfoCard title="Why you will love it" items={product.highlights} />
            {product.details && <TextCard title="Details" text={product.details} />}
            <InfoCard title="Benefits" items={product.benefits} />
            {product.ingredients && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
                <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3 flex items-center gap-2"><List size={18} /> Ingredients</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#6B5C56]">
                  {product.ingredients.map((item) => <li key={item} className="flex gap-2"><span className="h-2 w-2 mt-1.5 rounded-full bg-[#E7B7AE] shrink-0" />{item}</li>)}
                </ul>
              </div>
            )}
            {product.howToUse && <TextCard title="How to use" text={product.howToUse} />}
            {(product.netQuantity || product.mrp) && (
              <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6 grid grid-cols-2 gap-4 text-sm text-[#6B5C56]">
                {product.netQuantity && <div><small className="uppercase tracking-widest">Net quantity</small><p>{product.netQuantity}</p></div>}
                {product.mrp && <div><small className="uppercase tracking-widest">MRP</small><p>{product.mrp}</p></div>}
              </div>
            )}
            {product.warnings && <TextCard title="Warnings & storage" text={product.warnings} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-[#6B5C56]">
        {items.map((item) => <li key={item} className="flex items-center gap-3"><CheckCircle className="text-[#E7B7AE] shrink-0" size={16} />{item}</li>)}
      </ul>
    </div>
  );
}

function TextCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-3xl border border-[#F2E7E4] bg-white/80 p-6"><h3 className="text-lg font-semibold text-[#2A1E1A] mb-3">{title}</h3><p className="text-sm text-[#6B5C56]">{text}</p></div>;
}

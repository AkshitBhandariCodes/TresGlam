import { motion } from "framer-motion";
import { Heart, ShoppingCart, ShoppingBag, Plus, Minus, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import { Link } from "react-router";
import { WHATSAPP_NUMBER } from "@/const";
import ProductImageCarousel from "@/components/ProductImageCarousel";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  index?: number;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  images,
  category,
  index = 0,
}: ProductCardProps) {
  const { addToCart, items: cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const categoryLabel =
    category === "pharmaceutical"
      ? "Skincare"
      : category === "nutraceutical"
      ? "Nutraceutical"
      : "Cleansers";

  const inWishlist = isInWishlist(id);
  const inCart = cartItems.find((i) => i.id === id);
  const gallery = images && images.length > 0 ? images : [image];
  const primaryImage = gallery[0] ?? image;

  const handleAddToCart = () => {
    addToCart({ id, name, price, image: primaryImage, category });
  };

  const handleBuyNow = () => {
    const message = `Hi TresGlam, I want to buy ${quantity} ${name} (Rs. ${price * quantity}). Please share payment details.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative bg-white/90 rounded-3xl overflow-hidden border border-[#F2E7E4] hover:border-[#E7B7AE] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#EBC7BF]/30"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#FFF6F3]">
        <ProductImageCarousel
          images={gallery}
          alt={name}
          linkTo={`/product/${id}`}
          ariaLabel={`View ${name}`}
          className="h-full"
          imageClassName="transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#E7B7AE] text-[#3A2A25] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-[0.18em]">
          {categoryLabel}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist({ id, name, price, image: primaryImage, category })}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={
              inWishlist
                ? "fill-rose-500 text-rose-500"
                : "text-slate-400 group-hover:text-rose-400"
            }
          />
        </button>

        {/* Cart indicator */}
        {inCart && (
          <div className="absolute bottom-3 left-3 bg-[#C7E7DD] text-[#1E3B33] text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <ShoppingCart size={12} />
            {inCart.quantity} in cart
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/product/${id}`}
            className="font-semibold text-[#2A1E1A] text-base mb-1 line-clamp-1 hover:text-[#9C5A4A] transition-colors"
          >
            {name}
          </Link>
          <Link
            to={`/product/${id}`}
            className="w-9 h-9 rounded-full border border-[#E9D8D2] flex items-center justify-center text-[#9C5A4A] hover:bg-[#FAECE7] transition-colors"
            aria-label={`Open ${name}`}
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-[#9C5A4A]">
            Rs. {price}
          </span>
          <span className="text-xs uppercase tracking-[0.18em] text-[#B08E86]">
            signature
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg border border-[#E6D5CF] flex items-center justify-center hover:border-[#9C5A4A] hover:text-[#9C5A4A] transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-medium text-[#2A1E1A]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-lg border border-[#E6D5CF] flex items-center justify-center hover:border-[#9C5A4A] hover:text-[#9C5A4A] transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#2A1E1A] text-white py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#3B2B25] transition-colors active:scale-[0.98]"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 border-2 border-[#9C5A4A] text-[#9C5A4A] py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#9C5A4A] hover:text-white transition-colors active:scale-[0.98]"
          >
            <ShoppingBag size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

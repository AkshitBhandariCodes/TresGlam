import { motion } from "framer-motion";
import { Heart, ShoppingCart, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  index?: number;
}

const WHATSAPP_NUMBER = "919876543210";

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  category,
  index = 0,
}: ProductCardProps) {
  const { addToCart, items: cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const inWishlist = isInWishlist(id);
  const inCart = cartItems.find((i) => i.id === id);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, category });
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
      className="group relative bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#FF7900] text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
          {category}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist({ id, name, price, image, category })}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={
              inWishlist
                ? "fill-red-500 text-red-500"
                : "text-slate-400 group-hover:text-red-400"
            }
          />
        </button>

        {/* Cart indicator */}
        {inCart && (
          <div className="absolute bottom-3 left-3 bg-[#FF7900] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <ShoppingCart size={12} />
            {inCart.quantity} in cart
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[#0A1628] text-base mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-[#FF7900]">
            Rs. {price}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:border-[#FF7900] hover:text-[#FF7900] transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-medium text-[#0A1628]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:border-[#FF7900] hover:text-[#FF7900] transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#FF7900] text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#e66d00] transition-colors active:scale-[0.98]"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 border-2 border-[#FF7900] text-[#FF7900] py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#FF7900] hover:text-white transition-colors active:scale-[0.98]"
          >
            <ShoppingBag size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

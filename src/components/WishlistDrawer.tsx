import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistDrawer() {
  const { items, removeFromWishlist, isWishlistOpen, setIsWishlistOpen } =
    useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: (typeof items)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsWishlistOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <Heart size={20} className="text-red-500 fill-red-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0A1628]">Your Wishlist</h2>
                  <p className="text-xs text-slate-500">{items.length} items</p>
                </div>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                    <Heart size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A1628] mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-sm text-slate-500 max-w-[200px]">
                    Save your favorite products here for later
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#0A1628] truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm font-semibold text-[#9C5A4A] mt-1">
                          Rs. {item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 bg-[#2A1E1A] text-white py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-[#3B2B25] transition-colors"
                          >
                            <ShoppingCart size={14} />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

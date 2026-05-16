import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    openWhatsApp,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
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
                <div className="w-10 h-10 rounded-full bg-[#FF7900]/10 flex items-center justify-center">
                  <ShoppingBag size={20} className="text-[#FF7900]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0A1628]">Shopping Cart</h2>
                  <p className="text-xs text-slate-500">{items.length} items</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A1628] mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-slate-500 max-w-[200px]">
                    Add some products to your cart and they will appear here
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
                        <p className="text-sm font-bold text-[#FF7900] mt-1">
                          Rs. {item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-[#FF7900] transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-[#FF7900] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <span className="text-xl font-bold text-[#0A1628]">
                    Rs. {totalPrice}
                  </span>
                </div>
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-[#FF7900] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#e66d00] transition-colors active:scale-[0.98]"
                >
                  <MessageCircle size={20} />
                  Checkout via WhatsApp
                </button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  You will be redirected to WhatsApp to complete your order
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

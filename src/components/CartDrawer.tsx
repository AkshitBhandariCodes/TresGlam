import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
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
          <motion.button
            aria-label="Close cart"
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.aside
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            <div className="cart-header">
              <div><p className="eyebrow">Your ritual</p><h2>Shopping bag</h2></div>
              <button onClick={() => setIsCartOpen(false)} aria-label="Close cart"><X size={20} /></button>
            </div>

            <div className="cart-items">
              {items.length === 0 ? (
                <div className="empty-cart">
                  <span><ShoppingBag size={28} /></span>
                  <h3>Your bag is empty</h3>
                  <p>Add the Sea Buckthorn ritual and it will appear here.</p>
                  <button className="button button-dark" onClick={() => setIsCartOpen(false)}>Continue shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>300 ml · Glass bottle</p>
                      <strong>₹{item.price}</strong>
                      <div className="cart-item-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button>
                        <button className="remove-item" onClick={() => removeFromCart(item.id)} aria-label="Remove item"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total"><span>Subtotal</span><strong>₹{totalPrice}</strong></div>
                <p>Taxes included. Delivery details confirmed on WhatsApp.</p>
                <button className="button button-orange cart-checkout" onClick={openWhatsApp}>
                  <MessageCircle size={18} /> Order on WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

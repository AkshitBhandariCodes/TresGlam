import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const links = [
  { label: "Home", href: "/" },
  { label: "Skincare", href: "/pharmaceutical" },
  { label: "Nutraceuticals", href: "/nutraceutical" },
  { label: "Cleansers", href: "/cosmetics" },
  { label: "New Launch", href: "/product/sea-buckthorn-juice" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { totalItems: wishlistCount, setIsWishlistOpen } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <div className="announcement-bar">
        <span>Special launch price Rs. 700</span>
        <span className="announcement-divider">|</span>
        <span>Premium glass bottle</span>
        <span className="announcement-divider">|</span>
        <span>From Ladakh</span>
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="wordmark" aria-label="Tresglam home">
            <img src="/images/logo2.png" alt="" />
            <span className="sr-only">Tresglam</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a href="/#latest" className="header-shop-link">Shop all</a>
            <button
              className="icon-button wishlist-button"
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Open wishlist with ${wishlistCount} items`}
            >
              <Heart size={19} strokeWidth={1.8} />
              {wishlistCount > 0 && <span>{wishlistCount}</span>}
            </button>
            <button
              className="icon-button cart-button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open cart with ${totalItems} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {totalItems > 0 && <span>{totalItems}</span>}
            </button>
            <button
              className="icon-button mobile-toggle"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="/#latest" onClick={() => setOpen(false)}>Shop all products</a>
          </nav>
        )}
      </header>
    </>
  );
}

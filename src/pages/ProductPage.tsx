import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronDown,
  Droplets,
  GlassWater,
  Leaf,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  Recycle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  Truck,
} from "lucide-react";
import { seaBuckthornProduct as product } from "@/data/seaBuckthorn";
import { useCart } from "@/context/CartContext";

const productHighlights = [
  [Leaf, "100% Natural", "Pure daily wellness ritual"],
  [MapPin, "Made in India", "Premium Ladakh berries"],
  [Droplets, "Omega 3, 6, 7, 9", "Beauty from within"],
  [Sun, "Antioxidant Rich", "Naturally bright berry pulp"],
  [BadgeCheck, "Premium Skincare", "Supports skin, hair and glow"],
];

const ingredientHighlights = [
  "Rich in natural Vitamin C",
  "Omega 3, 6, 7, 9",
  "Antioxidant rich",
  "Supports healthy immunity",
  "Helps maintain healthy skin",
  "Supports hair health",
  "100% pure and natural",
  "Made from premium Ladakh berries",
];

export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setIsCartOpen } = useCart();

  const addSelectedQuantity = () => {
    for (let count = 0; count < quantity; count += 1) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: "wellness",
      });
    }
    setIsCartOpen(true);
  };

  return (
    <main className="product-page">
      <div className="product-breadcrumb">
        <Link to="/"><ArrowLeft size={15} /> Back to home</Link>
        <span>Wellness / Sea Buckthorn Juice</span>
      </div>

      <section className="product-purchase">
        <div className="product-gallery">
          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <button
                key={image}
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
                aria-label={`View product image ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
          <div className="product-main-image">
            <span className="sale-flag">36% OFF</span>
            <img
              src={product.images[activeImage]}
              alt={`${product.name} — view ${activeImage + 1}`}
            />
          </div>
        </div>

        <div className="purchase-panel">
          <p className="eyebrow">Tresglam wellness · Ladakh</p>
          <h1>{product.name} <em>— {product.origin}</em></h1>
          <div className="rating-row">
            <span className="stars">★★★★★</span>
            <span>Purely crafted for your daily ritual</span>
          </div>
          <p className="purchase-description">{product.shortDescription}</p>

          <div className="product-tags">
            <span><ShieldCheck size={15} /> Immunity support</span>
            <span><Sparkles size={15} /> Skin health</span>
            <span><Leaf size={15} /> Antioxidant rich</span>
            <span><Droplets size={15} /> Omega 3, 6, 7, 9</span>
          </div>

          <div className="price-block">
            <strong>₹{product.price}</strong>
            <del>₹{product.mrp}</del>
            <span>You save ₹{product.savings}</span>
          </div>
          <p className="tax-note">Inclusive of all taxes</p>

          <div className="offer-card">
            <span>Special offer</span>
            <div>
              <strong>1 × 300 ml glass bottle</strong>
              <p>Premium Ladakh sea buckthorn fruit pulp</p>
            </div>
            <b>₹700</b>
          </div>

          <div className="purchase-actions">
            <div className="quantity-control" aria-label="Quantity selector">
              <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>
            <button className="button button-dark add-cart-button" onClick={addSelectedQuantity}>
              <ShoppingBag size={18} /> Add to cart
            </button>
          </div>

          <div className="purchase-assurances">
            <div><Truck size={19} /><span><strong>Fast dispatch</strong>Pan-India delivery</span></div>
            <div><PackageCheck size={19} /><span><strong>Securely packed</strong>Protected glass bottle</span></div>
            <div><Recycle size={19} /><span><strong>Better choice</strong>Recyclable packaging</span></div>
          </div>
        </div>
      </section>

      <section className="quick-benefits">
        {[
          ["100% Natural", "Pure and simple"],
          ["Made in India", "Ladakh sourced"],
          ["Omega 3, 6, 7, 9", "Beauty from within"],
          ["Antioxidant Rich", "Wellness support"],
        ].map(([title, text], index) => (
          <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></div>
        ))}
      </section>

      <section className="product-highlight-strip" aria-label="Sea Buckthorn Juice highlights">
        {productHighlights.map(([Icon, title, text]) => {
          const HighlightIcon = Icon as typeof Leaf;
          return (
            <div key={title as string}>
              <HighlightIcon size={22} />
              <strong>{title as string}</strong>
              <span>{text as string}</span>
            </div>
          );
        })}
      </section>

      <section className="product-ingredient-focus">
        <div>
          <p className="eyebrow">Ingredient power</p>
          <h2>Golden Ladakh berries with <em>skin and wellness benefits.</em></h2>
          <p>
            Sea buckthorn is known for its naturally bright profile, antioxidant
            content and rare Omega 3, 6, 7 and 9 composition. This homepage story
            now continues on the product page so customers see the same premium
            promise before they add to cart.
          </p>
        </div>
        <div className="product-ingredient-grid">
          {ingredientHighlights.map((item) => (
            <span key={item}><Check size={15} /> {item}</span>
          ))}
        </div>
      </section>

      <section className="product-story-panel">
        <div className="product-story-copy">
          <p className="eyebrow">Power, purity & pulp</p>
          <h2>A rare berry. A remarkably <em>simple ritual.</em></h2>
          <p>
            Made from premium Ladakh sea buckthorn berries, this golden concentrate brings
            naturally occurring Vitamin C and antioxidants into one measured daily pour.
          </p>
          <div className="large-benefit-list">
            {product.benefits.map((benefit) => (
              <div key={benefit}><Check size={17} /> {benefit}</div>
            ))}
          </div>
        </div>
        <div className="product-story-image">
          <img src={product.image} alt="Tresglam Sea Buckthorn Juice product packaging" />
          <span><GlassWater size={18} /> 300 ml premium glass bottle</span>
        </div>
      </section>

      <section className="product-details-section">
        <div className="details-title">
          <p className="eyebrow">Everything you need to know</p>
          <h2>Inside your <em>daily bottle.</em></h2>
        </div>
        <div className="detail-accordions">
          <details open>
            <summary><span>01</span> How to use <ChevronDown size={18} /></summary>
            <div>{product.howToUse.map((item) => <p key={item}>{item}</p>)}</div>
          </details>
          <details>
            <summary><span>02</span> Ingredients <ChevronDown size={18} /></summary>
            <div>{product.ingredients.map((item) => <p key={item}>{item}</p>)}</div>
          </details>
          <details>
            <summary><span>03</span> Storage <ChevronDown size={18} /></summary>
            <div>{product.storage.map((item) => <p key={item}>{item}</p>)}</div>
          </details>
          <details>
            <summary><span>04</span> Package contents <ChevronDown size={18} /></summary>
            <div>{product.packageContents.map((item) => <p key={item}>{item}</p>)}</div>
          </details>
        </div>
      </section>

      <section className="product-glass-banner">
        <div>
          <p className="eyebrow">Choose glass. Choose purity.</p>
          <h2>Freshness deserves <em>protection.</em></h2>
          <p>
            Our premium food-grade glass bottle helps preserve natural taste and nutrients,
            stays free from unwanted plastic odour, and is recyclable after use.
          </p>
          <ul>
            {product.glassReasons.map((reason) => <li key={reason}><Check size={16} /> {reason}</li>)}
          </ul>
        </div>
        <img src={product.images[1]} alt="Benefits of choosing Tresglam juice in glass" />
      </section>

      <section className="sticky-product-cta">
        <img src={product.image} alt="" />
        <div><strong>{product.name}</strong><span>300 ml · Premium glass bottle</span></div>
        <div className="sticky-price"><strong>₹700</strong><del>₹1,100</del></div>
        <button className="button button-orange" onClick={addSelectedQuantity}>Add to cart</button>
      </section>
    </main>
  );
}

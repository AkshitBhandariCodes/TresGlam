import { Link } from "react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Droplets,
  FlaskConical,
  Heart,
  Leaf,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
} from "lucide-react";
import productsData from "@/data/products.json";
import { seaBuckthornProduct as seaBuckthorn } from "@/data/seaBuckthorn";
import { useCart } from "@/context/CartContext";

interface HomeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp?: number;
  image: string;
  category: string;
  label: string;
  link: string;
}

const catalog = productsData as Array<{
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
}>;

const skincareProducts = catalog
  .filter((product) => product.category === "pharmaceutical")
  .slice(0, 6);

const collectionItems = [
  {
    title: "Creams",
    image: "/images/tresglam-snow-white-night-use-cream/TresGlam snow white.png",
    href: "/pharmaceutical",
  },
  {
    title: "Glow Care",
    image: "/images/tresglam-herbal-avocado-whitening-cream/TresGlam herbal avacado.png",
    href: "/pharmaceutical",
  },
  {
    title: "Sun Care",
    image: "/images/tresglam-herbal-sunblock-oil-free-cream-spf-30/TresGlam Herbal Sunblock.png",
    href: "/nutraceutical",
  },
  {
    title: "Cleansers",
    image: "/images/tresglam-kiwi-whitening-glowing-face-wash/TresGlam kiwi glowing face wash.png",
    href: "/cosmetics",
  },
  {
    title: "Treatments",
    image: "/images/tresglam-herbal-anti-aging-natural-cream/TresGlam herbal anti aging.png",
    href: "/pharmaceutical",
  },
  {
    title: "Wellness",
    image: seaBuckthorn.image,
    href: "/product/sea-buckthorn-juice",
  },
];

const latestProducts: HomeProduct[] = [
  {
    id: seaBuckthorn.id,
    name: seaBuckthorn.name,
    description: seaBuckthorn.shortDescription,
    price: seaBuckthorn.price,
    mrp: seaBuckthorn.mrp,
    image: seaBuckthorn.image,
    category: "nutraceutical",
    label: "Hero launch",
    link: "/product/sea-buckthorn-juice",
  },
  ...skincareProducts.slice(0, 4).map((product) => ({
    ...product,
    label: product.subcategory || "Skincare",
    link: `/product/${product.id}`,
  })),
];

const heroBenefits = [
  [Leaf, "100% Natural", "Pure daily wellness ritual"],
  [MapPin, "Made in India", "Premium Ladakh berries"],
  [Droplets, "Omega 3, 6, 7, 9", "Beauty from within"],
  [ShieldCheck, "Antioxidant Rich", "Supports immunity and skin"],
  [Sparkles, "Premium Skincare", "Glow-focused care"],
];

const whyChoose = [
  [Leaf, "Clean Ingredients", "Botanical formulas and thoughtful wellness essentials."],
  [FlaskConical, "Ingredient Led", "Product stories built around benefits, texture and ritual."],
  [Heart, "Made With Care", "Comfortable everyday products with a premium presentation."],
  [ShieldCheck, "Trustworthy Feel", "Clear claims, visible pricing and simple ordering."],
  [BadgeCheck, "Made in India", "A local brand presented with an international finish."],
];

export default function HomePage() {
  return (
    <main className="brand-home">
      <section className="brand-hero sea-hero">
        <div className="brand-hero-copy sea-hero-copy">
          <p className="eyebrow">Pure. Powerful. Natural.</p>
          <h1>
            Sea Buckthorn
            <em> Juice</em>
          </h1>
          <p>
            Tresglam's golden wellness launch made from premium Ladakh sea buckthorn
            berries, crafted for immunity, skin, hair and everyday vitality.
          </p>
          <div className="brand-hero-actions">
            <Link to="/product/sea-buckthorn-juice" className="button button-orange">
              Shop juice now <ArrowRight size={17} />
            </Link>
            <a href="#skincare" className="brand-text-link">Explore skincare <span>+</span></a>
          </div>
          <div className="hero-stat-row">
            <div><strong>300 ml</strong><span>Premium glass bottle</span></div>
            <div><strong>Rs. 700</strong><span>Launch offer</span></div>
            <div><strong>Rs. 400</strong><span>You save</span></div>
          </div>
        </div>

        <div className="sea-hero-visual">
          <div className="sea-hero-product">
            <img src={seaBuckthorn.image} alt="Tresglam Sea Buckthorn Juice bottle and pack" />
          </div>
          <div className="hero-ingredient ingredient-left">
            <Leaf size={18} />
            <span>Natural Vitamin C</span>
          </div>
          <div className="hero-ingredient ingredient-right">
            <Sun size={18} />
            <span>Antioxidant rich</span>
          </div>
          <div className="hero-ingredient ingredient-bottom">
            <Droplets size={18} />
            <span>Omega 3, 6, 7, 9</span>
          </div>
        </div>
      </section>

      <section className="home-trust-strip" aria-label="Product highlights">
        {heroBenefits.map(([Icon, title, text]) => {
          const BenefitIcon = Icon as typeof Leaf;
          return (
            <div className="trust-item" key={title as string}>
              <BenefitIcon size={22} />
              <div>
                <strong>{title as string}</strong>
                <span>{text as string}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="skincare-collection-section" id="skincare">
        <div className="home-section-heading centered-heading">
          <div>
            <p className="eyebrow">Skincare essentials</p>
            <h2>Your natural glow, <em>beautifully organised.</em></h2>
          </div>
          <p>
            After the Sea Buckthorn launch, guide customers into Tresglam skincare,
            cleansers and daily care collections with a calm premium shopping flow.
          </p>
        </div>

        <div className="collection-pill-grid">
          {collectionItems.map((item) => (
            <Link to={item.href} className="collection-pill" key={item.title}>
              <span>
                <img src={item.image} alt={`${item.title} collection`} />
              </span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="ingredient-spotlight">
        <div>
          <p className="eyebrow">Why this juice stands out</p>
          <h2>Ladakh sea buckthorn, <em>presented like a luxury ritual.</em></h2>
          <p>
            Highlight the ingredient story right on the homepage: naturally rich,
            bright, antioxidant-forward and packed in premium food-grade glass.
          </p>
        </div>
        <div className="ingredient-grid">
          {[
            "Rich in natural Vitamin C",
            "Omega 3, 6, 7, 9",
            "Antioxidant rich",
            "Supports healthy immunity",
            "Helps maintain healthy skin",
            "Premium glass bottle",
          ].map((item) => (
            <span key={item}><Check size={15} /> {item}</span>
          ))}
        </div>
      </section>

      <section className="latest-section" id="latest">
        <div className="home-section-heading latest-heading">
          <div><p className="eyebrow">Bestselling products</p><h2>Wellness first, <em>skincare next.</em></h2></div>
          <p>Feature the juice at the start, then let customers continue into existing Tresglam products.</p>
        </div>
        <div className="latest-product-grid">
          {latestProducts.map((product, index) => (
            <LatestProductCard key={product.id} product={product} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="promo-split">
        <Link to="/product/sea-buckthorn-juice" className="promo-card promo-juice">
          <img src={seaBuckthorn.image} alt="Tresglam Sea Buckthorn Juice" />
          <div>
            <p className="eyebrow">Start your wellness journey</p>
            <h2>Shop Sea Buckthorn Juice</h2>
            <span>Launch offer Rs. 700 <ArrowRight size={15} /></span>
          </div>
        </Link>
        <Link to="/pharmaceutical" className="promo-card promo-skincare">
          <img src="/images/tresglam-herbal-avocado-whitening-cream/TresGlam herbal avacado.png" alt="Tresglam skincare cream" />
          <div>
            <p className="eyebrow">Glow naturally</p>
            <h2>Explore skincare rituals</h2>
            <span>Shop collection <ArrowRight size={15} /></span>
          </div>
        </Link>
      </section>

      <section className="brand-features">
        <div className="brand-features-intro">
          <p className="eyebrow">Why choose Tresglam?</p>
          <h2>Premium care that feels <em>clear and trustworthy.</em></h2>
          <p>Clean spacing, confident typography and strong product images now lead the customer from wellness to skincare without confusion.</p>
        </div>
        <div className="brand-feature-grid">
          {whyChoose.map(([Icon, title, text], index) => {
            const FeatureIcon = Icon as typeof Leaf;
            return <article key={title as string}><span>0{index + 1}</span><FeatureIcon size={23} /><h3>{title as string}</h3><p>{text as string}</p></article>;
          })}
        </div>
      </section>

      <section className="brand-final-cta">
        <div><p className="eyebrow">Find your Tresglam</p><h2>Begin with wellness. <em>Continue with glow.</em></h2></div>
        <Link to="/product/sea-buckthorn-juice" className="button button-cream">Shop the launch <ArrowRight size={17} /></Link>
      </section>
    </main>
  );
}

function LatestProductCard({ product, featured }: { product: HomeProduct; featured: boolean }) {
  const { addToCart, setIsCartOpen } = useCart();

  const addProduct = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setIsCartOpen(true);
  };

  return (
    <article className={`latest-product-card ${featured ? "latest-featured" : ""}`}>
      <Link to={product.link} className="latest-product-image">
        <span>{product.label}</span>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="latest-product-copy">
        <Link to={product.link}><h3>{product.name}</h3></Link>
        <p>{product.description}</p>
        <div className="latest-product-bottom">
          <div><strong>Rs. {product.price}</strong>{product.mrp && <del>Rs. {product.mrp}</del>}</div>
          <button onClick={addProduct} aria-label={`Add ${product.name} to cart`}><ShoppingBag size={17} /> Add</button>
        </div>
      </div>
    </article>
  );
}

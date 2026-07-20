import { Link } from "react-router";
import {
  ArrowRight,
  Check,
  Droplets,
  Heart,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
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
}>;

const categories = [
  {
    title: "Skincare",
    kicker: "Glow, repair & hydrate",
    description: "Creams and targeted care for soft, balanced, luminous-looking skin.",
    image: "/images/tresglam-snow-white-night-use-cream/TresGlam snow white.png",
    href: "/pharmaceutical",
    tone: "rose",
  },
  {
    title: "Nutraceuticals",
    kicker: "Beauty from within",
    description: "Daily wellness and body-care rituals made with thoughtful ingredients.",
    image: "/images/seabuck/tresglam-sea-buckthorn-product.png",
    href: "/nutraceutical",
    tone: "gold",
  },
  {
    title: "Cleansers",
    kicker: "Fresh starts, every day",
    description: "Fruit-forward face washes that cleanse, refresh and prepare your skin.",
    image: "/images/tresglam-kiwi-whitening-glowing-face-wash/TresGlam kiwi glowing face wash.png",
    href: "/cosmetics",
    tone: "green",
  },
];

const catalogSelections = [catalog[0], catalog[3], catalog[5], catalog[7]].filter(
  (item): item is NonNullable<typeof item> => Boolean(item),
);

const latestProducts: HomeProduct[] = [
  {
    id: seaBuckthorn.id,
    name: seaBuckthorn.name,
    description: seaBuckthorn.shortDescription,
    price: seaBuckthorn.price,
    mrp: seaBuckthorn.mrp,
    image: seaBuckthorn.image,
    category: "nutraceutical",
    label: "New wellness",
    link: "/product/sea-buckthorn-juice",
  },
  ...catalogSelections.map((product) => ({
    ...product,
    label:
      product.category === "pharmaceutical"
        ? "Skincare"
        : product.category === "nutraceutical"
          ? "Nutraceutical"
          : "Cleanser",
    link: `/product/${product.id}`,
  })),
];

export default function HomePage() {
  return (
    <main className="brand-home">
      <section className="brand-hero">
        <div className="brand-hero-copy">
          <p className="eyebrow">Tresglam · Beauty, care & wellness</p>
          <h1>
            Rituals that let your
            <em> natural glow lead.</em>
          </h1>
          <p>
            Discover botanical skincare, refreshing cleansers and considered wellness
            essentials created to make everyday care feel beautifully elevated.
          </p>
          <div className="brand-hero-actions">
            <a href="#latest" className="button button-dark">Shop latest <ArrowRight size={17} /></a>
            <a href="#categories" className="brand-text-link">Explore categories <span>↘</span></a>
          </div>
          <div className="brand-hero-notes">
            <span><Leaf size={15} /> Botanical ingredients</span>
            <span><Sparkles size={15} /> Everyday radiance</span>
            <span><Heart size={15} /> Made with care</span>
          </div>
        </div>

        <div className="brand-hero-media">
          <video autoPlay loop muted playsInline poster="/images/TresGlam%20snow%20white.png">
            <source src="/images/hero.mp4" type="video/mp4" />
          </video>
          <Link to="/product/sea-buckthorn-juice" className="hero-new-launch">
            <img src={seaBuckthorn.image} alt="Tresglam Sea Buckthorn Juice" />
            <div><span>Just launched</span><strong>Sea Buckthorn Juice</strong><small>Explore now →</small></div>
          </Link>
        </div>
      </section>

      <div className="brand-promise-bar">
        <span>Botanical care</span><i>✦</i>
        <span>Beauty rituals</span><i>✦</i>
        <span>Daily wellness</span><i>✦</i>
        <span>Thoughtful formulas</span><i>✦</i>
        <span>Purely yours</span>
      </div>

      <section className="category-showcase" id="categories">
        <div className="home-section-heading">
          <div><p className="eyebrow">Shop your ritual</p><h2>Care for every <em>part of you.</em></h2></div>
          <p>From the first cleanse to your final wellness pour, find a Tresglam ritual made for the way you care.</p>
        </div>
        <div className="category-card-grid">
          {categories.map((category, index) => (
            <Link key={category.title} to={category.href} className={`category-card category-${category.tone}`}>
              <span className="category-number">0{index + 1}</span>
              <div className="category-card-copy">
                <p>{category.kicker}</p>
                <h3>{category.title}</h3>
                <span>{category.description}</span>
                <b>Shop category <ArrowRight size={15} /></b>
              </div>
              <img src={category.image} alt={`${category.title} collection`} />
            </Link>
          ))}
        </div>
      </section>

      <section className="latest-section" id="latest">
        <div className="home-section-heading latest-heading">
          <div><p className="eyebrow">New & noteworthy</p><h2>Meet the latest <em>Tresglam rituals.</em></h2></div>
          <p>Fresh additions and customer favourites, gathered in one place.</p>
        </div>
        <div className="latest-product-grid">
          {latestProducts.map((product, index) => (
            <LatestProductCard key={product.id} product={product} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="sea-feature">
        <div className="sea-feature-image">
          <span className="launch-badge">New launch</span>
          <img src={seaBuckthorn.image} alt="Tresglam Sea Buckthorn Juice bottle and tube" />
        </div>
        <div className="sea-feature-copy">
          <p className="eyebrow">Nutraceutical spotlight · Ladakh</p>
          <h2>Golden wellness, <em>now part of Tresglam.</em></h2>
          <p>{seaBuckthorn.shortDescription}</p>
          <div className="sea-feature-points">
            {[
              "Rich in natural Vitamin C",
              "Powerful source of antioxidants",
              "Premium food-grade glass bottle",
              "Made from Ladakh sea buckthorn berries",
            ].map((item) => <span key={item}><Check size={15} /> {item}</span>)}
          </div>
          <div className="sea-feature-price"><strong>₹700</strong><del>₹1,100</del><span>Save ₹400</span></div>
          <Link to="/product/sea-buckthorn-juice" className="button button-orange">View product <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="brand-features">
        <div className="brand-features-intro">
          <p className="eyebrow">The Tresglam approach</p>
          <h2>Small rituals. <em>Meaningful care.</em></h2>
          <p>Every product is chosen to make your routine feel simpler, more sensorial and more considered.</p>
        </div>
        <div className="brand-feature-grid">
          {[
            [Leaf, "Botanical focus", "Fruit extracts, plant-led ingredients and formulas rooted in everyday care."],
            [Droplets, "Ritual-ready textures", "Comfortable creams, refreshing cleansers and easy daily wellness."],
            [ShieldCheck, "Thoughtfully presented", "Products designed with care from formula to final packaging."],
            [Sparkles, "Glow-first philosophy", "Skin, body and wellness essentials made to support your natural radiance."],
          ].map(([Icon, title, text], index) => {
            const FeatureIcon = Icon as typeof Leaf;
            return <article key={title as string}><span>0{index + 1}</span><FeatureIcon size={23} /><h3>{title as string}</h3><p>{text as string}</p></article>;
          })}
        </div>
      </section>

      <section className="brand-final-cta">
        <div><p className="eyebrow">Find your Tresglam</p><h2>Your next favourite ritual <em>is waiting.</em></h2></div>
        <a href="#categories" className="button button-cream">Shop by category <ArrowRight size={17} /></a>
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
          <div><strong>₹{product.price}</strong>{product.mrp && <del>₹{product.mrp}</del>}</div>
          <button onClick={addProduct} aria-label={`Add ${product.name} to cart`}><ShoppingBag size={17} /> Add</button>
        </div>
      </div>
    </article>
  );
}

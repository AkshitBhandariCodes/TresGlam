import { Link } from "react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow footer-eyebrow">Beauty meets wellbeing</p>
          <h2>Thoughtful care for skin, body and everyday wellness.</h2>
        </div>
        <a href="/#latest" className="button button-cream">Explore products</a>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="wordmark wordmark-light">
            <img src="/images/logo2.png" alt="" />
            <span className="sr-only">Tresglam</span>
          </Link>
          <p>
            Botanical skincare, considered self-care and daily wellness essentials, made
            to bring a little more glow to every ritual.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <Link to="/pharmaceutical">Skincare</Link>
          <Link to="/nutraceutical">Nutraceuticals</Link>
          <Link to="/cosmetics">Cleansers</Link>
          <Link to="/product/sea-buckthorn-juice">New launch</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <a href="mailto:info@tresglam.com"><Mail size={15} /> info@tresglam.com</a>
          <a href="tel:+919769771850"><Phone size={15} /> +91 97697 71850</a>
          <p className="footer-address"><MapPin size={15} /> Andheri West, Mumbai</p>
        </div>

        <div>
          <h3>Follow the ritual</h3>
          <a href="#" aria-label="Tresglam on Instagram"><Instagram size={16} /> Instagram</a>
          <p className="footer-note">Beauty | Care | Wellness</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Copyright {new Date().getFullYear()} Tresglam. All rights reserved.</span>
        <span>Purely yours.</span>
      </div>
    </footer>
  );
}

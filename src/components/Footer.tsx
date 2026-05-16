import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";

const quickLinks = [
  { path: "/", label: "Home" },
  { path: "/pharmaceutical", label: "Skincare" },
  { path: "/nutraceutical", label: "Bodycare" },
  { path: "/cosmetics", label: "Cleansers" },
  { path: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2A1E1A] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-3">
              <img
                src="/images/logo.png"
                alt="TresGlam"
                className="h-10 w-36 object-contain sm:h-12 sm:w-44"
              />
            </div>
            <p className="text-[#D8C3BC] text-sm mb-6 leading-relaxed">
              Beauty rituals crafted with care. Botanical blends, luminous skin,
              and everyday indulgence.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.15 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D8C3BC] hover:bg-[#9C5A4A] hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold text-base mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#D8C3BC] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-base mb-5">
              Categories
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/pharmaceutical"
                  className="text-[#D8C3BC] text-sm hover:text-white transition-colors"
                >
                  Skincare
                </Link>
              </li>
              <li>
                <Link
                  to="/nutraceutical"
                  className="text-[#D8C3BC] text-sm hover:text-white transition-colors"
                >
                  Bodycare
                </Link>
              </li>
              <li>
                <Link
                  to="/cosmetics"
                  className="text-[#D8C3BC] text-sm hover:text-white transition-colors"
                >
                  Cleansers
                </Link>
              </li>
              <li>
                <span className="text-[#D8C3BC] text-sm">New Arrivals</span>
              </li>
              <li>
                <span className="text-[#D8C3BC] text-sm">Best Sellers</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold text-base mb-5">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-[#D8C3BC] text-sm">
                <Mail size={16} className="text-[#F0C6BC] flex-shrink-0" />
                info@tresglam.com
              </li>
              <li className="flex items-center gap-3 text-[#D8C3BC] text-sm">
                <Phone size={16} className="text-[#F0C6BC] flex-shrink-0" />
                +91 97697 71850
              </li>
              <li className="flex items-start gap-3 text-[#D8C3BC] text-sm">
                <MapPin
                  size={16}
                  className="text-[#F0C6BC] flex-shrink-0 mt-0.5"
                />
                TresGlam HQ, Andheri West, Mumbai, Maharashtra 400053
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#BCA7A0] text-sm">
            © 2025 TresGlam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[#BCA7A0] text-sm hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-[#BCA7A0] text-sm hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

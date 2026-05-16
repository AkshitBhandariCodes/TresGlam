import { Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import ContactPage from "@/pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <WishlistDrawer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/pharmaceutical"
          element={<CategoryPage category="pharmaceutical" />}
        />
        <Route
          path="/nutraceutical"
          element={<CategoryPage category="nutraceutical" />}
        />
        <Route
          path="/cosmetics"
          element={<CategoryPage category="cosmetics" />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

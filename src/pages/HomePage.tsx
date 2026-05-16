import Hero from "@/sections/Hero";
import WhyTresGlam from "@/sections/WhyTresGlam";
import FeaturedProducts from "@/sections/FeaturedProducts";
import Testimonials from "@/sections/Testimonials";
import Partners from "@/sections/Partners";
import Contact from "@/sections/Contact";
import Feedback from "@/sections/Feedback";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhyTresGlam />
      <FeaturedProducts />
      <Testimonials />
      <Feedback />
      <Partners />
      <Contact />
    </main>
  );
}

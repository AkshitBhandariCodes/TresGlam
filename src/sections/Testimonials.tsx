import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "TresGlam's pharmaceutical products have transformed our clinic's patient outcomes. The quality is unmatched.",
    author: "Dr. Sarah Mitchell",
    role: "Medical Director",
  },
  {
    quote:
      "I've been using their nutraceutical supplements for 6 months and the results are incredible. Highly recommended!",
    author: "James Rodriguez",
    role: "Fitness Coach",
  },
  {
    quote:
      "The cosmetic line is simply divine. My clients always ask what products I use — it's always TresGlam.",
    author: "Emily Chen",
    role: "Esthetician",
  },
  {
    quote:
      "As a distributor, we've partnered with TresGlam for 3 years. Their reliability and product excellence are outstanding.",
    author: "Michael Park",
    role: "Distributor",
  },
  {
    quote:
      "Their commitment to sustainable packaging while maintaining premium quality is truly impressive.",
    author: "Lisa Thompson",
    role: "Wellness Blogger",
  },
  {
    quote:
      "The fast absorption technology in their supplements actually works. I noticed results within weeks.",
    author: "David Kim",
    role: "Nutritionist",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="flex-shrink-0 w-[350px] sm:w-[400px] p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-[#FF7900] text-[#FF7900]"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/90 text-base italic leading-relaxed mb-6">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div>
        <p className="text-[#FF7900] font-semibold text-sm">
          {testimonial.author}
        </p>
        <p className="text-[#8DA9C4] text-xs">{testimonial.role}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Duplicate testimonials for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 lg:py-32 bg-[#0A1628] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#FF7900] text-xs uppercase tracking-[0.15em] font-medium mb-4">
            TESTIMONIALS
          </p>
          <h2
            className="font-bold text-white mb-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(28px, 3.5vw, 48px)",
            }}
          >
            Our Community Has Grown
          </h2>
          <p className="text-[#8DA9C4] text-base max-w-md mx-auto">
            Hear what our customers and partners say about TresGlam
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative group">
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {allTestimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

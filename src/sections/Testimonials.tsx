import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The textures feel like silk and the glow is immediate. My skin has never looked so calm.",
    author: "Ariana Patel",
    role: "Skincare Enthusiast",
  },
  {
    quote:
      "Every product feels curated. The scent, the finish, the results — perfection.",
    author: "Nadia Chen",
    role: "Beauty Editor",
  },
  {
    quote:
      "TresGlam’s formulas are gentle yet powerful. My clients ask for them by name.",
    author: "Prisha Malhotra",
    role: "Esthetician",
  },
  {
    quote:
      "This is luxury skincare that still feels approachable. I love every step.",
    author: "Kavya Singh",
    role: "Creator",
  },
  {
    quote:
      "The glow lasts all day. My routine feels elevated and calming at once.",
    author: "Lea Williams",
    role: "Wellness Blogger",
  },
  {
    quote:
      "Skin feels refreshed, balanced, and radiant. TresGlam is now a daily staple.",
    author: "Mira Dawson",
    role: "Founder, Glow Lab",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="flex-shrink-0 w-[350px] sm:w-[400px] p-6 rounded-3xl bg-white border border-[#F2E7E4] shadow-lg shadow-[#EAD6CF]/40">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-[#E7B7AE] text-[#E7B7AE]"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[#5C4A43] text-base italic leading-relaxed mb-6">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div>
        <p className="text-[#9C5A4A] font-semibold text-sm">
          {testimonial.author}
        </p>
        <p className="text-[#A58A82] text-xs">{testimonial.role}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Duplicate testimonials for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 lg:py-32 bg-[#FFF7F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#9C5A4A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
            TESTIMONIALS
          </p>
          <h2
            className="font-semibold text-[#2A1E1A] mb-4"
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
            }}
          >
            Our Community Glows
          </h2>
          <p className="text-[#6B5C56] text-base max-w-md mx-auto">
            Real rituals, real results, and a glow-first experience.
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

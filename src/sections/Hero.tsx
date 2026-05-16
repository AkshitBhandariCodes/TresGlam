import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

// Particle system for background
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 121, 0, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 121, 0, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// 3D Tetrahedron using CSS
function Tetrahedron() {
  const [rotation, setRotation] = useState({ x: 15, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    const animate = () => {
      if (!isDragging) {
        setRotation((prev) => ({
          x: prev.x,
          y: prev.y + 0.3,
        }));
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setRotation((prev) => ({
      x: prev.x - dy * 0.5,
      y: prev.y + dx * 0.5,
    }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div
      className="absolute right-[10%] top-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 cursor-grab active:cursor-grabbing"
      style={{ zIndex: 2, perspective: "800px" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        {/* Tetrahedron faces */}
        {[0, 1, 2, 3].map((face) => {
          const rotations = [
            "rotateX(0deg) translateZ(69px)",
            "rotateX(-109.5deg) rotateY(120deg) translateZ(69px)",
            "rotateX(-109.5deg) rotateY(240deg) translateZ(69px)",
            "rotateX(70.5deg) translateZ(-69px)",
          ];
          const colors = [
            "rgba(255, 121, 0, 0.25)",
            "rgba(255, 123, 123, 0.2)",
            "rgba(201, 160, 89, 0.2)",
            "rgba(255, 121, 0, 0.15)",
          ];
          return (
            <div
              key={face}
              className="absolute inset-0"
              style={{
                transform: rotations[face],
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: colors[face],
                  border: "1px solid rgba(255, 121, 0, 0.3)",
                  backdropFilter: "blur(4px)",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-end pb-24 md:pb-32 overflow-hidden"
      style={{ background: "#0A1628" }}
    >
      {/* Particle Background */}
      <ParticleField />

      {/* 3D Tetrahedron */}
      <div className="hidden lg:block">
        <Tetrahedron />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#FF7900] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-6"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Pharmaceutical · Nutraceutical · Cosmetics
        </motion.p>

        {/* Main Heading */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-white font-bold leading-[0.95] max-w-3xl"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(40px, 7vw, 96px)",
              letterSpacing: "-0.02em",
            }}
          >
            Experience The
            <br />
            Science of Beauty
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-[#8DA9C4] text-base sm:text-lg max-w-md mb-8 leading-relaxed"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Premium formulations crafted with precision for your health, wellness,
          and beauty needs.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2, ease: "backOut" }}
        >
          <Link
            to="/cosmetics"
            className="inline-flex items-center gap-2 bg-[#FF7900] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#e66d00] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Explore Products
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent z-10 pointer-events-none" />
    </section>
  );
}

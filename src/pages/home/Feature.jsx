import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Wrench,
  Bell,
  ShieldCheck,
  Calendar,
  FileText,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: Wrench,
    title: "Maintenance Requests",
    desc: "Submit and track maintenance requests in real time without phone calls.",
    image: "https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    desc: "Stay informed with updates on repairs, announcements, and alerts.",
    image: "https://images.pexels.com/photos/22604121/pexels-photo-22604121.jpeg",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    desc: "Your data is protected with enterprise-grade security and access control.",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    desc: "Book common facilities and amenities with an intelligent scheduling system.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/038/095/655/small_2x/smart-home-technology-connected-devices-with-smartphone-app-control-internet-of-things-automation-system-with-digital-icons-concept-vector.jpg",
  },
  {
    icon: FileText,
    title: "Digital Documents",
    desc: "Access leases, invoices, and receipts anytime in one secure place.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg",
  },
  {
    icon: Users,
    title: "Community Hub",
    desc: "Connect with neighbors, join events, and share announcements.",
    image: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg",
  },
];

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHovered, setCardHovered] = useState(false);
  const cardRef = useRef(null);
  const accumulatedDelta = useRef(0);
  // Each "step" requires this many px of scroll delta to advance
  const SCROLL_THRESHOLD = 120;

  // Intercept wheel events only when hovering the card
  const handleWheel = useCallback(
    (e) => {
      if (!cardHovered) return;

      const atStart = activeIndex === 0 && e.deltaY < 0;
      const atEnd = activeIndex === features.length - 1 && e.deltaY > 0;

      // If at boundaries, let the page scroll normally
      if (atStart || atEnd) return;

      // Otherwise consume the scroll event
      e.preventDefault();
      e.stopPropagation();

      accumulatedDelta.current += e.deltaY;

      if (accumulatedDelta.current >= SCROLL_THRESHOLD) {
        accumulatedDelta.current = 0;
        setActiveIndex((i) => Math.min(i + 1, features.length - 1));
      } else if (accumulatedDelta.current <= -SCROLL_THRESHOLD) {
        accumulatedDelta.current = 0;
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
    },
    [cardHovered, activeIndex]
  );

  // Attach passive:false wheel listener to card so we can call preventDefault
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const progress = (activeIndex + 1) / features.length;

  return (
    <section
      id="features"
      className="relative bg-[#FFF7DB] dark:bg-secondary py-24 px-6"
    >
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-accent/15 blur-[170px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-secondary/80 dark:text-primary/70">
            <span className="text-2xl tracking-[0.4em] uppercase">Features</span>
            <div className="flex-1 h-px bg-secondary/10 dark:bg-primary/15" />
          </div>
          {/* Progress bar */}
          <motion.div
            className="mt-2 h-[3px] bg-accent origin-left rounded-full"
            animate={{ scaleX: progress }}
            initial={{ scaleX: 1 / features.length }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Main card — scroll events captured here only */}
        <div
          ref={cardRef}
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => {
            setCardHovered(false);
            accumulatedDelta.current = 0;
          }}
          className="relative h-[70vh] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl cursor-default select-none"
          style={{ touchAction: "none" }}
        >
          <AnimatePresence mode="wait">
            <FeaturePanel
              key={activeIndex}
              feature={features[activeIndex]}
              index={activeIndex}
            />
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group relative flex items-center justify-center w-6 h-6"
                aria-label={`Go to feature ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-3 h-3 bg-accent shadow-lg shadow-accent/50"
                      : "w-2 h-2 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Arrow navigation */}
          <div className="absolute bottom-6 right-16 flex gap-3 z-20">
            <button
              onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous feature"
            >
              ←
            </button>
            <button
              onClick={() => setActiveIndex((i) => Math.min(i + 1, features.length - 1))}
              disabled={activeIndex === features.length - 1}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next feature"
            >
              →
            </button>
          </div>
        </div>

        {/* Hint text */}
        <div className="mt-6 text-center">
          <p className="text-secondary/60 dark:text-primary/50 text-sm tracking-[0.3em] uppercase">
            {cardHovered
              ? "Scroll inside the card to explore features"
              : "Hover card & scroll to explore"}
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturePanel({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <img
        src={feature.image}
        alt={feature.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/20" />

      <div className="relative z-10 h-full w-full p-10 md:p-14 lg:p-16 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-12 rounded-xl bg-accent text-secondary flex items-center justify-center shadow-lg">
            <Icon size={22} />
          </div>
          <span className="text-white/70 text-xs tracking-[0.35em] uppercase">
            Feature {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.h4
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FFF2B3] leading-tight mb-4 max-w-xl md:max-w-2xl"
        >
          {feature.title}
        </motion.h4>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.4 }}
          className="text-[#FFE9A1] text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          {feature.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}
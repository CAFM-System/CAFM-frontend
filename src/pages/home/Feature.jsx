import React, { useRef } from "react";
import {
  Wrench,
  Bell,
  ShieldCheck,
  Calendar,
  FileText,
  Users,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    icon: Wrench,
    title: "Maintenance Requests",
    desc:
      "Submit and track maintenance requests in real time without phone calls.",
    image:
      "https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    desc:
      "Stay informed with updates on repairs, announcements, and alerts.",
    image:
      "https://images.pexels.com/photos/22604121/pexels-photo-22604121.jpeg",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    desc:
      "Your data is protected with enterprise-grade security and access control.",
    image:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    desc:
      "Book common facilities and amenities with an intelligent scheduling system.",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/038/095/655/small_2x/smart-home-technology-connected-devices-with-smartphone-app-control-internet-of-things-automation-system-with-digital-icons-concept-vector.jpg",
  },
  {
    icon: FileText,
    title: "Digital Documents",
    desc:
      "Access leases, invoices, and receipts anytime in one secure place.",
    image:
      "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg",
  },
  {
    icon: Users,
    title: "Community Hub",
    desc:
      "Connect with neighbors, join events, and share announcements.",
    image:
      "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg",
  },
];

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative bg-[#FFF7DB] dark:bg-secondary"
    >
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-accent/15 blur-[170px] rounded-full pointer-events-none" />

      <div className="relative h-[calc(100vh*6)]">
        <div className="sticky top-0 h-screen flex items-center justify-center px-6">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl">
            <div className="flex items-center gap-4 text-secondary/80 dark:text-primary/70">
              <span className="text-2xl tracking-[0.4em] uppercase">Features</span>
              <div className="flex-1 h-px bg-secondary/10 dark:bg-primary/15" />
            </div>
            <motion.div
              className="mt-2 h-[3px] bg-accent origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>

          <div className="relative w-full max-w-5xl">
            <div className="relative h-[70vh] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
              {features.map((feature, index) => (
                <FeaturePanel
                  key={feature.title}
                  feature={feature}
                  index={index}
                  total={features.length}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-secondary/80 dark:text-primary/70 text-sm tracking-[0.3em] uppercase">
                Scroll to explore
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePanel({ feature, index, total, scrollProgress }) {
  const Icon = feature.icon;
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollProgress,
    [start - 0.1, start, end - 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(scrollProgress, [start - 0.1, start, end], [30, 0, -30]);
  const scale = useTransform(
    scrollProgress,
    [start - 0.1, start, end],
    [1.03, 1, 1]
  );

  return (
    <motion.div className="absolute inset-0" style={{ opacity, y }}>
      <motion.img
        src={feature.image}
        alt={feature.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/20" />
      <div className="relative z-10 h-full w-full p-10 md:p-14 lg:p-16 flex flex-col justify-end">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent text-secondary flex items-center justify-center shadow-lg">
            <Icon size={22} />
          </div>
          <span className="text-white/70 text-xs tracking-[0.35em] uppercase">
            Feature {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h4 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FFF2B3] leading-tight mb-4 max-w-xl md:max-w-2xl">
          {feature.title}
        </h4>
        <p className="text-[#FFE9A1] text-lg md:text-xl max-w-2xl leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

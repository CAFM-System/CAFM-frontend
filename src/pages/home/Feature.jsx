import React from "react";
import { Wrench, Bell, ShieldCheck } from "lucide-react";
import { motion }  from "framer-motion";

const features = [
  {
    icon: Wrench,
    title: "Maintenance Requests",
    desc: "Submit and track maintenance requests in real time without phone calls.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    desc: "Stay informed with updates on repairs, announcements, and alerts.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    desc: "Your data is protected with enterprise-grade security and access control.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-28 px-4 sm:px-6 lg:px-8
                 bg-primary dark:bg-secondary overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2
                      w-[800px] h-[800px] bg-accent/15
                      blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span
            className="
              inline-block px-4 py-2 rounded-full text-sm font-medium mb-4
              bg-accent/15 text-accent
            "
          >
            Powerful Features
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold
                         text-secondary dark:text-primary mb-5">
            Everything You Need <br />
            <span className="text-accent">In One Place</span>
          </h2>

          <p className="text-secondary/70 dark:text-primary/70
                        max-w-2xl mx-auto">
            Manage your apartment easily with smart tools designed
            for residents and management.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{
                  y: -12,
                  rotateX: 6,
                  rotateY: -6,
                }}
                style={{ perspective: 1200 }}
                className="
                  group relative rounded-3xl p-8
                  bg-white/70 dark:bg-white/5
                  border border-accent/20
                  backdrop-blur-xl
                  shadow-lg hover:shadow-2xl
                  transition-all
                "
              >
                {/* Icon glow */}
                <div className="
                  absolute -top-10 left-1/2 -translate-x-1/2
                  w-24 h-24 bg-accent/30
                  blur-[60px] rounded-full
                  opacity-0 group-hover:opacity-100
                  transition
                " />

                {/* Icon */}
                <div
                  className="
                    relative w-14 h-14 flex items-center justify-center
                    rounded-xl mb-6
                    bg-accent text-secondary
                    shadow-md
                    group-hover:scale-110 transition
                  "
                >
                  <Icon size={28} />
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold
                               text-secondary dark:text-primary mb-3">
                  {f.title}
                </h3>

                <p className="text-secondary/70 dark:text-primary/70
                              leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

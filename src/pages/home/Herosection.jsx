import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthHelper from "../../services/authHelper";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ scrollToSection }) {
  const navigate = useNavigate();

  const handleOpenDashboard = () => {
    AuthHelper.isAuthenticated()
      ? navigate("/resident/dashboard")
      : navigate("/login");
  };

  return (
    <section
      id="Home"
      className="
        relative overflow-hidden
        py-28 px-4 sm:px-6 lg:px-8
        bg-[color:var(--color-primary)]
        dark:bg-black
      "
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.pexels.com/download/video/4877217/"
        // src="public\video\4877217-uhd_3840_2160_30fps.mp4"
        autoPlay
        loop
        muted
      />
      {/* Dark / Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-br
        from-black/70 via-black/60 to-black/80
        dark:from-black/80 dark:via-black/70 dark:to-black
      " />

      {/* Accent glow blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[color:var(--color-accent)]/25 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[color:var(--color-accent)]/15 blur-[180px] rounded-full" />

      {/* ================= CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Pill */}
            <div
              className="
                inline-flex items-center gap-2 px-5 py-2 mb-8
                rounded-full
                bg-white/10 dark:bg-white/5
                backdrop-blur-md
                border border-white/10
              "
            >
              <span className="w-2 h-2 rounded-full bg-[color:var(--color-accent)] animate-pulse" />
              <span className="font-extrabold text-xl gradient-text">
                Welcome
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                text-5xl lg:text-7xl font-extrabold leading-tight mb-8
                text-white
              "
            >
              Apartment <br />
              Management <br />
              <span className="text-[color:var(--color-accent)]">
                Made Simple
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                text-xl max-w-xl mb-12
                text-white/80 leading-relaxed
              "
            >
              Submit maintenance requests, track progress, and stay connected —
              all from one powerful, modern platform built for residents.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5">
              <button
                onClick={handleOpenDashboard}
                className="
                  group px-9 py-5 rounded-2xl
                  bg-[color:var(--color-accent)]
                  text-black font-semibold
                  shadow-[0_20px_50px_rgba(234,179,8,0.35)]
                  hover:scale-105 active:scale-95
                  transition-transform
                "
              >
                <span className="flex items-center gap-2">
                  Open Dashboard
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className="
                  px-9 py-5 rounded-2xl
                  border border-white/30
                  text-white font-medium
                  backdrop-blur-md
                  hover:bg-white hover:text-black
                  transition
                "
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* ================= RIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center perspective-[1200px]"
          >
            <div
              className="
                relative
                bg-white/10 dark:bg-white/5
                backdrop-blur-xl
                border border-white/20
                rounded-3xl p-10
                shadow-[0_40px_120px_rgba(0,0,0,0.6)]
                transform-gpu
                hover:rotate-y-6 hover:rotate-x-3
                transition-transform duration-500
              "
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart CAFM Platform
              </h3>

              <ul className="space-y-4 text-white/80">
                <li>✔ Maintenance Request Tracking</li>
                <li>✔ Real-time Notifications</li>
                <li>✔ Resident & Admin Dashboards</li>
                <li>✔ Secure Cloud-based System</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

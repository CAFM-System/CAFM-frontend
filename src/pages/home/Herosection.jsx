import React, { useEffect } from "react";
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
        relative py-24 px-4 sm:px-6 lg:px-8
        bg-primary dark:bg-secondary overflow-hidden
      "
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-accent/15 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Welcome pill */}
            <div className="
              inline-flex items-center gap-2 px-4 py-2
              bg-accent/15 rounded-full mb-6
            ">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm text-accent font-medium">
                Welcome !
              </span>
            </div>

            <h1 className="
              text-5xl lg:text-6xl font-extrabold
              leading-tight mb-6
              text-secondary dark:text-primary
            ">
              Your Apartment <br />
              Management <br />
              <span className="text-accent">Made Simple</span>
            </h1>

            <p className="
              text-xl text-secondary/70 dark:text-primary/70
              mb-10 leading-relaxed
            ">
              Submit requests, track maintenance, and communicate with
              our team — all from one powerful platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleOpenDashboard}
                className="
                  px-8 py-6 rounded-xl
                  bg-accent text-secondary font-medium
                  hover:scale-105 transition
                "
              >
                <span className="flex items-center gap-2">
                  Open Dashboard
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className="
                  px-8 py-6 rounded-xl
                  border-2 border-accent text-accent
                  hover:bg-accent hover:text-secondary
                  transition
                "
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* RIGHT LOGO / IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src="/images/logo_withoutBG1.png"
              alt="CAFM Logo"
              className="w-80 lg:w-96 drop-shadow-2xl"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

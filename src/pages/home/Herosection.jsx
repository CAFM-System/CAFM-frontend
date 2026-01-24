import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHelper from "../../services/authHelper";

export default function HeroSection({ scrollToSection }) {
  const logoRef = useRef(null);
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate();

  const handleOpenDashboard = () => {
    if (AuthHelper.isAuthenticated()) {
      navigate("/resident/dashboard");
    } else {
      navigate("/login");
    }
  };

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowLogo(true);
        }
      },
      { threshold: 0.35 }
    );

    if (logoRef.current) observer.observe(logoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0f3f3a] overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#2fd6b5]/20 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6 animate-[fadeUp_0.8s_ease-out_forwards]">

          <h1 className="text-5xl lg:text-6xl text-[#2fd6b5] leading-tight">
            Your Apartment <br />
            Management <br />
            <span className="text-[#a7f3e3]">Made Simple</span>
          </h1>

          <p className="text-xl text-gray-200 leading-relaxed max-w-xl">
            Submit requests, track maintenance, and communicate with our team—
            all from one powerful platform.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5 pt-4">
            <button
              onClick={handleOpenDashboard}
              className="px-8 py-6 bg-[#2fd6b5] text-[#0f3f3a] rounded-xl font-medium
                         hover:shadow-[0_0_30px_#2fd6b5]
                         hover:-translate-y-1
                         transition-all duration-300"
            >
              Open Dashboard
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="px-8 py-6 bg-transparent border-2 border-[#2fd6b5]
                         text-[#2fd6b5] rounded-xl
                         hover:bg-[#2fd6b5]
                         hover:text-[#0f3f3a]
                         hover:-translate-y-1
                         transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT LOGO */}
        <div
          ref={logoRef}
          className="relative flex justify-center items-center"
        >
          {/* Glow behind logo */}
          <div
            className={`absolute w-72 h-72 lg:w-96 lg:h-96 bg-[#2fd6b5]/30 rounded-full blur-[100px]
              transition-opacity duration-1000
              ${showLogo ? "opacity-100" : "opacity-0"}`}
          />

          <img
            src="/images/logo_withoutBG.png"
            alt="Facilitron Logo"
            className={`
              relative w-72 lg:w-96
              transition-all duration-1000 ease-out
              animate-[float_6s_ease-in-out_infinite]
              ${
                showLogo
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-75 translate-y-16"
              }
            `}
          />
        </div>
      </div>

      {/* Custom animations */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-12px);
            }
          }
        `}
      </style>
    </section>
  );
}

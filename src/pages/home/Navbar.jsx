import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => navigate("/login");
  const handleNavigateToSignUp = () => navigate("/register");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* 🌙 DARK MODE STATE */
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-primary dark:bg-secondary
        text-secondary dark:text-primary
        shadow-lg backdrop-blur-md
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("Home")}
        >
          <img
            src="/images/logo_withoutBG1.png"
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="font-bold text-lg text-accent">
            CAFM Portal
          </span>
        </div>

        {/* CENTER: NAV LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {["Home", "features", "about"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="
                px-4 py-2 rounded-lg
                hover:text-accent
                hover:bg-accent/10
                transition
              "
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-3">

          {/* 🌙 DARK / LIGHT TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              w-10 h-10 rounded-full
              flex items-center justify-center
              border border-accent/40
              hover:bg-accent/10
              transition
            "
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-accent" />
            ) : (
              <Moon className="h-5 w-5 text-accent" />
            )}
          </button>

          {/* Login */}
          <button
            onClick={handleNavigateToLogin}
            className="
              px-6 py-2 rounded-lg font-medium
              border-2 border-accent
              text-accent
              hover:bg-accent
              hover:text-secondary
              transition-all duration-200
            "
          >
            Login
          </button>

          {/* Sign Up */}
          <button
            onClick={handleNavigateToSignUp}
            className="
              px-6 py-2 rounded-lg font-medium whitespace-nowrap
              bg-accent text-secondary
              hover:shadow-md hover:-translate-y-[1px]
              transition-all duration-200
            "
          >
            Sign Up
          </button>

        </div>
      </div>
    </nav>
  );
}

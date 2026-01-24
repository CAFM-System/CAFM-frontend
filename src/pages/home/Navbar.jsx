import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigateToLogin = () => navigate("/login");
  const handleNavigateToSignUp = () => navigate("/register");

  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50
                    bg-gradient-to-r from-[#0b3530] via-[#0f3f3a] to-[#0b3530]
                    backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/images/logo_withoutBG.png"
            alt="Logo"
            className="h-10 w-auto cursor-pointer"
            onClick={() => scrollToSection("hero")}
          />
          <span className="text-[#a7f3e3] font-bold text-lg">
            CAFM Portal
          </span>
        </div>

        {/* CENTER: NAV LINKS */}
        <div className="hidden md:flex justify-center items-center gap-6">
          <button
            onClick={() => scrollToSection("hero")}
            className="px-4 py-2 rounded-xl text-white
                       hover:bg-[#2fd6b5]/20 transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="px-4 py-2 rounded-xl text-white
                       hover:bg-[#2fd6b5]/20 transition"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="px-4 py-2 rounded-xl text-white
                       hover:bg-[#2fd6b5]/20 transition"
          >
            About
          </button>
        </div>

        {/* RIGHT: AUTH BUTTONS */}
        <div className="flex items-center gap-3">
  <div className="flex items-center gap-3">
    
    {/* Login */}
    <button
      onClick={handleNavigateToLogin}
      className="px-6 py-2 border-2 border-[#2fd6b5] text-[#2fd6b5]
                 rounded-lg font-medium
                 hover:bg-[#2fd6b5] hover:text-white
                 transition-all duration-200"
    >
      Login
    </button>

    {/* Sign Up */}
    <button
      onClick={handleNavigateToSignUp}
      className="px-6 py-2 bg-[#2fd6b5] text-white
                 rounded-lg font-medium whitespace-nowrap
                 hover:bg-[#2fd6b5]
                 hover:shadow-md hover:-translate-y-[1px]
                 transition-all duration-200"
    >
      Sign Up
    </button>

  </div>
</div>


      </div>
    </nav>
  );
}

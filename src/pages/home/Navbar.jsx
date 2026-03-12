import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sun, Moon, LogIn } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function Navbar() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleNavigateToLogin = () => navigate("/login");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  /* ===== SCROLL DETECTION ===== */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== TEXT COLOR LOGIC ===== */
  const navTextColor = isScrolled
    ? isDarkMode
      ? "text-white"
      : "text-slate-900"
    : "text-white";

  const themeBtnBg = isScrolled
    ? isDarkMode
      ? "bg-white/10 hover:bg-white/20"
      : "bg-black/10 hover:bg-black/20"
    : "bg-white/10 hover:bg-white/20";

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("Home")}
          >
            <img
              src="/images/logo_withoutBG1.png"
              alt="Logo"
              className="h-9 w-auto"
            />
            <span className="font-extrabold text-xl gradient-text">
              FACILITRON
            </span>
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "Home", id: "Home" },
              { label: "Features", id: "features" },
              { label: "About", id: "about" },
              { label: "Contact Us", id: "contactUs" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  px-4 py-2 rounded-lg
                  text-sm font-medium
                  ${navTextColor}
                  hover:text-accent
                  hover:bg-accent/10
                  transition
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition ${themeBtnBg}`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-900" />
              )}
            </button>

            {/* LOGIN BUTTON (UNCHANGED) */}
            <div
              onClick={handleNavigateToLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-full 
                         bg-accent text-black font-semibold
                         hover:opacity-90 transition cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Login
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

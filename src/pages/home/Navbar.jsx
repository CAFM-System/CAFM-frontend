import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sun, Moon, LogIn } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => navigate("/login");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* FULLY TRANSPARENT */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3"
            onClick={() => scrollToSection("Home")}
          >
            <img
              src="/images/logo_withoutBG1.png"
              alt="Logo"
              className="h-9 w-auto"
            />

            {/*Title*/}
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
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="
        px-4 py-2 rounded-lg
        text-sm font-medium
        text-white
        hover:text-accent
        hover:bg-accent/10
        transition
      "
              >
                {item.label}
              </button>
            ))}
          </div>


          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* THEME TOGGLE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-900" />
              )}
            </button>

            {/* LOGIN BUTTON */}
            <div
              onClick={handleNavigateToLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-full 
                         bg-accent text-black font-semibold
                         hover:opacity-90 transition"
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

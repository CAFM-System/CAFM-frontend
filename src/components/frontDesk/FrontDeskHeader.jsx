import React, { useState } from "react";
import { ShieldCheck, User, LogOut, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 
import { useTheme } from "../../hooks/useTheme";

export default function FrontDeskHeader() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // --- MOCK DATA (No Backend) ---
  const [user] = useState({ 
    name: "Officer Kamal", 
    role: "Main Gate Security" 
  });

  const onLogout = () => {
    // Just clear token and redirect for frontend demo
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  // --- STYLES ---
  const headerClasses = "bg-[#1c2625] text-primary shadow-md border-b border-primary/10";
  const accentBoxClass = "bg-accent text-secondary"; 
  const hoverClasses = "hover:bg-white/10";

  return (
    <header className={`${headerClasses} sticky top-0 z-50 transition-colors duration-300`}>
      <div className="w-full px-6 py-3">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: LOGO */}
          {/* Points to the Security Dashboard */}
          <Link to="/frontdesk" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className={`${accentBoxClass} p-2 rounded-lg transition-colors duration-300`}>
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">FACILITRON</h1>
              <p className="text-xs uppercase tracking-wider opacity-80">Security Ops</p>
            </div>
          </Link>

          {/* CENTER: NO TABS (Empty spacer if needed, or just flex-between handles it) */}

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all text-primary ${hoverClasses}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Profile / Logout */}
            <button 
              onClick={onLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all shadow-md active:scale-95 ${accentBoxClass} hover:brightness-110`}
            >
              <User className="h-4 w-4" />
              <span>{user.name}</span>
              <LogOut className="h-4 w-4 ml-1 opacity-70" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
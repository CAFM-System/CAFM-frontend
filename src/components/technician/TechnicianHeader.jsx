import React, { useState, useEffect } from "react";
import { Wrench, User, LogOut, Sun, Moon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * TechnicianHeader Component
 * * * COLOR STRATEGY:
 * - Light Mode: bg-secondary (#334443) -> Creates strong contrast with white pages.
 * - Dark Mode:  bg-[#1c2625] (Deepened Teal) -> Darker than the dashboard background 
 * to create depth, but keeps the color tone consistent.
 */
export default function TechnicianHeader({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({ name: "Loading...", department: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser({ name: "John Doe", department: "maintenance" });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // ============================================================================
  // THEME & COLOR LOGIC
  // ============================================================================

  // Background Color
  // Dark Mode uses a custom "Deep Teal" hex to sit nicely above the "Secondary" body
  const headerClasses = isDarkMode 
    ? "bg-[#1c2625] text-primary border-b border-white/5" 
    : "bg-secondary text-primary shadow-md";

  // Accent Colors (Yellow/Gold)
  // Used for high-priority visual elements in both modes
  const accentBoxClass = "bg-accent text-secondary"; 

  // Hover States
  const hoverClasses = isDarkMode ? "hover:bg-white/5" : "hover:bg-white/10";

  // Navigation Button Styles
  const activeNavClass = `${accentBoxClass} shadow-sm`;
  const inactiveNavClass = "text-primary/80 hover:text-white";

  return (
    <nav 
      className={`
        ${headerClasses}
        sticky top-0 z-50 transition-colors duration-300
      `}
    >
      <div className="w-full px-6 py-3">
        <div className="flex items-center justify-between h-16">
          
          {/* ======================= LEFT: LOGO ======================= */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            {/* Logo Icon Box */}
            <div className={`${accentBoxClass} p-2 rounded-lg transition-colors duration-300`}>
              <Wrench className="h-6 w-6" />
            </div>
            
            {/* Logo Text */}
            <div>
              <h1 className="text-xl font-bold tracking-wide">FACILITRON</h1>
              <p className="text-xs uppercase tracking-wider opacity-80">
                Maintenance Management
              </p>
            </div>
          </Link>

          {/* ======================= CENTER: NAVIGATION ======================= */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-lg">
            
            {['/technician', '/technician/notifications', '/technician/reports'].map((path) => {
              const labels = {
                '/technician': 'Dashboard',
                '/technician/notifications': 'Notifications',
                '/technician/reports': 'Reports'
              };
              
              return (
                <Link to={path} key={path}>
                  <button 
                    className={`
                      h-9 px-4 rounded-md text-sm font-medium transition-all duration-300
                      ${isActive(path) ? activeNavClass : `${inactiveNavClass} ${hoverClasses}`}
                    `}
                  >
                    {labels[path]}
                  </button>
                </Link>
              );
            })}

          </div>

          {/* ======================= RIGHT: ACTIONS ======================= */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all text-primary ${hoverClasses}`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Profile / Logout Button */}
            <button 
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm 
                transition-all shadow-md active:scale-95
                ${accentBoxClass} hover:brightness-110
              `}
              onClick={onLogout}
            >
              <User className="h-4 w-4" />
              <span>{user.name}</span>
              <LogOut className="h-4 w-4 ml-1 opacity-70" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
import React, { useState, useEffect } from "react";
import { Wrench, User, LogOut, Sun, Moon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useTheme } from "../../hooks/useTheme";

export default function TechnicianHeader() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // User State & Fetch Logic
  const [user, setUser] = useState({ name: "Loading...", role: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) { navigate("/login"); return; }
        
        const response = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.user;
        setUser({
          name: `${userData.profile?.firstName} ${userData.profile?.lastName}`.trim() || "Technician",
          role: userData.role || "Maintenance"
        });
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      }
    };
    fetchUserData();
  }, [navigate]);

  const onLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  // --- NAVIGATION LINKS (FIXED) ---
  // These must match your App.js routes exactly!
  const navItems = [
    { path: '/technician', label: 'Dashboard' }, 
    { path: '/technician/notifications', label: 'Notifications' },
    { path: '/technician/reports', label: 'Reports' }
  ];

  // --- STYLES ---
  const headerClasses = "bg-[#1c2625] text-primary shadow-md border-b border-primary/10";
  const accentBoxClass = "bg-accent text-secondary"; 
  const hoverClasses = "hover:bg-white/10";
  
  const baseNavClass = "h-9 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center";
  const activeNavClass = `${accentBoxClass} shadow-sm font-semibold`;
  const inactiveNavClass = "text-primary/80 hover:text-white hover:bg-white/10";

  return (
    <header className={`${headerClasses} sticky top-0 z-50 transition-colors duration-300`}>
      <div className="w-full px-6 py-3">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: LOGO */}
          {/* Pointing to the specific dashboard route */}
          <Link to="/technician" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className={`${accentBoxClass} p-2 rounded-lg transition-colors duration-300`}>
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">FACILITRON</h1>
              <p className="text-xs uppercase tracking-wider opacity-80">Maintenance</p>
            </div>
          </Link>

          {/* CENTER: NAVIGATION */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-lg">
            {navItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path}
                // 'end' ensures /technician doesn't stay highlighted on other tabs
                end={item.path === '/technician'} 
                className={({ isActive }) => `
                  ${baseNavClass} 
                  ${isActive ? activeNavClass : inactiveNavClass}
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all text-primary ${hoverClasses}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

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
// src/layouts/TechnicianLayout.jsx
import { Outlet } from "react-router-dom";
import TechnicianHeader from "../components/technician/TechnicianHeader"; 
import { useTheme } from "../hooks/useTheme";

export default function TechnicianLayout() {
  const { bg } = useTheme();

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      
      {/* 1. STATIC HEADER: This never unmounts, so User Data stays loaded! */}
      <TechnicianHeader />

      {/* 2. DYNAMIC CONTENT: React Router swaps this part only */}
      <div className="relative z-0"> 
        <Outlet /> 
      </div>
      
    </div>
  );
}
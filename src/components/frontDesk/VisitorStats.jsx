import React from "react";
import { Users, CalendarCheck, UserPlus } from "lucide-react";

export default function VisitorStats({ stats, isDarkMode }) {
  
  // Safe defaults in case stats are undefined
  const todayTotal = stats.today || 0;
  const preReg = stats.preRegistered || 0;
  const onSite = Math.max(0, todayTotal - preReg); // Calculate Walk-ins

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      
      {/* Card 1: Today's Total */}
      <StatCard 
        icon={Users} 
        label="Today's Visitors" 
        value={todayTotal} 
        color="blue" 
        isDarkMode={isDarkMode} 
      />

      {/* Card 2: Pre-Registered */}
      <StatCard 
        icon={CalendarCheck} 
        label="Pre-Registered" 
        value={preReg} 
        color="purple" 
        isDarkMode={isDarkMode} 
      />

      {/* Card 3: On-Site Registered (Walk-ins) */}
      <StatCard 
        icon={UserPlus} 
        label="On-Site Registered" 
        value={onSite} 
        color="orange" // Changed to Orange/Gold to match the "Action" theme
        isActive={true} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
}

// Sub-component specific to Stats
function StatCard({ icon: Icon, label, value, color, isActive, isDarkMode }) {
  
  const colors = {
    blue: isDarkMode ? "text-blue-400 bg-blue-400/10" : "text-blue-600 bg-blue-50",
    purple: isDarkMode ? "text-purple-400 bg-purple-400/10" : "text-purple-600 bg-purple-50",
    orange: isDarkMode ? "text-[#EAB308] bg-[#EAB308]/10" : "text-orange-600 bg-orange-50",
    emerald: isDarkMode ? "text-emerald-400 bg-emerald-400/10" : "text-emerald-600 bg-emerald-50",
  };
  
  // Dynamic border colors based on 'color' prop
  const activeBorders = {
    blue: "border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    purple: "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    orange: "border-[#EAB308]/50 shadow-[0_0_20px_rgba(234,179,8,0.15)]",
  };

  const activeGlow = isDarkMode 
    ? `${activeBorders[color] || activeBorders.orange} border-opacity-30` 
    : `${activeBorders[color] || activeBorders.orange}`;

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 border group
      ${isActive 
        ? activeGlow 
        : isDarkMode ? "bg-zinc-900/40 border-white/5" : "bg-white border-gray-100 hover:border-[#EAB308] hover:shadow-lg hover:shadow-orange-100"
      }
    `}>
      <div className="flex items-start justify-between">
        <div>
           <p className={`text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
           <h3 className={`text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#18181B]"}`}>
             {value}
           </h3>
        </div>
        <div className={`p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${colors[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      
      {/* Bottom accent line for active card */}
      {isActive && (
        <div className={`absolute bottom-0 left-0 w-full h-1 
          ${color === 'orange' ? 'bg-[#EAB308]/50' : 'bg-current opacity-20'}`}>
        </div>
      )}
    </div>
  );
}
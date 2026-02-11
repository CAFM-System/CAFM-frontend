import React from "react";
import { Users, CalendarCheck, UserPlus } from "lucide-react";

export default function VisitorStats({ stats, isDarkMode }) {
  
  // Safe defaults
  const todayTotal = stats.today || 0;
  const preReg = stats.preRegistered || 0;
  const onSite = stats.onSite || 0; // Use the calculated onSite from parent

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

      {/* Card 2: On-Site Registered */}
      <StatCard 
        icon={UserPlus} 
        label="On-Site Registered" 
        value={onSite} 
        color="orange" 
        isDarkMode={isDarkMode} 
      />

      {/* Card 3: Pre-Registered */}
      <StatCard 
        icon={CalendarCheck} 
        label="Pre-Registered" 
        value={preReg} 
        color="purple" 
        isDarkMode={isDarkMode} 
      />

    </div>
  );
}

// Sub-component
function StatCard({ icon: Icon, label, value, color, isDarkMode }) {
  
  const colors = {
    blue: isDarkMode ? "text-blue-400 bg-blue-400/10" : "text-blue-600 bg-blue-50",
    purple: isDarkMode ? "text-purple-400 bg-purple-400/10" : "text-purple-600 bg-purple-50",
    orange: isDarkMode ? "text-[#EAB308] bg-[#EAB308]/10" : "text-orange-600 bg-orange-50",
  };
  
  // Border colors for hover state
  const borderColors = {
    blue: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
    purple: "hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]",
    orange: "hover:border-[#EAB308]/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]",
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 border group
      ${isDarkMode 
        ? `bg-zinc-900/40 border-white/5 ${borderColors[color]}` 
        : `bg-white border-gray-100 shadow-sm ${borderColors[color]}`
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
      
      {/* Subtle bottom accent line on hover */}
      <div className={`absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left
        ${color === 'blue' ? 'bg-blue-500/50' : 
          color === 'purple' ? 'bg-purple-500/50' : 'bg-[#EAB308]/50'}`}>
      </div>
    </div>
  );
}
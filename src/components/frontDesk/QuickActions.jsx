import React from "react";
import { UserPlus, QrCode, ArrowRight } from "lucide-react";

export default function QuickActions({ onRegisterClick, onScanClick, activeAction, isDarkMode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <ActionButton 
        onClick={onRegisterClick}
        icon={UserPlus}
        title="New Visitor Check-in"
        subtitle="Register walk-in guests"
        variant="gold"
        isPrimary={activeAction === "register"}
        isDarkMode={isDarkMode}
      />
      <ActionButton 
        onClick={onScanClick}
        icon={QrCode}
        title="Scan Pass / QR"
        subtitle="Quick check-out or entry"
        variant="dark"
        isPrimary={activeAction === "scan"}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

// Sub-component specific to Actions
function ActionButton({ onClick, icon: Icon, title, subtitle, isPrimary, isDarkMode }) {
  return (
    <button 
      onClick={onClick}
      className={`relative w-full p-1 rounded-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group
        ${isPrimary 
          ? "bg-gradient-to-br from-[#EAB308] to-orange-500" // Active Border
          : isDarkMode ? "bg-zinc-800" : "bg-gray-200"
        }`}
    >
      <div className={`relative h-full px-6 py-5 rounded-[14px] flex items-center gap-5 overflow-hidden
        ${isPrimary 
            ? isDarkMode ? "bg-[#18181B]" : "bg-white" 
            : isDarkMode ? "bg-[#18181B] border border-white/5" : "bg-white border border-gray-200"
        }`}>
        
        {/* Hover Highlight */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500
            ${isPrimary ? "bg-[#EAB308]" : "bg-gray-500"}`}></div>

        <div className={`p-3.5 rounded-xl shadow-sm
          ${isPrimary 
            ? "bg-gradient-to-br from-[#EAB308] to-orange-500 text-white" 
            : isDarkMode ? "bg-zinc-800 text-gray-300" : "bg-gray-100 text-gray-600"
          }`}>
          <Icon size={26} />
        </div>
        
        <div className="text-left flex-1">
          <h3 className={`text-lg font-bold group-hover:translate-x-1 transition-transform duration-300 ${isDarkMode ? "text-white" : "text-[#18181B]"}`}>
            {title}
          </h3>
          <p className={`text-sm opacity-80 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {subtitle}
          </p>
        </div>

        <div className={`opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 ${isDarkMode ? "text-[#EAB308]" : "text-orange-500"}`}>
           <ArrowRight size={20} />
        </div>
      </div>
    </button>
  );
}
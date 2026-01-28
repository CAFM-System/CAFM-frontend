import React from "react";
import { useTheme } from "../../../hooks/useTheme"; 

// define styles with opacity-based backgrounds (/10) so they look good in Dark Mode
const variantStyles = {
  amber: {
    border: "border-l-amber-500",
    bubble: "bg-amber-500/10",
    icon: "text-amber-500",
  },
  blue: {
    border: "border-l-blue-500",
    bubble: "bg-blue-500/10",
    icon: "text-blue-500",
  },
  emerald: {
    border: "border-l-emerald-500",
    bubble: "bg-emerald-500/10",
    icon: "text-emerald-500",
  },
};

export function ReportCard({
  title,
  value,
  icon: Icon,
  variant = "blue",
  subValue,
  footerContent,
  onClick
}) {
  const { isDarkMode } = useTheme();
  
  // Get the color styles based on variant
  const styles = variantStyles[variant] || variantStyles.blue;

  // --- THEME LOGIC (Copied from your DashboardCard) ---
  const cardBg = isDarkMode 
    ? "bg-[#18181B] shadow-lg border-white/10" // Dark: Hex #18181B
    : "bg-white shadow-sm border-gray-100 hover:shadow-md"; // Light: White

  const titleColor = isDarkMode ? "text-white/60" : "text-gray-500";
  const valueColor = isDarkMode ? "text-white" : "text-gray-800";
  const subTextColor = isDarkMode ? "text-white/50" : "text-gray-400";

  return (
    <div
      onClick={onClick}
      className={`
        ${cardBg}
        relative overflow-hidden rounded-xl p-6 transition-all duration-300
        border border-l-4 
        ${styles.border}
      `}
    >
      <div className="flex items-start justify-between relative z-10">
        
        {/* Left Side Content */}
        <div>
          <p className={`text-sm font-medium ${titleColor}`}>{title}</p>
          
          {/* Main Value Row */}
          <div className="flex items-baseline gap-2 mt-2">
            <p className={`text-4xl font-bold ${valueColor}`}>{value}</p>
            {subValue && (
              <span className={`flex items-center gap-1 text-sm font-medium ${subTextColor}`}>
                {subValue}
              </span>
            )}
          </div>

          {/* Bottom Footer (Stars or Text) */}
          <div className={`mt-2 text-sm ${subTextColor}`}>
            {footerContent}
          </div>
        </div>

        {/* Right Side Icon Bubble */}
        <div className={`p-3 rounded-xl ${styles.bubble}`}>
          <Icon className={`h-6 w-6 ${styles.icon}`} />
        </div>
      </div>

      {/* Optional: Decorative Blur for Dark Mode (matches your DashboardCard) */}
      {isDarkMode && (
        <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full blur-2xl opacity-10 ${styles.bubble.replace('/10', '/20')}`} />
      )}
    </div>
  );
}
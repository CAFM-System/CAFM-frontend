import React from "react";
import { useTheme } from "../../hooks/useTheme"; // 👈 ADDED

const variantStyles = {
  blue: {
    icon: "text-blue-500",
    bubble: "bg-blue-500/10",
    border: "border-l-blue-500",
  },
  purple: {
    icon: "text-violet-500",
    bubble: "bg-violet-500/10",
    border: "border-l-violet-500",
  },
  amber: {
    icon: "text-amber-500",
    bubble: "bg-amber-500/10",
    border: "border-l-amber-500",
  },
  green: {
    icon: "text-emerald-500",
    bubble: "bg-emerald-500/10",
    border: "border-l-emerald-500",
  },
};

export default function DashboardCard({ 
  title, 
  value, 
  icon: Icon, 
  variant = "blue", 
  onClick
  // 👆 REMOVED: isDarkMode prop
}) {
  // 👇 ADDED: Use theme hook
  const { isDarkMode } = useTheme();
  
  const styles = variantStyles[variant] || variantStyles.blue;

  const cardBg = isDarkMode 
    ? "bg-secondary shadow-lg border-primary/10" 
    : "bg-white shadow-sm border-gray-100 hover:shadow-md";

  const titleColor = isDarkMode ? "text-primary/60" : "text-gray-500";
  const valueColor = isDarkMode ? "text-primary" : "text-gray-800";

  return (
    <div
      onClick={onClick}
      className={`
        ${cardBg}
        relative overflow-hidden rounded-xl p-8 cursor-pointer transition-all duration-300 
        hover:-translate-y-1 border border-l-4 
        ${styles.border}
      `}
    >
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className={`text-sm font-medium ${titleColor}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${valueColor}`}>{value}</p>
        </div>

        <div className={`p-3 rounded-xl ${styles.bubble}`}>
          <Icon className={`h-6 w-6 ${styles.icon}`} />
        </div>
      </div>
      
      {isDarkMode && (
        <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full blur-2xl opacity-10 ${styles.bubble.replace('/10', '/20')}`} />
      )}
    </div>
  );
}
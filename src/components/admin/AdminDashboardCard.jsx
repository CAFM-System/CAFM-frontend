import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function DashboardCard({
  title,
  value,
  icon,
  description,
  onClick,
  accentColor = "bg-teal-600",
  iconBgColor = "bg-teal-50",
  iconColor = "text-teal-600",
}) {
  const { isDarkMode } = useTheme();

  // Extract color value for inline style
  const colorMatch = accentColor.match(/bg-(\w+)-(\d+)/);
  const colorName = colorMatch ? colorMatch[1] : "teal";
  const colorShade = colorMatch ? colorMatch[2] : "500";

  // Tailwind color mapping for inline styles
  const colorValues = {
    yellow: { 500: "#eab308" },
    blue: { 500: "#3b82f6" },
    green: { 500: "#22c55e" },
    red: { 500: "#ef4444" }
  };

  const borderColorValue = colorValues[colorName]?.[colorShade] || colorValues.teal[500];

  // Theme-aware card background
  const cardBg = isDarkMode
    ? "bg-secondary shadow-lg border-primary/10"
    : "bg-white shadow-sm border-gray-100 hover:shadow-md";

  const titleColor = isDarkMode ? "text-primary/60" : "text-slate-600";
  const valueColor = isDarkMode ? "text-primary" : "text-slate-900";
  const descColor = isDarkMode ? "text-primary/50" : "text-slate-500";

  return (
    <div
      onClick={onClick}
      style={{ borderLeftColor: borderColorValue }}
      className={`
        ${cardBg}
        relative overflow-hidden rounded-xl p-8 cursor-pointer transition-all duration-300 
        hover:-translate-y-1 border border-l-4
      `}
    >
      <div className="flex items-start justify-between relative z-10">
        {/* Left Side: Title & Value */}
        <div>
          <p className={`text-sm font-medium ${titleColor}`}>{title}</p>
          <p className={`text-3xl font-bold mt-2 ${valueColor}`}>{value}</p>
          {description && (
            <p className={`text-sm mt-1 ${descColor}`}>{description}</p>
          )}
        </div>

        {/* Right Side: Icon Bubble */}
        <div className={`p-3 rounded-xl ${iconBgColor}`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>

      {/* Subtle glow effect in dark mode */}
      {isDarkMode && (
        <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full blur-2xl opacity-10 ${iconBgColor}`} />
      )}
    </div>
  );
}
import React from "react";
import { useTheme } from "../../hooks/useTheme";

function ProfileCard({ heading, data, icon, showStatus = false }) {
  const { cardBg, text, subText, isDarkMode } = useTheme();
  return (
    <div className={`flex items-center justify-between p-3.5 rounded-xl border hover:shadow-md transition-shadow ${cardBg}`}>
      <div>
        <p className={`text-sm mb-1 font-medium ${subText}`}>{heading}</p>

        {/* Status (optional) */}
        {showStatus && (
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-3 h-3 rounded-full ${
                data === "Active"
                  ? "bg-green-500 shadow-lg shadow-green-200"
                  : "bg-gray-400"
              }`}
            />
            <span className={`text-sm ${subText}`}>{data}</span>
          </div>
        )}

        {/* Normal data */}
        {!showStatus && (
          <p className={`text-lg font-semibold ${text}`}>
            {data || "N/A"}
          </p>
        )}
      </div>

      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? "bg-accent/15" : "bg-blue-50"}`}>
        {icon}
      </div>
    </div>
  );
}

export default ProfileCard;

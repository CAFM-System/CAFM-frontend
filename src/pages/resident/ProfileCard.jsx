import React from "react";

function ProfileCard({ heading, data, icon, showStatus = false }) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium">{heading}</p>

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
            <span className="text-sm text-gray-600">{data}</span>
          </div>
        )}

        {/* Normal data */}
        {!showStatus && (
          <p className="text-lg font-semibold text-gray-800">
            {data || "N/A"}
          </p>
        )}
      </div>

      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

export default ProfileCard;

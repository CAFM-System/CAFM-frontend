import React from 'react';
import { Bell, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

export default function TechnicianNotification() {
  const navigate = useNavigate();
  // 1. Get theme colors
  const theme = useTheme();
  const { bg, cardBg, text, subText, border } = theme; // Destructuring for cleaner JSX
  return (
    <main className={`${bg} min-h-screen p-8`}>
      {/* PAGE TITLE */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className={`mb-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${border} ${subText} hover:border-accent hover:text-accent`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${text}`}>
          Notifications
        </h1>
        <p className={`text-sm mt-1 ${subText}`}>
          Stay updated with your latest notifications.
        </p>
      </div>

      {/* PLACEHOLDER CONTENT */}
      <div className={`rounded-2xl border p-10 flex flex-col items-center justify-center gap-4 ${cardBg} ${border}`}>
        <Bell className={`h-12 w-12 ${subText}`} />
        <p className={`text-lg font-medium ${text}`}>No notifications yet</p>
        <p className={`text-sm ${subText}`}>
          You&apos;ll see ticket updates and alerts here.
        </p>
      </div>
    </main>
  );
}
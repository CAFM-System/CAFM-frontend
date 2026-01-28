import React from 'react';
import { Bell, Info } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function TechnicianNotification() {
  // 1. Get theme colors
  const theme = useTheme();
  const { bg, text, subText } = theme; // Destructuring for cleaner JSX 
  return (
    <main className={`${bg} min-h-screen p-8`}>
      {/* PAGE TITLE */}
    
          Stay updated with your latest notifications.
      <div className="mb-8">
      </div>
    </main>
  );
}
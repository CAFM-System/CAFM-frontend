import React from "react";
import { Star, User, Calendar, MapPin } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme"; 

export function FeedbackCard({
  ticketId,
  ticketTitle,
  rating,
  feedback,
  customerName,
  location,
  date,
}) {
  const { isDarkMode } = useTheme();

  // --- THEME STYLING LOGIC ---
  const cardClasses = isDarkMode
    ? "bg-[#18181B] border-white/10 shadow-lg" 
    : "bg-white border-gray-100 shadow-sm hover:shadow-md";

  const textMain = isDarkMode ? "text-white" : "text-gray-900";
  const textMuted = isDarkMode ? "text-white/60" : "text-gray-500";
  const starEmpty = isDarkMode ? "text-gray-700" : "text-gray-200";

  return (
    <div className={`
      w-full rounded-lg p-6 transition-all duration-300 animate-fade-in border
      ${cardClasses}
    `}>
      
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`text-sm ${textMuted}`}>{ticketId}</span>
          <h3 className={`text-lg font-semibold ${textMain}`}>{ticketTitle}</h3>
        </div>
        
        {/* STAR RATING */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 transition-colors ${
                star <= rating
                  ? "fill-amber-400 text-amber-400"
                  : `fill-transparent ${starEmpty}`
              }`}
            />
          ))}
        </div>
      </div>

      {/* FEEDBACK TEXT */}
      <p className={`mb-4 italic ${textMain}`}>
        "{feedback}"
      </p>

      {/* FOOTER DETAILS */}
      <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm ${textMuted}`}>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{customerName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Calendar className="h-4 w-4" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>

    </div>
  );
}
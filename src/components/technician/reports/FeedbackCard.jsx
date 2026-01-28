import React from "react";
import { Star, User, Calendar, MapPin, FileText } from "lucide-react"; 
import { useTheme } from "../../../hooks/useTheme"; 

export function FeedbackCard({
  displayTicketId,//(TKT-XX)
  ticketTitle,
  complaint,       
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
  
  // Background for the complaint box to make it distinct
  const boxBg = isDarkMode ? "bg-white/5" : "bg-gray-50";

  return (
    <div className={`
      w-full rounded-lg p-6 transition-all duration-300 animate-fade-in border
      ${cardClasses}
    `}>
      
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between mb-4">
        <div>
          {/* Display the Ticket ID (e.g., TKT-123) */}
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
            {displayTicketId}
          </span>
          <h3 className={`text-lg font-semibold mt-2 ${textMain}`}>{ticketTitle}</h3>
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

      {/* NEW: COMPLAINT SECTION (Context for the review) */}
      {complaint && (
        <div className={`mb-4 p-3 rounded-md border ${isDarkMode ? 'border-white/5' : 'border-gray-100'} ${boxBg}`}>
          <div className={`flex items-center gap-2 mb-1 text-xs font-medium uppercase tracking-wider ${textMuted}`}>
             <FileText className="h-3 w-3" />
             <span>Reported Issue</span>
          </div>
          <p className={`text-sm ${textMain} line-clamp-2`}>
            {complaint}
          </p>
        </div>
      )}

      {/* FEEDBACK TEXT */}
      <div className="mb-4 pl-3 border-l-2 border-amber-400">
        <p className={`italic ${textMain}`}>
          "{feedback}"
        </p>
      </div>

      {/* FOOTER DETAILS */}
      <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm ${textMuted} pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="font-medium">{customerName}</span>
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
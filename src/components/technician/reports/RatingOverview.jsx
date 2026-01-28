import React from "react";
import { Star, TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";
import { ReportCard } from "./ReportCard"; 
import { useTheme } from "../../../hooks/useTheme";

export function RatingOverview({ averageRating, totalFeedbacks, positivePercentage }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* 1. Average Rating Card (Amber) */}
      <ReportCard
        title="Average Rating"
        value={averageRating.toFixed(1)}
        variant="amber"
        icon={Star}
        subValue="/ 5.0"
        footerContent={
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 transition-colors ${
                  star <= Math.round(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    // Empty Star: Dark gray in dark mode, Light gray in light mode
                    : isDarkMode ? "fill-transparent text-gray-700" : "fill-transparent text-gray-200"
                }`}
              />
            ))}
          </div>
        }
      />

      {/* 2. Total Feedbacks Card (Blue) */}
      <ReportCard
        title="Total Feedbacks"
        value={totalFeedbacks}
        variant="blue"
        icon={MessageSquare}
        footerContent="from completed tickets"
      />

      {/* 3. Positive Feedback Card (Emerald) */}
      <ReportCard
        title="Positive Feedback"
        value={`${positivePercentage}%`}
        variant="emerald"
        icon={ThumbsUp}
        subValue={<TrendingUp className="h-5 w-5 text-emerald-500" />}
        footerContent="4+ star ratings"
      />
      
    </div>
  );
}
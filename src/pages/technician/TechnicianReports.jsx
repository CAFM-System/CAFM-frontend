import React, { useEffect, useState } from 'react';
import { useTheme } from "../../hooks/useTheme"; 
import { Loader2, AlertCircle } from "lucide-react";

// 1. Import Components
import { RatingOverview } from '../../components/technician/reports/RatingOverview';
import { FeedbackCard } from '../../components/technician/reports/FeedbackCard'; 

// 2. Import Service
import ReviewService from '../../services/review.service';

export default function TechnicianReports() {
  const theme = useTheme();
  const { bg, text, subText } = theme; // Destructuring for cleaner JSX

  // --- STATE MANAGEMENT ---
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalFeedbacks: 0,
    positivePercentage: 0
  });

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await ReviewService.getMyReviews();
        const fetchedReviews = data.reviews || [];
        console.log(data)
        
        setReviews(fetchedReviews);
        calculateStats(fetchedReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // --- HELPER: CALCULATE STATS ---
  const calculateStats = (data) => {
    if (data.length === 0) return;

    const total = data.length;
    const sumRating = data.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    const avg = sumRating / total;

    // Assuming 4 and 5 stars are "positive"
    const positiveCount = data.filter(r => r.rating >= 4).length;
    const positivePct = Math.round((positiveCount / total) * 100);

    setStats({
      averageRating: parseFloat(avg.toFixed(1)), // Ensure it's a number like 4.3
      totalFeedbacks: total,
      positivePercentage: positivePct
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${bg} flex items-center justify-center`}>
        <Loader2 className={`h-10 w-10 animate-spin ${text}`} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${bg} flex items-center justify-center`}>
        <div className="text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
            <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg} font-sans`}>
      
      <main className="max-w-8xl mx-auto px-6 py-4">

        {/* PAGE TITLE */}
        <div className="mt-8 mb-8">
          <h1 className={`text-3xl font-bold ${text}`}>
            Technician Performance Reports
          </h1>
          <p className={`${subText} mt-1 text-sm`}>
            Your feedback and ratings from completed tickets
          </p>
        </div>

        {/* 1. OVERVIEW SECTION */}
        <div className="mb-10">
          <RatingOverview 
            averageRating={stats.averageRating} 
            totalFeedbacks={stats.totalFeedbacks} 
            positivePercentage={stats.positivePercentage} 
          />
        </div>

        {/* 2. FEEDBACK LIST SECTION */}
        <div className="mb-12">
          <h2 className={`text-xl font-bold mb-6 ${text}`}>
            Recent Feedback
          </h2>
          
          {reviews.length === 0 ? (
             <div className={`p-8 rounded-lg border border-dashed ${theme.isDarkMode ? 'border-gray-700' : 'border-gray-300'} text-center`}>
                <p className={`${subText}`}>No reviews received yet.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">

{reviews.map((item) => (
  <FeedbackCard 
      key={item.id} 
      
      // 1. Display ID (e.g. "TKT-123")
      // We use the joined 'tickets' object. If null, fallback to N/A.
      displayTicketId={item.tickets?.ticket_id || "N/A"}
      
      // 2. Ticket Title & Complaint
      ticketTitle={item.tickets?.title || "Unknown Ticket"} 
      complaint={item.tickets?.complaint || "No description provided"}
      
      // 3. Location
      location={item.tickets?.location || "N/A"}

      // 4. Dates 
      // 'item.created_at' is when the REVIEW was written
      // 'item.tickets.created_at' is when the TICKET was created
      reviewDate={item.created_at}
      ticketDate={item.tickets?.created_at}

      rating={item.rating}
      feedback={item.review}
      
      customerName={
          item.profiles?.first_name 
            ? `${item.profiles.first_name} ${item.profiles.last_name}` 
            : (item.tickets?.resident_name || "Resident")
      }
  />
))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
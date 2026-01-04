import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import ResidentService from "../../services/resident.service";
import toast from "react-hot-toast";

export function ResidentAction({ data, sendFeedback,ticketId,refresh, onClose }) {
    const [showRatings, setShowRatings] =  useState(null);
    const [showFeedback, setShowFeedback] = useState();
    const [reloadkey, setReloadKey] = useState(0);
    
    useEffect(() =>{
        const fetchRatingWithFeedback = async () => {
            try{
                const response = await ResidentService.getRatingWithFeedback(ticketId);
                console.log("Fetched rating and feedback:", response.data);
                setShowRatings(response.data.rating);
                setShowFeedback(response.data.review);
            } catch (error){
                console.error("Error fetching rating and feedback:", error);
            }
        }
        fetchRatingWithFeedback();
    }, [reloadkey, ticketId]);

    
    const handleCloseTicket = async () => {
        try {
            const payload = {
                message: data.closeComment
            };
            await ResidentService.closeTicket(ticketId, payload);
            toast.success("Ticket closed successfully.");
            onClose();
            refresh();
            
        } catch (error) {
            toast.error("Failed to close the ticket. Please try again.");
            console.error("Error closing ticket:", error);
        }
    }

    const handleReopenTicket = async () => {
        try {
            const payload = {
                message: data.reOpenComment
            };
            await ResidentService.reopenTicket(ticketId, payload);
            toast.success("Ticket reopened successfully.");
            onClose();
            refresh();
        } catch (error) {
            toast.error("Failed to reopen the ticket. Please try again.");
            console.error("Error reopening ticket:", error);
        }
    }
    return (
        <div className="space-y-6">

            {
                 showRatings !== null && showRatings !== undefined && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm mb-2">Your Feedback</h4>
                    <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-5 w-5 ${star <= showRatings ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                        ))}
                    </div>
                    {showFeedback && (
                        <p className="text-sm text-gray-600">{showFeedback}</p>
                    )}
                </div>
                )
            }

            {/* ⭐ Rating UI */}
            {data.canRate && data.showRatingTab && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border">
                    <h4 className="text-sm font-medium">Rate this service</h4>

                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => data.setRating(star)}
                                className="focus:outline-none"
                            >
                                <Star
                                    className={`h-8 w-8 cursor-pointer transition-all ${
                                        star <= data.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300 hover:text-yellow-300"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <textarea
                        placeholder="Additional feedback (optional)"
                        value={data.feedback}
                        onChange={(e) => data.setFeedback(e.target.value)}
                        rows={3}
                        className="
                            w-full rounded-lg border border-gray-300 
                            p-3 outline-none resize-none 
                            focus:ring-2 focus:ring-blue-500 bg-white
                        "
                    />

                    <div className="flex gap-3">
                        <button 
                            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                            onClick={async () => {
                                await sendFeedback();
                                setShowRatings(data.rating);
                                setShowFeedback(data.feedback);
                                data.setShowRatingTab(false);
                                setReloadKey(prev => prev + 1);
                            }}
                        >
                            Submit Rating
                        </button>

                        <button
                            onClick={() => data.setShowRatingTab(false)}
                            className="flex-1 border border-gray-400 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {data.status === "resolved" && !data.showRatingTab &&  (
                <div className="space-y-6">

                    {/* Rate Button */}
                    {showRatings === null &&
                    <button
                        onClick={() => data.setShowRatingTab(true)}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
                    >
                        Rate This Service
                    </button>}

                    {/* Close Ticket */}
                    <div className="space-y-3 bg-green-50 p-4 rounded-xl border border-green-200">
                        <h4 className="text-sm font-medium">Satisfied with the resolution?</h4>

                        <textarea
                            placeholder="Add a closing comment (optional)..."
                            value={data.closeComment}
                            onChange={(e) => data.setCloseComment(e.target.value)}
                            rows={2}
                            className="
                                w-full rounded-lg border border-gray-300 
                                p-3 outline-none resize-none 
                                focus:ring-2 focus:ring-green-500 bg-white
                            "
                        />

                        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium"
                            onClick={() => handleCloseTicket()}>
                            Close Ticket
                        </button>
                    </div>

                    {/* Reopen Ticket */}
                    <div className="space-y-3 p-4 rounded-xl border">
                        <h4 className="text-sm font-medium">Issue not resolved?</h4>

                        <textarea
                            placeholder="Please explain why you're reopening this ticket..."
                            value={data.reOpenComment}
                            onChange={(e) => data.setReopenComment(e.target.value)}
                            rows={2}
                            className="
                                w-full rounded-lg border border-gray-300 
                                p-3 outline-none resize-none 
                                focus:ring-2 focus:ring-black bg-white
                            "
                        />

                        <button className="w-full border text-black py-2 rounded-lg hover:bg-black hover:text-white font-medium"
                            onClick={() => handleReopenTicket()}>
                            Reopen Ticket
                        </button>
                    </div>

                </div>
            )}

            {/* ⭐ CLOSED VIEW — ONLY REOPEN */}
            {data.status === "closed" && !data.showRatingTab && (
                <div className="space-y-3 p-4 rounded-xl border bg-gray-50">
                    <h4 className="text-sm font-medium">Issue not resolved?</h4>

                    <textarea
                        placeholder="Please explain why you're reopening this ticket..."
                        value={data.reOpenComment}
                        onChange={(e) => data.setReopenComment(e.target.value)}
                        rows={2}
                        className="
                            w-full rounded-lg border border-gray-300 
                            p-3 outline-none resize-none 
                            focus:ring-2 focus:ring-black bg-white
                        "
                    />

                    <button className="w-full border text-black py-2 rounded-lg hover:bg-black hover:text-white font-medium"
                        onClick={() => handleReopenTicket()}>
                        Reopen Ticket
                    </button>
                </div>
            )}

        </div>
    );
}

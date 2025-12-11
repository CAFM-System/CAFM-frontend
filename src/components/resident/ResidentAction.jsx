import { Star } from "lucide-react";

export function ResidentAction({ data }) {
    return (
        <div className="space-y-6">

            {/* ⭐ Rating UI */}
            {data.canRate && data.showRating && (
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
                        <button className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                            Submit Rating
                        </button>

                        <button
                            onClick={() => data.setShowRating(false)}
                            className="flex-1 border border-gray-400 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {data.status === "resolved" && !data.showRating && (
                <div className="space-y-6">

                    {/* Rate Button */}
                    <button
                        onClick={() => data.setShowRating(true)}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
                    >
                        Rate This Service
                    </button>

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

                        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium">
                            Close Ticket
                        </button>
                    </div>

                    {/* Reopen Ticket */}
                    <div className="space-y-3 p-4 rounded-xl border">
                        <h4 className="text-sm font-medium">Issue not resolved?</h4>

                        <textarea
                            placeholder="Please explain why you're reopening this ticket..."
                            value={data.feedback}
                            onChange={(e) => data.setFeedback(e.target.value)}
                            rows={2}
                            className="
                                w-full rounded-lg border border-gray-300 
                                p-3 outline-none resize-none 
                                focus:ring-2 focus:ring-black bg-white
                            "
                        />

                        <button className="w-full border text-black py-2 rounded-lg hover:bg-black hover:text-white font-medium">
                            Reopen Ticket
                        </button>
                    </div>

                </div>
            )}

            {/* ⭐ CLOSED VIEW — ONLY REOPEN */}
            {data.status === "closed" && !data.showRating && (
                <div className="space-y-3 p-4 rounded-xl border bg-gray-50">
                    <h4 className="text-sm font-medium">Issue not resolved?</h4>

                    <textarea
                        placeholder="Please explain why you're reopening this ticket..."
                        value={data.feedback}
                        onChange={(e) => data.setFeedback(e.target.value)}
                        rows={2}
                        className="
                            w-full rounded-lg border border-gray-300 
                            p-3 outline-none resize-none 
                            focus:ring-2 focus:ring-black bg-white
                        "
                    />

                    <button className="w-full border text-black py-2 rounded-lg hover:bg-black hover:text-white font-medium">
                        Reopen Ticket
                    </button>
                </div>
            )}

        </div>
    );
}

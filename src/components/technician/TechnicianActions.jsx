import { useState } from "react";

const TechnicianActions = ({ status, changeStatus }) => {
    const [updateComment, setUpdateComment] = useState("");
    const [resolutionComment, setResolutionComment] = useState("");

    return (
        <div className="border-t pt-6 border-gray-300">
            {status !== 'in progress' ? (
                <>
                    <h2 className="font-semibold mb-4">Action Required</h2>
                    <div className="w-full flex gap-4 justify-center">
                        <button
                            className="px-6 py-3 w-1/2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            onClick={() => changeStatus('in progress', 'Accepted and started work')}
                        >
                            Accept & Start Work
                        </button>
                        <button className="px-6 py-3 w-1/2 border border-gray-400 rounded-lg hover:bg-black hover:text-white transition-colors">
                            Decline
                        </button>
                    </div>
                    <div className="w-full mt-4">
                        <textarea
                            value={updateComment}
                            onChange={(e) => setUpdateComment(e.target.value)}
                            placeholder="Add comment (required for decline)..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full">
                        <h2 className="font-semibold mb-4">Update Progress</h2>
                        <textarea
                            value={updateComment}
                            onChange={(e) => setUpdateComment(e.target.value)}
                            placeholder="Add progress update..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <button className="px-6 py-3 w-1/2 border border-gray-400 rounded-lg hover:bg-black hover:text-white transition-colors" onClick={() => changeStatus('in progress', updateComment)}>
                            Add progress Update
                        </button>
                    </div>
                    <div className="border-t mt-6 pt-6 border-gray-300">
                        <h2 className="font-semibold mb-2">Mark as Resolved</h2>
                        <textarea
                            value={resolutionComment}
                            onChange={(e) => setResolutionComment(e.target.value)}
                            placeholder="Add resolution comment..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <h2 className="font-semibold mt-4 mb-2">Add a list of additional spare parts if used</h2>
                        <textarea
                            placeholder="List spare parts..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <button className="px-6 py-3 w-full bg-black text-white rounded-lg hover:bg-gray-800 transition-colors" onClick={() => changeStatus('resolved', resolutionComment)}>
                            Mark as Resolved
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TechnicianActions;
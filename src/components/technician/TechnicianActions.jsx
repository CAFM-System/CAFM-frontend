import { useState } from "react";
import TechnicianService from "../../services/technician.service";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import mediaUpload from "../../../util/MediaUploader";

const TechnicianActions = ({ status, workStart , ticketData ,onClose , refresh}) => {
    const [updateComment, setUpdateComment] = useState("");
    const [resolutionComment, setResolutionComment] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [sparepartsUsed, setSparepartsUsed] = useState("");

    const handleresolveTicket = async () =>{
        const promises = [];
        for(let i=0;i<attachments.length;i++){
            promises[i] = mediaUpload(attachments[i]);
        }

        try {
            let urls = await Promise.all(promises);
            console.log("Uploaded URLs:", urls);
            const data = {
                message : resolutionComment,
                attachments: urls,
                sparepartsUsed: sparepartsUsed

            }

            await TechnicianService.resolveTickets(ticketData.id, data);
            toast.success("Ticket resolved successfully");
            onClose();
            refresh();
            
            
        } catch (error) {
            console.error("Error resolving ticket:", error);
            toast.error("Failed to resolve ticket. Please try again.");
            return;
        }
    }

    

    return (
        <div className="border-t pt-6 border-gray-300">
            {status === "assigned" ? (
                <>
                    <h2 className="font-semibold mb-4">Action Required</h2>
                    <div className="w-full flex gap-4 justify-center">
                        <button
                            className="px-6 py-3 w-1/2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            onClick={() => workStart()}
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
            ) : status === "in_progress" ? (
                <>
                    {/*Client ask to remove status update in in_progress */}
                    {/* <div className="w-full">
                        <h2 className="font-semibold mb-4">Update Progress</h2>
                        <textarea
                            value={updateComment}
                            onChange={(e) => setUpdateComment(e.target.value)}
                            placeholder="Add progress update..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <button className="px-6 py-3 w-1/2 border border-gray-400 rounded-lg hover:bg-black hover:text-white transition-colors" onClick={() => changeStatus('in_progress', updateComment)}>
                            Add progress Update
                        </button>
                    </div> */}
                    <div>
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
                            value={sparepartsUsed}
                            onChange={(e) => setSparepartsUsed(e.target.value)} 
                            placeholder="List spare parts..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <div className="space-y-1">
                            <label className="font-semibold mt-4 mb-2">
                            Attachments (Optional)
                            </label>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                            <input id="attachments" type="file" className="hidden" multiple onChange={(e)=>{setAttachments(e.target.files)}} />

                            <label htmlFor="attachments" className="cursor-pointer block">
                                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                                <p className="text-sm text-gray-600">
                                Click to upload images or videos
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG, MP4 up to 10MB
                                </p>
                            </label>
                            </div>
                        </div>

                        <button className="px-6 py-3 w-full bg-black text-white rounded-lg hover:bg-gray-800 transition-colors" onClick={() =>{ handleresolveTicket()}}>
                            Mark as Resolved
                        </button>
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </div>
    );
};

export default TechnicianActions;
import { useState, useEffect } from "react";
import TechnicianService from "../../services/technician.service";
import toast from "react-hot-toast";
import { Loader2, Upload } from "lucide-react";
import mediaUpload from "../../../util/MediaUploader";
import { useTheme } from "../../hooks/useTheme";

const TechnicianActions = ({ status, workStart, ticketData, onClose, refresh }) => {
    const { text, subText, inputBg, divider, buttonPrimary, buttonSecondary } = useTheme();

    const [updateComment, setUpdateComment] = useState("");
    const [resolutionComment, setResolutionComment] = useState("");
    const [attachments, setAttachments] = useState([]); // new files
    const [existingAttachments, setExistingAttachments] = useState([]); // urls from backend
    const [sparepartsUsed, setSparepartsUsed] = useState("");
    const [isStartingWork, setIsStartingWork] = useState(false);

    const handleStartWork = async () => {
        if (isStartingWork) return;
        setIsStartingWork(true);
        try {
            await workStart?.();
        } finally {
            setIsStartingWork(false);
        }
    };

    // fetch existing attachments
    useEffect(() => {

        const fetchAttachments = async () => {
            try {

                const data = await TechnicianService.getAttachments(ticketData.id);

                // flatten text[] from DB
                const urls = data.flatMap(a => a.file_urls);

                setExistingAttachments(urls);

            } catch (error) {
                console.error("Attachment fetch error:", error);
            }
        };

        if (ticketData?.id) {
            fetchAttachments();
        }

    }, [ticketData]);



    const handleresolveTicket = async () => {

        const promises = [];

        for (let i = 0; i < attachments.length; i++) {
            promises[i] = mediaUpload(attachments[i]);
        }

        try {

            let urls = await Promise.all(promises);

            const data = {
                message: resolutionComment,
                attachments: urls,
                sparepartsUsed: sparepartsUsed
            };

            await TechnicianService.resolveTickets(ticketData.id, data);

            toast.success("Ticket resolved successfully");

            onClose();
            refresh();

        } catch (error) {

            console.error("Error resolving ticket:", error);
            toast.error("Failed to resolve ticket");

        }
    };



    const handleFileChange = (e) => {

        const files = Array.from(e.target.files);

        setAttachments(files);

    };



    return (
        <div className={`border-t pt-6 ${divider}`}>

            {status === "assigned" ? (

                <>
                    <h2 className={`font-semibold mb-4 ${text}`}>Action Required</h2>

                    <div className="w-full flex gap-4 justify-center">

                        <button
                            type="button"
                            disabled={isStartingWork}
                            className={`px-6 py-3 w-full rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${buttonPrimary}`}
                            onClick={handleStartWork}
                        >
                            {isStartingWork ? (
                                <span className="inline-flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    Starting...
                                </span>
                            ) : (
                                "Accept & Start Work"
                            )}
                        </button>

                    </div>

                    <div className="w-full mt-4">

                        <textarea
                            value={updateComment}
                            onChange={(e) => setUpdateComment(e.target.value)}
                            placeholder="Add comment..."
                            className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent ${inputBg}`}
                            rows={3}
                        />

                    </div>

                </>

            ) : status === "in_progress" ? (

                <>

                    <h2 className={`font-semibold mb-2 ${text}`}>Mark as Resolved</h2>

                    <textarea
                        value={resolutionComment}
                        onChange={(e) => setResolutionComment(e.target.value)}
                        placeholder="Add resolution comment..."
                        className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent ${inputBg}`}
                        rows={3}
                    />

                    <h2 className={`font-semibold mt-4 mb-2 ${text}`}>
                        Add a list of additional spare parts if used
                    </h2>

                    <textarea
                        value={sparepartsUsed}
                        onChange={(e) => setSparepartsUsed(e.target.value)}
                        placeholder="List spare parts..."
                        className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent ${inputBg}`}
                        rows={3}
                    />



                    {/* Upload Box */}

                    <div className="space-y-1">

                        <label className={`font-semibold mt-4 mb-2 ${text}`}>
                            Attachments (Optional)
                        </label>

                        <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${divider} hover:border-accent`}>

                            <input
                                id="attachments"
                                type="file"
                                className="hidden"
                                multiple
                                onChange={handleFileChange}
                            />

                            <label htmlFor="attachments" className="cursor-pointer block">

                                <Upload className={`mx-auto h-10 w-10 mb-3 ${subText}`} />

                                <p className={`text-sm ${subText}`}>
                                    Click to upload images or videos
                                </p>

                                <p className={`text-xs mt-1 ${subText}`}>
                                    PNG, JPG, MP4 up to 10MB
                                </p>

                            </label>

                        </div>

                    </div>



                    {/* Existing Attachments */}

                    {existingAttachments.length > 0 && (

                        <div className="mt-6">

                            <h3 className={`font-semibold mb-2 ${text}`}>
                                Existing Attachments
                            </h3>

                            <div className="grid grid-cols-3 gap-3">

                                {existingAttachments.map((url, index) => {

                                    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);

                                    return (

                                        <div key={index} className={`border rounded-lg overflow-hidden ${divider}`}>

                                            {isVideo ? (

                                                <video
                                                    src={url}
                                                    controls
                                                    className="w-full h-28 object-cover"
                                                />

                                            ) : (

                                                <img
                                                    src={url}
                                                    alt="attachment"
                                                    className="w-full h-28 object-cover cursor-pointer"
                                                    onClick={() => window.open(url)}
                                                />

                                            )}

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    )}



                    {/* New File Preview */}

                    {attachments.length > 0 && (

                        <div className="mt-6">

                            <h3 className={`font-semibold mb-2 ${text}`}>
                                New Attachments
                            </h3>

                            <div className="grid grid-cols-3 gap-3">

                                {attachments.map((file, index) => {

                                    const preview = URL.createObjectURL(file);

                                    const isVideo = file.type.startsWith("video");

                                    return (

                                        <div key={index} className={`border rounded-lg overflow-hidden ${divider}`}>

                                            {isVideo ? (

                                                <video
                                                    src={preview}
                                                    className="w-full h-28 object-cover"
                                                    controls
                                                />

                                            ) : (

                                                <img
                                                    src={preview}
                                                    alt="preview"
                                                    className="w-full h-28 object-cover"
                                                />

                                            )}

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    )}



                    <button
                        className={`mt-6 px-6 py-3 w-full rounded-lg transition-colors ${buttonPrimary}`}
                        onClick={handleresolveTicket}
                    >
                        Mark as Resolved
                    </button>

                </>

            ) : null}

        </div>
    );
};

export default TechnicianActions;
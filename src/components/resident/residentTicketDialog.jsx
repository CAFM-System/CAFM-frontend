import { useEffect, useState } from 'react';
import { CircleAlert, Clock, MapPin, User, X, ChevronDown } from 'lucide-react';
import StatusHistory from '../common/StatusHistory';
import { ticketsUpdates } from '../../services/ticketUpdatesData';
import { ResidentAction } from './ResidentAction';
import { tickets } from '../../services/newTicketData';
import TicketService from '../../services/ticket.service';
import ResidentService from '../../services/resident.service';
import toast from 'react-hot-toast';
import { useTheme } from '../../hooks/useTheme';




export function ResidentTicketDialog(props){
    const { modalBg, text, subText, divider, isDarkMode } = useTheme();
    const [rating, setRating] = useState(0);
    const [showRatingTab, setShowRatingTab] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [closeComment, setCloseComment] = useState("");
    const [reOpenComment, setReopenComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [statusHistory, setStatusHistory] = useState([]);
    const data = props.data;
    const onClose = props.onClose;
    const updateData = ticketsUpdates
    const canRate = data.status === 'resolved' ;
    const canReopen = data.status === 'resolved' || data.status === 'closed';
    const canClose = data.status === 'resolved';
   
    const residentAction = {
        rating: rating,
        showRatingTab: showRatingTab,
        feedback: feedback,
        canRate: canRate,
        canReopen: canReopen,
        canClose: canClose,
        status: data.status,
        closeComment: closeComment,
        reOpenComment: reOpenComment,
        
        setCloseComment: setCloseComment,
        setReopenComment: setReopenComment,
        setFeedback: setFeedback,
        setShowRatingTab: setShowRatingTab,
        setRating: setRating,
    }
    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    useEffect(()=>{
        if(isLoading){
            TicketService.updateStatusHistory(`/${data.id}`).then(
                (response)=>{
                    console.log(response.data);
                    setStatusHistory(response.data);
                    setIsLoading(false);
                }
            )
        }
    },[isLoading])

    const handleRatingWithFeedback = async ()=>{
        try {
            await ResidentService.addRatingWithFeedback(data.id,{
                rating: rating,
                review: feedback
            })
            toast.success("Rating submitted successfully");
            setShowRatingTab(false);
            setIsLoading(true);
        } catch (error) {
            toast.error("Failed to submit rating");
            console.log("Error submitting rating:", error);
        }
    }

    
    return (
        <>
            <div
                className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-100"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={() => onClose?.()}
            >
                {/* stop clicks inside modal from closing */}
                <div onClick={(e) => e.stopPropagation()} className={`rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] border ${modalBg}`}>
                    {/* Header */}
                    <div className={`flex items-center justify-between p-6 border-b ${divider}`}>
                        <h2 className={`text-xl font-semibold ${text}`}>Ticket Details</h2>
                        <div className="flex items-center gap-2">

                            {/* status badge */}
                            {data.status === "open" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                                    {data.status}
                                </span>
                            ) : data.status === "assigned" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
                                    {data.status}
                                </span>
                            ) : data.status === "in_progress" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                                    {data.status}
                                </span>
                            ) : data.status === "resolved" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                                    {data.status}
                                </span>
                            ) : data.status === "closed" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                                    {data.status}
                                </span>
                            ) : null}


                            {/* priority badge */}
                            {data.priority === "urgent" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                                    {data.priority}
                                </span>
                            ) : data.priority === "high" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                                    {data.priority}
                                </span>
                            ) : data.priority === "medium" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                                    {data.priority}
                                </span>
                            ) : data.priority === "low" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                                    {data.priority}
                                </span>
                            ) : null}

                            <X className="cursor-pointer" onClick={onClose} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-6 overflow-y-scroll max-h-[75vh]">
                        <h3 className={`text-sm mb-2 ${subText}`}>{data.ticket_id}</h3>
                        <h2 className={`text-2xl font-semibold mb-3 ${text}`}>{data.title}</h2>
                        <p className={`mb-6 ${subText}`}>{data.complaint}</p>

                        <div className="grid grid-cols-2 gap-6 pb-3 mb-6">
                            <div>
                                <p className={`text-sm mb-2 ${subText}`}>Category</p>
                                <div className="flex items-center gap-2">
                                    <CircleAlert size={18} className={subText} />
                                    <span className={text}>{data.job_type}</span>
                                </div>
                            </div>

                            <div>
                                <p className={`text-sm mb-2 ${subText}`}>Location</p>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className={subText} />
                                    <span className={text}>{data.location}</span>
                                </div>
                            </div>
                            
                            
                            
                            <div>
                                <p className={`text-sm mb-2 ${subText}`}>Assigned To</p>
                                <div className="flex items-center gap-2">
                                    <User size={18} className={subText} />
                                    <span className={text}>{`${data.technicians.profiles.first_name} ${data.technicians.profiles.last_name}`}</span>
                                </div>
                            </div>
                            <div>
                                <p className={`text-sm mb-2 ${subText}`}>Created</p>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className={subText} />
                                    <span className={text}>{data.created_at}</span>
                                </div>
                            </div>
                        </div>

                        <div className={`border-t pt-6 ${divider}`}>
                            {
                                isLoading ? <p>Loading status history...</p> :
                                <StatusHistory data={statusHistory} refresh={() => setIsLoading(true)} />
                            }
                        </div>
                        <div className={`border-t pt-6 ${divider}`}>
                        <ResidentAction data={residentAction} sendFeedback={handleRatingWithFeedback} ticketId = {data.id} refresh={() => {setIsLoading(true);props.refresh();}} onClose={onClose} />
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};


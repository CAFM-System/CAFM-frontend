import { useEffect, useState } from 'react';
import { CircleAlert, Clock, MapPin, User, X } from 'lucide-react';
import StatusHistory from '../common/StatusHistory';
import TechnicianActions from './TechnicianActions';
import TicketService from '../../services/ticket.service';
import toast from 'react-hot-toast';
import TechnicianService from '../../services/technician.service';
import { useTheme } from '../../hooks/useTheme';

const TicketDetails = ({ data, onClose, refresh }) => {
    const { modalBg, text, subText, divider } = useTheme();
    const [updates, setUpdates] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    useEffect(() => {
        if (loadingHistory) {
            TicketService.updateStatusHistory(`/${data.id}`).then(
                (response) => {
                    console.log(response.data);
                    setUpdates(response.data);
                    setLoadingHistory(false);
                }
            ).catch(
                (error) => {
                    console.error("Error fetching status history:", error);
                    setLoadingHistory(false);
                }
            )
        }
    }, [loadingHistory])

    const handleStartWork = async () => {
        try {
            await TechnicianService.startWork(data.id);
            toast.success("Work started successfully");
            refresh();
            onClose();

        } catch (error) {
            toast.error("Failed to start work");
            console.log("Error starting work:", error);
        }
    }

    // changeStatus updates 
    /*const changeStatus = async (newStatus, description) => {
        //setStatus(newStatus);
        data.status = newStatus;
        const newUpdate = {
            status: newStatus,
            timestamp: new Date().toLocaleString(),
            message: description,
            author: data.complaintRecievdBy || 'Technician'
        };
        setUpdates((prev) => [...prev, newUpdate]);
    };*/

    return (
        <>
            <div
                className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={() => onClose?.()}
            >
                {/* stop clicks inside modal from closing */}
                <div onClick={(e) => e.stopPropagation()} className={`rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] border ${modalBg}`}>
                    {/* Header */}
                    <div className={`flex items-center justify-between p-6 border-b ${divider}`}>
                        <h2 className={`text-xl font-semibold ${text}`}>Ticket Management</h2>
                        <div className="flex items-center gap-2">

                            {/* status badge */}
                            {data.status === "open" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                                    Open
                                </span>
                            ) : data.status === "assigned" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
                                    Assigned
                                </span>
                            ) : data.status === "in_progress" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                                    In Progress
                                </span>
                            ) : data.status === "resolved" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                                    Resolved
                                </span>
                            ) : data.status === "closed" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                                    Closed
                                </span>
                            ) : null}


                            {/* priority badge */}
                            {data.priority === "urgent" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                                    Urgent
                                </span>
                            ) : data.priority === "high" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                                    High
                                </span>
                            ) : data.priority === "medium" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                                    Medium
                                </span>
                            ) : data.priority === "low" ? (
                                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                                    Low
                                </span>
                            ) : null}

                            <X className={`cursor-pointer ${text}`} onClick={onClose} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-6 overflow-y-scroll max-h-[75vh]">
                        <h3 className={`text-sm mb-2 ${subText}`}>{data.ticket_id}</h3>
                        <h2 className={`text-2xl font-semibold mb-3 ${text}`}>{data.title}</h2>
                        <p className={`mb-6 ${subText}`}>{data.complaintRequest}</p>

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
                                <p className={`text-sm mb-2 ${subText}`}>Resident</p>
                                <div className="flex items-center gap-2">
                                    <User size={18} className={subText} />
                                    <span className={text}>{data.resident_name}</span>
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

                        {/* Status History */}
                        <div className={`border-t pt-6 ${divider}`}>
                            <h2 className={`font-semibold mb-4 ${text}`}>Status History</h2>

                            <StatusHistory data={updates} refresh={() => setLoadingHistory(true)} />

                        </div>

                        {/* Techinician actions */}
                        <TechnicianActions status={data.status} workStart={handleStartWork} ticketData={data} refresh={() => { setLoadingHistory(true); refresh() }} onClose={onClose} />

                    </div>
                </div>
            </div >
        </>
    );
};

export default TicketDetails;
import { useEffect, useState } from 'react';
import { CircleAlert, Clock, MapPin, User, X } from 'lucide-react';
import StatusHistory from '../common/StatusHistory';
import AdminActions from './AdminActions';

const TicketDetails = ({ data, onClose }) => {
    const [activeTab, setActiveTab] = useState('actions');
    const [assignedTech, setAssignedTech] = useState(data.assignTo || '');
    const [selectedPriority, setSelectedPriority] = useState(data.priority || '');
    const [closingComment, setClosingComment] = useState('');

    const adminActions = {
        assignedTech: assignedTech,
        selectedPriority: selectedPriority,
        closingComment: closingComment,
        setAssignedTech: setAssignedTech,
        setSelectedPriority: setSelectedPriority,
        setClosingComment: setClosingComment,
    };

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    useEffect(() => {
        console.log({ assignedTech, selectedPriority, closingComment });
    }, [assignedTech, selectedPriority, closingComment]);

    return (
        <>
            <div
                className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={() => onClose?.()}
            >
                {/* stop clicks inside modal from closing */}
                <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-300">
                        <h2 className="text-xl font-semibold">Ticket Management</h2>
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

                            <X className="cursor-pointer" onClick={onClose} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-6 overflow-y-scroll max-h-[75vh]">
                        <h3 className="text-sm text-gray-500 mb-2">{data.ticketId}</h3>
                        <h2 className="text-2xl font-semibold mb-3">{data.title}</h2>
                        <p className="text-gray-600 mb-6">{data.complaintRequest}</p>

                        <div className="grid grid-cols-2 gap-6 pb-3 mb-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Category</p>
                                <div className="flex items-center gap-2">
                                    <CircleAlert size={18} className="text-gray-400" />
                                    <span className="text-gray-700">{data.jobType}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Location</p>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-gray-400" />
                                    <span className="text-gray-700">{data.location}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Resident</p>
                                <div className="flex items-center gap-2">
                                    <User size={18} className="text-gray-400" />
                                    <span className="text-gray-700">{data.name}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Created</p>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-gray-400" />
                                    <span className="text-gray-700">{data.createdDate}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6 border-gray-300">
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setActiveTab('actions')}
                                    className={`pb-2 px-1 font-semibold border-b-2 transition-colors ${activeTab === 'actions' ?
                                        'border-black text-black' :
                                        'border-transparent text-gray-400'
                                        }`}
                                >Admin Actions</button>

                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={`pb-2 px-1 font-semibold border-b-2 transition-colors ${activeTab === 'history' ?
                                        'border-black text-black' :
                                        'border-transparent text-gray-400'
                                        }`}
                                >Status History</button>
                            </div>

                            {/* Admin Actions Tab */}
                            {activeTab === 'actions' && (
                                <AdminActions data={adminActions} />
                            )}

                            {/* Status History Tab */}
                            {activeTab === 'history' && (
                                <StatusHistory data={data.ticket_updates} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketDetails;
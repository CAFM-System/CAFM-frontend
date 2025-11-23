import { ChevronDown } from "lucide-react";

const AdminActions = ({ data }) => {

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-3">Assign/Reassign Technician</h4>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <select
                                value={data.assignedTech}
                                onChange={(e) => data.setAssignedTech(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Select Technician</option>
                                <option value="Mike Wilson">Mike Wilson</option>
                                <option value="Emily Davis">Emily Davis</option>
                                <option value="John Smith">John Smith</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                            Assign
                        </button>
                    </div>

                    {/* Change Priority */}
                    <div>
                        <h4 className="font-semibold mb-3 mt-3">Change Priority</h4>
                        <div className="relative">
                            <select
                                value={data.selectedPriority}
                                onChange={(e) => data.setSelectedPriority(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Urgent</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>

                    {/* Close Ticket */}
                    <div>
                        <h4 className="font-semibold mb-3 mt-3">Close Ticket</h4>
                        <textarea
                            value={data.closingComment}
                            onChange={(e) => data.setClosingComment(e.target.value)}
                            placeholder="Add closing comment (optional)..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <button className="w-full mt-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                            Close Ticket
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AdminActions;
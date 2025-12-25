import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import UserSevervice from "../../services/user.service";



const AdminActions = ({ data , onAssign }) => {
    
    const [technicians, setTechnicians] = useState([]);
    const [loadingTechnicians, setLoadingTechnicians] = useState(true);

    

useEffect(()=>{
       const fetchTechnicians = async () => {
        try {
            setLoadingTechnicians(true);
            const response = await UserSevervice.getAllTechnicians();
            console.log("Fetched technicians:", response.data);
            setTechnicians(response.data  || []);
        } catch (error) {
            console.error("Error fetching technicians:", error);
        } finally {
            setLoadingTechnicians(false);
        }
       }
       fetchTechnicians();
    },[])

    
    const formattedTechnicians = technicians?.map(t => ({
        user_id: t.user_id,
        full_name: `${t.first_name} ${t.last_name}`
    })) || [];

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
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Technician</option>
                                {
                                    
                                    formattedTechnicians.map(tech => (
                                        
                                        <option key={tech.user_id} value={tech.user_id}>
                                            {tech.full_name}
                                        </option>
                                    ))
                                }
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            onClick={onAssign}>
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
                                <option value="">Select Priority</option>
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
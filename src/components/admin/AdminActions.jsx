import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import UserSevervice from "../../services/user.service";
import { useTheme } from "../../hooks/useTheme";



const AdminActions = ({ data , onAssign }) => {
    const { text, subText, inputBg, buttonPrimary } = useTheme();
    
    const [technicians, setTechnicians] = useState([]);
    const [loadingTechnicians, setLoadingTechnicians] = useState(true);

    

// useEffect(()=>{
//         console.log("JOB TYPE FROM TICKET:", data.jobType);
//         if(!data.jobType) return;
//        const fetchTechnicians = async () => {
//         try {
//             setLoadingTechnicians(true);
//             const response = await UserSevervice.getAllTechnicians(data.jobType);
//             console.log("Fetched technicians:", response.data);
//             setTechnicians(response.data  || []);
//         } catch (error) {
//             console.error("Error fetching technicians:", error);
//         } finally {
//             setLoadingTechnicians(false);
//         }
//        }
//        fetchTechnicians();
//     },[data.jobType]);

    
    // const formattedTechnicians = technicians?.map(t => ({
    //     user_id: t.user_id,
    //     full_name: `${t.first_name} ${t.last_name}`
    // })) || [];

    return (
        <>
            <div className="space-y-6">
                <div>
                    {/* <h4 className="font-semibold mb-3">Assign/Reassign Technician</h4> */}
                    <div className="flex items-center gap-3">
                        {/* <div className="relative flex-1">
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
                        </div> */}
                        
                        
                    </div>

                    {/* Change Priority */}
                    <div>
                        <h4 className={`font-semibold mb-3 mt-3 ${text}`}>Change Priority</h4>
                        <div className="relative">
                            <select
                                value={data.selectedPriority}
                                onChange={(e) => data.setSelectedPriority(e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent ${inputBg}`}
                            >
                                <option value="">Select Priority</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Urgent</option>
                            </select>
                            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${subText}`} size={20} />
                        </div>
                        <button className={`px-6 py-3 mt-4 w-full rounded-lg transition-colors ${buttonPrimary}`}
                            onClick={onAssign}>
                            Assign Priority
                        </button>
                    </div>

                
                    
                </div>
            </div>
        </>
    )
};

export default AdminActions;
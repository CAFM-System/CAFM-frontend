import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import AuthService from "../../services/auth.service";

export default function TopBanner({ openTicket }) {
  // State to hold resident info and active requests
  const [resident, setResident] = useState(null);
  const [activeRequests, setActiveRequests] = useState([]);

  // Simulate fetching data from a "database" with useEffect
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        
        const response = await AuthService.getuser();
        setResident(response.data.user);
        
        const requestsData = [
          { id: 1, title: "AC not working" },
          { id: 2, title: "Leaky faucet" },
        ];

        
        await new Promise((resolve) => setTimeout(resolve, 500));

       
        setActiveRequests(requestsData);
      } catch (error) {
        console.error("Error fetching resident data:", error);
      }
      
    };

    fetchData();
  }, []);
  if (!resident) {
    return (
      <div className="relative overflow-hidden rounded-3xl mb-10">
        <div className="p-10 text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f6f8a] via-[#1687A7] to-[#1fa3c4]"></div>

      <div className="relative p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-purple-100 text-sm">Welcome back</span>
            </div>

            <h2 className="text-4xl text-white">
              Hello, {`${resident.profile.firstName} ${resident.profile.lastName}`}! 👋
            </h2>
            <p className="text-purple-100 text-lg max-w-xl mt-2">
              You have {activeRequests.length} active maintenance request
              {activeRequests.length !== 1 ? "s" : ""}.
            </p>
          </div>

          {/* Create Request Button */}
          <button
            className="bg-white text-gray-900 rounded-lg px-6 py-3 shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
            onClick={() => openTicket(true)}
          >
            + Create Request
          </button>
        </div>
      </div>
    </div>
  );
}

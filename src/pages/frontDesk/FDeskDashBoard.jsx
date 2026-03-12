import React, { useEffect, useState } from "react";
import { Calendar, ShieldCheck, ScanLine, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme"; 
import FrontDeskHeader from "../../components/frontDesk/FrontDeskHeader"; 
import VisitorRegForm from "./VisitorRegForm"; 
import VisitorStats  from "../../components/frontDesk/VisitorStats";
import QuickActions  from "../../components/frontDesk/QuickActions";
import VisitorList  from "../../components/frontDesk/VisitorList";
import visitorService from "../../services/visitor.service";
import toast from "react-hot-toast";

export default function FDeskDashBoard() {
  const { isDarkMode } = useTheme();
  
  // --- STATE ---
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState("register");
  
  // Default to "today"
  const [activeTab, setActiveTab] = useState("today"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [userName] = useState("Officer Kamal"); 
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTodayStr = () => {
  const today = new Date();
  return (
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0")
  );
};

  const formatDate = (date) => {
  if (!date) return null;

  return date.split("T")[0];
};


  const todayStr = getTodayStr();

  
  const fetchVisitors = async () => {
    try {
      setLoading(true);

      const response = await visitorService.getVisitorInfo();
      console.log(response.data[10])
      setVisitors(response.data);
      console.log("check visitors variable:", visitors);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVisitors();
  }, []);

  const isTodayVisitor = (v) => {

    if (!v.validFrom && !v.date) return false;

    const today = new Date();
    today.setHours(0,0,0,0);

    const start = new Date(v.validFrom || v.date);
    start.setHours(0,0,0,0);

    if (!v.validUntil) {
      return start.getTime() === today.getTime();
    }

    const end = new Date(v.validUntil);
    end.setHours(23,59,59,999);

    return today >= start && today <= end;
};

  // --- FILTERING LOGIC ---



const filteredVisitors = visitors.filter((visitor) => {

  if (activeTab === "today") {
    return isTodayVisitor(visitor);
  }

  if (activeTab === "pre_reg") {
    return visitor.isPreRegistered === true;
  }

  if (activeTab === "on_site") {
    return visitor.isPreRegistered === false;
  }

  return true;
});

const todayCount = visitors.filter(v => isTodayVisitor(v)).length;

const preRegCount = visitors.filter(v => {
  return v.isPreRegistered && isTodayVisitor(v);
}).length;

  const stats = {
    today: todayCount,
    preRegistered: preRegCount,
    onSite: todayCount - preRegCount, 
    total: visitors.length,
  };

  console.log("Stats:", stats);

  // --- HANDLERS ---
  const handleRegisterClick = () => { setActiveAction("register"); setIsRegModalOpen(true); };
  const handleScanClick = () => { setActiveAction("scan"); setIsQrModalOpen(true); };

  const handleNewVisitor = async (formData) => {
    try {
      const newEntry = {
       resident_id: formData.residentId,   

        visitor_name: formData.fullName,
        nic: formData.idNumber,
        phone: formData.phone,
        email: formData.email || null,

        vehicle_number: formData.vehicleNumber || null,
        others_count: formData.numberOfOthers || 0,

    };
    await visitorService.onsiteRegisterVisitor(newEntry);
    await fetchVisitors(); 


    setIsRegModalOpen(false);
    setActiveTab("on_site"); // Switch to On-Site tab to show the new entry
    toast.success("Visitor registered successfully!");
    } catch (error) {
      console.error("Error registering visitor:", error);
      toast.error("Failed to register visitor. Please try again.");
    }
    
  };

  const handleCheckIn = (id) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVisitors(visitors.map(v => v.id === id ? { ...v, entryTime: currentTime } : v));
  };

  const handleCheckOut = (id) => console.log("Check out:", id);

  const mainBg = isDarkMode 
    ? "bg-[#18181B] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#18181B] to-[#18181B]" 
    : "bg-[#F9F6EB]";

  return (
    <div className={`min-h-screen transition-all duration-300 font-sans ${mainBg}`}>
      
      <FrontDeskHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 1. WELCOME SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 border ${isDarkMode ? "bg-zinc-800/50 border-[#EAB308]/20 text-[#EAB308]" : "bg-white border-[#EAB308]/30 text-amber-700"}`}>
               <ShieldCheck size={14} /> Security Dashboard
            </div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-[#18181B]"}`}>
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EAB308] to-orange-500">{userName}</span>
            </h1>
            <p className={`mt-2 text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Monitor gate activity and manage visitor flow.
            </p>
          </div>

          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl shadow-sm border backdrop-blur-md transition-all
            ${isDarkMode ? "bg-zinc-900/50 border-white/5 text-gray-200" : "bg-white/80 border-[#EAB308]/20 text-[#18181B]"}`}>
            <div className={`p-1.5 rounded-lg ${isDarkMode ? "bg-[#EAB308]/10 text-[#EAB308]" : "bg-[#F9F6EB] text-amber-600"}`}>
              <Calendar className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">
               {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* 2. VISITOR STATS */}
        <VisitorStats 
          stats={stats} 
          isDarkMode={isDarkMode} 
        />

        {/* 3. QUICK ACTIONS */}
        <QuickActions 
          onRegisterClick={handleRegisterClick} 
          onScanClick={handleScanClick}
          activeAction={activeAction}
          isDarkMode={isDarkMode}
        />

        {/* 4. VISITOR LIST */}
        <VisitorList 
          visitors={filteredVisitors}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          stats={stats}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          isDarkMode={isDarkMode}
        />

      </main>

      {/* --- MODALS --- */}
      
      {/* Registration Modal */}
      {isRegModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsRegModalOpen(false)}></div>
          <div className={`relative z-10 w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl animate-in fade-in zoom-in duration-300 shadow-2xl border 
            ${isDarkMode ? "border-white/10 bg-[#18181B]" : "bg-[#F9F6EB] border-[#EAB308]/20"}`}>
             <button onClick={() => setIsRegModalOpen(false)} className={`absolute top-5 right-5 z-50 p-2 rounded-full transition-colors ${isDarkMode ? "bg-zinc-800 text-white hover:bg-zinc-700" : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"}`}>
               <X size={18} />
             </button>
             <VisitorRegForm onCancel={() => setIsRegModalOpen(false)} onAddVisitor={handleNewVisitor} />
          </div>
        </div>
      )}

      {/* QR Scan Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={() => setIsQrModalOpen(false)}></div>
          <div className={`relative z-10 w-full max-w-md p-8 rounded-3xl animate-in fade-in zoom-in duration-300 shadow-2xl text-center border
             ${isDarkMode ? "bg-[#18181B] border-white/10" : "bg-white border-[#EAB308]/20"}`}>
             <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 
                ${isDarkMode ? "bg-zinc-800 text-[#EAB308]" : "bg-[#F9F6EB] text-amber-600"}`}>
                <ScanLine size={40} className="animate-pulse" />
             </div>
             <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-[#18181B]"}`}>
               Scan QR Code
             </h2>
             <p className={`text-sm mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
               Please use your handheld device or phone to scan the visitor's pass to verify entry.
             </p>
             <button onClick={() => setIsQrModalOpen(false)} className={`w-full py-3 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${isDarkMode ? "bg-[#EAB308] text-black hover:bg-amber-400" : "bg-[#18181B] text-white hover:bg-zinc-800"}`}>
               Close Scanner
             </button>
          </div>
        </div>
      )}

    </div>
  );
}
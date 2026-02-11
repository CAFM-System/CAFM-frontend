import React, { useState } from "react";
import { Calendar, ShieldCheck, ScanLine, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme"; 
import FrontDeskHeader from "../../components/frontDesk/FrontDeskHeader"; 
import VisitorRegForm from "./VisitorRegForm"; 
import VisitorStats  from "../../components/frontDesk/VisitorStats";
import QuickActions  from "../../components/frontDesk/QuickActions";
import VisitorList  from "../../components/frontDesk/VisitorList";

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

  const getTodayStr = () => new Date().toISOString().split('T')[0];

  // --- MOCK DATA ---
  const [visitors, setVisitors] = useState([
    { 
      id: 1, 
      name: "Kasun Perera", 
      nic: "199856789V", 
      phone: "0771234567",
      email: "kasun@gmail.com",
      visitorType: "normal", 
      isPreRegistered: false, // On-Site
      date: getTodayStr(), 
      entryTime: "08:30 AM", 
      hostName: "Mr. Amal Silva",
      hostApartment: "102",
      hostPhone: "0711112222",
      vehicleNumber: "CAD-8899",
      othersCount: 0,
    },
    { 
      id: 2, 
      name: "Saman Kumara", 
      nic: "198545612V", 
      phone: "0718889999",
      email: "saman.k@company.lk",
      visitorType: "regular", 
      isPreRegistered: true, // Pre-Reg
      date: getTodayStr(), 
      fromDate: "2026-01-01",
      toDate: "2026-03-31",
      entryTime: "07:15 AM", 
      hostName: "Facility Mgr",
      hostApartment: "Office",
      hostPhone: "0112345678",
      vehicleNumber: "NB-1234",
      othersCount: 2,
    },
    { 
      id: 3, 
      name: "Sarah De Alwis", 
      nic: "200045612V", 
      phone: "0701112223",
      email: null,
      visitorType: "normal", 
      isPreRegistered: true, // Pre-Reg
      date: getTodayStr(), 
      entryTime: null, // Pending Arrival
      hostName: "Ms. Perera",
      hostApartment: "305",
      hostPhone: "0777778888",
      vehicleNumber: null,
      othersCount: 1,
    },
  ]);

  // --- FILTERING LOGIC ---
  const filteredVisitors = visitors
    .filter((visitor) => {
      // 1. Filter by Tab
      if (activeTab === "today") {
        if (visitor.date !== getTodayStr()) return false;
      }
      else if (activeTab === "pre_reg") {
        // Must be Pre-Registered AND Today
        if (!visitor.isPreRegistered || visitor.date !== getTodayStr()) return false;
      }
      else if (activeTab === "on_site") {
        // Must be On-Site (Not Pre-Reg) AND Today
        if (visitor.isPreRegistered || visitor.date !== getTodayStr()) return false;
      }
      
      // 2. Search Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          visitor.name.toLowerCase().includes(q) || 
          visitor.nic.toLowerCase().includes(q) ||
          (visitor.vehicleNumber && visitor.vehicleNumber.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => b.id - a.id);

  // --- STATS CALCULATION ---
  const todayCount = visitors.filter(v => v.date === getTodayStr()).length;
  const preRegCount = visitors.filter(v => v.isPreRegistered && v.date === getTodayStr()).length;

  const stats = {
    today: todayCount,
    preRegistered: preRegCount,
    onSite: todayCount - preRegCount, 
    total: visitors.length,
  };

  // --- HANDLERS ---
  const handleRegisterClick = () => { setActiveAction("register"); setIsRegModalOpen(true); };
  const handleScanClick = () => { setActiveAction("scan"); setIsQrModalOpen(true); };

  const handleNewVisitor = (formData) => {
    const newEntry = {
      id: Date.now(),
      name: formData.fullName,
      nic: formData.idNumber || "N/A",
      phone: formData.phoneNumber || "",
      email: formData.email || null,
      visitorType: formData.visitorType || "normal",
      isPreRegistered: false, // Walk-in is always On-Site
      date: getTodayStr(),
      entryTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hostName: formData.residentName || "Unknown Host",
      hostApartment: formData.apartmentNo || "General",
      hostPhone: "N/A",
      vehicleNumber: formData.vehicleNumber || null,
      othersCount: formData.othersCount || 0,
    };
    setVisitors([newEntry, ...visitors]);
    setIsRegModalOpen(false);
    setActiveTab("on_site"); // Switch to On-Site tab to show the new entry
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
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, UserPlus, ArrowRight, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import ResidentSideVisitorForm from "../../components/resident/VisitorMainForm";
import VisitorStats from "../../components/frontDesk/VisitorStats"; 
import VisitorListForResident from "../../components/resident/VisitorListForResident";
import visitorService from '../../services/visitor.service';

export default function VisitorPage() {
  const { text, cardBg, subText, border, isDarkMode } = useTheme();
  
  // --- UI STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);

  //const getTodayStr = () => new Date().toISOString().split('T')[0];
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

  const getDateOnly = (date) => date?.split("T")[0];

  

  
  const fetchVisitors = async () => {
    try {
      setLoading(true);

      const response = await visitorService.getVisitorInfoByResidentId();
      setVisitors(response.data);
      
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  fetchVisitors();
}, []);


  // --- FILTERING LOGIC ---
  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch = (v.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (v.idNumber || "").toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "today") {
      const visitorDate = getDateOnly(v.visitDate);
      return matchesSearch && visitorDate === getTodayStr();
    }
    return matchesSearch;
  }).sort((a, b) => {
  const dateA = a.visitDate ? new Date(a.visitDate) : 0;
  const dateB = b.visitDate ? new Date(b.visitDate) : 0;
  return dateB - dateA;
});

  console.log("Today:", getTodayStr());
  visitors.forEach(v => console.log("Visitor Date:", v.visitDate));
  visitors.forEach(v => console.log("Is Pre-Registered:", v.isPreRegistered));
  
  const stats = {
    today: visitors.filter(v => {
      const visitorDate = getDateOnly(v.visitDate);
      return visitorDate === getTodayStr();
    }).length,

    onSite: visitors.filter(v => {
      const visitorDate = getDateOnly(v.visitDate);
      return visitorDate === getTodayStr() && !v.isPreRegistered;
    }).length,

    preRegistered: visitors.filter(v => {
      const visitorDate = getDateOnly(v.visitDate);
      return visitorDate === getTodayStr() && v.isPreRegistered;
    }).length,

    total: visitors.length
  };
  console.log("Stats:", stats);

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  // Custom Background Color logic
  const mainBgColor = isDarkMode ? "bg-[#18181B]" : "bg-[#F9F6EB]";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${mainBgColor} ${text} p-4 md:p-10 relative`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Visitor Management</h1>
            <p className={`${subText} mt-2 text-lg`}>Monitor guest arrivals and manage active invitations.</p>
          </div>
          
          <div className={`flex items-center gap-4 px-6 py-4 rounded-3xl border shadow-sm ${border} ${cardBg}`}>
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-accent/10 text-accent">
              <CalendarIcon size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-bold tracking-widest text-accent">{dayName}</span>
              <span className={`text-lg font-bold leading-tight ${text}`}>{dateStr}</span>
            </div>
          </div>
        </div>

        {/* 1. Statistics Section */}
        <VisitorStats stats={stats} isDarkMode={isDarkMode} />

        {/* 2. Action & List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <VisitorListForResident 
              visitors={filteredVisitors}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              stats={stats}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="lg:col-span-4 sticky top-28">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative w-full p-1 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group bg-gradient-to-br from-[#EAB308] to-orange-500 shadow-lg shadow-orange-500/20"
            >
              <div className={`relative h-full px-6 py-8 rounded-[14px] flex flex-col items-center text-center gap-4 ${isDarkMode ? "bg-[#18181B]" : "bg-white"}`}>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#EAB308] to-orange-500 text-white shadow-md">
                  <UserPlus size={32} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#18181B]"}`}>Invite New Visitor</h3>
                  <p className={`text-sm mt-1 opacity-80 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Generate a new digital entry pass</p>
                </div>
                <div className="flex items-center gap-2 text-orange-500 font-bold text-sm mt-2">
                  Launch Form <ArrowRight size={18} />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 3. Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div 
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-6 md:p-10 border shadow-2xl animate-in zoom-in-95 duration-300 ${cardBg} ${border}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-500/10 transition-colors"
              >
                <X size={24} className={text} />
              </button>
              <ResidentSideVisitorForm onCancel={() => setIsModalOpen(false)} onSuccess={fetchVisitors} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
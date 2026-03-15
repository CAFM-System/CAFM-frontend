import React, { useState } from "react";
import { Search, Users, History, CalendarClock } from "lucide-react";
import { VisitorRecordForResident } from "./VisitorRecordForResident";
import { useTheme } from "../../hooks/useTheme";

export default function VisitorListForResident({ 
  visitors, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  stats,
  onDelete,
  onEdit
}) {
  const { isDarkMode } = useTheme();
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);

  const handleSelect = (id) => {
    setSelectedVisitorId(prevId => (prevId === id ? null : id));
  };

  // --- SORTING LOGIC ---
  // This sorts the visitors so the most recent dates appear at the top.
  const sortedVisitors = [...visitors].sort((a, b) => {
    const dateA = new Date(a.visitDate || a.date || a.dateFrom);
    const dateB = new Date(b.visitDate || b.date || b.dateFrom);
    return dateB - dateA; // Descending order (Newest first)
  });

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- Header: Tabs & Search --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Resident Tabs */}
        <div className={`inline-flex p-1.5 rounded-xl transition-colors border shadow-sm
          ${isDarkMode 
            ? "bg-zinc-900 border-white/10" 
            : "bg-white border-gray-200"
          }`}
        >
          <TabButton 
            label="today" 
            display="Today's Visitors" 
            icon={Users}
            count={stats.today} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode}
          />
          <TabButton 
            label="upcoming" 
            display="Upcoming Visitors" 
            icon={CalendarClock}
            count={visitors.filter(v => {
              const today = new Date().toISOString().split("T")[0];
              const visitorDate = (v.visitDate || "").split("T")[0];
              return visitorDate > today;
            }).length}
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode}
          />
          <TabButton 
            label="all" 
            display="Invitation History" 
            icon={History}
            count={stats.total || visitors.length} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode}
          />
          
        </div>

        {/* Search Bar */}
        <div className="relative group w-full md:w-80">
          <div className="absolute -inset-0.5 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur bg-gradient-to-r from-[#EAB308]/50 to-orange-500/50"></div>
          
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors 
              ${isDarkMode ? "text-gray-500 group-focus-within:text-[#EAB308]" : "text-gray-400 group-focus-within:text-[#EAB308]"}`} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guests by name..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all
                ${isDarkMode 
                  ? "bg-[#18181B] border-white/10 text-white placeholder-gray-600 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" 
                  : "bg-white border-gray-200 text-zinc-900 placeholder-gray-400 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]"
                }`}
            />
          </div>
        </div>
      </div>

      {/* --- Content: Resident's Visitor List --- */}
      <div className="transition-all duration-300">
        {sortedVisitors.length === 0 ? (
          
          <div className={`flex flex-col items-center justify-center py-20 text-center rounded-3xl border 
            ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-gray-100"}`}>
            <div className={`p-4 rounded-full mb-4 ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
              <Users className={`h-8 w-8 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
            </div>
            <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-zinc-600"}`}>
              No visitors found.
            </p>
          </div>
        
        ) : (
          
          <div className="space-y-4">
            {/* Map over sortedVisitors instead of visitors */}
            {sortedVisitors.map((visitor) => (
              <div key={visitor.id} className="relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
                <VisitorRecordForResident 
                  visitor={visitor}
                  isSelected={selectedVisitorId === visitor.id}
                  onSelect={() => handleSelect(visitor.id)}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// TabButton sub-component remains the same
function TabButton({ label, display, icon: Icon, activeTab, setActiveTab, count, isDarkMode }) {
  const isActive = activeTab === label;
  return (
    <button
      onClick={() => setActiveTab(label)}
      className={`
        relative px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 z-10 flex items-center gap-2
        ${isActive 
          ? (isDarkMode 
              ? "bg-[#EAB308] text-black shadow-lg shadow-yellow-500/20" 
              : "bg-zinc-900 text-white shadow-md") 
          : (isDarkMode 
              ? "text-gray-400 hover:text-white hover:bg-white/5" 
              : "text-gray-500 hover:text-zinc-900 hover:bg-gray-50") 
        }
      `}
    >
      <Icon size={16} className={isActive ? "" : "opacity-60"} />
      <span>{display}</span>
      {count >= 0 && (
        <span className={`
          text-[10px] px-2 py-0.5 rounded-full font-black
          ${isActive 
            ? (isDarkMode ? "bg-black/20" : "bg-white/20")
            : (isDarkMode ? "bg-white/10 text-gray-400" : "bg-gray-200 text-gray-500")
          }
        `}>
          {count}
        </span>
      )}
    </button>
  );
}
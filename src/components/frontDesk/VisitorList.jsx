import React, { useState } from "react";
import { Search } from "lucide-react";
import { VisitorRecord } from "./VisitorRecord";

export default function VisitorList({ 
  visitors, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  stats, 
  onCheckIn,
  onCheckOut,
  isDarkMode 
}) {
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);

  const handleSelect = (id) => {
    setSelectedVisitorId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- Header: Tabs & Search --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Tabs Container */}
        <div className={`inline-flex p-1.5 rounded-xl transition-colors border shadow-sm
          ${isDarkMode 
            ? "bg-zinc-900 border-white/10" 
            : "bg-white border-gray-200"
          }`}
        >
          {/* TAB 1: Today */}
          <TabButton 
            label="today" 
            display="Today's Visitors" 
            count={stats.today} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode}
          />
          
          {/* TAB 2: On-Site (NEW) */}
          <TabButton 
            label="on_site" 
            display="On-Site" 
            count={stats.onSite} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode}
          />

          {/* TAB 3: Pre-Reg */}
          <TabButton 
            label="pre_reg" 
            display="Pre-Registered" 
            count={stats.preRegistered} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Search Bar */}
        <div className="relative group w-full md:w-80">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur bg-gradient-to-r from-[#EAB308]/50 to-orange-500/50"></div>
          
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors 
              ${isDarkMode ? "text-gray-500 group-focus-within:text-[#EAB308]" : "text-gray-400 group-focus-within:text-[#EAB308]"}`} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, NIC..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all
                ${isDarkMode 
                  ? "bg-[#18181B] border-white/10 text-white placeholder-gray-600 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]" 
                  : "bg-white border-gray-200 text-zinc-900 placeholder-gray-400 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]"
                }`}
            />
          </div>
        </div>
      </div>

      {/* --- Content: Visitor List --- */}
      <div className="transition-all duration-300">
        {visitors.length === 0 ? (
          
          // Empty State
          <div className={`flex flex-col items-center justify-center py-24 text-center rounded-3xl border 
            ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-gray-100"}`}>
            <div className={`p-4 rounded-full mb-4 ${isDarkMode ? "bg-white/5" : "bg-gray-50"}`}>
              <Search className={`h-8 w-8 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
            </div>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              No visitors found matching "{searchQuery}" in this tab.
            </p>
          </div>
        
        ) : (
          
          // Visitor Records List
          <div className="space-y-3">
            {visitors.map((visitor) => (
              <div key={visitor.id} className="relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
                <VisitorRecord 
                  visitor={visitor}
                  isSelected={selectedVisitorId === visitor.id}
                  onSelect={() => handleSelect(visitor.id)}
                  onCheckIn={() => onCheckIn(visitor.id)}
                  isDarkMode={isDarkMode} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Tab Button Sub-component (Unchanged) ---
function TabButton({ label, display, activeTab, setActiveTab, count, isDarkMode }) {
  const isActive = activeTab === label;
  
  return (
    <button
      onClick={() => setActiveTab(label)}
      className={`
        relative px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 z-10
        ${isActive 
          ? (isDarkMode 
              ? "bg-[#EAB308] text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]" // Dark Mode Active
              : "bg-zinc-900 text-white shadow-md") // Light Mode Active
          : (isDarkMode 
              ? "text-gray-400 hover:text-white hover:bg-white/10" // Dark Mode Inactive
              : "text-gray-500 hover:text-zinc-900 hover:bg-gray-100") // Light Mode Inactive
        }
      `}
    >
      <span className="flex items-center gap-2">
        {display}
        {count > 0 && (
          <span className={`
            text-[10px] px-1.5 py-0.5 rounded-full transition-colors
            ${isActive 
              ? (isDarkMode ? "bg-black/10" : "bg-white/20")
              : (isDarkMode ? "bg-white/10 text-gray-300" : "bg-gray-200 text-gray-600")
            }
          `}>
            {count}
          </span>
        )}
      </span>
    </button>
  );
}
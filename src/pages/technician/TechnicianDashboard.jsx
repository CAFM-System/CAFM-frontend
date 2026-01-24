import { useEffect, useState } from "react";
import TechnicianHeader from "../../components/technician/TechnicianHeader";
import DashboardCard from "../../components/technician/TechDashBoardCard"; 
import TicketCard from "../../components/common/ticketCard"; 
import TicketDetails from "../../components/technician/TicketDetails";

import {
  ClipboardList,
  AlertCircle,
  Clock4,
  CheckCircle,
  Filter,
  Calendar,
  ChevronDown,
  X
} from "lucide-react";

import TicketService from "../../services/ticket.service";
import { useTheme } from "../../hooks/useTheme"; // 👈 ADDED

/**
 * TechnicianDashboard
 * * Handles the main layout, data fetching, and THEME STATE.
 * * Toggles between:
 * - Light Mode: bg-primary (Cream)
 * - Dark Mode: bg-secondary (Dark Teal)
 */
export function TechnicianDashboard() {
  // ============================================================================
  // 1. STATE MANAGEMENT
  // ============================================================================
  
  // 👇 CHANGED: Use theme hook instead of local state
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = theme;

  const [activeTab, setActiveTab] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const userName = "John"; 

  // ============================================================================
  // 2. HELPER FUNCTIONS
  // ============================================================================

  useEffect(() => {
    if (isLoading) {
      TicketService.getTicket().then(
        (response) => {
          setTickets(response.data.tickets);
          setIsLoading(false);
        }
      ).catch(
        (error) => {
          console.log("Error fetching tickets:", error);
          setIsLoading(false);
        }
      )
    }
  }, [isLoading]);


  // ============================================================================
  // 3. FILTER LOGIC
  // ============================================================================

  const filteredTickets =
    priorityFilter === "all"
      ? tickets
      : tickets.filter((t) => t.priority === priorityFilter);

  const assignedTickets = filteredTickets.filter((t) => t.status === "assigned");
  const inProgressTickets = filteredTickets.filter((t) => t.status === "in_progress");
  const completedTickets = filteredTickets.filter((t) => t.status === "completed" || t.status === "resolved" || t.status === "closed");

  return (
    // 👇 CHANGED: Use theme.bg instead of mainBgClass
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg} font-sans`}>

      {/* HEADER: Pass state and toggle function down */}
      <TechnicianHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-8xl mx-auto px-6 py-4">

        {/* ---------------- WELCOME SECTION ---------------- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8 mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text}`}>
              Welcome back, <span className="text-accent">{userName}</span> 👋
            </h1>
            <p className={`${theme.subText} mt-1 text-sm`}>Maintenance Department</p>
          </div>

          {/* Date Widget */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm border transition-colors ${theme.cardBg}`}>
            <Calendar className="h-4 w-4 text-accent" />
            <span className={`text-sm font-medium ${theme.text}`}>
               {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* ---------------- OVERVIEW CARDS ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <DashboardCard 
            title="Total Tickets"
            value={tickets.length}
            icon={ClipboardList}
            variant="blue"
            onClick={() => setActiveTab("all")}
            isDarkMode={isDarkMode}
          />

          <DashboardCard 
            title="New Assigned"
            value={assignedTickets.length}
            icon={AlertCircle}
            variant="purple"
            onClick={() => setActiveTab("assigned")}
            isDarkMode={isDarkMode}
          />

          <DashboardCard 
            title="In Progress"
            value={inProgressTickets.length}
            icon={Clock4}
            variant="amber"
            onClick={() => setActiveTab("in_progress")}
            isDarkMode={isDarkMode}
          />

          <DashboardCard 
            title="Completed"
            value={completedTickets.length}
            icon={CheckCircle}
            variant="green"
            onClick={() => setActiveTab("completed")}
            isDarkMode={isDarkMode}
          />

        </div>

        {/* ---------------- TABS + PRIORITY FILTER ---------------- */}
        <div className="w-full mt-8 mb-6">

          <div className={`flex flex-col md:flex-row md:items-center md:justify-between border-b ${theme.border}`}>
            
            {/* TABS */}
            <div className="flex gap-6 overflow-x-auto pb-[-1px]">
              <TabButton 
                label="all" 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                count={filteredTickets.length} 
                isDarkMode={isDarkMode}
              />
              <TabButton 
                label="assigned" 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                count={assignedTickets.length} 
                isDarkMode={isDarkMode}
              />
              <TabButton 
                label="in_progress" 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                count={inProgressTickets.length} 
                isDarkMode={isDarkMode}
              />
              <TabButton 
                label="completed" 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                count={completedTickets.length} 
                isDarkMode={isDarkMode}
              />
            </div>

            {/* PRIORITY FILTER */}
            <div className="flex items-center gap-3 mt-4 md:mt-0 pb-2 md:pb-0">
              <div className="relative">
                  <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${theme.subText}`} />
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className={`
                      pl-9 pr-8 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer shadow-sm transition-colors
                      ${isDarkMode 
                        ? "bg-secondary text-primary border-primary/20 focus:bg-secondary" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">🔴 Urgent</option>
                    <option value="high">🟠 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${theme.subText}`} />
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER INDICATOR */}
          {priorityFilter !== "all" && (
            <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border ${isDarkMode ? "bg-accent/20 text-accent border-accent/30" : "bg-yellow-50 text-yellow-700 border-yellow-100"}`}>
               <span className="font-medium">Priority: {priorityFilter}</span>
               <button onClick={() => setPriorityFilter("all")} className="hover:opacity-75 ml-1">
                 <X className="h-3 w-3" />
               </button>
            </div>
          )}

        </div>

        {/* ---------------- TICKET LIST ---------------- */}
        <div className="mb-12">
          {activeTab === "all" &&
            renderList(filteredTickets, ClipboardList, "No tickets found.", setSelectedTicket, isDarkMode, theme)}
          {activeTab === "assigned" &&
            renderList(assignedTickets, AlertCircle, "No assigned tickets.", setSelectedTicket, isDarkMode, theme)}
          {activeTab === "in_progress" &&
            renderList(inProgressTickets, Clock4, "No tickets in progress.", setSelectedTicket, isDarkMode, theme)}
          {activeTab === "completed" &&
            renderList(completedTickets, CheckCircle, "No completed tickets.", setSelectedTicket, isDarkMode, theme)}
        </div>

        {/* ---------------- DETAILS POPUP ---------------- */}
        {selectedTicket && (
          <TicketDetails
            data={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            refresh={() => setIsLoading(true)}
            isDarkMode={isDarkMode}
          />
        )}

      </main>
    </div>
  );
}

/* ---------------- REUSABLE TAB BUTTON (THEMED) ---------------- */
function TabButton({ label, activeTab, setActiveTab, count, isDarkMode }) {
  const titleMap = {
    all: "All Tickets",
    assigned: "New Assigned",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const isActive = activeTab === label;

  // Dynamic Text Colors
  const activeColor = "text-accent"; 
  const inactiveColor = isDarkMode ? "text-primary/60 hover:text-primary" : "text-gray-500 hover:text-gray-700";

  return (
    <button
      onClick={() => setActiveTab(label)}
      className={`
        pb-3 px-1 text-sm font-medium transition-all relative
        ${isActive ? activeColor : inactiveColor}
      `}
    >
      {titleMap[label]} <span className={`ml-1 font-normal ${isDarkMode ? "opacity-60" : "text-gray-400"}`}>({count})</span>
      
      {/* Active Bottom Border Line (Always Accent) */}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-t-full" />
      )}
    </button>
  );
}

/* ---------------- REUSABLE TICKET LIST ---------------- */
function renderList(list, Icon, emptyMessage, setSelectedTicket, isDarkMode, theme) {
  const emptyBorder = isDarkMode ? "border-primary/20 bg-primary/5" : "border-gray-300 bg-gray-50/50";
  const emptyText = isDarkMode ? "text-primary/50" : "text-gray-500";
  const iconColor = isDarkMode ? "text-primary/30" : "text-gray-300";

  return list.length === 0 ? (
    <div className={`py-16 text-center border border-dashed rounded-xl ${emptyBorder}`}>
      <Icon className={`h-10 w-10 mx-auto mb-3 ${iconColor}`} />
      <p className={`text-sm ${emptyText}`}>{emptyMessage}</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4">
      {list.map((ticket) => (
        <TicketCard
          key={ticket.ticket_id}
          ticket={ticket}
          onClick={() => setSelectedTicket(ticket)}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
}
import { useState } from "react";
import TechnicianHeader from "../../components/technician/TechnicianHeader";
import TicketCard from "../../components/common/ticketCard";
import TicketDetails from "../../components/technician/TicketDetails";

import {
  ClipboardList,
  AlertCircle,
  Clock4,
  CheckCircle,
  Filter
} from "lucide-react";

// sample tickets
import { tickets } from "../../services/newTicketData";

export function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);

  // ⭐ PRIORITY FILTER
  const filteredTickets =
    priorityFilter === "all"
      ? tickets
      : tickets.filter((t) => t.priority === priorityFilter);

  // ⭐ STATUS FILTERS
  const assignedTickets = filteredTickets.filter((t) => t.status === "assigned");
  const inProgressTickets = filteredTickets.filter((t) => t.status === "in_progress");
  const completedTickets = filteredTickets.filter((t) => t.status === "completed" || t.status === "resolved" || t.status === "closed");

  return (
    <main className="max-w-7xl mx-auto px-6 py-4">

      {/* HEADER */}
      <TechnicianHeader />

      {/* ---------------- OVERVIEW CARDS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

        {/* TOTAL */}
        <div
          className="border rounded-xl p-6 bg-white shadow cursor-pointer hover:shadow-md"
          onClick={() => setActiveTab("all")}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">Total Tickets</p>
            <ClipboardList className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold mt-3">{tickets.length}</p>
        </div>

        {/* ASSIGNED */}
        <div
          className="border rounded-xl p-6 bg-white shadow cursor-pointer hover:shadow-md"
          onClick={() => setActiveTab("assigned")}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">New Assigned</p>
            <AlertCircle className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold mt-3">{assignedTickets.length}</p>
        </div>

        {/* IN PROGRESS */}
        <div
          className="border rounded-xl p-6 bg-white shadow cursor-pointer hover:shadow-md"
          onClick={() => setActiveTab("in_progress")}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">In Progress</p>
            <Clock4 className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold mt-3">{inProgressTickets.length}</p>
        </div>

        {/* COMPLETED */}
        <div
          className="border rounded-xl p-6 bg-white shadow cursor-pointer hover:shadow-md"
          onClick={() => setActiveTab("completed")}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">Completed</p>
            <CheckCircle className="text-green-600" />
          </div>
          <p className="text-3xl font-bold mt-3">{completedTickets.length}</p>
        </div>

      </div>

      {/* ---------------- TABS + PRIORITY FILTER ---------------- */}
      <div className="w-full mt-10 border-b border-gray-200 pb-4">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

          {/* TABS */}
          <div className="flex gap-4">
            <TabButton label="all" activeTab={activeTab} setActiveTab={setActiveTab} count={filteredTickets.length} />
            <TabButton label="assigned" activeTab={activeTab} setActiveTab={setActiveTab} count={assignedTickets.length} />
            <TabButton label="in_progress" activeTab={activeTab} setActiveTab={setActiveTab} count={inProgressTickets.length} />
            <TabButton label="completed" activeTab={activeTab} setActiveTab={setActiveTab} count={completedTickets.length} />
          </div>

          {/* PRIORITY FILTER */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Filter className="h-4 w-4 text-gray-500" />

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border rounded-md px-3 py-2 w-[180px] text-sm bg-white shadow-sm"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">🔴 Urgent</option>
              <option value="high">🟠 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
        </div>

        {/* ACTIVE FILTER BAR */}
        {priorityFilter !== "all" && (
          <div className="mt-4 bg-blue-50 border border-blue-100 px-4 py-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-700">
              <Filter className="h-4 w-4" />
              <span>
                Filtering by <strong>{priorityFilter}</strong> priority
              </span>
            </div>

            <button
              className="text-blue-600 hover:underline"
              onClick={() => setPriorityFilter("all")}
            >
              Clear
            </button>
          </div>
        )}

      </div>

      {/* ---------------- TICKET LIST ---------------- */}
      <div className="mt-6">
        {activeTab === "all" &&
          renderList(filteredTickets, ClipboardList, "No tickets found.", setSelectedTicket)}

        {activeTab === "assigned" &&
          renderList(assignedTickets, AlertCircle, "No assigned tickets.", setSelectedTicket)}

        {activeTab === "in_progress" &&
          renderList(inProgressTickets, Clock4, "No tickets in progress.", setSelectedTicket)}

        {activeTab === "completed" &&
          renderList(completedTickets, CheckCircle, "No completed tickets.", setSelectedTicket)}
      </div>

      {/* ---------------- DETAILS POPUP ---------------- */}
      {selectedTicket && (
        <TicketDetails
          data={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

    </main>
  );
}

/* ---------------- REUSABLE TAB BUTTON ---------------- */
function TabButton({ label, activeTab, setActiveTab, count }) {
  const titleMap = {
    all: "All Tickets",
    assigned: "New Assigned",
    in_progress: "In Progress",
    completed: "Completed",
  };

  return (
    <button
      onClick={() => setActiveTab(label)}
      className={`py-2 px-4 border-b-2 ${
        activeTab === label
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500"
      }`}
    >
      {titleMap[label]} ({count})
    </button>
  );
}

/* ---------------- REUSABLE TICKET LIST ---------------- */
function renderList(list, Icon, emptyMessage, setSelectedTicket) {
  return list.length === 0 ? (
    <div className="py-12 text-center border rounded-lg bg-white">
      <Icon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">{emptyMessage}</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4">
      {list.map((ticket) => (
        <TicketCard
          key={ticket.ticketId}
          ticket={ticket}
          onClick={() => setSelectedTicket(ticket)}
        />
      ))}
    </div>
  );
}

import { useState } from "react";
import TechnicianHeader from "./TechnicianHeader";
import TicketCard from "../common/ticketCard.jsx";

import {
  ClipboardList,
  AlertCircle,
  Clock4,
  CheckCircle,
  Filter
} from "lucide-react";

// ---------------- SAMPLE TICKETS ----------------
import { tickets } from "../../services/ticketData";

export function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // ---------------- FILTER LOGIC ----------------
  const filteredTickets =
    priorityFilter === "all"
      ? tickets
      : tickets.filter((t) => t.priority === priorityFilter);

  const assignedTickets = filteredTickets.filter((t) => t.status === "assigned");
  const inProgressTickets = filteredTickets.filter((t) => t.status === "in_progress");
  const completedTickets = filteredTickets.filter((t) => t.status === "completed");

  return (
    <main className="max-w-7xl mx-auto px-6 py-4">

      {/* HEADER */}
      <TechnicianHeader />

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

        {/* ALL */}
        <div
          className="border rounded-xl p-6 bg-white shadow cursor-pointer hover:shadow-md transition"
          onClick={() => setActiveTab("all")}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">Total Tickets</p>
            <ClipboardList className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold mt-3">{tickets.length}</p>
        </div>

        {/* NEW ASSIGNED */}
        <div
          className="border rounded-xl p-6 bg-white shadow cursor-pointer hover:shadow-md transition"
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
          className="border rounded-xl p-6 bg-white shadow cursor-pointer hover:shadow-md transition"
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
          className="border rounded-xl p-6 bg-white shadow cursor-pointer hover:shadow-md transition"
          onClick={() => setActiveTab("completed")}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">Completed</p>
            <CheckCircle className="text-green-600" />
          </div>
          <p className="text-3xl font-bold mt-3">{completedTickets.length}</p>
        </div>

      </div>

      {/* TABS + FILTER */}
      <div className="w-full mt-10 border-b border-gray-200 pb-4">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

          {/* TABS */}
          <div className="flex gap-4 overflow-x-auto">

            <button
              onClick={() => setActiveTab("all")}
              className={`py-2 px-4 border-b-2 ${
                activeTab === "all"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              All Tickets ({filteredTickets.length})
            </button>

            <button
              onClick={() => setActiveTab("assigned")}
              className={`py-2 px-4 border-b-2 ${
                activeTab === "assigned"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              New Assigned ({assignedTickets.length})
            </button>

            <button
              onClick={() => setActiveTab("in_progress")}
              className={`py-2 px-4 border-b-2 ${
                activeTab === "in_progress"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              In Progress ({inProgressTickets.length})
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className={`py-2 px-4 border-b-2 ${
                activeTab === "completed"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              Completed ({completedTickets.length})
            </button>

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
          renderList(filteredTickets, ClipboardList, "No tickets found.")}

        {activeTab === "assigned" &&
          renderList(assignedTickets, AlertCircle, "No assigned tickets.")}

        {activeTab === "in_progress" &&
          renderList(inProgressTickets, Clock4, "No tickets in progress.")}

        {activeTab === "completed" &&
          renderList(completedTickets, CheckCircle, "No completed tickets.")}

      </div>

    </main>
  );
}

// 🔄 reusable UI block
function renderList(list, Icon, emptyMessage) {
  return list.length === 0 ? (
    <div className="py-12 text-center border rounded-lg bg-white">
      <Icon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">{emptyMessage}</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4">
      {list.map((ticket) => (
        <TicketCard key={ticket.ticketId} ticket={ticket} />
      ))}
    </div>
  );
}

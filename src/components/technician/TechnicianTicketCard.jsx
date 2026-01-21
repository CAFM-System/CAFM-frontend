import { GrLocation } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
import { Tag } from "lucide-react"; // Imported Tag for category

export default function TechnicianTicketCard({ ticket }) {

  const statusColors = {
    open: "bg-blue-50 text-blue-700 border border-blue-100",
    assigned: "bg-purple-50 text-purple-700 border border-purple-100",
    in_progress: "bg-yellow-50 text-yellow-700 border border-yellow-100",
    resolved: "bg-green-50 text-green-700 border border-green-100",
    closed: "bg-gray-50 text-gray-700 border border-gray-100",
    reopened: "bg-orange-50 text-orange-700 border border-orange-100",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
    urgent: "bg-red-100 text-red-700",
  };

  const categoryLabels = {
    cleaning: "Cleaning",
    security: "Security",
    electrical: "Electrical",
    plumbing: "Plumbing",
    hvac: "HVAC",
    pest_control: "Pest Control",
    general_maintenance: "General Maintenance",
    other: "Other"
  };

  // Normalize values
  const normalizedStatus = ticket.status?.toLowerCase().replace(" ", "_") || "open";
  const normalizedPriority = ticket.priority?.toLowerCase() || "low";
  const normalizedCategory = ticket.category?.toLowerCase().replace(" ", "_") || "other";

  return (
    <div 
      className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col gap-3"
    >
      {/* --- HEADER: ID & BADGES --- */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="font-bold text-gray-700 text-sm tracking-wide">
          {ticket.ticket_number}
        </span>

        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[normalizedStatus]}`}>
          {ticket.status.replace("_", " ")}
        </span>

        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColors[normalizedPriority]}`}>
          {ticket.priority}
        </span>
      </div>

      {/* --- CONTENT: TITLE & DESC --- */}
      <div>
        <h1 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
          {ticket.title}
        </h1>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
          {ticket.description}
        </p>
      </div>

      {/* --- FOOTER: META INFO --- */}
      <div className="mt-2 pt-4 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-gray-500 font-medium">
        
        {/* Left: Location & User */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <GrLocation className="text-gray-400 text-sm" /> 
            <span>{ticket.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiUser className="text-gray-400 text-sm" /> 
            <span>{ticket.tenant_name}</span>
          </div>
        </div>

        {/* Right: Category & Date */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
           <div className="flex items-center gap-1.5">
            <Tag className="h-3 w-3 text-gray-400" />
            <span>{categoryLabels[normalizedCategory] || ticket.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GoClock className="text-gray-400 text-sm" /> 
            {/* Format date if needed, e.g. new Date(ticket.created_at).toLocaleDateString() */}
            <span>{ticket.created_at}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
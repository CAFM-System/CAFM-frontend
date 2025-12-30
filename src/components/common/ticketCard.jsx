import { GrLocation } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";

export default function Ticketcard({ ticket, onClick }) {
  const statusColors = {
    open: "bg-blue-100 text-blue-800",
    assigned: "bg-purple-100 text-purple-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
    reopened: "bg-orange-100 text-orange-800",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  };

  const categoryLabels = {
    cleaning: "Cleaning",
    security: "Security",
    electrical: "Electrical",
    plumbing: "Plumbing",
    hvac: "HVAC",
    pest_control: "Pest Control",
    general_maintenance: "General Maintenance",
    other: "Other",
  };

  const id = ticket.ticket_id || ticket.ticket_number;
  const desc = ticket.complaint || ticket.description;
  const name = ticket.resident_name || ticket.tenant_name;
  const category = ticket.complaint_category || ticket.category;
  const createdDate = ticket.created_at || ticket.created_at;

  const normalizedStatus =
    ticket.status?.toLowerCase().replace(" ", "_") || "open";

  const normalizedPriority = ticket.priority?.toLowerCase() || "low";

  const normalizedCategory =
    category?.toLowerCase().replace(" ", "_") || "other";

  return (
    <div
      onClick={onClick}
      className="
        w-full
        min-h-[220px]
        cursor-pointer
        border border-gray-300
        rounded-2xl
        p-4 sm:p-6
        hover:shadow-md
        transition-shadow
        flex flex-col justify-between
      "
    >
      {/* Header */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-medium">{id}</span>

        <span
          className={`px-2 py-1 rounded-lg text-xs sm:text-sm ${statusColors[normalizedStatus]}`}
        >
          {ticket.status}
        </span>

        <span
          className={`px-2 py-1 rounded-lg text-xs sm:text-sm ${priorityColors[normalizedPriority]}`}
        >
          {ticket.priority}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-base sm:text-lg font-semibold mt-2">
        {ticket.title}
      </h1>

      {/* Description */}
      <span className="text-gray-600 text-sm line-clamp-2 mt-1">
        {desc}
      </span>

      {/* Footer */}
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-4 text-gray-600 text-sm">
        <div className="flex flex-col gap-1">
          <span className="flex gap-2 items-center">
            <GrLocation /> {ticket.location}
          </span>
          <span className="flex gap-2 items-center">
            <FiUser /> {name}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="flex gap-2 items-center">
            <BsExclamationCircle />
            {categoryLabels[normalizedCategory] || category}
          </span>
          <span className="flex gap-2 items-center">
            <GoClock /> {createdDate}
          </span>
        </div>
      </div>
    </div>
  );
}

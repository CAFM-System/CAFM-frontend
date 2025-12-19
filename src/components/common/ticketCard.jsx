import { GrLocation } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";

export default function Ticketcard({ ticket, onClick }) {

  // Colors for status
  const statusColors = {
    open: "bg-blue-100 text-blue-800",
    assigned: "bg-purple-100 text-purple-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
    reopened: "bg-orange-100 text-orange-800",
  };

  // Colors for priority
  const priorityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  };

  // Category label mapping
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

  // Normalize and support both formats (technician + resident)
  const id = ticket.ticketId || ticket.ticket_number;
  const desc = ticket.complaintRequest || ticket.description;
  const name = ticket.name || ticket.tenant_name;
  const category = ticket.complaintCategory || ticket.category;
  const createdDate = ticket.createdDate || ticket.created_at;

  // Normalize values
  const normalizedStatus =
    ticket.status?.toLowerCase().replace(" ", "_") || "open";

  const normalizedPriority = ticket.priority?.toLowerCase() || "low";

  const normalizedCategory =
    category?.toLowerCase().replace(" ", "_") || "other";

  return (
    <div
      className="w-full h-[250px] cursor-pointer hover:shadow-md transition-shadow border border-gray-300 p-6 rounded-2xl space-y-2 relative"
      onClick={onClick}
    >
      <div className="flex gap-4 items-center">
        <span>{id}</span>

        <span
          className={`p-1 px-2 rounded-lg text-sm ${statusColors[normalizedStatus]}`}
        >
          {ticket.status}
        </span>

        <span
          className={`p-1 px-2 rounded-lg text-sm ${priorityColors[normalizedPriority]}`}
        >
          {ticket.priority}
        </span>
      </div>

      <h1 className="text-lg">{ticket.title}</h1>

      <div className="absolute bottom-4 mt-4 gap-4 flex flex-col">
        <span className="text-gray-600">{desc}</span>

        <div className="flex gap-50 text-gray-600">
          <div className="flex flex-col">
            <span className="flex gap-2 items-center">
              <GrLocation /> {ticket.location}
            </span>
            <span className="flex gap-2 items-center">
              <FiUser /> {name}
            </span>
          </div>

          <div className="flex flex-col">
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
    </div>
  );
}

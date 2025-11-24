import { GrLocation } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";

export default function TechnicianTicketCard({ ticket }) {

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
    other: "Other"
  };

  // Normalize values from sample data
  const normalizedStatus = ticket.status.toLowerCase().replace(" ", "_");
  const normalizedPriority = ticket.priority.toLowerCase();
  const normalizedCategory = ticket.category.toLowerCase().replace(" ", "_");

  return (
    <div className="w-full h-[250px] cursor-pointer hover:shadow-md transition-shadow border border-gray-300 p-6 rounded-2xl space-y-2 relative">

      <div className="flex gap-4 items-center">
        <span>{ticket.ticket_number}</span>

        <span className={`p-1 px-2 rounded-lg text-sm ${statusColors[normalizedStatus]}`}>
          {ticket.status}
        </span>

        <span className={`p-1 px-2 rounded-lg text-sm ${priorityColors[normalizedPriority]}`}>
          {ticket.priority}
        </span>
      </div>

      <h1 className="text-lg">{ticket.title}</h1>

      <div className="absolute bottom-4 mt-4 gap-4 flex flex-col">
        <span className="text-gray-600">{ticket.description}</span>

        <div className="flex gap-50 text-gray-600">
          <div className="flex flex-col">
            <span className="flex gap-2 items-center"><GrLocation /> {ticket.location}</span>
            <span className="flex gap-2 items-center"><FiUser /> {ticket.tenant_name}</span>
          </div>

          <div className="flex flex-col">
            <span className="flex gap-2 items-center">
              <BsExclamationCircle />
              {categoryLabels[normalizedCategory] || ticket.category}
            </span>
            <span className="flex gap-2 items-center"><GoClock /> {ticket.created_at}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

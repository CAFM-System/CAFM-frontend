import { TicketIcon, Clock, CheckCircle2 } from "lucide-react";

export default function RequestList() {
  const requests = [
    { id: 1, title: "AC not cooling", status: "active", date: "Today" },
    { id: 2, title: "Water leak in bathroom", status: "resolved", date: "2 days ago" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
      <h2 className="text-lg font-semibold mb-4">Your Requests</h2>

      {requests.map((req) => (
        <div
          key={req.id}
          className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 mb-3 flex items-center justify-between"
        >
          <div>
            <p className="font-medium">{req.title}</p>
            <p className="text-xs text-gray-500">{req.date}</p>
          </div>

          {req.status === "active" && (
            <Clock className="h-5 w-5 text-orange-500" />
          )}
          {req.status === "resolved" && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
        </div>
      ))}
    </div>
  );
}

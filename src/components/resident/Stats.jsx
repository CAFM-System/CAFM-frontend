import { TicketIcon, Clock, CheckCircle2, TrendingUp, Award } from "lucide-react";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Total Requests */}
      <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full -mr-16 -mt-16"></div>

        <p className="text-sm text-gray-500">Total Requests</p>
        <h2 className="text-4xl text-gray-900">12</h2>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <TrendingUp className="h-3 w-3 text-blue-500" />
          All time submissions
        </div>
      </div>

      {/* Active */}
      <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full -mr-16 -mt-16"></div>

        <p className="text-sm text-gray-500">Active</p>
        <h2 className="text-4xl text-gray-900">2</h2>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <Clock className="h-3 w-3 text-orange-500" />
          Being processed
        </div>
      </div>

      {/* Resolved */}
      <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full -mr-16 -mt-16"></div>

        <p className="text-sm text-gray-500">Resolved</p>
        <h2 className="text-4xl text-gray-900">10</h2>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <Award className="h-3 w-3 text-green-500" />
          Completed successfully
        </div>
      </div>
    </div>
  );
}

import React from "react";

export function AdminVisitorTable({ visitors, isDarkMode }) {
  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (value) => {
    if (!value) return "-";

    const raw = String(value).trim();

    // Handle time-only values from backend (e.g. "14:30" or "14:30:00").
    const timeOnlyMatch = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (timeOnlyMatch) {
      const hours = Number(timeOnlyMatch[1]);
      const minutes = timeOnlyMatch[2];
      if (hours >= 0 && hours <= 23) {
        const ampm = hours >= 12 ? "PM" : "AM";
        const twelveHour = hours % 12 || 12;
        return `${String(twelveHour).padStart(2, "0")}:${minutes} ${ampm}`;
      }
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return raw;
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={`w-full overflow-x-auto rounded-xl border
      ${isDarkMode ? "bg-[#111111] border-white/5" : "bg-white border-gray-200"}`}
    >

      <table className="min-w-[1200px] w-full text-sm">

        {/* TABLE HEADER */}

        <thead
          className={`${
            isDarkMode
              ? "bg-white/5 text-gray-400"
              : "bg-gray-50 text-gray-600"
          } text-xs uppercase`}
        >
          <tr>
            <th className="px-4 py-3 text-left whitespace-nowrap">ID</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Visitor Name</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Host</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Apartment</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Phone</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Email</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Visit From</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Visit To</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Others</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Type</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Registration</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Entry</th>
          </tr>
        </thead>

        {/* TABLE BODY */}

        <tbody>
          {visitors.map((v, index) => {
            const entryTimeValue = v.entryTime || v.entry_time;
            const isCheckedIn = !!entryTimeValue;

            return (
              <tr
                key={v.id || index}
                className={`border-t transition
                ${
                  isDarkMode
                    ? "border-white/5 hover:bg-white/5 text-gray-200"
                    : "border-gray-100 hover:bg-gray-50 text-gray-800"
                }`}
              >

                {/* VISITOR ID */}

                <td className="px-4 py-3 font-semibold text-yellow-500 whitespace-nowrap">
                  VST-{String(index + 1).padStart(3, "0")}
                </td>

                {/* VISITOR NAME */}

                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  {v.name || "—"}
                </td>

                {/* HOST NAME */}

                <td className="px-4 py-3 whitespace-nowrap">
                  {v.hostName || "—"}
                </td>

                {/* APARTMENT */}

                <td className="px-4 py-3 whitespace-nowrap">
                  {v.hostApartment ? `Apt ${v.hostApartment}` : "—"}
                </td>

                {/* PHONE */}

                <td className="px-4 py-3 whitespace-nowrap">
                  {v.phone || "—"}
                </td>

                {/* EMAIL */}

                <td className="px-4 py-3 max-w-[220px] truncate" title={v.email || "—"}>
                  {v.email || "—"}
                </td>

                {/* NIC */}

                <td className="px-4 py-3 whitespace-nowrap">
                  {formatDate(v.validFrom || v.dateFrom || v.visitDate || v.date)}
                </td>

                {/* VEHICLE */}

                <td className="px-4 py-3 whitespace-nowrap">
                  {formatDate(v.validUntil || v.dateTo || v.visitDate || v.date)}
                </td>

                {/* GROUP MEMBERS */}

                <td className="px-4 py-3 text-center whitespace-nowrap">
                  {v.othersCount ?? 0}
                </td>

                {/* VISITOR TYPE */}

                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      v.visitorType === "regular"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {v.visitorType || "normal"}
                  </span>
                </td>

                {/* REGISTRATION TYPE */}

                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      v.isPreRegistered
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {v.isPreRegistered ? "Pre-Registered" : "Onsite"}
                  </span>
                </td>

                {/* ENTRY STATUS */}

                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      isCheckedIn
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {isCheckedIn ? formatDateTime(entryTimeValue) : "Pending"}
                  </span>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>

    </div>
  );
}
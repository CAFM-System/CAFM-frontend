import React from "react";

export function AdminVisitorTable({ visitors, isDarkMode }) {

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
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Visitor Name</th>
            <th className="px-4 py-3 text-left">Host</th>
            <th className="px-4 py-3 text-left">Apartment</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">NIC / ID</th>
            <th className="px-4 py-3 text-left">Vehicle</th>
            <th className="px-4 py-3 text-left">Others</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Registration</th>
            <th className="px-4 py-3 text-left">Entry</th>
          </tr>
        </thead>

        {/* TABLE BODY */}

        <tbody>
          {visitors.map((v, index) => {

            const isCheckedIn = !!v.entryTime;

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

                <td className="px-4 py-3 font-semibold text-yellow-500">
                  VST-{String(index + 1).padStart(3, "0")}
                </td>

                {/* VISITOR NAME */}

                <td className="px-4 py-3 font-medium">
                  {v.name || "—"}
                </td>

                {/* HOST NAME */}

                <td className="px-4 py-3">
                  {v.hostName || "—"}
                </td>

                {/* APARTMENT */}

                <td className="px-4 py-3">
                  {v.hostApartment ? `Apt ${v.hostApartment}` : "—"}
                </td>

                {/* PHONE */}

                <td className="px-4 py-3">
                  {v.phone || "—"}
                </td>

                {/* EMAIL */}

                <td className="px-4 py-3">
                  {v.email || "—"}
                </td>

                {/* NIC */}

                <td className="px-4 py-3">
                  {v.nic || "—"}
                </td>

                {/* VEHICLE */}

                <td className="px-4 py-3">
                  {v.vehicleNumber || "—"}
                </td>

                {/* GROUP MEMBERS */}

                <td className="px-4 py-3 text-center">
                  {v.othersCount ?? 0}
                </td>

                {/* VISITOR TYPE */}

                <td className="px-4 py-3">
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

                <td className="px-4 py-3">
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

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      isCheckedIn
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {isCheckedIn ? v.entryTime : "Pending"}
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
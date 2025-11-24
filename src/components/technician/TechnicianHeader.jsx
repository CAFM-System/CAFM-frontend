import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";

export default function TechnicianHeader() {
  const [user, setUser] = useState({ name: "Loading...", department: "" });

  useEffect(() => {
    setTimeout(() => {
      setUser({ name: "John Doe", department: "maintenance" });
    }, 1000);
  }, []);

  const onLogout = () => {
    alert("User logged out");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-gray-900">Technician Dashboard</h1>

            <p className="text-sm text-gray-500">
              {user.name} -{" "}
              {user.department
                ? user.department.charAt(0).toUpperCase() +
                  user.department.slice(1)
                : "General"}{" "}
              Department
            </p>
          </div>

          {/*logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

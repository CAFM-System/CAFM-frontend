import { LogOut } from "lucide-react";

export default function AdminDashboardHeader({ title, name, department }) {

  const onLogout = () => {
    alert("User logged out");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">

        {/* Left section */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl text-gray-900">{title}</h1>

          <p className="text-sm text-gray-500">
            {name} -{" "}
            {department
              ? department.charAt(0).toUpperCase() + department.slice(1)
              : "General"}{" "}
            Department
          </p>
        </div>

        {/* Right section */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 w-full sm:w-auto"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </header>

  );
}

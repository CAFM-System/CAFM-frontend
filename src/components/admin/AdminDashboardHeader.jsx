import { LogOut, Sun, Moon } from "lucide-react"; // 👈 ADDED: Sun, Moon
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme"; // 👈 ADDED

export default function AdminDashboardHeader({ title, name, department }) {
  const navigate = useNavigate();
  
  // 👇 ADDED: Use theme hook
  const { isDarkMode, toggleTheme } = useTheme();

  const onLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  // 👇 ADDED: Theme-aware classes
  const headerBg = isDarkMode
    ? "bg-[#1c2625] border-primary/10"
    : "bg-white border-gray-200";

  const titleColor = isDarkMode ? "text-primary" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-primary/70" : "text-gray-500";
  
  const buttonClasses = isDarkMode
    ? "border-primary/20 text-primary hover:bg-primary/10"
    : "border-gray-400 text-gray-700 hover:bg-gray-100";

  return (
    <header className={`border-b sticky top-0 z-50 transition-colors duration-300 ${headerBg}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">

        {/* Left section */}
        <div className="text-center sm:text-left">
          <h1 className={`text-xl sm:text-2xl ${titleColor}`}>{title}</h1>

          <p className={`text-sm ${subtitleColor}`}>
            {name} -{" "}
            {department
              ? department.charAt(0).toUpperCase() + department.slice(1)
              : "General"}{" "}
            Department
          </p>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          
          {/* 👇 ADDED: Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md transition-all ${buttonClasses}`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className={`flex items-center justify-center gap-2 border px-4 py-2 rounded-md w-full sm:w-auto transition-all ${buttonClasses}`}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
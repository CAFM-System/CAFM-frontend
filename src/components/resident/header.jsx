import { Home, Bell, User as UserIcon, LogOut, MapPin } from "lucide-react";

export default function Header() {
  const userName = "Sasindu";
  const apartment = "A-12";
  const openTickets = 2;
  const activeNav = "dashboard";

  return (
    <header className="sticky top-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>

      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">

          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition"></div>
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4 rounded-2xl shadow-xl">
                <Home className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CAFM Portal
              </h1>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Resident Dashboard
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-lg rounded-2xl p-1.5 shadow-lg border border-white/60">
            {["dashboard", "notifications", "profile"].map((nav) => (
              <button
                key={nav}
                className={`group relative px-6 py-3 rounded-xl flex items-center gap-2 overflow-hidden transition ${
                  activeNav === nav
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {activeNav === nav && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                )}

                {nav === "dashboard" && <Home className="h-4 w-4 relative z-10" />}
                {nav === "notifications" && (
                  <Bell className="h-4 w-4 relative z-10" />
                )}
                {nav === "profile" && (
                  <UserIcon className="h-4 w-4 relative z-10" />
                )}

                <span className="relative z-10 capitalize">{nav}</span>

                {/* Notification Count */}
                {nav === "notifications" && openTickets > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow">
                    {openTickets}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-sm text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 flex items-center justify-end gap-1.5">
                <MapPin className="h-3 w-3" />
                Apartment {apartment}
              </p>
            </div>

            <div className="relative">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl border-2 border-white">
                <span className="text-lg">{userName[0]}</span>
              </div>
            </div>

            <button className="p-2 rounded-xl border bg-white/80 backdrop-blur-sm hover:bg-red-50 transition">
              <LogOut className="h-5 w-5 text-gray-600 hover:text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

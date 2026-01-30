import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import {
  Home,
  Bell,
  User,
  Users,
  LogOut,
  MapPin,
  ChartColumn,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export function Header({ notificationCount = 0 }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await AuthService.getuser();
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchMe();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition
     ${
       isActive
         ? "bg-[color:var(--color-accent)] text-[color:var(--color-secondary)]"
         : "text-[color:var(--color-secondary)] dark:text-white hover:bg-[rgba(234,179,8,0.2)]"
     }`;

  if (!user) return null;

  return (
    <header
      className="
        sticky top-0 z-50
        bg-[color:var(--color-primary)]
        dark:bg-black
        border-b border-black/5 dark:border-white/10
        backdrop-blur-md
      "
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">

          {/* ===== Logo ===== */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[color:var(--color-accent)] flex items-center justify-center">
              <img
                src="/images/logo_withoutBG1.png"
                alt="CAFM Logo"
                className="h-6 w-6 object-contain"
              />
            </div>

            <div>
              <h1 className="text-base font-semibold text-[color:var(--color-secondary)] dark:text-white">
                CAFM Portal
              </h1>
              <p className="text-xs text-black/50 dark:text-white/60">
                Resident Dashboard
              </p>
            </div>
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <button
            className="
              md:hidden p-2 rounded-lg
              border border-[color:var(--color-accent)]
              text-[color:var(--color-secondary)] dark:text-white
              hover:bg-[color:var(--color-accent)]
              transition
            "
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          {/* ===== Desktop Navigation ===== */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/resident/dashboard" className={navClass}>
              <ChartColumn className="h-4 w-4" />
              Dashboard
            </NavLink>

            <NavLink to="/resident/notifications" className={navClass}>
              <Bell className="h-4 w-4" />
              Notifications
              {notificationCount > 0 && (
                <span className="ml-1 h-5 w-5 rounded-full flex items-center justify-center text-xs
                  bg-[color:var(--color-accent)] text-black">
                  {notificationCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/resident/profile" className={navClass}>
              <User className="h-4 w-4" />
              Profile
            </NavLink>

            <NavLink to="/resident/visitors" className={navClass}>
              <Users className="h-4 w-4" />
              Visitors
            </NavLink>
          </nav>

          {/* ===== User Section ===== */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-[color:var(--color-secondary)] dark:text-white">
                {user.profile.firstName} {user.profile.lastName}
              </p>
              <p className="text-xs text-black/50 dark:text-white/60 flex items-center justify-end gap-1">
                <MapPin className="h-3 w-3" />
                Apartment {user.profile.apartmentNo}
              </p>
            </div>

            <div className="h-10 w-10 rounded-full bg-[color:var(--color-accent)] text-black flex items-center justify-center font-semibold">
              {user.profile.firstName[0]}
            </div>

            <NavLink
              to="/"
              className="
                p-1.5 rounded-xl
                bg-white/60 dark:bg-white/10
                border border-[color:var(--color-accent)]/40
                hover:bg-[rgba(234,179,8,0.2)]
                transition
              "
            >
              <Home className="h-4 w-6 text-[color:var(--color-secondary)] dark:text-white" />
            </NavLink>

            <NavLink
              to="/login"
              onClick={handleLogout}
              className="
                p-1.5 rounded-xl
                bg-white/60 dark:bg-white/10
                border border-red-400/40
                hover:bg-red-500/10
                transition
              "
            >
              <LogOut className="h-4 w-6 text-red-500" />
            </NavLink>
          </div>
        </div>

        {/* ===== Mobile Menu ===== */}
        {mobileOpen && (
          <div
            className="
              md:hidden mt-3 rounded-xl p-4 space-y-2 shadow
              bg-[color:var(--color-primary)]
              dark:bg-black
              border border-black/10 dark:border-white/10
            "
          >
            <NavLink onClick={() => setMobileOpen(false)} to="/resident/dashboard" className={navClass}>
              <ChartColumn className="h-4 w-4" />
              Dashboard
            </NavLink>

            <NavLink onClick={() => setMobileOpen(false)} to="/notifications" className={navClass}>
              <Bell className="h-4 w-4" />
              Notifications
            </NavLink>

            <NavLink onClick={() => setMobileOpen(false)} to="/profile" className={navClass}>
              <User className="h-4 w-4" />
              Profile
            </NavLink>

            <NavLink onClick={() => setMobileOpen(false)} to="/resident/visitors" className={navClass}>
              <Users className="h-4 w-4" />
              Visitors
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

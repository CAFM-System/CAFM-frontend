import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
    X
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
       : "text-[color:var(--color-secondary)] hover:bg-[rgba(234,179,8,0.2)]"
   }`;



    if (!user) return null;

    return (
        <header className="sticky top-0 z-50 bg-primary shadow-md">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <div className="flex items-center justify-between h-20">

      {/* ===== Logo ===== */}
      <div className="flex items-center gap-3">
        <div className="bg-accent p-2.5 rounded-xl text-secondary">
          <Home className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-secondary">
            CAFM Portal
          </h1>
          <p className="text-xs text-gray-500">
            Resident Dashboard
          </p>
        </div>
      </div>

      {/* ===== Mobile Menu Button ===== */}
      <button
        className="md:hidden p-2 rounded-lg border
             border-[color:var(--color-accent)]
             text-[color:var(--color-secondary)]
             hover:bg-[color:var(--color-accent)]
             hover:text-[color:var(--color-secondary)]
             transition"
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

        <NavLink to="/notifications" className={navClass}>
          <Bell className="h-4 w-4" />
          Notifications
          {notificationCount > 0 && (
            <span className="ml-1 bg-accent text-secondary text-xs h-5 w-5 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/profile" className={navClass}>
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
          <p className="text-sm font-medium text-secondary">
            {`${user.profile.firstName} ${user.profile.lastName}`}
          </p>
          <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
            <MapPin className="h-3 w-3" />
            Apartment {user.profile.apartmentNo}
          </p>
        </div>

        <div className="h-10 w-10 rounded-full bg-accent text-secondary flex items-center justify-center font-semibold">
          {user.profile.firstName[0]}
        </div>

        <NavLink
          to="/"
          className="group p-1.5 bg-primary border-2 border-accent/40 hover:bg-accent/20 rounded-xl transition"
        >
          <Home className="h-4 w-6 text-secondary" />
        </NavLink>

        <NavLink
          to="/login"
          onClick={handleLogout}
          className="group p-1.5 bg-primary border-2 border-accent/40 hover:bg-red-100 rounded-xl transition"
        >
          <LogOut className="h-4 w-6 text-secondary group-hover:text-red-600" />
        </NavLink>
      </div>
    </div>

    {/* ===== Mobile Menu ===== */}
    {mobileOpen && (
      <div className="md:hidden mt-3 bg-primary rounded-xl border border-accent/30 p-4 space-y-2 shadow">
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

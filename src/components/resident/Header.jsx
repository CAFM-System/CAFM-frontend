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
    ChartBar,
    ChartColumn,
} from "lucide-react";
import { useEffect, useState } from "react";

export function Header({ notificationCount = 0 }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await AuthService.getuser();
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchMe();
    }, []);


    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate("/login");
    };


    const navClass = ({ isActive }) =>
        `flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition
     ${isActive
            ? "bg-[#1687A7] text-white"
            : "text-[#1687A7] hover:bg-[#D3E0EA]"
        }`;
    if (!user) {
        return null;
    }
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">

                    {/* ===== Logo ===== */}
                    <div className="flex items-center gap-3">
                        <div className="bg-[#1687A7] p-2.5 rounded-xl text-white">
                            <Home className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-base font-semibold text-[#1687A7]">
                                CAFM Portal
                            </h1>
                            <p className="text-xs text-gray-500">
                                Resident Dashboard
                            </p>
                        </div>
                    </div>

                    {/* ===== Navigation ===== */}
                    <nav className="flex items-center gap-2">
                        <NavLink to="/resident/dashboard" className={navClass}>
                            <ChartColumn className="h-4 w-4" />
                            Dashboard
                        </NavLink>

                        <NavLink to="/notifications" className={navClass}>
                            <Bell className="h-4 w-4" />
                            Notifications
                            {notificationCount > 0 && (
                                <span className="ml-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
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
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-medium text-gray-800">
                                {`${user.profile.firstName} ${user.profile.lastName}`}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                                <MapPin className="h-3 w-3" />
                                Apartment {user.profile.apartmentNo}
                            </p>
                        </div>

                        <div className="h-10 w-10 rounded-full bg-[#1687A7] text-white flex items-center justify-center font-semibold">
                            {`${user.profile.firstName[0]}`}
                        </div>

                        <NavLink to="/" className="group p-1.5 bg-[#f1f3f4] border-2 border-[#c8e1e8] hover:bg-[#d2e3fc] rounded-xl transition-colors duration-200">
                            <Home className="h-4 w-6 text-[#1687A7]  group-hover:text-black transition-colors" />
                        </NavLink>
                        <NavLink to="/login" onClick={handleLogout} className="group p-1.5 bg-[#f1f3f4] border-2 border-[#c8e1e8] hover:bg-[#d2e3fc] rounded-xl transition-colors duration-200">
                            <LogOut className="h-4 w-6 text-gray-600 hover:text-red-600" />
                        </NavLink>

                    </div>

                </div>
            </div>
        </header>
    );
}

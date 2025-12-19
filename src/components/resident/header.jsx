import { useState } from "react";
import { Home, Bell, User as UserIcon, LogOut } from 'lucide-react';

export default function Header({
    openTicketsCount,
    onNavigateToDashboard,
    onNavigateToProfile,
    onNavigateToNotifications,
    onLogout,
}) {
    const [activeNav, setActiveNav] = useState('home');

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b-2 border-[#D3E0EA] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Brand */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateToDashboard}>
                        <div className="bg-[#1687A7] p-3 rounded-xl">
                            <Home className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl text-[#1687A7]">CAFM Portal</h1>
                            <p className="text-xs text-[#1687A7]/60">Facilities Management</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <button
                            onClick={() => {
                                setActiveNav('home');
                                scrollToSection('hero');
                            }}
                            className={`px-6 py-2.5 rounded-lg transition-all ${activeNav === 'home'
                                    ? 'bg-[#1687A7] text-white'
                                    : 'text-[#1687A7] hover:bg-[#D3E0EA]'
                                }`}
                        >
                            Home
                        </button>

                        <button
                            onClick={() => {
                                setActiveNav('features');
                                scrollToSection('features');
                            }}
                            className={`px-6 py-2.5 rounded-lg transition-all ${activeNav === 'features'
                                    ? 'bg-[#1687A7] text-white'
                                    : 'text-[#1687A7] hover:bg-[#D3E0EA]'
                                }`}
                        >
                            Features
                        </button>

                        <button
                            onClick={() => {
                                setActiveNav('about');
                                scrollToSection('about');
                            }}
                            className={`px-6 py-2.5 rounded-lg transition-all ${activeNav === 'about'
                                    ? 'bg-[#1687A7] text-white'
                                    : 'text-[#1687A7] hover:bg-[#D3E0EA]'
                                }`}
                        >
                            About
                        </button>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onNavigateToNotifications}
                            className="relative p-2.5 bg-[#D3E0EA] hover:bg-[#1687A7] text-[#1687A7] hover:text-white rounded-lg transition-all"
                        >
                            <Bell className="h-5 w-5" />
                            {openTicketsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {openTicketsCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={onNavigateToProfile}
                            className="p-2.5 bg-[#D3E0EA] hover:bg-[#1687A7] text-[#1687A7] hover:text-white rounded-lg transition-all"
                        >
                            <UserIcon className="h-5 w-5" />
                        </button>

                        <button
                            onClick={onLogout}
                            className="p-2.5 bg-[#D3E0EA] hover:bg-red-500 text-[#1687A7] hover:text-white rounded-lg transition-all"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>

                </div>
            </div>
        </header>
       
    );
}
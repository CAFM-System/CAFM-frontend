import React from 'react'
export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">🏠</div>
                    <div className="font-semibold text-lg">CAFM Portal</div>
                </div>


                <nav className="hidden md:flex items-center gap-8 text-sm">
                    <a className="hover:text-indigo-600 cursor-pointer">Dashboard</a>
                    <a className="hover:text-indigo-600 cursor-pointer flex items-center gap-1">Notifications <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span></a>
                    <a className="hover:text-indigo-600 cursor-pointer">Profile</a>
                </nav>


                <div className="flex items-center gap-4">
                    <div className="text-right text-sm leading-tight">
                        <div className="font-medium">John Smith</div>
                        <div className="text-gray-500 text-xs">Apartment A-101</div>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white">J</div>
                </div>
            </div>
        </header>
    )
}
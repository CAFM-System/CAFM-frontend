import { FiHome } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { useState } from "react";
import { UserData } from "../../services/userData";
import { FiLogOut } from "react-icons/fi";
export function Header(){
    
    const [activeNav,setActiveNav] = useState("dashboard")
    const user = UserData
    return(
        <div className="w-full h-[100px] backdrop:backdrop-blur-lg border-b border-b-gray-200 shadow-sm px-[150px] fixed top-0 left-0 z-50 bg-white backdrop-opacity-25 ">
            <div className="w-full h-full flex justify-center items-center relative">
                <div className="absolute left-0 h-full flex justify-center items-center space-x-3">
                    <div className="left-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4 rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300">
                        <FiHome className="h-8 w-8 text-white"/>
                    </div>
                    <div >
                        <h1  className="text-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            CAFM Portal
                        </h1>
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Resident Dashboad
                        </p>
                    </div>
                </div>
                <div className=" flex justify-center items-center gap-4 bg-white/60 backdrop-blur-lg rounded-2xl p-1.5 shadow-lg border border-white/60">
                    <div onClick={()=>{setActiveNav("dashboard")}} className={`group relative px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2.5 
                        ${activeNav == 'dashboard'
                    ? 'text-white absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/40'
                    : 'text-gray-600 hover:text-gray-900'}`}>
                        <FiHome className={`${activeNav === 'dashboard' ? '' : 'group-hover:scale-110 transition-transform'}`} />
                        <a>Dashboad</a>
                    </div>
                    <div onClick={()=>{setActiveNav("notification")}} className={`group relative px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2.5 
                        ${activeNav =='notification'
                    ? 'text-white absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/40'
                    : 'text-gray-600 hover:text-gray-900'}`}>
                        <IoIosNotificationsOutline className={`${activeNav === 'notification' ? '' : 'group-hover:scale-110 transition-transform'}`}/>
                        <a>Notification</a>
                    </div>
                    <div onClick={()=>{setActiveNav("profile")}} className={`group relative px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2.5 
                        ${activeNav == 'profile'
                    ? 'text-white bg-gradient-to-r absolute inset-0 from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/40'
                    : 'text-gray-600 hover:text-gray-900'}`}>
                        <FiUser className={`${activeNav === 'profile' ? '' : 'group-hover:scale-110 transition-transform'}`}/>
                        <a>Profile</a>
                    </div>
                </div>
                <div className="absolute right-0 flex items-center gap-4">
                        <div className="flex flex-col text-right ">
                            <p className="text-sm text-gray-900">{user.first_name} {user.last_name}</p>
                            <p className="text-xs text-gray-500 flex items-center justify-end gap-1.5">
                                <LuMapPin className="h-3 w-3"/>
                                Apartment {user.apartment_number}
                            </p>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                            <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl border-2 border-white group-hover:scale-105 transition-transform duration-300">
                                <span className="text-lg">{user.first_name.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                        <button 
                            className="h-8 w-8 group flex justify-center items-center relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-red-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <FiLogOut className="h-4 w-4 relative z-10 text-gray-600 group-hover:text-red-600 transition-colors" />
                        </button>

                        
                </div>
            </div>
        </div>
    )
}
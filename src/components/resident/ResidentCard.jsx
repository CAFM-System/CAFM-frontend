import { DessertIcon } from "lucide-react";

export default function ResidentCard({ title, value, headericon, description, icon, onClick }) {
    return (
        <div
            onClick={onClick}
            className="p-6  bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md cursor-pointer transition"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                <div className="bg-[#1687A7] rounded-2xl p-3 text-white">{headericon}</div>
            </div>

            <p className="text-5xl font-bold text-gray-900 mb-2">{value}</p>


            <div className="text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <span className="inline-flex w-4 h-4 mb-2">
                        {icon}
                    </span>
                    {description}
                </div>
            </div>


        </div>
    );
}
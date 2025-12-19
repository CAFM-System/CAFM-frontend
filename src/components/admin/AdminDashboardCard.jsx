import { DessertIcon } from "lucide-react";

export default function DashboardCard({ title, value, icon,description, onClick }) {
    return (
        <div
            onClick={onClick}
            className="p-8 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition "
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">{title}</h3>
                <div className="text-gray-500">{icon}</div>
            </div>

            <div>
                <p className="text-4xl semi-bold text-gray-900 mb-1">{value}</p>
                <p className="text-sm text-gray-500 mt-4">{description}</p>

            </div>


        </div>
    );
}

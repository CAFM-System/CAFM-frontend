export default function DashboardCard({ title, value, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-5 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600">{title}</h3>
        <div className="text-gray-500">{icon}</div>
      </div>

      <p className="text-3xl font-semibold mt-3">
        {value}
      </p>
    </div>
  );
}

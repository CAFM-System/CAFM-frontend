export default function DashboardCard({
  title,
  value,
  icon,
  description,
  onClick,
  accentColor = "bg-teal-600",
  iconBgColor = "bg-teal-50",
  iconColor = "text-teal-600",
}) {
  return (
    <div
      onClick={onClick}
      className="relative p-4 bg-white border border-slate-200 rounded-2xl shadow-sm
                 hover:shadow-md hover:border-slate-300 cursor-pointer
                 transition-all duration-200 overflow-hidden"
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColor}`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-medium font-medium text-slate-600">
          {title}
        </h3>

        <div
          className={`p-3 rounded-xl ${iconBgColor} ${iconColor}`}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-3xl font-semibold text-slate-900 mb-1">
          {value}
        </p>
        <p className="text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

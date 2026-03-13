import { useTheme } from "../../hooks/useTheme";

export default function DashboardCard({ title, value, icon, onClick }) {
  const { cardBg, text, subText } = useTheme();
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl shadow hover:shadow-md cursor-pointer transition border ${cardBg}`}
    >
      <div className="flex items-center justify-between">
        <h3 className={subText}>{title}</h3>
        <div className={subText}>{icon}</div>
      </div>

      <p className={`text-3xl font-semibold mt-3 ${text}`}>
        {value}
      </p>
    </div>
  );
}

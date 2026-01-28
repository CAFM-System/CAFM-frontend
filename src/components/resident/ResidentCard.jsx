export default function ResidentCard({
  title,
  value,
  headericon,
  description,
  icon,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="
        p-6 rounded-2xl cursor-pointer transition
        bg-[color:var(--color-primary)]
        dark:bg-black
        border border-black/10 dark:border-white/10
        shadow-sm hover:shadow-md
      "
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[color:var(--color-secondary)]/70 dark:text-white/70">
          {title}
        </h3>

        <div
          className="
            rounded-2xl p-3
            bg-[color:var(--color-accent)]
            text-black
          "
        >
          {headericon}
        </div>
      </div>

      {/* ===== Value ===== */}
      <p className="text-5xl font-bold text-[color:var(--color-secondary)] dark:text-white mb-2">
        {value}
      </p>

      {/* ===== Description ===== */}
      <div className="text-sm text-[color:var(--color-secondary)]/60 dark:text-white/60">
        <div className="flex items-center gap-1">
          <span className="inline-flex w-4 h-4">
            {icon}
          </span>
          {description}
        </div>
      </div>
    </div>
  );
}

import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer({
  onNavigateToDashboard,
  onNavigateToNotifications,
  onNavigateToProfile,
}) {
  return (
    <footer
      className="
        relative py-12 px-4 sm:px-6 lg:px-8
        bg-gradient-to-br
        from-black/5 via-yellow-400/5 to-white
        dark:from-black dark:via-black dark:to-black
        backdrop-blur-xl
        border-t border-black/10 dark:border-white/10
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* ===== Top Grid ===== */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* ===== Brand ===== */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[color:var(--color-accent)] p-2 rounded-xl shadow-lg">
                <img
                  src="/images/logo_withoutBG1.png"
                  alt="CAFM Logo"
                  className="h-6 w-6 object-contain"
                />
              </div>

              <h3 className="text-xl font-semibold text-[color:var(--color-secondary)] dark:text-white">
                CAFM Portal
              </h3>
            </div>

            <p className="text-[color:var(--color-secondary)]/70 dark:text-white/70 mb-4 max-w-md">
              Professional apartment facilities management and maintenance services.
            </p>

            <div className="flex gap-3">
              {[Mail, Phone, MapPin].map((Icon, i) => (
                <button
                  key={i}
                  className="
                    p-3 rounded-xl
                    bg-white/60 dark:bg-white/10
                    border border-black/10 dark:border-white/10
                    backdrop-blur-md
                    hover:bg-[color:var(--color-accent)]
                    hover:text-black
                    transition-all shadow-sm hover:shadow-lg
                  "
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* ===== Quick Links ===== */}
          <div
            className="
              rounded-2xl p-6 shadow-lg
              bg-white/60 dark:bg-white/5
              backdrop-blur-md
              border border-black/10 dark:border-white/10
            "
          >
            <h4 className="mb-4 font-semibold text-[color:var(--color-secondary)] dark:text-white">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onNavigateToDashboard}
                  className="text-[color:var(--color-secondary)]/70 dark:text-white/70 hover:text-[color:var(--color-secondary)] dark:hover:text-white transition"
                >
                  Dashboard
                </button>
              </li>

              <li>
                <button
                  onClick={onNavigateToNotifications}
                  className="text-[color:var(--color-secondary)]/70 dark:text-white/70 hover:text-[color:var(--color-secondary)] dark:hover:text-white transition"
                >
                  Notifications
                </button>
              </li>

              <li>
                <button
                  onClick={onNavigateToProfile}
                  className="text-[color:var(--color-secondary)]/70 dark:text-white/70 hover:text-[color:var(--color-secondary)] dark:hover:text-white transition"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>

          {/* ===== Support ===== */}
          <div
            className="
              rounded-2xl p-6 shadow-lg
              bg-white/60 dark:bg-white/5
              backdrop-blur-md
              border border-black/10 dark:border-white/10
            "
          >
            <h4 className="mb-4 font-semibold text-[color:var(--color-secondary)] dark:text-white">
              Support
            </h4>

            <ul className="space-y-2 text-sm text-[color:var(--color-secondary)]/70 dark:text-white/70">
              <li className="hover:text-[color:var(--color-secondary)] dark:hover:text-white transition cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-[color:var(--color-secondary)] dark:hover:text-white transition cursor-pointer">
                Contact Us
              </li>
              <li className="hover:text-[color:var(--color-secondary)] dark:hover:text-white transition cursor-pointer">
                FAQs
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div
          className="
            pt-8 flex flex-col md:flex-row justify-between items-center gap-4
            border-t border-black/10 dark:border-white/10
          "
        >
          <div
            className="
              px-6 py-3 rounded-xl shadow-sm
              bg-white/60 dark:bg-white/5
              backdrop-blur-md
              border border-black/10 dark:border-white/10
            "
          >
            <p className="text-sm text-[color:var(--color-secondary)]/70 dark:text-white/70">
              © 2024 CAFM Portal. All rights reserved.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="
                px-5 py-2.5 rounded-xl text-sm
                bg-white/60 dark:bg-white/5
                border border-black/10 dark:border-white/10
                text-[color:var(--color-secondary)]/70 dark:text-white/70
                hover:text-[color:var(--color-secondary)] dark:hover:text-white
                transition shadow-sm
              "
            >
              Privacy Policy
            </button>

            <button
              className="
                px-5 py-2.5 rounded-xl text-sm
                bg-white/60 dark:bg-white/5
                border border-black/10 dark:border-white/10
                text-[color:var(--color-secondary)]/70 dark:text-white/70
                hover:text-[color:var(--color-secondary)] dark:hover:text-white
                transition shadow-sm
              "
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

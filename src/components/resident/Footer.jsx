import { Home, Mail, Phone, MapPin } from "lucide-react";

export default function Footer({
  onNavigateToDashboard,
  onNavigateToNotifications,
  onNavigateToProfile,
}) {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1687A7]/5 via-[#D3E0EA]/30 to-[#F6F5F5]/50 backdrop-blur-xl border-t border-[#D3E0EA]/50">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-[#1687A7] to-[#126b8a] p-2 rounded-xl shadow-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl text-[#1687A7]">CAFM Portal</h3>
            </div>

            <p className="text-gray-700 mb-4">
              Professional apartment facilities management and maintenance services.
            </p>

            <div className="flex gap-3">
              <button className="p-3 bg-white/60 backdrop-blur-sm border border-[#D3E0EA]/50 rounded-xl hover:bg-gradient-to-br hover:from-[#1687A7] hover:to-[#126b8a] hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-lg">
                <Mail className="h-5 w-5" />
              </button>

              <button className="p-3 bg-white/60 backdrop-blur-sm border border-[#D3E0EA]/50 rounded-xl hover:bg-gradient-to-br hover:from-[#1687A7] hover:to-[#126b8a] hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-lg">
                <Phone className="h-5 w-5" />
              </button>

              <button className="p-3 bg-white/60 backdrop-blur-sm border border-[#D3E0EA]/50 rounded-xl hover:bg-gradient-to-br hover:from-[#1687A7] hover:to-[#126b8a] hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-lg">
                <MapPin className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/40 backdrop-blur-md border border-[#D3E0EA]/50 rounded-2xl p-6 shadow-lg">
            <h4 className="text-[#1687A7] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onNavigateToDashboard}
                  className="text-[#1687A7]/70 hover:text-[#1687A7] transition-colors"
                >
                  Dashboard
                </button>
              </li>

              <li>
                <button
                  onClick={onNavigateToNotifications}
                  className="text-[#1687A7]/70 hover:text-[#1687A7] transition-colors"
                >
                  Notifications
                </button>
              </li>

              <li>
                <button
                  onClick={onNavigateToProfile}
                  className="text-[#1687A7]/70 hover:text-[#1687A7] transition-colors"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="bg-white/40 backdrop-blur-md border border-[#D3E0EA]/50 rounded-2xl p-6 shadow-lg">
            <h4 className="text-[#1687A7] mb-4">Support</h4>
            <ul className="space-y-2">
              <li className="text-gray-700">Help Center</li>
              <li className="text-gray-700">Contact Us</li>
              <li className="text-gray-700">FAQs</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D3E0EA]/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="bg-white/40 backdrop-blur-md border border-[#D3E0EA]/50 rounded-xl px-6 py-3 shadow-sm">
            <p className="text-gray-700 text-sm">
              © 2024 CAFM Portal. All rights reserved.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-white/40 backdrop-blur-md border border-[#D3E0EA]/50 rounded-xl px-5 py-2.5 text-sm text-gray-700 hover:text-[#1687A7] hover:bg-white/60 transition-all shadow-sm">
              Privacy Policy
            </button>

            <button className="bg-white/40 backdrop-blur-md border border-[#D3E0EA]/50 rounded-xl px-5 py-2.5 text-sm text-gray-700 hover:text-[#1687A7] hover:bg-white/60 transition-all shadow-sm">
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

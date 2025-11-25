import { Home, Mail, Phone, Shield, FileText, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                <Home className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold">CAFM System</h3>
            </div>
            <p className="text-gray-300 text-sm max-w-sm">
              Revolutionizing apartment maintenance with modern technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Dashboard</li>
              <li>Create Request</li>
              <li>My Profile</li>
              <li>Help Center</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> support@cafm.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +1 555 123 4567
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-5 text-sm text-gray-400 flex justify-between">
          <span>© 2024 CAFM. All rights reserved.</span>

          <div className="flex gap-6">
            <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> Privacy</span>
            <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> Terms</span>
            <span className="flex items-center gap-1"><HelpCircle className="h-4 w-4" /> Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

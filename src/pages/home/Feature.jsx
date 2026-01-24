import React from "react";
import { Wrench, Bell, ShieldCheck } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b3530]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#1f6f63] text-[#2fd6b5] rounded-full text-sm mb-4">
            Powerful Features
          </span>
          <h2 className="text-4xl font-bold text-[#a7f3e3] mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Manage your apartment easily with smart tools designed for residents and management.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="group bg-[#0f3f3a] border border-[#1f6f63] p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-[#1f6f63] rounded-xl mb-6 group-hover:scale-110 transition">
              <Wrench className="text-[#2fd6b5]" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#a7f3e3] mb-3">
              Maintenance Requests
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Submit and track maintenance requests in real time without phone calls.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-[#0f3f3a] border border-[#1f6f63] p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-[#1f6f63] rounded-xl mb-6 group-hover:scale-110 transition">
              <Bell className="text-[#2fd6b5]" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#a7f3e3] mb-3">
              Instant Notifications
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Stay informed with updates on repairs, announcements, and alerts.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-[#0f3f3a] border border-[#1f6f63] p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-[#1f6f63] rounded-xl mb-6 group-hover:scale-110 transition">
              <ShieldCheck className="text-[#2fd6b5]" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-[#a7f3e3] mb-3">
              Secure Platform
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your data is protected with enterprise-grade security and access control.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

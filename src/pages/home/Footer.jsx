import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer({ scrollToSection = () => {} }) {
  return (
    <>
      {/* CONTACT SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b3530]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl text-[#a7f3e3] mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions? We're here to help!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Email */}
            <div className="bg-[#0f3f3a] rounded-2xl p-8 text-center
                            border border-[#2fd6b5]/20
                            hover:-translate-y-2 hover:shadow-xl
                            transition-all duration-300">
              <div className="bg-[#1f6f63] p-4 rounded-xl inline-flex mb-4">
                <Mail className="h-8 w-8 text-[#2fd6b5]" />
              </div>
              <h3 className="text-xl text-[#a7f3e3] mb-2">Email</h3>
              <p className="text-gray-300">support@cafmportal.com</p>
            </div>

            {/* Phone */}
            <div className="bg-[#0f3f3a] rounded-2xl p-8 text-center
                            border border-[#2fd6b5]/20
                            hover:-translate-y-2 hover:shadow-xl
                            transition-all duration-300">
              <div className="bg-[#1f6f63] p-4 rounded-xl inline-flex mb-4">
                <Phone className="h-8 w-8 text-[#2fd6b5]" />
              </div>
              <h3 className="text-xl text-[#a7f3e3] mb-2">Phone</h3>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>

            {/* Address */}
            <div className="bg-[#0f3f3a] rounded-2xl p-8 text-center
                            border border-[#2fd6b5]/20
                            hover:-translate-y-2 hover:shadow-xl
                            transition-all duration-300">
              <div className="bg-[#1f6f63] p-4 rounded-xl inline-flex mb-4">
                <MapPin className="h-8 w-8 text-[#2fd6b5]" />
              </div>
              <h3 className="text-xl text-[#a7f3e3] mb-2">Address</h3>
              <p className="text-gray-300">
                123 Management Ave, City, State
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-[#0b3530] via-[#0f3f3a] to-[#0b3530]
                         text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Top */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#a7f3e3]">
                CAFM Portal
              </h4>
              <p className="text-white/70">
                Making apartment management simple and efficient.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#a7f3e3]">
                Quick Links
              </h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button onClick={() => scrollToSection("hero")}
                          className="hover:text-[#2fd6b5] transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("features")}
                          className="hover:text-[#2fd6b5] transition">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("about")}
                          className="hover:text-[#2fd6b5] transition">
                    About
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#a7f3e3]">
                Support
              </h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-[#2fd6b5] transition">Help Center</a></li>
                <li><a href="#" className="hover:text-[#2fd6b5] transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#2fd6b5] transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#a7f3e3]">
                Legal
              </h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-[#2fd6b5] transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#2fd6b5] transition">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-white/60">
              © 2024 CAFM Portal. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}

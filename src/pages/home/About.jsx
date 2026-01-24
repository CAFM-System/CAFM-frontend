import { ArrowRight, CheckCircle, Quote, Star } from "lucide-react";

export default function AboutSection({
  handleOpenDashboard = () => {},
  testimonials = [],
}) {
  return (
    <>
      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b3530]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>
              <h2 className="text-4xl lg:text-5xl text-[#a7f3e3] mb-6">
                Built for Modern Living
              </h2>

              <p className="text-lg text-gray-300 mb-8">
                Our CAFM system streamlines communication between residents,
                technicians, and management to deliver exceptional service.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  ["Transparent Process", "Track every step from submission to completion"],
                  ["Direct Communication", "Message technicians and management directly"],
                  ["Proven Results", "98% satisfaction rate from our residents"],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-[#1f6f63] p-2 rounded-lg mt-1">
                      <CheckCircle className="h-6 w-6 text-[#2fd6b5]" />
                    </div>
                    <div>
                      <h4 className="text-[#a7f3e3] font-semibold mb-1">
                        {title}
                      </h4>
                      <p className="text-gray-300">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleOpenDashboard}
                className="px-8 py-6 bg-[#2fd6b5] text-[#0f3f3a]
                           rounded-xl hover:bg-[#22c7a8]
                           transition"
              >
                <span className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>
            </div>

            {/* RIGHT */}
            <div className="bg-gradient-to-br from-[#0f3f3a] via-[#1f6f63] to-[#0b3530]
                            rounded-3xl p-12 text-white border border-[#2fd6b5]/20">
              <h3 className="text-3xl mb-6 text-[#a7f3e3]">
                Ready to Experience Better Maintenance?
              </h3>

              <p className="text-white/80 mb-10">
                Join hundreds of satisfied residents who trust our platform.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  ["500+", "Active Users"],
                  ["5,000+", "Tickets Resolved"],
                  ["24/7", "Support Available"],
                  ["98%", "Satisfaction Rate"],
                ].map(([v, l], i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-4 border border-[#2fd6b5]/20"
                  >
                    <div className="text-4xl text-[#2fd6b5]">{v}</div>
                    <div className="text-white/70">{l}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0f3f3a]">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <div className="inline-flex w-16 h-16 bg-[#1f6f63] rounded-2xl mb-6 items-center justify-center">
                <Quote className="h-8 w-8 text-[#2fd6b5]" />
              </div>

              <h2 className="text-4xl text-[#a7f3e3] mb-4">
                What Our Residents Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-[#0b3530] p-8 rounded-2xl border border-[#2fd6b5]/20"
                >
                  <h4 className="text-[#a7f3e3] font-semibold">{t.name}</h4>
                  <p className="text-gray-300 italic mt-4">
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}
    </>
  );
}

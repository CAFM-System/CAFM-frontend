import { ArrowRight, CheckCircle, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ================= FEEDBACK DATA ================= */
const feedbacks = [
  { name: "Resident – Tower A", text: "Facilitron made maintenance requests incredibly easy and transparent." },
  { name: "Property Manager", text: "Realty Management Services now tracks issues faster than ever." },
  { name: "Resident – Tower B", text: "Response times improved drastically after using Facilitron." },
  { name: "Technician", text: "Task assignments are clear and well organized." },
  { name: "Admin – RMS", text: "We finally have full visibility of all apartment maintenance." },
  { name: "Resident", text: "No more phone calls — everything is handled online smoothly." },
  { name: "Supervisor", text: "The dashboard helps us monitor technician performance easily." },
  { name: "Resident – Colombo 01", text: "Issues are resolved faster with proper updates." },
  { name: "Facility Officer", text: "Facilitron reduced paperwork and confusion completely." },
  { name: "RMS Management", text: "A modern solution for modern apartment living." },
  { name: "Resident", text: "Very professional service and great communication." },
];

/* ================= ROTATING FEEDBACK ================= */
function RotatingFeedback() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % feedbacks.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const current = feedbacks[index];

  return (
    <div
      className="
        relative
        bg-primary/70 dark:bg-secondary/60
        backdrop-blur-xl
        border border-accent/20
        rounded-3xl p-12
        shadow-[0_40px_120px_rgba(0,0,0,0.35)]
        transform-gpu
        hover:rotate-y-6 hover:rotate-x-3
        transition-transform duration-500
        max-w-xl w-full
      "
    >
      <motion.div
        key={index}
        initial={{ opacity: 0, rotateX: -10, y: 20 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xl italic text-secondary dark:text-primary mb-6">
          “{current.text}”
        </p>

        <div className="text-accent font-semibold">
          {current.name}
        </div>

        <div className="flex justify-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-accent fill-accent" />
          ))}
        </div>
      </motion.div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {feedbacks.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-accent" : "bg-accent/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ================= ABOUT SECTION ================= */
export default function AboutSection({
  handleOpenDashboard = () => {},
  testimonials = [],
}) {
  return (
    <>
      {/* ABOUT */}
      <section
        id="about"
        className="relative py-28 px-4 sm:px-6 lg:px-8
                   bg-primary dark:bg-secondary overflow-hidden"
      >
        <div className="absolute -top-40 right-1/3
                        w-[700px] h-[700px] bg-accent/15
                        blur-[160px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold
                             text-secondary dark:text-primary mb-6">
                Built for <span className="text-accent">Modern Living</span>
              </h2>

              <p className="text-lg text-secondary/70 dark:text-primary/70 mb-10">
                Our CAFM system streamlines communication between residents,
                technicians, and management to deliver exceptional service.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  ["Transparent Process", "Track every step from submission to completion"],
                  ["Direct Communication", "Message technicians and management directly"],
                  ["Proven Results", "98% satisfaction rate from our residents"],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-accent/15 p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary dark:text-primary">
                        {title}
                      </h4>
                      <p className="text-secondary/70 dark:text-primary/70">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenDashboard}
                className="px-8 py-6 rounded-xl font-medium
                           bg-accent text-secondary shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Get Started Now <ArrowRight className="h-5 w-5" />
                </span>
              </motion.button>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
              className="flex justify-center perspective-[1200px]"
            >
              <RotatingFeedback />
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

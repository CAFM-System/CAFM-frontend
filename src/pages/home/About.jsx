import { ArrowRight, CheckCircle, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection({
  handleOpenDashboard = () => {},
  testimonials = [],
}) {
  return (
    <>
      {/* ABOUT SECTION */}
      <section
        id="about"
        className="relative py-28 px-4 sm:px-6 lg:px-8
                   bg-primary dark:bg-secondary overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute -top-40 right-1/3
                        w-[700px] h-[700px] bg-accent/15
                        blur-[160px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold
                             text-secondary dark:text-primary mb-6">
                Built for <span className="text-accent">Modern Living</span>
              </h2>

              <p className="text-lg text-secondary/70
                            dark:text-primary/70 mb-10">
                Our CAFM system streamlines communication between residents,
                technicians, and management to deliver exceptional service.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  ["Transparent Process", "Track every step from submission to completion"],
                  ["Direct Communication", "Message technicians and management directly"],
                  ["Proven Results", "98% satisfaction rate from our residents"],
                ].map(([title, desc], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <div className="
                      bg-accent/15 p-2 rounded-lg mt-1
                      shadow-inner
                    ">
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </div>

                    <div>
                      <h4 className="text-secondary dark:text-primary
                                     font-semibold mb-1">
                        {title}
                      </h4>
                      <p className="text-secondary/70 dark:text-primary/70">
                        {desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenDashboard}
                className="
                  px-8 py-6 rounded-xl font-medium
                  bg-accent text-secondary
                  shadow-lg hover:shadow-xl
                "
              >
                <span className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </span>
              </motion.button>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ rotateX: 4, rotateY: -4 }}
              style={{ perspective: 1200 }}
              className="
                relative rounded-3xl p-12
                bg-white/70 dark:bg-white/5
                backdrop-blur-xl
                border border-accent/20
                shadow-xl
              "
            >
              <h3 className="text-3xl font-bold mb-6
                             text-secondary dark:text-primary">
                Ready to Experience <span className="text-accent">Better Maintenance?</span>
              </h3>

              <p className="text-secondary/70 dark:text-primary/70 mb-10">
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
                    className="
                      rounded-xl p-4
                      bg-accent/10
                      border border-accent/20
                    "
                  >
                    <div className="text-4xl font-bold text-accent">{v}</div>
                    <div className="text-secondary/70 dark:text-primary/70">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section
          className="relative py-28 px-4 sm:px-6 lg:px-8
                     bg-primary dark:bg-secondary overflow-hidden"
        >
          <div className="absolute -bottom-40 left-1/3
                          w-[700px] h-[700px] bg-accent/15
                          blur-[160px] rounded-full pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="
                inline-flex w-16 h-16 rounded-2xl mb-6
                bg-accent/15 items-center justify-center
              ">
                <Quote className="h-8 w-8 text-accent" />
              </div>

              <h2 className="text-4xl font-extrabold
                             text-secondary dark:text-primary">
                What Our <span className="text-accent">Residents</span> Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -10 }}
                  className="
                    rounded-2xl p-8
                    bg-white/70 dark:bg-white/5
                    backdrop-blur-xl
                    border border-accent/20
                    shadow-lg
                  "
                >
                  <h4 className="font-semibold text-secondary dark:text-primary">
                    {t.name}
                  </h4>

                  <div className="flex gap-1 my-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                    ))}
                  </div>

                  <p className="text-secondary/70 dark:text-primary/70 italic">
                    “{t.text}”
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}
    </>
  );
}

import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer({ scrollToSection = () => {} }) {
  return (
    <>
      {/* CONTACT SECTION */}
      <section
        className="
          relative py-28 px-4 sm:px-6 lg:px-8
          bg-primary dark:bg-secondary overflow-hidden
        "
      >
        {/* Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2
                        w-[700px] h-[700px] bg-accent/15
                        blur-[160px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold
                           text-secondary dark:text-primary mb-4">
              Get <span className="text-accent">In Touch</span>
            </h2>
            <p className="text-lg text-secondary/70 dark:text-primary/70
                          max-w-2xl mx-auto">
              Have questions? We're here to help!
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "support@cafmportal.com",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+1 (555) 123-4567",
              },
              {
                icon: MapPin,
                title: "Address",
                value: "123 Management Ave, City, State",
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -12, rotateX: 6, rotateY: -6 }}
                  style={{ perspective: 1200 }}
                  className="
                    group rounded-3xl p-8 text-center
                    bg-white/70 dark:bg-white/5
                    backdrop-blur-xl
                    border border-accent/20
                    shadow-lg hover:shadow-2xl
                    transition-all
                  "
                >
                  {/* Icon */}
                  <div className="
                    w-16 h-16 mx-auto mb-6
                    flex items-center justify-center
                    rounded-xl
                    bg-accent text-secondary
                    shadow-md
                    group-hover:scale-110 transition
                  ">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-xl font-semibold
                                 text-secondary dark:text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-secondary/70 dark:text-primary/70">
                    {item.value}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="
          relative bg-primary dark:bg-secondary
          border-t border-accent/20
          py-20 px-4 sm:px-6 lg:px-8
        "
      >
        <div className="max-w-7xl mx-auto">

          {/* Top */}
          <div className="grid md:grid-cols-4 gap-10 mb-14">

            <div>
              <h4 className="text-lg font-semibold mb-4 text-accent">
                CAFM Portal
              </h4>
              <p className="text-secondary/70 dark:text-primary/70">
                Making apartment management simple and efficient.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4
                             text-secondary dark:text-primary">
                Quick Links
              </h4>
              <ul className="space-y-2 text-secondary/70 dark:text-primary/70">
                {["Home", "features", "about"].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollToSection(s)}
                      className="hover:text-accent transition"
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4
                             text-secondary dark:text-primary">
                Support
              </h4>
              <ul className="space-y-2 text-secondary/70 dark:text-primary/70">
                <li><a href="#" className="hover:text-accent transition">Help Center</a></li>
                <li><a href="#" className="hover:text-accent transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-accent transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4
                             text-secondary dark:text-primary">
                Legal
              </h4>
              <ul className="space-y-2 text-secondary/70 dark:text-primary/70">
                <li><a href="#" className="hover:text-accent transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-accent/20 pt-8">
            <p className="text-center text-secondary/60 dark:text-primary/60">
              © 2024 CAFM Portal. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}

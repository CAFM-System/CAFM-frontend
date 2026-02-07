import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

/* ================= MOTION PRESETS ================= */
const popupContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const popupItem = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 24,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.6,
    },
  },
};

export default function ContactUs() {
  return (
    <section
      id="contactUs"
      className="
        relative py-28 px-4 sm:px-6 lg:px-8
        bg-primary dark:bg-secondary overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className="
          absolute -top-40 left-1/2 -translate-x-1/2
          w-[700px] h-[700px]
          bg-accent/20 dark:bg-accent/10
          blur-[160px] rounded-full pointer-events-none
        "
      />

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER – POPUP */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 20,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: false, margin: "-120px" }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.7,
          }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold
                         text-secondary dark:text-primary mb-4">
            Contact <span className="text-accent">Us</span>
          </h2>

          <p className="text-secondary/70 dark:text-primary/70">
            Realty Management Services (Pvt) Ltd
          </p>
        </motion.div>

        {/* CONTACT CARDS – STAGGERED POPUP */}
        <motion.div
          variants={popupContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-80px" }}
          className="grid md:grid-cols-4 gap-10 mb-20"
        >
          <ContactCard
            icon={Mail}
            title="Email"
            value="hr@rms.lk"
            link="mailto:hr@rms.lk"
          />

          <ContactCard
            icon={Phone}
            title="Phone"
            value="011 234 6333"
            link="tel:0112346333"
          />

          <ContactCard
            icon={MapPin}
            title="Address"
            value="18–01 East Tower, World Trade Center, Colombo 01"
            link="https://www.google.com/maps/search/?api=1&query=World+Trade+Center+Colombo+01"
          />

          {/* LINKEDIN */}
          <motion.a
            variants={popupItem}
            href="https://lk.linkedin.com/company/realty-management-services-pvt-ltd"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -10, scale: 1.02 }}
            className="
              group relative rounded-3xl p-8 text-center
              bg-primary/70 dark:bg-secondary/60
              backdrop-blur-xl
              border border-accent/20
              shadow-lg hover:shadow-2xl
              transition-all
            "
          >
            {/* Tooltip */}
            <div
              className="
                absolute -top-10 left-1/2 -translate-x-1/2
                px-3 py-1 rounded-md text-xs
                bg-secondary text-primary
                dark:bg-primary dark:text-secondary
                opacity-0 group-hover:opacity-100
                transition pointer-events-none
              "
            >
              Company size: 201–500 employees
            </div>

            <div
              className="
                w-16 h-16 mx-auto mb-6
                flex items-center justify-center
                rounded-xl
                bg-accent text-secondary
                dark:text-primary
                shadow-md
                group-hover:scale-110 transition
              "
            >
              <Linkedin className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-semibold text-secondary dark:text-primary">
              LinkedIn
            </h3>

            <p className="text-sm text-secondary/60 dark:text-primary/60">
              Industry: Real Estate
            </p>
          </motion.a>
        </motion.div>

        {/* GOOGLE MAP – GLASS CARD */}
        <motion.div
          variants={popupItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            rounded-3xl overflow-hidden
            bg-primary/70 dark:bg-secondary/60
            backdrop-blur-xl
            border border-accent/20
            shadow-xl
          "
        >
          <iframe
            title="RMS Location"
            src="https://www.google.com/maps?q=World%20Trade%20Center%20Colombo%2001&output=embed"
            className="
              w-full h-[420px] border-0
              grayscale-[10%] dark:grayscale-0
              contrast-[0.95] dark:contrast-100
            "
            loading="lazy"
          />
        </motion.div>

      </div>
    </section>
  );
}

/* ================= REUSABLE CONTACT CARD ================= */
function ContactCard({ icon: Icon, title, value, link }) {
  return (
    <motion.a
      variants={popupItem}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -10, scale: 1.02 }}
      className="
        group rounded-3xl p-8 text-center
        bg-primary/70 dark:bg-secondary/60
        backdrop-blur-xl
        border border-accent/20
        shadow-lg hover:shadow-2xl
        transition-all
      "
    >
      <div
        className="
          w-16 h-16 mx-auto mb-6
          flex items-center justify-center
          rounded-xl
          bg-accent text-secondary
          dark:text-primary
          shadow-md
          group-hover:scale-110 transition
        "
      >
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
        {title}
      </h3>

      <p className="text-secondary/70 dark:text-primary/70 text-sm">
        {value}
      </p>
    </motion.a>
  );
}

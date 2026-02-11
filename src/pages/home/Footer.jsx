export default function Footer({ scrollToSection = () => {} }) {
  return (
    <footer
      className="
        relative bg-primary dark:bg-secondary
        border-t border-accent/20
        py-20 px-4 sm:px-6 lg:px-8
      "
    >
      <div className="max-w-7xl mx-auto">
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
            <h4 className="text-lg font-semibold mb-4 text-secondary dark:text-primary">
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
            <h4 className="text-lg font-semibold mb-4 text-secondary dark:text-primary">
              Support
            </h4>
            <ul className="space-y-2 text-secondary/70 dark:text-primary/70">
              <li><a href="#" className="hover:text-accent">Help Center</a></li>
              <li><a href="#" className="hover:text-accent">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary dark:text-primary">
              Legal
            </h4>
            <ul className="space-y-2 text-secondary/70 dark:text-primary/70">
              <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/20 pt-8">
          <p className="text-center text-secondary/60 dark:text-primary/60">
            © 2024 CAFM Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

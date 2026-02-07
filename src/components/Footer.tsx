const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-bold tracking-tight mb-4">
              Meridian<span className="text-accent">.</span>
            </h3>
            <p className="text-primary-foreground/60 leading-relaxed text-sm">
              Premium land development creating thriving communities across the
              Southwest since 2001.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
              Company
            </h4>
            <ul className="space-y-3">
              {["About", "Team", "Careers", "News"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Site Selection",
                "Master Planning",
                "Infrastructure",
                "Entitlements",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
              Connect
            </h4>
            <ul className="space-y-3">
              {["LinkedIn", "Instagram", "Twitter", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © 2026 Meridian Development Group. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-primary-foreground/40 hover:text-primary-foreground text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-primary-foreground/40 hover:text-primary-foreground text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

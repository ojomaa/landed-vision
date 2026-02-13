import { Link } from "react-router-dom";
import logo from "@/assets/incon-logo-vert.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img src={logo} alt="Incon" className="h-14 mb-4 brightness-0 invert" />
            </Link>
            <p className="text-primary-foreground/60 leading-relaxed text-sm">
              Premium land development creating thriving communities across the
              Southwest since 2001.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
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
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/"
                    className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © 2026 Incon. All rights reserved.
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

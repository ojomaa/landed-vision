import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Compass, Building2, TreePine, Route, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: MapPin,
    title: "Site Selection & Acquisition",
    description:
      "Strategic land identification and acquisition leveraging deep market intelligence and established landowner relationships.",
  },
  {
    icon: Compass,
    title: "Master Planning",
    description:
      "Comprehensive community design integrating residential, commercial, and recreational spaces into cohesive, livable neighborhoods.",
  },
  {
    icon: Building2,
    title: "Infrastructure Development",
    description:
      "Roads, utilities, drainage, and public amenities engineered to the highest standards for long-term community value.",
  },
  {
    icon: TreePine,
    title: "Environmental Stewardship",
    description:
      "Sustainable practices woven into every project—preserving natural features, managing stormwater, and enhancing green space.",
  },
  {
    icon: Route,
    title: "Entitlements & Permitting",
    description:
      "Navigating zoning, regulatory approvals, and municipal partnerships to streamline the path from vision to vertical construction.",
  },
  {
    icon: ShieldCheck,
    title: "Project Management",
    description:
      "End-to-end oversight ensuring every phase is delivered on time, on budget, and to the exacting quality our partners expect.",
  },
];

const ServicesSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-28 md:py-40 bg-secondary">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Full-Spectrum Capabilities
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From raw land to thriving communities, we handle every phase of the
            development lifecycle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-50px" });
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-background rounded-2xl p-8 lg:p-10 hover:shadow-lg transition-shadow duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="text-accent" size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

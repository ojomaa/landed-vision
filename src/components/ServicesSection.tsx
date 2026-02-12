import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Site Selection & Acquisition",
    description:
      "Strategic land identification and acquisition leveraging deep market intelligence and established landowner relationships.",
  },
  {
    title: "Master Planning",
    description:
      "Comprehensive community design integrating residential, commercial, and recreational spaces into cohesive, livable neighborhoods.",
  },
  {
    title: "Infrastructure Development",
    description:
      "Roads, utilities, drainage, and public amenities engineered to the highest standards for long-term community value.",
  },
  {
    title: "Environmental Stewardship",
    description:
      "Sustainable practices woven into every project—preserving natural features, managing stormwater, and enhancing green space.",
  },
  {
    title: "Entitlements & Permitting",
    description:
      "Navigating zoning, regulatory approvals, and municipal partnerships to streamline the path from vision to vertical construction.",
  },
  {
    title: "Project Management",
    description:
      "End-to-end oversight ensuring every phase is delivered on time, on budget, and to the exacting quality our partners expect.",
  },
];

const ServicesSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 border-b border-border pb-6"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Capabilities
          </h2>
        </motion.div>

        <div className="divide-y divide-border border-b border-border">
          {services.map((service, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-50px" });

            return (
              <motion.div
                key={service.title}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group grid md:grid-cols-2 gap-4 md:gap-12 py-10 md:py-14 items-start"
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl md:text-6xl font-bold text-accent/20 leading-none group-hover:text-accent/40 transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight pt-2">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed md:pt-3">
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

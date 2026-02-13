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
    <section id="services" className="pt-20 pb-0">
      <div className="max-w-[95vw] mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Capabilities
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
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
                className="group relative bg-primary p-8 md:p-10 min-h-[280px] md:min-h-[320px] flex flex-col justify-end"
              >
                <span className="font-display text-5xl md:text-6xl font-bold text-primary-foreground/10 leading-none absolute top-6 right-8 group-hover:text-primary-foreground/20 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground tracking-tight mb-4 relative z-10">
                  {service.title}
                </h3>
                <p className="text-primary-foreground/60 leading-relaxed text-sm relative z-10">
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

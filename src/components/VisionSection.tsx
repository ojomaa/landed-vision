import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import visionBg from "@/assets/vision-bg.jpg";

const stats = [
  { value: "50+", label: "Communities Built" },
  { value: "12K", label: "Acres Developed" },
  { value: "25", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="relative py-28 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={visionBg}
          alt="Pristine green landscape with river"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/75" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Our Vision
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tight leading-tight">
            Every great community
            <br />
            <span className="italic font-normal">begins with the land.</span>
          </h2>
          <p className="mt-8 text-primary-foreground/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            For over two decades, Meridian has been at the forefront of
            responsible land development. We see beyond the terrain—envisioning
            the neighborhoods, workplaces, and gathering places that will define
            communities for generations.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-4xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-accent">
                {stat.value}
              </p>
              <p className="mt-2 text-primary-foreground/60 text-sm tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;

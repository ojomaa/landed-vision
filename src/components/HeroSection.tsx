import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Aerial view of master-planned community at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-primary-foreground/80 text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-6"
        >
          Premium Land Development
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto"
        >
          Shaping the Land.
          <br />
          <span className="italic font-normal">Building the Future.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body"
        >
          We transform raw landscapes into thriving communities, commercial
          destinations, and mixed-use developments that stand the test of time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="bg-primary-foreground text-primary px-8 py-4 font-medium rounded-full hover:opacity-90 transition-opacity duration-300 text-base"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-medium rounded-full hover:bg-primary-foreground/10 transition-colors duration-300 text-base"
          >
            Start a Project
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-primary-foreground/50" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import visionBg from "@/assets/vision-bg.jpg";

const stats = [
  { value: "50+", label: "Communities Built" },
  { value: "12K", label: "Acres Developed" },
  { value: "25", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

const Vision = () => {
  const missionRef = useRef(null);
  const statsRef = useRef(null);
  const approachRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isApproachInView = useInView(approachRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0">
          <img
            src={visionBg}
            alt="Our Vision"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tight">
              Every Great Community Begins with the Land
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-8 pb-6 border-b border-border">
              Shaping the Land. Building the Future.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe that thoughtful land development has the power to transform communities for generations. Our mission is to create spaces where people thrive—neighborhoods where families grow, business districts where innovation flourishes, and destinations where communities come together. We approach every project with a deep respect for the land and an unwavering commitment to the people who will call it home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
              25 Years of Building Communities
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="mt-2 text-primary-foreground/60 text-sm tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            ref={approachRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-8 pb-6 border-b border-border">
              Responsible Development
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                At Incon, we see beyond the terrain. We envision the neighborhoods, workplaces, and gathering places that will define communities for generations. Our approach combines deep expertise in land development with a forward-thinking commitment to sustainability and community impact.
              </p>
              <p>
                Every project begins with listening—to the land, to the community, and to our partners. We study the natural features, understand local needs, and identify opportunities to create lasting value. This foundation of careful research and collaboration guides every decision we make.
              </p>
              <p>
                From site selection to final development, we maintain the highest standards of environmental stewardship. We preserve natural features where possible, implement sustainable infrastructure, and design communities that minimize their footprint while maximizing quality of life.
              </p>
            </div>

            <div className="mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-medium hover:opacity-90 transition-opacity duration-300"
              >
                Start a Project
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Vision;

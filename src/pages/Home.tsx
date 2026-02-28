import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import { ImagesSlider } from "@/components/ui/images-slider";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

// Import assets
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

// Get 4 featured projects (mix of current and future)
const featuredProjects = projects.filter((p) => p.status === "current" || p.status === "future").slice(0, 4);

const HomeContent = () => {
  const projectsRef = useRef(null);
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Featured Projects Preview */}
      <section className="pb-0">
        <div className="text-center mb-8">
          <motion.div
            ref={projectsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
              Developments
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              View All
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-2 max-w-[95vw] mx-auto">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group relative block overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-medium">
                      {project.category}
                    </span>
                    <span className="text-white/30">|</span>
                    <span className="text-white/60 text-xs tracking-wide">
                      {project.location}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-5 text-sm">
                    {project.stats.acres && (
                      <div>
                        <span className="text-white font-semibold">{project.stats.acres}</span>
                        <span className="text-white/60 ml-1">acres</span>
                      </div>
                    )}
                    {project.stats.units && (
                      <div>
                        <span className="text-white font-semibold">{project.stats.units}</span>
                        <span className="text-white/60 ml-1">units</span>
                      </div>
                    )}
                    {project.stats.sqft && (
                      <div>
                        <span className="text-white font-semibold">{project.stats.sqft}</span>
                        <span className="text-white/60 ml-1">sq ft</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <ServicesSection />

      {/* CTA Section */}
      <section className="mt-20 py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight mb-6">
            Ready to Build Something Remarkable?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
            Whether you have land to develop or a vision to bring to life, we're here to help turn possibilities into reality.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4  font-medium hover:opacity-90 transition-opacity duration-300"
          >
            Start a Conversation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

const Home = () => {
  const sliderImages = [heroSlide1, heroSlide2, heroSlide3];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ImagesSlider className="h-[100dvh]" images={sliderImages}>
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="text-xs md:text-sm tracking-[0.3em] uppercase font-medium text-white/70 mb-4">
            Land Development Excellence
          </motion.p>
          <motion.h1 className="font-condensed font-bold text-4xl md:text-6xl lg:text-7xl text-center text-white tracking-tight uppercase py-4">
            Building Tomorrow's
            <br />
            Communities
          </motion.h1>
        </motion.div>
      </ImagesSlider>
      <HomeContent />
    </main>
  );
};

export default Home;

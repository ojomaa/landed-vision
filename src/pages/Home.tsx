import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

// Import assets
import heroBg from "@/assets/hero-bg.jpg";
import heroVideo from "@/assets/hero-video.mp4";

// Get 3 featured projects (mix of current and future)
const featuredProjects = projects.filter((p) => p.status === "current" || p.status === "future").slice(0, 3);

const HomeContent = () => {
  const projectsRef = useRef(null);
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Featured Projects Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            ref={projectsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-end justify-between mb-12 border-b border-border pb-6"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Developments
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              View All
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>

          <div className="space-y-0 divide-y divide-border">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className={`group grid md:grid-cols-2 gap-6 md:gap-12 py-10 md:py-14 items-center ${
                    index % 2 !== 0 ? "md:direction-rtl" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${index % 2 !== 0 ? "md:order-2" : ""}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className={index % 2 !== 0 ? "md:order-1" : ""}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-accent text-xs tracking-[0.2em] uppercase font-medium">
                        {project.category}
                      </span>
                      <span className="text-border">|</span>
                      <span className="text-muted-foreground text-xs tracking-wide">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      {project.stats.acres && (
                        <div>
                          <span className="text-foreground font-semibold">{project.stats.acres}</span>
                          <span className="text-muted-foreground ml-1">acres</span>
                        </div>
                      )}
                      {project.stats.units && (
                        <div>
                          <span className="text-foreground font-semibold">{project.stats.units}</span>
                          <span className="text-muted-foreground ml-1">units</span>
                        </div>
                      )}
                      {project.stats.sqft && (
                        <div>
                          <span className="text-foreground font-semibold">{project.stats.sqft}</span>
                          <span className="text-muted-foreground ml-1">sq ft</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                      View Project
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              View All Projects
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight mb-6">
            Ready to Build Something
            <br />
            <span className="italic font-normal">Remarkable?</span>
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
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={heroVideo}
        bgImageSrc={heroBg}
        title="Building Tomorrow's Communities"
        subtitle="Land Development Excellence"
        scrollToExpand="Scroll to explore"
        textBlend
      >
        <HomeContent />
      </ScrollExpandMedia>
    </main>
  );
};

export default Home;

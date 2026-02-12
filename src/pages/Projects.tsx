import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects, ProjectStatus } from "@/data/projects";

const tabs = [
  { id: "current" as ProjectStatus, label: "Current" },
  { id: "past" as ProjectStatus, label: "Completed" },
  { id: "future" as ProjectStatus, label: "Upcoming" },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState<ProjectStatus>("current");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects = projects.filter((p) => p.status === activeTab);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
              Developments
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-4 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div ref={ref}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="divide-y divide-border border-b border-border"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className={`group grid md:grid-cols-2 gap-6 md:gap-12 py-10 md:py-14 items-center ${
                        index % 2 !== 0 ? "" : ""
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
                        <div className="flex items-center gap-6 text-sm mb-6">
                          <div>
                            <span className="text-foreground font-semibold">{project.stats.acres}</span>
                            <span className="text-muted-foreground ml-1">acres</span>
                          </div>
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
                          <div>
                            <span className="text-muted-foreground">
                              {project.status === "past" ? "Completed" : project.status === "current" ? "Est." : "Planned"}{" "}
                              {project.stats.year}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                          View Project
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No projects in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Projects;

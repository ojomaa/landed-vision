import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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

      {/* Header + Tabs */}
      <section className="pt-24 md:pt-28">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6"
          >
            Developments
          </motion.h1>

          <div className="flex justify-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pt-6 pb-0" ref={ref}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-2 p-2"
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
                      <div>
                        <span className="text-white font-semibold">{project.stats.acres}</span>
                        <span className="text-white/60 ml-1">acres</span>
                      </div>
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
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No projects in this category yet.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Projects;

import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveSiteMap from "@/components/InteractiveSiteMap";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Ruler, Building2, Home, Check } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Get related projects (same category, excluding current)
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32">
        <div className="relative h-[50vh] md:h-[60vh]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Project Info Overlay */}
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative -mt-32 md:-mt-40 bg-background rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl"
          >
            {/* Back link */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-6"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Back to Projects</span>
            </Link>

            {/* Status badge */}
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === "past"
                    ? "bg-muted text-muted-foreground"
                    : project.status === "current"
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {project.status === "past" && "Completed"}
                {project.status === "current" && "In Progress"}
                {project.status === "future" && "Coming Soon"}
              </span>
              <span className="text-accent text-xs tracking-[0.2em] uppercase font-medium ml-4">
                {project.category}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                {project.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-accent" />
                {project.status === "past" ? "Completed" : project.status === "current" ? "Est." : "Planned"}{" "}
                {project.stats.year}
              </div>
              <div className="flex items-center gap-2">
                <Ruler size={16} className="text-accent" />
                {project.stats.acres} acres
              </div>
              {project.stats.units && (
                <div className="flex items-center gap-2">
                  <Home size={16} className="text-accent" />
                  {project.stats.units} units
                </div>
              )}
              {project.stats.sqft && (
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-accent" />
                  {project.stats.sqft} sq ft
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full Description */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Project Overview
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.fullDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Site Map */}
      {project.siteMap && (
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {project.lots ? "Available Lots" : "Site Development Plan"}
              </h2>
              <div className="bg-background rounded-2xl p-4 md:p-8 shadow-lg">
                {project.lots ? (
                  <InteractiveSiteMap
                    image={project.siteMap}
                    imageAlt={`${project.title} Site Development Plan`}
                    lots={project.lots}
                  />
                ) : (
                  <>
                    <img
                      src={project.siteMap}
                      alt={`${project.title} Site Development Plan`}
                      className="w-full h-auto rounded-xl"
                    />
                    <p className="text-muted-foreground text-sm text-center mt-4">
                      Site plan showing lot layouts, preserved areas, and community amenities.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className={`py-16 md:py-24 ${project.siteMap ? "" : "bg-secondary"}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-background p-4 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Interested in This Project?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {project.status === "past"
                ? "Learn more about our completed developments and how we can bring similar success to your project."
                : project.status === "current"
                ? "Contact us to learn about availability and opportunities in this development."
                : "Get in touch to be notified when this project launches and explore partnership opportunities."}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Related Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.id}
                    to={`/projects/${related.slug}`}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-2xl mb-4">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <span className="text-accent text-xs tracking-[0.2em] uppercase font-medium">
                      {related.category}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground mt-1 group-hover:text-accent transition-colors duration-300">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {related.location}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ProjectDetail;

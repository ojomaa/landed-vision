import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveSiteMap from "@/components/InteractiveSiteMap";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/storage";

const GallerySection = ({ images, title }: { images: string[]; title: string }) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalPages = Math.ceil(images.length / 2);

  const go = (dir: number) => {
    setDirection(dir);
    setPage((prev) => (prev + dir + totalPages) % totalPages);
  };

  const pair = images.slice(page * 2, page * 2 + 2);

  return (
    <section className="pb-8 md:pb-10">
      <div className="max-w-[95vw] mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
          Gallery
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              className="grid grid-cols-2 gap-2"
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {pair.map((image, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={image}
                    alt={`${title} — ${page * 2 + index + 1}`}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary hover:opacity-90 text-primary-foreground p-3 transition-opacity duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:opacity-90 text-primary-foreground p-3 transition-opacity duration-300"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium px-3 py-1.5">
                {page + 1} / {totalPages}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = getProjects()
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header with background image */}
      <section className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="max-w-[95vw] mx-auto">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 mb-8"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Back to Projects</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                    project.status === "past"
                      ? "bg-white/20 text-white/80"
                      : project.status === "current"
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {project.status === "past" && "Completed"}
                  {project.status === "current" && "In Progress"}
                  {project.status === "future" && "Coming Soon"}
                </span>
                <span className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium">
                  {project.category}
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                {project.title}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </motion.div>
            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 border-t border-white/20 pt-8"
            >
              <div>
                <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium mb-1">Location</p>
                <p className="text-white font-medium">{project.location}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium mb-1">Year</p>
                <p className="text-white font-medium">
                  {project.status === "past" ? "Completed" : project.status === "current" ? "Est." : "Planned"}{" "}
                  {project.stats.year}
                </p>
              </div>
              <div>
                <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium mb-1">Acreage</p>
                <p className="text-white font-medium">{project.stats.acres} acres</p>
              </div>
              {project.stats.units && (
                <div>
                  <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium mb-1">Units</p>
                  <p className="text-white font-medium">{project.stats.units}</p>
                </div>
              )}
              {project.stats.sqft && (
                <div>
                  <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium mb-1">Size</p>
                  <p className="text-white font-medium">{project.stats.sqft} sq ft</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview + Features */}
      <section className="py-12 md:py-16">
        <div className="max-w-[95vw] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">
              Overview
            </h2>
            {project.fullDescription && (
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                {project.fullDescription}
              </p>
            )}
            <div className="grid md:grid-cols-2 gap-x-8">
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border-t border-border py-4 flex items-center gap-3"
                >
                  <Check size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <GallerySection images={project.gallery} title={project.title} />
      )}

      {/* Site Map */}
      {project.siteMap && (
        <section className="pb-20 md:pb-32">
          <div className="max-w-[95vw] mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight text-center">
              {project.lots ? "Available Lots" : "Site Development Plan"}
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="max-w-[95vw] mx-auto" style={{ maxHeight: "85vh" }}>
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
                    className="w-full h-auto max-h-[75vh] object-contain"
                  />
                  <p className="text-muted-foreground text-sm text-center mt-4">
                    Site plan showing lot layouts, preserved areas, and community amenities.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-[95vw] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight mb-4">
              Interested in This Project?
            </h2>
            <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto mb-8">
              {project.status === "past"
                ? "Learn more about our completed developments and how we can bring similar success to your project."
                : project.status === "current"
                ? "Contact us to learn about availability and opportunities in this development."
                : "Get in touch to be notified when this project launches and explore partnership opportunities."}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 font-medium hover:opacity-90 transition-opacity duration-300"
            >
              Get in Touch
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Projects — image overlay cards */}
      {relatedProjects.length > 0 && (
        <section className="pt-20 pb-0">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Related Projects
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-2 max-w-[95vw] mx-auto">
            {relatedProjects.map((related, index) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link
                  to={`/projects/${related.slug}`}
                  className="group relative block overflow-hidden"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-medium">
                        {related.category}
                      </span>
                      <span className="text-white/30">|</span>
                      <span className="text-white/60 text-xs tracking-wide">
                        {related.location}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className="pt-20">
        <Footer />
      </div>
    </main>
  );
};

export default ProjectDetail;

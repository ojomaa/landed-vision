import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectMixeduse from "@/assets/project-mixeduse.jpg";

const projects = [
  {
    title: "Crestview Estates",
    category: "Residential Community",
    description:
      "A 320-acre master-planned residential community featuring luxury homesites, parks, and walking trails nestled among rolling terrain.",
    image: projectResidential,
    stats: "320 Acres • 450 Lots • Phase III",
  },
  {
    title: "Summit Business Park",
    category: "Commercial Development",
    description:
      "A 150-acre Class A commercial campus with modern infrastructure, green corridors, and direct highway access for premier business tenants.",
    image: projectCommercial,
    stats: "150 Acres • 12 Buildings • Completed",
  },
  {
    title: "Harborwalk District",
    category: "Mixed-Use Development",
    description:
      "A vibrant 85-acre mixed-use destination blending retail, dining, residential, and community spaces into one walkable neighborhood.",
    image: projectMixeduse,
    stats: "85 Acres • Mixed-Use • Phase II",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <p className="text-accent text-sm font-medium tracking-[0.15em] uppercase mb-2">
        {project.category}
      </p>
      <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
        {project.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-4 max-w-md">
        {project.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {project.stats}
        </span>
        <span className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
          View Project <ArrowRight size={16} />
        </span>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-28 md:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Featured Projects
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Our Finest Work
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From concept to completion, each development reflects our commitment to
            quality, sustainability, and community building.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

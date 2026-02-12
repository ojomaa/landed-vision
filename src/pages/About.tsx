import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import visionBg from "@/assets/vision-bg.jpg";

const teamMembers = [
  {
    name: "James Mitchell",
    role: "Founder & CEO",
    bio: "25+ years of experience in land development across the Southwest.",
  },
  {
    name: "Sarah Chen",
    role: "Chief Development Officer",
    bio: "Leads project planning and execution for all major developments.",
  },
  {
    name: "Marcus Rodriguez",
    role: "VP of Operations",
    bio: "Oversees day-to-day operations and strategic partnerships.",
  },
  {
    name: "Emily Thompson",
    role: "Director of Sustainability",
    bio: "Champions environmental stewardship across all projects.",
  },
];

const values = [
  {
    title: "Integrity",
    description: "We build trust through transparency and ethical practices in every interaction.",
  },
  {
    title: "Excellence",
    description: "We pursue the highest standards in planning, execution, and community impact.",
  },
  {
    title: "Sustainability",
    description: "We develop land responsibly, preserving resources for future generations.",
  },
  {
    title: "Partnership",
    description: "We collaborate closely with communities, investors, and stakeholders.",
  },
];

const About = () => {
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0">
          <img
            src={visionBg}
            alt="About Incon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">
              About Us
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tight">
              Building Communities
              <br />
              <span className="italic font-normal">Since 2001</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Our Story
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-8">
              From Vision to Reality
            </h2>
            <div className="prose prose-lg text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Incon was founded with a simple belief: that thoughtful land development can transform not just landscapes, but lives. What began as a small team with big ambitions has grown into one of the Southwest's most respected development firms.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Over the past two decades, we've developed more than 12,000 acres across Texas, Arizona, and New Mexico. Each project reflects our commitment to creating spaces where communities can thrive—residential neighborhoods where families grow, commercial centers where businesses flourish, and mixed-use destinations where people connect.
              </p>
              <p className="text-lg leading-relaxed">
                Today, Incon continues to push the boundaries of what's possible in land development. We combine decades of expertise with forward-thinking approaches to sustainability, technology, and community design. Our legacy isn't just measured in acres developed, but in the lasting value we create for the people who live, work, and gather in the spaces we help bring to life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Our Values
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              What Guides Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-background p-8 rounded-2xl"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            ref={teamRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">
              Leadership
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Our Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-muted-foreground">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;

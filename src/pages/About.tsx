import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import visionBg from "@/assets/vision-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const teamMembers = [
  {
    name: "James Mitchell",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
  },
  {
    name: "Sarah Chen",
    role: "Chief Development Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=face",
  },
  {
    name: "Marcus Rodriguez",
    role: "VP of Operations",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
  },
  {
    name: "Emily Thompson",
    role: "Director of Sustainability",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face",
  },
];

const About = () => {
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — full page image with centered text */}
      <section className="relative h-screen">
        <img
          src={visionBg}
          alt="Aerial view of land development"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-center px-6"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Opening statement — big editorial text */}
      <section className="py-20 md:py-32">
        <div className="max-w-[95vw] mx-auto">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-snug tracking-tight">
              We started with a simple idea: that the land beneath our feet shapes the way we live. In 2001, we set out to build communities that people are proud to call home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Split — image left, text right */}
      <section>
        <div className="max-w-[95vw] mx-auto">
          <div className="grid md:grid-cols-2 gap-2">
            <div className="overflow-hidden">
              <img
                src={heroBg}
                alt="Community development"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <motion.div
              ref={missionRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-primary p-10 md:p-16 flex flex-col justify-center"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground tracking-tight mb-6">
                12,000 acres. 50+ communities. 25 years.
              </h2>
              <p className="text-primary-foreground/60 leading-relaxed mb-6">
                From a small office in Austin, we've grown into one of the Southwest's most respected development firms. Every acre we touch reflects a commitment to the people who will eventually call it home.
              </p>
              <p className="text-primary-foreground/60 leading-relaxed">
                We don't just develop land — we listen to it. We study the terrain, understand the community, and build something that belongs there. That's been our approach from day one, and it's not changing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-2">
        <div className="max-w-[95vw] mx-auto relative overflow-hidden">
          <img
            src={visionBg}
            alt="Landscape"
            className="w-full aspect-[21/7] object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
              25 Years of Building Communities
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-white">50+</p>
                <p className="mt-2 text-white/50 text-xs tracking-[0.15em] uppercase font-medium">Communities Built</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-white">12K</p>
                <p className="mt-2 text-white/50 text-xs tracking-[0.15em] uppercase font-medium">Acres Developed</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-white">25</p>
                <p className="mt-2 text-white/50 text-xs tracking-[0.15em] uppercase font-medium">Years of Excellence</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-white">98%</p>
                <p className="mt-2 text-white/50 text-xs tracking-[0.15em] uppercase font-medium">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — minimal */}
      <section className="py-20 md:py-32">
        <div className="max-w-[95vw] mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
              What We Believe
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Four principles guide every project we take on.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-2">
            <div className="border-t border-border pt-8 px-2">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Integrity</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Transparency and ethical practices in every interaction.
              </p>
            </div>
            <div className="border-t border-border pt-8 px-2">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Excellence</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The highest standards in planning, execution, and impact.
              </p>
            </div>
            <div className="border-t border-border pt-8 px-2">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Sustainability</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Developing land responsibly for future generations.
              </p>
            </div>
            <div className="border-t border-border pt-8 px-2">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Partnership</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Close collaboration with communities and stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pb-0">
        <div className="max-w-[95vw] mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              The Team
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                ref={index === 0 ? teamRef : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20">
        <Footer />
      </div>
    </main>
  );
};

export default About;

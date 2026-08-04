import { motion } from "framer-motion";
import { GraduationCap, Target } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import PlayerProfile from "./PlayerProfile";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Character Info" title="The Developer" />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-[var(--color-text)]/90 text-base sm:text-lg leading-relaxed">
              I am a B.Tech Computer Science &amp; Engineering student passionate
              about game development and 3D digital experiences.
            </p>
            <p className="text-[var(--color-muted)] text-base leading-relaxed">
              My main focus is Unity game development and Blender 3D modeling.
              I enjoy building gameplay systems, interactive environments,
              vehicle mechanics, missions, UI systems, animations, and visual
              effects.
            </p>
            <p className="text-[var(--color-muted)] text-base leading-relaxed">
              I like working across both programming and creative sides of
              game development — from creating 3D assets in Blender to
              implementing them inside Unity and turning them into
              interactive gameplay experiences.
            </p>

            <div className="flex items-start gap-3 panel clip-corner p-5 mt-8">
              <Target size={20} className="text-[var(--color-purple)] shrink-0 mt-0.5" />
              <div>
                <p className="font-hud text-xs tracking-[0.2em] text-[var(--color-purple)] mb-1">
                  MISSION
                </p>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                  To create immersive and enjoyable interactive experiences
                  while continuously improving as a game developer.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <GraduationCap size={20} className="text-[var(--color-cyan)] shrink-0 mt-0.5" />
              <div className="font-data text-sm text-[var(--color-muted)]">
                <p className="text-[var(--color-text)]">
                  B.Tech — Computer Science &amp; Engineering (AI &amp; ML)
                </p>
                <p>BVC College of Engineering</p>
                <p>Expected Graduation: 2027 · CGPA: 8.8</p>
              </div>
            </div>
          </motion.div>

          <div className="flex lg:justify-end">
            <PlayerProfile />
          </div>
        </div>
      </div>
    </section>
  );
}

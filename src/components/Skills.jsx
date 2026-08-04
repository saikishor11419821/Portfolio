import { motion } from "framer-motion";
import SectionHeading from "./HUD/SectionHeading";
import Reticle from "./HUD/Reticle";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Loadout"
          title="Gameplay Arsenal"
          subtitle="The tools and systems I reach for when building a game, from first prototype to a shippable build."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Reticle className="panel clip-corner p-6 h-full" tone={i % 2 === 0 ? "cyan" : "purple"}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-hud text-sm tracking-[0.15em] uppercase text-[var(--color-text)]">
                    {group.title}
                  </h3>
                  <span className="font-data text-[10px] text-[var(--color-dim)]">{group.code}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-data text-[11px] px-2.5 py-1 border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]/40 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reticle>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

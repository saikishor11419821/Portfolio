import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import Reticle from "./HUD/Reticle";
import MediaModal from "./MediaModal";
import { gameplaySystems } from "../data/gameplay";

export default function GameplayShowcase() {
  const [active, setActive] = useState(null);

  return (
    <section id="gameplay" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Systems Online"
          title="Gameplay Systems"
          subtitle="The actual gameplay systems I've implemented — click any card for a fullscreen look at the media."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gameplaySystems.map((sys, i) => (
            <motion.button
              key={sys.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              onClick={() => setActive(sys)}
              className="text-left"
            >
              <Reticle className="panel clip-corner p-6 h-full" tone="blue">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-data text-[10px] tracking-[0.2em] text-[var(--color-blue)] uppercase">
                    {sys.tag}
                  </span>
                  <Maximize2 size={14} className="text-[var(--color-dim)]" />
                </div>
                <h3 className="font-hud text-base uppercase tracking-[0.05em] text-[var(--color-text)] mb-3">
                  {sys.title}
                </h3>
                <ul className="flex flex-wrap gap-1.5 mb-3">
                  {sys.points.map((p) => (
                    <li key={p} className="font-data text-[10px] px-2 py-0.5 border border-[var(--color-line)] text-[var(--color-muted)]">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">{sys.description}</p>
              </Reticle>
            </motion.button>
          ))}
        </div>
      </div>

      <MediaModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}

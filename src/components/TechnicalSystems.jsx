import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import Reticle from "./HUD/Reticle";
import { technicalSystems } from "../data/skills";

export default function TechnicalSystems() {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Engineering"
          title="Under the Hood"
          subtitle="Technical systems implemented across DriveVerse City and other Unity projects."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {technicalSystems.map((sys, i) => (
            <motion.div
              key={sys.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.07 }}
            >
              <Reticle className="panel clip-corner p-5 h-full" tone="cyan">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu size={16} className="text-[var(--color-cyan)]" />
                  <h3 className="font-hud text-sm uppercase tracking-[0.05em] text-[var(--color-text)]">
                    {sys.title}
                  </h3>
                </div>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4">{sys.what}</p>
                <div className="flex flex-wrap gap-1.5">
                  {sys.tech.map((t) => (
                    <span key={t} className="font-data text-[9px] px-1.5 py-0.5 border border-[var(--color-line)] text-[var(--color-dim)]">
                      {t}
                    </span>
                  ))}
                </div>
              </Reticle>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

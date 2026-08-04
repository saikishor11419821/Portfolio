import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import Reticle from "./HUD/Reticle";
import { certifications } from "../data/certifications";

export default function Certifications() {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Unlocked" title="Achievements &amp; Certifications" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.08 }}
            >
              <Reticle className="panel clip-corner p-5 h-full flex flex-col items-start gap-3" tone="purple">
                <Award size={22} className="text-[var(--color-purple)]" />
                <p className="font-hud text-sm uppercase tracking-[0.04em] text-[var(--color-text)] leading-snug">
                  {c.title}
                </p>
                <p className="font-data text-[11px] text-[var(--color-dim)] uppercase tracking-wide">
                  {c.issuer}
                </p>
              </Reticle>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

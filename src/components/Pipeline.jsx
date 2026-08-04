import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import { artPipeline, devWorkflow } from "../data/skills";

export default function Pipeline() {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Art Pipeline" title="My Game Art Pipeline" />

        <div className="flex flex-wrap items-center gap-x-2 gap-y-4 mb-24">
          {artPipeline.map((stage, i) => (
            <div key={stage} className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="panel clip-corner px-4 py-2.5 font-data text-xs tracking-[0.1em] uppercase text-[var(--color-text)]"
              >
                {stage}
              </motion.div>
              {i < artPipeline.length - 1 && (
                <ArrowRight size={16} className="text-[var(--color-cyan)] shrink-0" />
              )}
            </div>
          ))}
        </div>

        <SectionHeading eyebrow="Dev Process" title="How I Build a Game" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {devWorkflow.map((w, i) => (
            <motion.div
              key={w.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.08 }}
              className="relative"
            >
              <span className="font-hud text-4xl sm:text-5xl font-black text-[var(--color-line)]">
                {w.step}
              </span>
              <p className="font-hud text-sm uppercase tracking-[0.08em] text-[var(--color-text)] mt-2">
                {w.title}
              </p>
              {i < devWorkflow.length - 1 && (i + 1) % 4 !== 0 && (
                <ArrowRight
                  size={18}
                  className="hidden lg:block absolute top-2 -right-5 text-[var(--color-cyan)]/50"
                />
              )}
              {i < devWorkflow.length - 1 && (
                <ArrowDown size={18} className="lg:hidden mt-4 text-[var(--color-cyan)]/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Play, Code2, Car } from "lucide-react";
import GlowButton from "./HUD/GlowButton";
import Reticle from "./HUD/Reticle";
import { featuredProject } from "../data/projects";

export default function FeaturedGame() {
  const p = featuredProject;

  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 text-[var(--color-purple)]">
          <span className="w-6 h-px bg-[var(--color-purple)]" />
          <span className="font-data text-xs tracking-[0.3em] uppercase">Featured Build</span>
        </div>

        <Reticle className="panel clip-corner overflow-hidden" tone="purple" active>
          <div className="grid lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[280px] lg:min-h-[420px] flex items-center justify-center bg-[var(--color-navy)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(176,107,255,0.15), transparent 70%)" }}
              />
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex flex-col items-center gap-4 text-[var(--color-muted)]"
              >
                <Car size={72} strokeWidth={1} className="text-[var(--color-cyan)] text-glow-cyan" />
                <span className="font-data text-[11px] tracking-[0.2em] uppercase">
                  Cover art / gameplay capture goes here
                </span>
              </motion.div>
              <span className="absolute top-4 left-4 font-data text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-[var(--color-good)]/50 text-[var(--color-good)]">
                {p.status}
              </span>
            </motion.div>

            <div className="p-7 sm:p-10 flex flex-col justify-center">
              <p className="font-hud text-[11px] tracking-[0.25em] uppercase text-[var(--color-purple)] mb-2">
                {p.subtitle}
              </p>
              <h3 className="font-hud text-3xl sm:text-4xl font-bold uppercase text-[var(--color-text)] mb-4">
                {p.title}
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed mb-6">{p.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-6 font-data text-xs">
                {[
                  ["Genre", p.genre],
                  ["Engine", p.engine],
                  ["Platform", p.platform],
                  ["Status", p.status],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-[var(--color-line-soft)] py-1.5">
                    <span className="text-[var(--color-dim)] uppercase tracking-wide">{k}</span>
                    <span className="text-[var(--color-text)]">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-7">
                {p.features.slice(0, 8).map((f) => (
                  <span
                    key={f}
                    className="font-data text-[10px] px-2 py-1 border border-[var(--color-line)] text-[var(--color-muted)]"
                  >
                    {f}
                  </span>
                ))}
                <span className="font-data text-[10px] px-2 py-1 text-[var(--color-dim)]">
                  +{p.features.length - 8} more
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-7">
                {p.tech.map((t) => (
                  <span key={t} className="font-data text-[10px] tracking-wide text-[var(--color-cyan)]">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <GlowButton as="a" href={p.playUrl} target="_blank" rel="noreferrer" icon={Play}>
                  Play Game
                </GlowButton>
                <GlowButton as="a" href={p.githubUrl} target="_blank" rel="noreferrer" variant="outline" icon={Code2}>
                  View Source
                </GlowButton>
              </div>
            </div>
          </div>
        </Reticle>
      </div>
    </section>
  );
}

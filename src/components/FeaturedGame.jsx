import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Code2, Car, ChevronLeft, ChevronRight } from "lucide-react";
import GlowButton from "./HUD/GlowButton";
import Reticle from "./HUD/Reticle";
import { featuredProject } from "../data/projects";

export default function FeaturedGame() {
  const p = featuredProject;
  const [imageIndex, setImageIndex] = useState(0);
  const gallery = Array.isArray(p.gallery) && p.gallery.length ? p.gallery : p.cover ? [p.cover] : [];
  const imageSrc = gallery.length ? gallery[imageIndex % gallery.length] : null;

  const showPrevious = () => setImageIndex((value) => (value - 1 + gallery.length) % gallery.length);
  const showNext = () => setImageIndex((value) => (value + 1) % gallery.length);

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
              {gallery.length ? (
              <div className="relative flex items-center justify-center w-full h-full px-4 py-6">
                <div className="relative w-full max-w-[88%] max-h-[380px] rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[#040b12]/80 shadow-[0_40px_100px_rgba(0,0,0,0.35)] overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={`${p.title} screenshot ${imageIndex + 1}`}
                    className="h-full w-full object-contain bg-[#07131b]"
                  />

                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrevious}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[rgba(0,0,0,0.55)] p-3 text-[var(--color-cyan)] hover:bg-[rgba(0,0,0,0.7)]"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-line)] bg-[rgba(0,0,0,0.55)] p-3 text-[var(--color-cyan)] hover:bg-[rgba(0,0,0,0.7)]"
                        aria-label="Next image"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>
                {gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-[rgba(0,0,0,0.5)] px-3 py-1.5 border border-[var(--color-line)]">
                    {gallery.map((_, index) => (
                      <span
                        key={index}
                        className={`block h-2 w-2 rounded-full ${index === imageIndex ? "bg-[var(--color-cyan)]" : "bg-[var(--color-line)]"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : p.video ? (
              <video
                className="relative h-full w-full object-contain"
                src={p.video}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : p.cover ? (
              <div className="relative flex items-center justify-center w-full h-full px-4 py-6">
                <div className="relative w-full max-w-[88%] max-h-[380px] rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[#040b12]/80 shadow-[0_40px_100px_rgba(0,0,0,0.35)] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={`${p.title} cover`}
                    className="h-full w-full object-contain bg-[#07131b]"
                  />
                </div>
              </div>
            ) : (
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
            )}
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

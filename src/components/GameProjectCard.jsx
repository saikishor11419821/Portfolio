import { motion } from "framer-motion";
import { Play, Code2, Video, Gamepad2 } from "lucide-react";
import Reticle from "./HUD/Reticle";

const STATUS_TONE = {
  Playable: "text-[var(--color-good)] border-[var(--color-good)]/40",
  "In Development": "text-[var(--color-cyan)] border-[var(--color-cyan)]/40",
  Prototype: "text-[var(--color-purple)] border-[var(--color-purple)]/40",
  "Coming Soon": "text-[var(--color-dim)] border-[var(--color-line)]",
};

export default function GameProjectCard({ project, index = 0 }) {
  const isPlaceholder = project.title === "Coming Soon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
    >
      <Reticle className="panel clip-corner overflow-hidden h-full flex flex-col" tone="cyan">
        <div className="relative h-40 bg-[var(--color-navy)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <Gamepad2
            size={40}
            strokeWidth={1}
            className={isPlaceholder ? "text-[var(--color-dim)]" : "text-[var(--color-cyan)]"}
          />
          <span
            className={`absolute top-3 left-3 font-data text-[10px] tracking-[0.15em] uppercase px-2 py-1 border ${STATUS_TONE[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-hud text-base tracking-[0.05em] uppercase text-[var(--color-text)] mb-2">
            {project.title}
          </h3>

          <div className="grid grid-cols-3 gap-1 font-data text-[10px] text-[var(--color-dim)] uppercase mb-3">
            <span>{project.genre}</span>
            <span className="text-center">{project.engine}</span>
            <span className="text-right">{project.platform}</span>
          </div>

          <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((t) => (
              <span key={t} className="font-data text-[9px] px-1.5 py-0.5 border border-[var(--color-line)] text-[var(--color-muted)]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-[var(--color-line-soft)] font-data text-[11px] uppercase tracking-wide">
            {project.playUrl ? (
              <a href={project.playUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[var(--color-cyan)] hover:text-glow-cyan">
                <Play size={13} /> Play
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-[var(--color-dim)]">
                <Play size={13} /> Play
              </span>
            )}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)]">
                <Code2 size={13} /> Source
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-[var(--color-dim)]">
                <Code2 size={13} /> Source
              </span>
            )}
            {project.trailerUrl ? (
              <a href={project.trailerUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)]">
                <Video size={13} /> Trailer
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-[var(--color-dim)]">
                <Video size={13} /> Trailer
              </span>
            )}
          </div>
        </div>
      </Reticle>
    </motion.div>
  );
}

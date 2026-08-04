import { motion } from "framer-motion";
import Reticle from "./HUD/Reticle";

const ROWS = [
  ["Name", "Kishor"],
  ["Class", "Unity Game Developer"],
  ["Specialization", "Gameplay Programming"],
  ["Secondary", "3D Game Art"],
  ["Engine", "Unity"],
  ["3D Tool", "Blender"],
  ["Language", "C#"],
  ["Experience", "Project-Based"],
  ["Level", "3rd Year Student"],
];

export default function PlayerProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      <Reticle className="panel clip-corner p-6 sm:p-7 w-full max-w-sm" tone="cyan" active>
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-[var(--color-line)]">
          <span className="font-hud text-xs tracking-[0.25em] text-[var(--color-cyan)] text-glow-cyan">
            PLAYER PROFILE
          </span>
          <span className="flex items-center gap-1.5 font-data text-[10px] text-[var(--color-good)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-good)] status-dot" />
            AVAILABLE
          </span>
        </div>

        <dl className="space-y-3">
          {ROWS.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 font-data text-xs sm:text-sm">
              <dt className="text-[var(--color-dim)] uppercase tracking-[0.1em] shrink-0">{label}</dt>
              <dd className="text-[var(--color-text)] text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </Reticle>
    </motion.div>
  );
}

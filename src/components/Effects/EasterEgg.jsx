import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];

export default function EasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer = [];
    const onKey = (e) => {
      buffer.push(e.key);
      buffer = buffer.slice(-CODE.length);
      if (buffer.join(",") === CODE.join(",")) {
        setActive(true);
        window.setTimeout(() => setActive(false), 3200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[var(--color-cyan)]/[0.04]" />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="panel px-8 py-5 clip-corner border-[var(--color-cyan)]/60 text-center"
          >
            <p className="font-hud text-[var(--color-cyan)] text-glow-cyan tracking-[0.3em] text-sm">
              CHEAT CODE ACCEPTED
            </p>
            <p className="font-data text-xs text-[var(--color-muted)] mt-2">
              +∞ CURIOSITY UNLOCKED
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

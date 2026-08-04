import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "kishor-portfolio:intro-seen";
const LOAD_LINES = [
  "INITIALIZING PORTFOLIO...",
  "LOADING ASSETS...",
  "LOADING PROJECTS...",
  "LOADING 3D MODELS...",
  "SYSTEM READY",
];

export default function IntroScreen({ onDone }) {
  const [visible, setVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) {
      onDone();
      return;
    }
    setVisible(true);
  }, [onDone]);

  useEffect(() => {
    if (!visible) return;
    if (lineIndex >= LOAD_LINES.length - 1) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 420);
    return () => clearTimeout(t);
  }, [visible, lineIndex]);

  useEffect(() => {
    if (!ready) return;
    const onKey = (e) => {
      if (e.key === "Enter") complete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const complete = () => {
    setExiting(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore storage errors */
    }
    setTimeout(onDone, 550);
  };

  const skip = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore storage errors */
    }
    onDone();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-[var(--color-void)] flex flex-col items-center justify-center px-6"
        >
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(76,243,255,0.08), transparent 70%)" }}
          />

          <button
            onClick={skip}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 font-data text-[11px] tracking-[0.2em] uppercase text-[var(--color-muted)] border border-[var(--color-line)] px-4 py-2 hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]/50 transition-colors"
          >
            Skip Intro →
          </button>

          <div className="relative flex flex-col items-center gap-8 max-w-md w-full">
            <p className="font-hud text-[var(--color-cyan)] text-glow-cyan text-lg sm:text-xl tracking-[0.35em]">
              KISHOR
            </p>

            <div className="w-full font-data text-xs sm:text-sm text-[var(--color-muted)] space-y-2 min-h-[130px]">
              {LOAD_LINES.slice(0, lineIndex + 1).map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 ${
                    i === LOAD_LINES.length - 1 ? "text-[var(--color-good)]" : ""
                  }`}
                >
                  <span className="text-[var(--color-cyan)]">{">"}</span>
                  <span>{line}</span>
                </motion.div>
              ))}
            </div>

            <div className="w-full h-px bg-[var(--color-line)] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--color-cyan)]"
                initial={{ width: "0%" }}
                animate={{ width: `${((lineIndex + 1) / LOAD_LINES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <AnimatePresence>
              {ready && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={complete}
                  className="mt-2 font-hud tracking-[0.3em] text-sm sm:text-base px-8 py-3 border border-[var(--color-cyan)] text-[var(--color-cyan)] text-glow-cyan clip-corner hover:bg-[var(--color-cyan)]/10 transition-colors animate-pulse"
                >
                  PRESS ENTER
                </motion.button>
              )}
            </AnimatePresence>
            {ready && (
              <p className="font-data text-[11px] text-[var(--color-dim)] tracking-widest">
                or click to start
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

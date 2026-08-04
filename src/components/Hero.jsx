import { motion } from "framer-motion";
import { Gamepad2, Box, FileDown, ChevronDown } from "lucide-react";
import GlowButton from "./HUD/GlowButton";

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-5 sm:px-8">
      {/* Light rays */}
      <div className="absolute inset-0 -z-[1] opacity-50" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 w-[2px] h-full origin-top"
          style={{
            background: "linear-gradient(to bottom, rgba(76,243,255,0.35), transparent 60%)",
            transform: "translateX(-220px) rotate(8deg)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 w-[2px] h-full origin-top"
          style={{
            background: "linear-gradient(to bottom, rgba(176,107,255,0.22), transparent 55%)",
            transform: "translateX(180px) rotate(-6deg)",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 -z-[1] hidden sm:block" aria-hidden="true">
        <motion.div
          className="absolute top-[18%] right-[12%] w-16 h-16 border border-[var(--color-cyan)]/40"
          style={{ transform: "rotate(20deg)" }}
          animate={{ y: [0, -18, 0], rotate: [20, 35, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[62%] right-[22%] w-10 h-10 rounded-full border border-[var(--color-purple)]/40"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] left-[10%] w-8 h-8 border border-[var(--color-blue)]/40"
          style={{ transform: "rotate(45deg)" }}
          animate={{ y: [0, -12, 0], rotate: [45, 20, 45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[16%] w-20 h-20 border border-[var(--color-cyan)]/20"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6 font-data text-xs sm:text-sm tracking-[0.25em] uppercase text-[var(--color-cyan)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-good)] status-dot" />
          Available for paid internships &amp; entry-level roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-hud font-black uppercase leading-[0.95] text-glow-cyan text-[clamp(3.2rem,13vw,9rem)] text-[var(--color-text)]"
        >
          KISHOR
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="font-hud uppercase tracking-[0.12em] text-xl sm:text-3xl md:text-4xl mt-2 text-[var(--color-cyan)]"
        >
          Unity Game Developer
          <span className="text-[var(--color-muted)]"> &amp; </span>
          <span className="text-[var(--color-purple)] text-glow-purple">3D Game Artist</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-6 max-w-xl text-[var(--color-muted)] text-base sm:text-lg leading-relaxed"
        >
          Creating immersive worlds, interactive gameplay, and game-ready 3D
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <GlowButton onClick={() => go("projects")} icon={Gamepad2}>
            Explore My Games
          </GlowButton>
          <GlowButton onClick={() => go("assets")} variant="outline" icon={Box}>
            View 3D Assets
          </GlowButton>
          <GlowButton onClick={() => go("resume")} variant="ghost" icon={FileDown}>
            Download Resume
          </GlowButton>
        </motion.div>
      </div>

      <motion.button
        onClick={() => go("about")}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
      >
        <span className="font-data text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}

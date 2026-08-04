import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "assets", label: "3D Assets" },
  { id: "gameplay", label: "Gameplay" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[var(--color-void)]/85 backdrop-blur-md border-b border-[var(--color-line)]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-[70px] flex items-center justify-between">
          <button
            onClick={() => go("home")}
            className="font-hud text-sm sm:text-base tracking-[0.25em] text-[var(--color-text)] hover:text-[var(--color-cyan)] transition-colors"
          >
            KISHOR<span className="text-[var(--color-cyan)]">_</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1 font-data text-[11px] tracking-[0.14em] uppercase">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative px-3 py-2 transition-colors ${
                  activeSection === l.id ? "text-[var(--color-cyan)]" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {l.label}
                {activeSection === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-2 right-2 -bottom-0.5 h-px bg-[var(--color-cyan)]"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 font-data text-[10px] tracking-[0.12em] uppercase text-[var(--color-good)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-good)] status-dot" />
              Available for opportunities
            </div>
            <button
              onClick={() => go("contact")}
              className="font-hud text-[11px] tracking-[0.2em] uppercase px-4 py-2 border border-[var(--color-cyan)] text-[var(--color-cyan)] clip-corner hover:bg-[var(--color-cyan)]/10 transition-colors"
            >
              Hire Me
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-[var(--color-text)] p-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--color-void)] flex flex-col lg:hidden"
          >
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative flex items-center justify-between px-5 h-16">
              <span className="font-hud text-sm tracking-[0.25em] text-[var(--color-cyan)]">MENU</span>
              <button onClick={() => setOpen(false)} className="text-[var(--color-text)] p-2" aria-label="Close menu">
                <X size={26} />
              </button>
            </div>
            <nav className="relative flex-1 flex flex-col items-center justify-center gap-6">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(l.id)}
                  className="font-hud text-2xl tracking-[0.2em] uppercase text-[var(--color-text)] hover:text-[var(--color-cyan)] transition-colors"
                >
                  {l.label}
                </motion.button>
              ))}
              <button
                onClick={() => go("contact")}
                className="mt-4 font-hud text-xs tracking-[0.2em] uppercase px-6 py-3 border border-[var(--color-cyan)] text-[var(--color-cyan)] clip-corner"
              >
                Hire Me
              </button>
            </nav>
            <div className="relative pb-8 flex justify-center items-center gap-2 font-data text-[10px] tracking-[0.12em] uppercase text-[var(--color-good)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-good)] status-dot" />
              Available for opportunities
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

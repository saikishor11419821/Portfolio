import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import GlowButton from "./HUD/GlowButton";
import Reticle from "./HUD/Reticle";
import { resumePath } from "../data/socials";
import { timeline } from "../data/skills";

export default function Resume() {
  return (
    <section id="resume" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Save File" title="Character Profile" />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <Reticle className="panel clip-corner p-7 sm:p-8 h-fit" tone="cyan" active>
            <div className="space-y-4 font-data text-sm">
              <div>
                <p className="text-[var(--color-dim)] uppercase tracking-[0.1em] text-xs mb-1">Name</p>
                <p className="text-[var(--color-text)] text-lg font-hud tracking-wide">Kishor</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[var(--color-dim)] uppercase tracking-[0.1em] text-xs mb-1">Role</p>
                  <p className="text-[var(--color-text)]">Unity Game Developer</p>
                </div>
                <div>
                  <p className="text-[var(--color-dim)] uppercase tracking-[0.1em] text-xs mb-1">Secondary</p>
                  <p className="text-[var(--color-text)]">3D Game Artist</p>
                </div>
              </div>
              <div>
                <p className="text-[var(--color-dim)] uppercase tracking-[0.1em] text-xs mb-1">Education</p>
                <p className="text-[var(--color-text)]">B.Tech CSE (AI &amp; ML), BVC College of Engineering</p>
                <p className="text-[var(--color-muted)] text-xs mt-0.5">Expected 2027 · CGPA 8.8</p>
              </div>
              <div>
                <p className="text-[var(--color-dim)] uppercase tracking-[0.1em] text-xs mb-1">Skills</p>
                <p className="text-[var(--color-muted)]">Unity · C# · Blender · Gameplay Programming · 3D Art</p>
              </div>
              <div>
                <p className="text-[var(--color-dim)] uppercase tracking-[0.1em] text-xs mb-1">Projects</p>
                <p className="text-[var(--color-muted)]">DriveVerse City — Open-World Driving Game</p>
              </div>
              <div>
                <p className="text-[var(--color-dim)] uppercase tracking-[0.1em] text-xs mb-1">Contact</p>
                <p className="text-[var(--color-muted)]">See contact section below</p>
              </div>
            </div>

            <GlowButton
              as="a"
              href={resumePath}
              download
              icon={FileDown}
              className="w-full mt-7 justify-center"
            >
              Download Resume
            </GlowButton>
          </Reticle>

          <div className="relative pl-6">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-line)]" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  <span className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-void)] border-2 border-[var(--color-cyan)]" />
                  <p className="font-hud text-[var(--color-cyan)] text-sm tracking-[0.15em] mb-1">{t.year}</p>
                  <p className="text-[var(--color-muted)] leading-relaxed">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-3 mb-12 ${alignCls}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 text-[var(--color-cyan)]">
          <span className="w-6 h-px bg-[var(--color-cyan)]" />
          <span className="font-data text-xs tracking-[0.3em] uppercase">{eyebrow}</span>
        </div>
      )}
      <h2 className="font-hud text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-[var(--color-text)]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-[var(--color-muted)] text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

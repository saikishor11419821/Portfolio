import { forwardRef } from "react";

const variants = {
  primary:
    "bg-[var(--color-cyan)] text-[#04070a] border-[var(--color-cyan)] hover:shadow-[0_0_28px_rgba(76,243,255,0.45)]",
  outline:
    "bg-transparent text-[var(--color-cyan)] border-[var(--color-cyan)]/60 hover:border-[var(--color-cyan)] hover:shadow-[0_0_20px_rgba(76,243,255,0.25)]",
  ghost:
    "bg-transparent text-[var(--color-text)] border-[var(--color-line)] hover:border-[var(--color-muted)]",
  purple:
    "bg-transparent text-[var(--color-purple)] border-[var(--color-purple)]/60 hover:border-[var(--color-purple)] hover:shadow-[0_0_20px_rgba(176,107,255,0.3)]",
};

const GlowButton = forwardRef(
  ({ children, as: Tag = "button", variant = "primary", className = "", icon: Icon, ...rest }, ref) => {
    return (
      <Tag
        ref={ref}
        className={`group inline-flex items-center justify-center gap-2 px-6 py-3 font-hud text-xs font-semibold uppercase tracking-[0.18em] border transition-all duration-300 clip-corner ${variants[variant]} ${className}`}
        {...rest}
      >
        {Icon && <Icon size={15} strokeWidth={2} className="shrink-0" />}
        {children}
      </Tag>
    );
  }
);

GlowButton.displayName = "GlowButton";
export default GlowButton;

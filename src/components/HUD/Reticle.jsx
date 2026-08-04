import { useState } from "react";

/**
 * Reticle — the site's signature device.
 * Wraps any card/panel with animated targeting-lock corner brackets,
 * echoing a game HUD acquiring a target. Brackets expand outward on
 * hover/focus rather than a generic glow-border.
 */
export default function Reticle({
  children,
  className = "",
  active = false,
  tone = "cyan", // "cyan" | "purple" | "blue"
  as: Tag = "div",
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const on = active || hover;

  const toneColor =
    tone === "purple" ? "var(--color-purple)" : tone === "blue" ? "var(--color-blue)" : "var(--color-cyan)";

  const corner = "absolute w-3 h-3 transition-all duration-300 ease-out";

  return (
    <Tag
      className={`relative ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      {...rest}
    >
      {children}

      <span
        aria-hidden="true"
        className={`${corner} top-0 left-0 border-t-2 border-l-2`}
        style={{
          borderColor: toneColor,
          opacity: on ? 1 : 0.35,
          transform: on ? "translate(-4px,-4px)" : "translate(0,0)",
        }}
      />
      <span
        aria-hidden="true"
        className={`${corner} top-0 right-0 border-t-2 border-r-2`}
        style={{
          borderColor: toneColor,
          opacity: on ? 1 : 0.35,
          transform: on ? "translate(4px,-4px)" : "translate(0,0)",
        }}
      />
      <span
        aria-hidden="true"
        className={`${corner} bottom-0 left-0 border-b-2 border-l-2`}
        style={{
          borderColor: toneColor,
          opacity: on ? 1 : 0.35,
          transform: on ? "translate(-4px,4px)" : "translate(0,0)",
        }}
      />
      <span
        aria-hidden="true"
        className={`${corner} bottom-0 right-0 border-b-2 border-r-2`}
        style={{
          borderColor: toneColor,
          opacity: on ? 1 : 0.35,
          transform: on ? "translate(4px,4px)" : "translate(0,0)",
        }}
      />
    </Tag>
  );
}

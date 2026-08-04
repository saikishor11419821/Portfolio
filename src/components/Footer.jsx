import { Code2, Briefcase, Gamepad2, Mail, Phone } from "lucide-react";
import { socials } from "../data/socials";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-line)] px-5 sm:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <p className="font-hud text-lg tracking-[0.2em] text-[var(--color-text)]">
            KISHOR<span className="text-[var(--color-cyan)]">_</span>
          </p>
          <p className="font-data text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mt-1">
            Unity Game Developer · 3D Game Artist
          </p>
          <p className="text-[var(--color-dim)] text-sm mt-3 max-w-sm">
            Building worlds. Creating gameplay. Turning ideas into experiences.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {[
              { Icon: Code2, href: socials.github },
              { Icon: Briefcase, href: socials.linkedin },
              { Icon: Gamepad2, href: socials.itch },
              { Icon: Phone, href: `tel:${socials.phone}` },
              { Icon: Mail, href: `mailto:${socials.email}` },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]/50 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
          <p className="font-data text-[11px] text-[var(--color-dim)] sm:text-right">
            © 2026 Kishor. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

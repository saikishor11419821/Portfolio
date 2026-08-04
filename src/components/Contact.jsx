import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, FileDown, Code2, Briefcase, Gamepad2, Phone } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import GlowButton from "./HUD/GlowButton";
import Reticle from "./HUD/Reticle";
import { socials, resumePath } from "../data/socials";

// ---------------------------------------------------------------------
// Contact form config.
// Sign up at https://formspree.io, create a form, and paste its endpoint
// below. No custom backend is used — the form POSTs directly to Formspree.
// (Swap this block for an EmailJS call if you'd rather use that instead.)
// ---------------------------------------------------------------------
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (FORMSPREE_ENDPOINT.includes("your-form-id")) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="New Quest" title="Ready to Start a New Quest?" align="left" />

        <p className="max-w-2xl text-[var(--color-muted)] text-base sm:text-lg leading-relaxed -mt-8 mb-12">
          I'm currently looking for paid internships and entry-level
          opportunities in Unity Game Development, Game Development, and 3D
          Game Art.
        </p>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <GlowButton as="a" href={`mailto:${socials.email}`} icon={Mail}>
                Hire Me
              </GlowButton>
              <GlowButton as="a" href={resumePath} download variant="outline" icon={FileDown}>
                Download Resume
              </GlowButton>
            </div>

            <div className="space-y-3 pt-4">
              {[
                { Icon: Mail, label: socials.email, href: `mailto:${socials.email}` },
                { Icon: Phone, label: socials.phone, href: `tel:${socials.phone}` },
                { Icon: Code2, label: "GitHub", href: socials.github },
                { Icon: Briefcase, label: "LinkedIn", href: socials.linkedin },
                { Icon: Gamepad2, label: "Itch.io", href: socials.itch },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 font-data text-sm text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors group"
                >
                  <span className="w-9 h-9 flex items-center justify-center border border-[var(--color-line)] group-hover:border-[var(--color-cyan)]/50">
                    <Icon size={15} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <Reticle className="panel clip-corner p-6 sm:p-8" tone="cyan" active>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name">
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="input"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="input"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field label="Subject">
                <input
                  required
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="input"
                  placeholder="What's this about?"
                />
              </Field>
              <Field label="Message">
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  className="input resize-none"
                  placeholder="Tell me about the opportunity..."
                />
              </Field>

              <GlowButton type="submit" icon={Send} className="w-full justify-center" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </GlowButton>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-data text-xs text-[var(--color-good)] text-center"
                >
                  Message sent — thanks for reaching out.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-data text-xs text-[var(--color-danger)] text-center"
                >
                  Form isn't connected yet — add your Formspree endpoint in
                  Contact.jsx, or email {socials.email} directly.
                </motion.p>
              )}
            </form>
          </Reticle>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: var(--color-panel-2);
          border: 1px solid var(--color-line);
          padding: 0.7rem 0.9rem;
          color: var(--color-text);
          font-family: var(--font-body);
          font-size: 0.95rem;
        }
        .input::placeholder { color: var(--color-dim); }
        .input:focus { outline: none; border-color: var(--color-cyan); }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-data text-[10px] tracking-[0.15em] uppercase text-[var(--color-dim)] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

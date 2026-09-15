import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, FileDown, Code2, Briefcase, Gamepad2, Phone } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import GlowButton from "./HUD/GlowButton";
import Reticle from "./HUD/Reticle";
import { socials, resumePath } from "../data/socials";

// ---------------------------------------------------------------------
// Contact form config.
// Sends directly to saikishor11419821@gmail.com via FormSubmit AJAX endpoint.
// No custom backend required. (Supports VITE_CONTACT_ENDPOINT or VITE_FORMSPREE_ENDPOINT
// if custom endpoint is set in .env)
// ---------------------------------------------------------------------
const RECIPIENT_EMAIL = socials.email || "saikishor11419821@gmail.com";
const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  import.meta.env.VITE_FORMSPREE_ENDPOINT ||
  `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _replyto: form.email,
          _subject: form.subject ? `[Portfolio] ${form.subject}` : `[Portfolio] Message from ${form.name}`,
          message: form.message,
          _captcha: "false",
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && (!data || data.success !== "false")) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data?.message || "Failed to deliver message via form.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error while sending message.");
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-data text-xs text-[var(--color-good)] text-center space-y-1"
                >
                  <p>Message sent directly to {RECIPIENT_EMAIL} — thanks for reaching out!</p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-data text-xs text-[var(--color-danger)] text-center space-y-1"
                >
                  <p>{errorMessage || "Failed to send message via form."}</p>
                  <p>
                    You can also{" "}
                    <a
                      href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
                        form.subject || `Message from ${form.name}`
                      )}&body=${encodeURIComponent(
                        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
                      )}`}
                      className="text-[var(--color-cyan)] underline hover:text-white"
                    >
                      click here to email {RECIPIENT_EMAIL} directly
                    </a>
                    .
                  </p>
                </motion.div>
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

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Film } from "lucide-react";

export default function MediaModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl panel clip-corner p-5 sm:p-7"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-[var(--color-muted)] hover:text-[var(--color-cyan)]"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <p className="font-hud text-xs tracking-[0.2em] text-[var(--color-cyan)] mb-4">
              {item.title}
            </p>

            <div className="aspect-video bg-[var(--color-navy)] flex items-center justify-center border border-[var(--color-line)] overflow-hidden">
              {item.media ? (
                item.media.type === "image" ? (
                  <img
                    src={item.media.src}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                ) : item.media.type === "video" ? (
                  <video
                    className="h-full w-full object-contain"
                    src={item.media.src}
                    controls
                    autoPlay
                    muted
                  />
                ) : (
                  <img
                    src={item.media.src}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <Film size={36} strokeWidth={1} className="text-[var(--color-dim)]" />
                  <p className="font-data text-xs text-[var(--color-dim)]">
                    No capture uploaded yet — drop a video, GIF, or screenshot into /src/assets/gameplay to fill this frame.
                  </p>
                </div>
              )}
            </div>

            {item.description && (
              <p className="text-[var(--color-muted)] text-sm leading-relaxed mt-5">{item.description}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

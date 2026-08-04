import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Download, Layers, Grid3x3 } from "lucide-react";
import ModelViewer from "./ModelViewer";

export default function AssetDetails({ asset, onClose }) {
  useEffect(() => {
    if (!asset) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [asset, onClose]);

  return (
    <AnimatePresence>
      {asset && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-[var(--color-void)] overflow-y-auto"
        >
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-8">
            <button
              onClick={onClose}
              className="flex items-center gap-2 font-data text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] hover:text-[var(--color-cyan)] mb-8"
            >
              <ArrowLeft size={16} /> Back to Vault
            </button>

            <button
              onClick={onClose}
              className="absolute top-8 right-5 sm:right-8 p-2 text-[var(--color-muted)] hover:text-[var(--color-cyan)]"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
              <div>
                <ModelViewer
                  modelUrl={asset.modelUrl}
                  preview={asset.preview}
                  name={asset.name}
                  className="h-[320px] sm:h-[420px] border border-[var(--color-line)] clip-corner"
                />

                <p className="font-hud text-xs tracking-[0.2em] text-[var(--color-cyan)] mt-6 mb-3">
                  INTERACTIVE 3D VIEWER
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Wireframe", asset.wireframe, Grid3x3],
                    ["In Unity", asset.unityShot, Layers],
                  ].map(([label, src, Icon]) => (
                    <div key={label} className="panel clip-corner aspect-square flex flex-col items-center justify-center gap-2 p-3">
                      {src ? (
                        <img src={src} alt={label} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Icon size={20} strokeWidth={1.5} className="text-[var(--color-dim)]" />
                          <span className="font-data text-[9px] text-[var(--color-dim)] uppercase text-center">
                            {label}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-data text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[var(--color-line)] text-[var(--color-muted)]">
                  {asset.category}
                </span>
                <h2 className="font-hud text-2xl sm:text-3xl uppercase text-[var(--color-text)] mt-4 mb-5">
                  {asset.name}
                </h2>

                <p className="text-[var(--color-muted)] leading-relaxed mb-6">{asset.description}</p>

                <dl className="space-y-3 font-data text-sm mb-8">
                  {[
                    ["Created In", asset.software],
                    ["Pipeline", asset.pipeline],
                    ["Status", asset.status],
                    ["Poly Count", asset.polyCount || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-[var(--color-line-soft)] pb-2">
                      <dt className="text-[var(--color-dim)] uppercase tracking-wide">{k}</dt>
                      <dd className="text-[var(--color-text)]">{v}</dd>
                    </div>
                  ))}
                </dl>

                {asset.modelUrl && (
                  <a
                    href={asset.modelUrl}
                    download
                    className="inline-flex items-center gap-2 font-hud text-xs tracking-[0.18em] uppercase px-5 py-3 border border-[var(--color-cyan)] text-[var(--color-cyan)] clip-corner hover:bg-[var(--color-cyan)]/10"
                  >
                    <Download size={15} /> Download Model
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

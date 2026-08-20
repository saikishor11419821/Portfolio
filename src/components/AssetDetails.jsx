import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Download } from "lucide-react";
import ModelViewer from "./ModelViewer";
import GlowButton from "./HUD/GlowButton";

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
              className="flex items-center gap-2 font-data text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] hover:text-[var(--color-cyan)] mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Vault
            </button>

            <button
              onClick={onClose}
              className="absolute top-8 right-5 sm:right-8 p-2 text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
              <div>
                <ModelViewer
                  modelUrl={asset.modelUrl}
                  preview={asset.preview}
                  name={asset.name}
                  className="h-[360px] sm:h-[460px] border border-[var(--color-line)] clip-corner shadow-2xl"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  <div className="panel clip-corner p-3 flex flex-col gap-1">
                    <span className="font-data text-[10px] text-[var(--color-dim)] uppercase">Polygon Count</span>
                    <span className="font-data text-xs font-semibold text-[var(--color-cyan)]">{asset.polyCount || "Game Ready"}</span>
                  </div>
                  <div className="panel clip-corner p-3 flex flex-col gap-1">
                    <span className="font-data text-[10px] text-[var(--color-dim)] uppercase">Vertices</span>
                    <span className="font-data text-xs font-semibold text-[var(--color-text)]">{asset.vertices || "Optimized"}</span>
                  </div>
                  <div className="panel clip-corner p-3 flex flex-col gap-1 col-span-2 sm:col-span-1">
                    <span className="font-data text-[10px] text-[var(--color-dim)] uppercase">Textures / Material</span>
                    <span className="font-data text-xs text-[var(--color-muted)] truncate">{asset.textures || "Viewport Solid"}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-data text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[var(--color-line)] text-[var(--color-muted)] bg-[var(--color-panel)]">
                    {asset.category}
                  </span>
                  <span className="font-data text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border border-[var(--color-good)]/40 text-[var(--color-good)] bg-[var(--color-good)]/5">
                    {asset.status}
                  </span>
                </div>

                <h2 className="font-hud text-2xl sm:text-3xl uppercase text-[var(--color-text)] mt-4 mb-4">
                  {asset.name}
                </h2>

                <p className="text-[var(--color-muted)] leading-relaxed mb-6">{asset.description}</p>

                <dl className="space-y-3 font-data text-sm mb-8">
                  {[
                    ["Software", asset.software],
                    ["Pipeline", asset.pipeline],
                    ["Status", asset.status],
                    ["Polygon Count", asset.polyCount || "—"],
                    ["Vertices", asset.vertices || "—"],
                    ["Format", ".FBX (Binary 3D)"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-[var(--color-line-soft)] pb-2">
                      <dt className="text-[var(--color-dim)] uppercase tracking-wide">{k}</dt>
                      <dd className="text-[var(--color-text)] font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                {asset.modelUrl && (
                  <GlowButton
                    as="a"
                    href={asset.modelUrl}
                    download
                    icon={Download}
                    className="w-full justify-center"
                  >
                    Download .FBX Model
                  </GlowButton>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from "framer-motion";
import { Box, Eye } from "lucide-react";
import Reticle from "./HUD/Reticle";

export default function AssetCard({
  asset,
  index = 0,
  isActive = false,
  onSelect,
  onOpenDetails,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      className="text-left group cursor-pointer"
      onClick={() => onSelect(asset)}
    >
      <Reticle
        className={`panel clip-corner overflow-hidden h-full flex flex-col transition-all duration-300 ${
          isActive
            ? "border-[var(--color-cyan)] shadow-[0_0_20px_rgba(76,243,255,0.2)]"
            : "hover:border-[var(--color-cyan)]/50"
        }`}
        tone={isActive ? "cyan" : "blue"}
        active={isActive}
      >
        <div className="relative h-40 bg-[var(--color-navy)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          {asset.preview ? (
            <img src={asset.preview} alt={asset.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Box
                size={38}
                strokeWidth={1.2}
                className={`transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? "text-[var(--color-cyan)] animate-pulse" : "text-[var(--color-dim)] group-hover:text-[var(--color-cyan)]"
                }`}
              />
              <span className="font-data text-[9px] uppercase tracking-widest text-[var(--color-dim)] group-hover:text-[var(--color-cyan)] transition-colors">
                Interactive 3D
              </span>
            </div>
          )}

          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="font-data text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border border-[var(--color-line)] text-[var(--color-muted)] bg-[var(--color-void)]/80">
              {asset.category}
            </span>
          </div>

          {asset.polyCount && (
            <span className="absolute top-2.5 right-2.5 font-data text-[9px] tracking-wider px-2 py-0.5 border border-[var(--color-cyan)]/30 text-[var(--color-cyan)] bg-[var(--color-void)]/80">
              {asset.polyCount}
            </span>
          )}

          {isActive && (
            <div className="absolute bottom-2 inset-x-2 flex items-center justify-center">
              <span className="font-data text-[9px] tracking-[0.2em] uppercase px-2.5 py-0.5 bg-[var(--color-cyan)] text-[var(--color-void)] font-bold">
                VIEWING NOW
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-hud text-sm uppercase tracking-[0.04em] text-[var(--color-text)] group-hover:text-[var(--color-cyan)] transition-colors mb-1">
              {asset.name}
            </h3>
            <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed">
              {asset.description}
            </p>
          </div>

          <div className="flex items-center justify-between font-data text-[10px] text-[var(--color-dim)] uppercase mt-4 pt-3 border-t border-[var(--color-line-soft)]">
            <span>{asset.software}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(asset);
              }}
              className="text-[var(--color-cyan)] hover:underline flex items-center gap-1"
            >
              <Eye size={12} /> Specs
            </button>
          </div>
        </div>
      </Reticle>
    </motion.div>
  );
}

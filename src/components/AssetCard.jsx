import { motion } from "framer-motion";
import { Box } from "lucide-react";
import Reticle from "./HUD/Reticle";

export default function AssetCard({ asset, index = 0, onOpen }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      onClick={() => onOpen(asset)}
      className="text-left"
    >
      <Reticle className="panel clip-corner overflow-hidden h-full flex flex-col" tone="cyan">
        <div className="relative h-36 bg-[var(--color-navy)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          {asset.preview ? (
            <img src={asset.preview} alt={asset.name} className="w-full h-full object-cover" />
          ) : (
            <Box size={34} strokeWidth={1} className="text-[var(--color-cyan)]" />
          )}
          <span className="absolute top-2.5 left-2.5 font-data text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border border-[var(--color-line)] text-[var(--color-muted)] bg-[var(--color-void)]/60">
            {asset.category}
          </span>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-hud text-sm uppercase tracking-[0.04em] text-[var(--color-text)] mb-1">
            {asset.name}
          </h3>
          <div className="flex items-center justify-between font-data text-[10px] text-[var(--color-dim)] uppercase mt-auto pt-3">
            <span>{asset.software}</span>
            <span
              className={
                asset.status === "Game Ready" ? "text-[var(--color-good)]" : "text-[var(--color-cyan)]"
              }
            >
              {asset.status}
            </span>
          </div>
        </div>
      </Reticle>
    </motion.button>
  );
}

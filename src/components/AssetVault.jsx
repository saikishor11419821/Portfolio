import { lazy, Suspense, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "./HUD/SectionHeading";
import AssetCard from "./AssetCard";
import { visibleModels, assetCategories } from "../data/models";

// Three.js / React Three Fiber only get pulled into the bundle once a
// visitor actually opens an asset — keeps the initial page load light.
const AssetDetails = lazy(() => import("./AssetDetails"));

export default function AssetVault() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? visibleModels
        : visibleModels.filter((m) => m.category === filter),
    [filter]
  );

  return (
    <section id="assets" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Asset Database"
          title="3D Asset Vault"
          subtitle="Blender-built, game-ready assets from vehicles to environments — click any card for an interactive 3D view."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {assetCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-data text-[11px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors ${
                filter === cat
                  ? "border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)]/10"
                  : "border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-dim)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((asset, i) => (
              <AssetCard key={asset.id} asset={asset} index={i} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="font-data text-sm text-[var(--color-dim)] text-center py-16">
            No assets in this category yet.
          </p>
        )}
      </div>

      <Suspense fallback={null}>
        {selected && <AssetDetails asset={selected} onClose={() => setSelected(null)} />}
      </Suspense>
    </section>
  );
}

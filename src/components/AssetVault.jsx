import { lazy, Suspense, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Download, Eye, Box, Car, Shield, Compass, Key, Bot, DoorOpen } from "lucide-react";
import SectionHeading from "./HUD/SectionHeading";
import GlowButton from "./HUD/GlowButton";
import Reticle from "./HUD/Reticle";
import AssetCard from "./AssetCard";
import ModelViewer from "./ModelViewer";
import { visibleModels, assetCategories } from "../data/models";

const AssetDetails = lazy(() => import("./AssetDetails"));

const MODEL_ICONS = {
  "car-01": Car,
  "sword-01": Shield,
  "old-well-01": Compass,
  "door-01": DoorOpen,
  "key-01": Key,
  "robo-model-01": Bot,
};

export default function AssetVault() {
  const [activeAssetId, setActiveAssetId] = useState(visibleModels[0]?.id || "car-01");
  const [filter, setFilter] = useState("All");
  const [selectedForModal, setSelectedForModal] = useState(null);

  const activeAsset = useMemo(
    () => visibleModels.find((m) => m.id === activeAssetId) || visibleModels[0],
    [activeAssetId]
  );

  const filtered = useMemo(
    () =>
      filter === "All"
        ? visibleModels
        : visibleModels.filter((m) => m.category === filter),
    [filter]
  );

  const handleSelectAsset = (asset) => {
    setActiveAssetId(asset.id);
    const viewportElem = document.getElementById("featured-3d-viewport");
    if (viewportElem) {
      viewportElem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <section id="assets" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Interactive Asset Vault"
          title="Game-Ready 3D Models"
          subtitle="Explore custom 3D assets crafted in Blender for Unity games. Click any model to inspect it live in the interactive 3D viewport."
        />

        {/* Featured Live 3D Viewport Showcase */}
        <div id="featured-3d-viewport" className="mb-16">
          {/* Quick Model Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
            <span className="font-data text-[10px] tracking-[0.2em] uppercase text-[var(--color-dim)] whitespace-nowrap pr-2">
              SELECT MODEL:
            </span>
            {visibleModels.map((m) => {
              const Icon = MODEL_ICONS[m.id] || Box;
              const isActive = m.id === activeAsset.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveAssetId(m.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 font-data text-xs uppercase tracking-wider border transition-all whitespace-nowrap ${
                    isActive
                      ? "border-[var(--color-cyan)] bg-[var(--color-cyan)]/15 text-[var(--color-cyan)] shadow-[0_0_15px_rgba(76,243,255,0.25)]"
                      : "border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-cyan)]/40"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-[var(--color-cyan)]" : "text-[var(--color-dim)]"} />
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Model Interactive Stage */}
          <Reticle className="panel clip-corner overflow-hidden" tone="cyan" active>
            <div className="grid lg:grid-cols-[1.5fr_1fr]">
              {/* Live 3D Canvas */}
              <div className="relative min-h-[380px] sm:min-h-[460px] bg-[#050b14] flex flex-col justify-center">
                <ModelViewer
                  key={activeAsset.id}
                  modelUrl={activeAsset.modelUrl}
                  preview={activeAsset.preview}
                  name={activeAsset.name}
                  className="w-full h-full min-h-[380px] sm:min-h-[460px]"
                />
              </div>

              {/* Active Model Details & Actions Panel */}
              <div className="p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--color-line)] bg-[var(--color-panel)]/50">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-data text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[var(--color-line)] text-[var(--color-muted)] bg-[var(--color-void)]">
                      {activeAsset.category}
                    </span>
                    <span className="font-data text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border border-[var(--color-good)]/40 text-[var(--color-good)] bg-[var(--color-good)]/10">
                      {activeAsset.status}
                    </span>
                  </div>

                  <h3 className="font-hud text-2xl sm:text-3xl uppercase text-[var(--color-text)] tracking-wide mb-3">
                    {activeAsset.name}
                  </h3>

                  <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-6">
                    {activeAsset.description}
                  </p>

                  <div className="space-y-2.5 font-data text-xs border-y border-[var(--color-line-soft)] py-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-dim)] uppercase">Polygon Count</span>
                      <span className="text-[var(--color-cyan)] font-semibold">{activeAsset.polyCount || "Game Ready"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-dim)] uppercase">Vertices</span>
                      <span className="text-[var(--color-text)]">{activeAsset.vertices || "Optimized"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-dim)] uppercase">Pipeline</span>
                      <span className="text-[var(--color-muted)]">{activeAsset.pipeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-dim)] uppercase">Software</span>
                      <span className="text-[var(--color-text)]">{activeAsset.software}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <GlowButton
                    onClick={() => setSelectedForModal(activeAsset)}
                    variant="outline"
                    icon={Eye}
                    className="flex-1 justify-center text-xs"
                  >
                    Full Specs
                  </GlowButton>
                  {activeAsset.modelUrl && (
                    <GlowButton
                      as="a"
                      href={activeAsset.modelUrl}
                      download
                      icon={Download}
                      className="flex-1 justify-center text-xs"
                    >
                      Download .FBX
                    </GlowButton>
                  )}
                </div>
              </div>
            </div>
          </Reticle>
        </div>

        {/* Asset Library Grid & Category Filters */}
        <div className="pt-6 border-t border-[var(--color-line)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h4 className="font-hud text-base uppercase tracking-[0.15em] text-[var(--color-text)]">
              All 3D Assets ({filtered.length})
            </h4>

            <div className="flex flex-wrap gap-1.5">
              {assetCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`font-data text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 border transition-colors ${
                    filter === cat
                      ? "border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)]/10"
                      : "border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((asset, i) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  index={i}
                  isActive={asset.id === activeAsset.id}
                  onSelect={handleSelectAsset}
                  onOpenDetails={setSelectedForModal}
                />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="font-data text-sm text-[var(--color-dim)] text-center py-16">
              No assets in this category yet.
            </p>
          )}
        </div>
      </div>

      <Suspense fallback={null}>
        {selectedForModal && (
          <AssetDetails asset={selectedForModal} onClose={() => setSelectedForModal(null)} />
        )}
      </Suspense>
    </section>
  );
}

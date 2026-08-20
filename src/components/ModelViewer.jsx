import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import {
  Box3,
  Color,
  DoubleSide,
  Group,
  MeshStandardMaterial,
  Vector3,
} from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import { Box, Layers, RotateCcw, Rotate3D, Scan } from "lucide-react";

// Safe loader that filters harmless legacy FBX texture warnings
class PortfolioFBXLoader extends FBXLoader {
  parse(buffer, path) {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        typeof args[0] === "string" &&
        (args[0].includes("map is not supported in three.js") ||
          args[0].includes("ShininessExponent"))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    try {
      return super.parse(buffer, path);
    } finally {
      console.warn = originalWarn;
    }
  }
}

const MODEL_CACHE_LIMIT = 8;
const modelCache = new Map();

function disposeMaterial(material) {
  if (!material) return;
  if (Array.isArray(material)) {
    material.forEach(disposeMaterial);
    return;
  }
  Object.values(material).forEach((value) => {
    if (value?.isTexture) value.dispose?.();
  });
  material.dispose?.();
}

function disposeObject(object) {
  if (!object) return;
  object.traverse((child) => {
    if (child.isMesh) {
      child.geometry?.dispose();
      disposeMaterial(child.material);
      child.material = null;
      child.geometry = null;
    }
  });
  object.removeFromParent?.();
}

function cacheModel(url, source) {
  modelCache.set(url, source);
  if (modelCache.size <= MODEL_CACHE_LIMIT) return;
  const oldestUrl = modelCache.keys().next().value;
  const oldest = modelCache.get(oldestUrl);
  modelCache.delete(oldestUrl);
  disposeObject(oldest);
}

/**
 * Shading styles:
 * - 'studio': Polished game-ready solid viewport with preserved material tones & subtle metallic sheen
 * - 'clay': Classic Blender matte clay render with smooth ambient occlusion look
 */
function applyMaterials(root, shadingMode, wireframe, modelUrl = "") {
  let meshIndex = 0;
  const isSword = modelUrl.toLowerCase().includes("sword");

  root.traverse((child) => {
    // Remove non-mesh objects from FBX (like embedded lights/cameras)
    if (child.isLight || child.isCamera) {
      child.visible = false;
      return;
    }

    if (!child.isMesh) return;

    child.castShadow = true;
    child.receiveShadow = true;

    const originalMaterials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    const newMaterials = originalMaterials.map((origMat) => {
      let baseColor = new Color("#94a3b8"); // default sleek neutral

      if (origMat && origMat.color) {
        const hex = origMat.color.getHexString();
        // Check if material has a meaningful custom color
        if (hex !== "cccccc" && hex !== "ffffff" && hex !== "000000") {
          baseColor = origMat.color.clone();
        } else if (hex === "000000") {
          baseColor = new Color("#1e293b"); // rich dark metal instead of pure black void
        } else if (hex === "ffffff") {
          baseColor = new Color("#cbd5e1");
        } else {
          // Subtle tone variations across distinct submeshes to keep shape readable
          const toneOffset = (meshIndex % 5) * 0.04;
          baseColor = new Color(0.55 + toneOffset, 0.6 + toneOffset, 0.65 + toneOffset);
        }
      }

      if (shadingMode === "clay") {
        return new MeshStandardMaterial({
          color: new Color("#e2e8f0"),
          roughness: 0.88,
          metalness: 0.05,
          flatShading: true,
          wireframe,
          side: DoubleSide,
        });
      }

      // Default 'studio' solid shading
      return new MeshStandardMaterial({
        color: baseColor,
        roughness: 0.42,
        metalness: 0.38,
        wireframe,
        side: DoubleSide,
      });
    });

    child.material = Array.isArray(child.material) ? newMaterials : newMaterials[0];
    meshIndex++;
  });

  // Special orientation for elongated weapons/props
  if (isSword && root.rotation.x === 0 && root.rotation.z === 0) {
    root.rotation.x = -Math.PI / 3;
    root.rotation.y = Math.PI / 4;
    root.rotation.z = Math.PI / 8;
  }
}

function createModelInstance(source, shadingMode, wireframe, modelUrl) {
  const loaded = cloneSkinned(source.scene || source);

  // Clone geometries to ensure independence
  loaded.traverse((child) => {
    if (child.isMesh && child.geometry) {
      child.geometry = child.geometry.clone();
    }
  });

  // Compute accurate bounding box strictly from meshes
  loaded.updateMatrixWorld(true);
  const meshBox = new Box3();
  let meshCount = 0;

  loaded.traverse((child) => {
    if (child.isMesh && child.geometry) {
      if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
      const geomBox = child.geometry.boundingBox.clone().applyMatrix4(child.matrixWorld);
      meshBox.union(geomBox);
      meshCount++;
    }
  });

  const wrapper = new Group();
  wrapper.add(loaded);

  if (meshCount > 0 && !meshBox.isEmpty()) {
    const size = meshBox.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetScale = 2.4 / maxDim;

    loaded.scale.setScalar(targetScale);
    loaded.updateMatrixWorld(true);

    // Recompute mesh center with scale applied
    const scaledMeshBox = new Box3();
    loaded.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const geomBox = child.geometry.boundingBox.clone().applyMatrix4(child.matrixWorld);
        scaledMeshBox.union(geomBox);
      }
    });

    const center = scaledMeshBox.getCenter(new Vector3());
    loaded.position.x -= center.x;
    loaded.position.y -= center.y;
    loaded.position.z -= center.z;
  }

  applyMaterials(loaded, shadingMode, wireframe, modelUrl);

  return wrapper;
}

function ModelManager({ url, shadingMode, wireframe, onLoadingChange, onError }) {
  const { scene, invalidate } = useThree();
  const activeModelRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    let cancelled = false;

    const replaceModel = (source) => {
      if (cancelled || requestId !== requestIdRef.current) return;
      const nextModel = createModelInstance(source, shadingMode, wireframe, url);
      if (activeModelRef.current) disposeObject(activeModelRef.current);
      activeModelRef.current = nextModel;
      scene.add(nextModel);
      onLoadingChange(false);
      invalidate();
    };

    const cached = modelCache.get(url);
    if (cached) {
      onLoadingChange(false);
      replaceModel(cached);
    } else {
      onLoadingChange(true);
      const loader = new PortfolioFBXLoader();
      loader.load(
        url,
        (source) => {
          if (cancelled || requestId !== requestIdRef.current) {
            disposeObject(source);
            return;
          }
          cacheModel(url, source);
          replaceModel(source);
        },
        undefined,
        (error) => {
          if (cancelled || requestId !== requestIdRef.current) return;
          console.error("Failed to load 3D model:", error);
          onLoadingChange(false);
          onError();
        }
      );
    }

    return () => {
      cancelled = true;
    };
  }, [invalidate, onError, onLoadingChange, scene, shadingMode, url, wireframe]);

  useEffect(() => () => {
    if (activeModelRef.current) disposeObject(activeModelRef.current);
  }, []);

  return null;
}

function StudioLighting() {
  return (
    <>
      {/* Studio 3-Point Light Rig */}
      <ambientLight intensity={0.65} color="#dbeafe" />
      <hemisphereLight intensity={0.45} skyColor="#7dd3fc" groundColor="#0f172a" />
      {/* Key Light */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />
      {/* Fill Light (Cyan Tone) */}
      <directionalLight position={[-4, 3, 2]} intensity={0.85} color="#38bdf8" />
      {/* Rim / Back Light (Purple Tone) */}
      <directionalLight position={[0, 4, -5]} intensity={1.2} color="#a855f7" />
      {/* Subtle Ground Bounce */}
      <directionalLight position={[0, -3, 0]} intensity={0.3} color="#0284c7" />
    </>
  );
}

function StaticFallback({ preview, name, message }) {
  return (
    <div className="relative w-full h-full min-h-[260px] flex items-center justify-center overflow-hidden bg-[var(--color-navy)]">
      {preview && (
        <img
          src={preview}
          alt={`${name} preview`}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative flex flex-col items-center gap-3 text-center px-6">
        <Box size={38} strokeWidth={1} className="text-[var(--color-cyan)]" />
        <span className="font-data text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]">
          {message}
        </span>
      </div>
    </div>
  );
}

export default function ModelViewer({
  modelUrl,
  preview,
  name = "3D asset",
  className = "",
  initialAutoRotate = true,
  ...rest
}) {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(initialAutoRotate);
  const [shadingMode, setShadingMode] = useState("studio"); // 'studio' | 'clay'
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const controlsRef = useRef(null);
  const handleModelError = useCallback(() => setHasError(true), []);

  const resetCamera = () => controlsRef.current?.reset();

  const cycleShadingMode = () => {
    setShadingMode((curr) => (curr === "studio" ? "clay" : "studio"));
  };

  useEffect(() => {
    setHasError(false);
  }, [modelUrl]);

  if (!modelUrl) {
    return (
      <StaticFallback preview={preview} name={name} message="Interactive model coming soon" />
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#050b14] ${className}`} {...rest}>
      <Canvas
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ position: [3.2, 2.2, 3.2], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050b14"]} />
        <fog attach="fog" args={["#050b14", 8, 20]} />
        <StudioLighting />
        <Grid
          position={[0, -1.2, 0]}
          args={[12, 12]}
          cellSize={0.5}
          cellThickness={0.6}
          sectionSize={2}
          sectionThickness={1.2}
          cellColor="#0e3a53"
          sectionColor="#00e5ff"
          fadeDistance={11}
          fadeStrength={1.4}
          infiniteGrid
        />
        <ModelManager
          url={modelUrl}
          shadingMode={shadingMode}
          wireframe={wireframe}
          onLoadingChange={setIsLoading}
          onError={handleModelError}
        />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.07}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          minDistance={1.8}
          maxDistance={8}
          maxPolarAngle={Math.PI * 0.86}
        />
      </Canvas>

      {/* Loading & Status overlay */}
      {(isLoading || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#050b14]/70 backdrop-blur-xs">
          <div className="flex items-center gap-2 px-4 py-2 border border-[var(--color-line)] bg-[var(--color-void)]/90 text-[var(--color-cyan)] font-data text-xs tracking-[0.2em] uppercase">
            {hasError ? (
              <span>Model Preview Unavailable</span>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-ping" />
                <span>Loading 3D Asset...</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Viewport HUD Header */}
      <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 font-data text-[10px] tracking-[0.16em] uppercase text-[var(--color-cyan)] bg-[var(--color-void)]/70 px-2.5 py-1 border border-[var(--color-line)]">
        <Scan size={13} />
        <span>3D VIEWPORT · {shadingMode.toUpperCase()}</span>
      </div>

      {/* Viewport HUD Controls */}
      <div className="absolute right-3 bottom-3 flex flex-wrap gap-1.5 z-10">
        <button
          type="button"
          onClick={() => setWireframe((v) => !v)}
          className={`p-2 border transition-all ${
            wireframe
              ? "border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)]/15 shadow-[0_0_12px_rgba(76,243,255,0.3)]"
              : "border-[var(--color-line)] bg-[var(--color-void)]/80 text-[var(--color-muted)] hover:text-[var(--color-cyan)]"
          }`}
          aria-label="Toggle wireframe"
          title="Toggle wireframe mode"
        >
          <Rotate3D size={15} />
        </button>

        <button
          type="button"
          onClick={() => setAutoRotate((v) => !v)}
          className={`px-2.5 py-1.5 font-data text-[10px] tracking-wider border transition-all ${
            autoRotate
              ? "border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)]/15 shadow-[0_0_12px_rgba(76,243,255,0.3)]"
              : "border-[var(--color-line)] bg-[var(--color-void)]/80 text-[var(--color-muted)] hover:text-[var(--color-cyan)]"
          }`}
          aria-label="Toggle auto rotate"
          title="Toggle auto rotation"
        >
          ROT
        </button>

        <button
          type="button"
          onClick={cycleShadingMode}
          className="flex items-center gap-1 px-2 py-1.5 border border-[var(--color-line)] bg-[var(--color-void)]/80 text-[var(--color-muted)] hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]/40 transition-colors font-data text-[10px] tracking-wider uppercase"
          aria-label="Cycle shading mode"
          title={`Switch shading mode (Current: ${shadingMode})`}
        >
          <Layers size={13} />
          <span>{shadingMode}</span>
        </button>

        <button
          type="button"
          onClick={resetCamera}
          className="p-2 border border-[var(--color-line)] bg-[var(--color-void)]/80 text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
          aria-label="Reset camera"
          title="Reset camera view"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Interaction hint on bottom left */}
      <div className="absolute bottom-3 left-3 pointer-events-none hidden sm:flex items-center gap-2 font-data text-[9px] text-[var(--color-dim)] uppercase tracking-wider bg-[var(--color-void)]/60 px-2 py-1 border border-[var(--color-line-soft)]">
        <span>Drag to orbit · Scroll to zoom</span>
      </div>
    </div>
  );
}

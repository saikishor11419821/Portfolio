import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Box3, Color, DoubleSide, MeshStandardMaterial, Vector3 } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import { Box, Palette, RotateCcw, Rotate3D, Scan } from "lucide-react";

// The supplied FBX assets include a legacy glossiness texture connection.
// The viewer replaces all imported materials below, so this skipped connection
// cannot affect the rendered model. Filter only that known, harmless loader warning.
class PortfolioFBXLoader extends FBXLoader {
  parse(buffer, path) {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        args[0] === "THREE.FBXLoader: %s map is not supported in three.js, skipping texture."
        && args[1] === "ShininessExponent"
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

const MODEL_CACHE_LIMIT = 4;
const modelCache = new Map();

function disposeMaterial(material) {
  if (!material) return;
  Object.values(material).forEach((value) => {
    if (value?.isTexture) value.dispose();
  });
  material.dispose?.();
}

function disposeObject(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry?.dispose();
    (Array.isArray(child.material) ? child.material : [child.material]).forEach(disposeMaterial);
    child.material = null;
    child.geometry = null;
  });
  object.removeFromParent();
}

function cacheModel(url, source) {
  modelCache.set(url, source);
  if (modelCache.size <= MODEL_CACHE_LIMIT) return;
  const [oldestUrl, oldest] = modelCache.entries().next().value;
  modelCache.delete(oldestUrl);
  disposeObject(oldest.scene || oldest);
}

function createModelInstance(source, wireframe, colorSeed) {
  // Cache the parsed FBX, but give each displayed instance its own geometry
  // and materials. That makes cleanup safe without invalidating the cache.
  const loaded = cloneSkinned(source.scene || source);
  loaded.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry = child.geometry.clone();
  });

    const box = new Box3().setFromObject(loaded);
    const size = box.getSize(new Vector3());
    const scale = 2.2 / (Math.max(size.x, size.y, size.z) || 1);
    loaded.scale.setScalar(scale);

    box.setFromObject(loaded);
    loaded.position.copy(box.getCenter(new Vector3()).multiplyScalar(-1));
    loaded.updateMatrixWorld(true);

    let meshIndex = 0;
    loaded.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      // Blender-style solid shading: each mesh gets a matte viewport color.
      const hue = (colorSeed * 137.508 + meshIndex * 0.1618) % 1;
      const tone = (colorSeed * 137.508 + meshIndex * 0.1618) % 1;
      const lightness = tone < 0.2 ? 0.22 : tone < 0.55 ? 0.38 : 0.58;
      const color = new Color().setHSL(hue, 0.48, lightness);
      const materialCount = Array.isArray(child.material) ? child.material.length : 1;
      const materials = Array.from({ length: materialCount }, () => new MeshStandardMaterial({
        color,
        side: DoubleSide,
        wireframe,
        flatShading: true,
        metalness: 0,
        roughness: 0.76,
      }));
      child.material = Array.isArray(child.material) ? materials : materials[0];
      meshIndex += 1;
    });
  return loaded;
}

function ModelManager({ url, wireframe, colorSeed, onLoadingChange, onError }) {
  const { scene, invalidate } = useThree();
  const activeModelRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    let cancelled = false;

    const replaceModel = (source) => {
      if (cancelled || requestId !== requestIdRef.current) return;
      const nextModel = createModelInstance(source, wireframe, colorSeed);
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
            disposeObject(source.scene || source);
            return;
          }
          cacheModel(url, source);
          replaceModel(source);
        },
        undefined,
        (error) => {
          if (cancelled || requestId !== requestIdRef.current) return;
          console.error("Failed to load FBX model:", error);
          onLoadingChange(false);
          onError();
        }
      );
    }

    return () => {
      cancelled = true;
    };
  }, [colorSeed, invalidate, onError, onLoadingChange, scene, url, wireframe]);

  useEffect(() => () => {
    if (activeModelRef.current) disposeObject(activeModelRef.current);
  }, []);

  return null;
}

function StaticFallback({ preview, name, message }) {
  return (
    <div className="relative w-full h-full min-h-[240px] flex items-center justify-center overflow-hidden bg-[var(--color-navy)]">
      {preview && <img src={preview} alt={`${name} preview`} className="absolute inset-0 w-full h-full object-cover opacity-70" />}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative flex flex-col items-center gap-3 text-center px-6">
        <Box size={38} strokeWidth={1} className="text-[var(--color-cyan)]" />
        <span className="font-data text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]">{message}</span>
      </div>
    </div>
  );
}

export default function ModelViewer({ modelUrl, preview, name = "3D asset", className = "", ...rest }) {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [colorSeed, setColorSeed] = useState(() => Math.random());
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const controlsRef = useRef(null);
  const handleModelError = useCallback(() => setHasError(true), []);

  const resetCamera = () => controlsRef.current?.reset();

  useEffect(() => setHasError(false), [modelUrl]);

  if (!modelUrl) {
    return <StaticFallback preview={preview} name={name} message="Interactive model coming soon" />;
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#07131b] ${className}`} {...rest}>
      <Canvas
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ position: [3.4, 2.3, 3.4], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#07131b"]} />
        <fog attach="fog" args={["#07131b", 7, 16]} />
        <ambientLight intensity={0.55} />
        <hemisphereLight intensity={0.55} skyColor="#b8eeff" groundColor="#061018" />
        <directionalLight position={[4, 7, 4]} intensity={2.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <directionalLight position={[-4, 2, -3]} intensity={0.7} color="#2ce7ff" />
        <Grid position={[0, -1.18, 0]} args={[10, 10]} cellSize={0.5} cellThickness={0.5} sectionSize={2} sectionThickness={1} cellColor="#174253" sectionColor="#00d9ff" fadeDistance={10} fadeStrength={1.5} infiniteGrid />
        <Environment preset="city" />
        <ModelManager url={modelUrl} wireframe={wireframe} colorSeed={colorSeed} onLoadingChange={setIsLoading} onError={handleModelError} />
        <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.08} autoRotate={autoRotate} autoRotateSpeed={1.2} minDistance={2.2} maxDistance={7} maxPolarAngle={Math.PI * 0.88} />
      </Canvas>

      {(isLoading || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="font-data text-[10px] tracking-[0.18em] text-[var(--color-cyan)] whitespace-nowrap">
            {hasError ? "MODEL PREVIEW UNAVAILABLE" : "LOADING MODEL"}
          </div>
        </div>
      )}

      <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 font-data text-[9px] tracking-[0.16em] uppercase text-[var(--color-cyan)]">
        <Scan size={14} /> Interactive viewport
      </div>
      <div className="absolute right-3 bottom-3 flex gap-1.5">
        <button type="button" onClick={() => setWireframe((value) => !value)} className={`p-2 border transition-colors ${wireframe ? "border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)]/10" : "border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-cyan)]"}`} aria-label="Toggle wireframe" title="Toggle wireframe">
          <Rotate3D size={15} />
        </button>
        <button type="button" onClick={() => setAutoRotate((value) => !value)} className={`px-2 font-data text-[9px] tracking-wider border transition-colors ${autoRotate ? "border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)]/10" : "border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-cyan)]"}`} aria-label="Toggle auto rotate">
          AUTO
        </button>
        <button type="button" onClick={() => setColorSeed(Math.random())} className="p-2 border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors" aria-label="Randomize solid viewport colors" title="Randomize colors">
          <Palette size={15} />
        </button>
        <button type="button" onClick={resetCamera} className="p-2 border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors" aria-label="Reset camera" title="Reset camera">
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}

import { Suspense, useState, useEffect, Component } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage, useProgress, Environment } from "@react-three/drei";
import { AlertTriangle, Move3d, Image as ImageIcon } from "lucide-react";
import { Color, MeshStandardMaterial, ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

/** Error boundary — catches FBX parse/network failures gracefully. */
class ViewerErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

function Loader() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-navy)]">
      <div className="w-40 h-1 bg-[var(--color-line)] overflow-hidden">
        <div
          className="h-full bg-[var(--color-cyan)] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="font-data text-[10px] tracking-[0.2em] text-[var(--color-dim)] uppercase">
        Loading model {Math.round(progress)}%
      </span>
    </div>
  );
}

function ModelAsset({ url }) {
  const asset = useLoader(FBXLoader, url);

  useEffect(() => {
    const sceneRoot = asset.scene || asset;

    sceneRoot.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;

      const color = new Color();
      color.setHSL(Math.random(), 0.55, 0.55);

      child.material = new MeshStandardMaterial({
        color,
        flatShading: true,
        roughness: 0.55,
        metalness: 0,
      });
    });
  }, [asset]);

  const sceneRoot = asset.scene || asset;
  return <primitive object={sceneRoot} />;
}

function StaticFallback({ preview, name }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-navy)] text-[var(--color-dim)]">
      {preview ? (
        <img src={preview} alt={name} className="w-full h-full object-cover" />
      ) : (
        <>
          <ImageIcon size={40} strokeWidth={1} />
          <span className="font-data text-[10px] tracking-[0.15em] uppercase px-6 text-center">
            No interactive model yet — showing render placeholder for {name}
          </span>
        </>
      )}
    </div>
  );
}

function LoadFailed({ name }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-navy)] text-[var(--color-danger)]">
      <AlertTriangle size={32} strokeWidth={1.5} />
      <span className="font-data text-[10px] tracking-[0.15em] uppercase px-6 text-center">
        Failed to load model for {name}
      </span>
    </div>
  );
}

/**
 * ModelViewer — drag to rotate, scroll to zoom, pinch/pan supported.
 * Falls back to a static render (or a labeled placeholder) whenever
 * `modelUrl` is empty, and to an error state if the fetch/parse fails.
 */
export default function ModelViewer({ modelUrl, preview, name = "Asset", className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!modelUrl || failed) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {failed ? <LoadFailed name={name} /> : <StaticFallback preview={preview} name={name} />}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ViewerErrorBoundary fallback={<LoadFailed name={name} />}>
        <Suspense fallback={<Loader />}>
          <Canvas
            dpr={[1, 1.6]}
            camera={{ position: [4, 2.8, 5], fov: 40 }}
            onError={() => setFailed(true)}
            shadows
            gl={{ antialias: true, toneMapping: ACESFilmicToneMapping, outputEncoding: SRGBColorSpace }}
          >
            <color attach="background" args={[0x121827]} />
            <ambientLight intensity={0.08} />
            <hemisphereLight skyColor={0xffffff} groundColor={0x111111} intensity={0.16} />
            <directionalLight
              position={[4, 7, 4]}
              intensity={0.65}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0005}
            />
            <directionalLight position={[-2.5, 2.8, -4]} intensity={0.14} />
            <spotLight
              position={[0, 5, 7]}
              intensity={0.18}
              angle={0.42}
              penumbra={0.7}
              castShadow
            />
            <pointLight position={[0, 1.8, 2]} intensity={0.08} />
            <Stage preset="rembrandt" intensity={0.6} shadows="contact">
              <ModelAsset url={modelUrl} />
            </Stage>
            <Environment preset="studio" background={false} blur={0.3} />
            <OrbitControls
              makeDefault
              enablePan
              enableZoom
              autoRotate
              autoRotateSpeed={0.6}
              minDistance={1.5}
              maxDistance={10}
            />
          </Canvas>
        </Suspense>
      </ViewerErrorBoundary>

      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 font-data text-[10px] tracking-[0.1em] uppercase text-[var(--color-dim)] bg-[var(--color-void)]/70 px-2.5 py-1 pointer-events-none">
        <Move3d size={12} /> Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}

export function preloadModel(url) {
  if (!url) return;

  const loader = new FBXLoader();
  loader.load(url);
}

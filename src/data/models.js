// 3D ASSET VAULT DATA
// To add a new Blender model, push one object into this array.
// AssetVault.jsx, AssetCard.jsx and AssetDetails.jsx render entirely
// from this data.
//
// category: "Vehicles" | "Environments" | "Buildings" | "Props" | "Game Assets" | "Characters" | "Other"
// modelUrl: path to a .fbx under /public/models/ (e.g. "/models/car.fbx").
//           Leave null to fall back to the preview render.
// preview: path/URL to a still render, used as the card image and as the
//          fallback when no interactive model is supplied.

const modelAssetPath = (fileName) => `${import.meta.env.BASE_URL}models/${fileName}`;

export const assetCategories = [
  "All",
  "Vehicles",
  "Environments",
  "Buildings",
  "Props",
  "Game Assets",
  "Characters",
  "Other",
];

export const models = [
  {
    id: "car-01",
    name: "Sports Car",
    category: "Vehicles",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: "39,372 Tris",
    vertices: "118,116 Verts",
    textures: "PBR Metallic / Viewport Solid",
    description:
      "A high-detail custom sports car built in Blender with clean topology, separate sub-assemblies for wheels and bodywork, and ready for Unity wheel colliders and vehicle physics.",
    preview: null,
    modelUrl: modelAssetPath("Car2.fbx"),
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "sword-01",
    name: "Stylized Sword",
    category: "Props",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: "14,664 Tris",
    vertices: "43,992 Verts",
    textures: "Hand-crafted / Viewport Solid",
    description:
      "A stylized melee weapon asset with bevelled blade geometry, guard detailing, and an ergonomic grip crafted for fantasy combat and action RPG equipment systems.",
    preview: null,
    modelUrl: modelAssetPath("Sword.fbx"),
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "old-well-01",
    name: "Medieval Well",
    category: "Environments",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: "14,590 Tris",
    vertices: "43,770 Verts",
    textures: "Modular Stone / Timber",
    description:
      "A detailed environment centerpiece featuring individually modeled stone masonry, wooden roof framing, and crank mechanism suitable for medieval ruins and village courtyards.",
    preview: null,
    modelUrl: modelAssetPath("Old_Well.fbx"),
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "door-01",
    name: "Dungeon Door",
    category: "Props",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: "2,177 Tris",
    vertices: "6,531 Verts",
    textures: "Hard Surface / Iron Reinforcement",
    description:
      "A modular dungeon entryway prop with iron banded studs, reinforced hinges, and pivot-ready layout for interactive door opening and unlocking sequences.",
    preview: null,
    modelUrl: modelAssetPath("Door.fbx"),
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "key-01",
    name: "Collectible Key",
    category: "Props",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: "19,603 Tris",
    vertices: "58,809 Verts",
    textures: "Engraved Metallic",
    description:
      "An ornate quest item and collectible puzzle prop designed for lock-and-key triggers, inventory inspection, and treasure chest mechanics in Unity.",
    preview: null,
    modelUrl: modelAssetPath("Key.fbx"),
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "robo-model-01",
    name: "Robo Model",
    category: "Characters",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: "95,362 Tris",
    vertices: "286,086 Verts",
    textures: "Hard Surface Sci-Fi Armor",
    description:
      "A high-fidelity humanoid robotic character mesh featuring articulated mechanical joints, plating armor, and distinct functional parts engineered for sci-fi games.",
    preview: null,
    modelUrl: modelAssetPath("RoboModel2.fbx"),
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
];

// Keep every portfolio entry visible.
export const visibleModels = models;

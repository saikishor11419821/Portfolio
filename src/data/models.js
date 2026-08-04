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
    id: "sedan-01",
    name: "City Sedan",
    category: "Vehicles",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A drivable sedan modeled and UV-unwrapped for DriveVerse City, textured and rigged for Unity's vehicle controller.",
    preview: null,
    modelUrl: null,
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "city-block-01",
    name: "Downtown City Block",
    category: "Environments",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A modular street block used to build out the open-world map — road segments, sidewalks, and props laid out for reuse.",
    preview: null,
    modelUrl: null,
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "house-building-01",
    name: "Old House",
    category: "Buildings",
    software: "Blender",
    pipeline: "Blender → FBX",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A detailed residential building asset created for environment concepting and level dressing, ready to be placed in architectural scenes.",
    preview: null,
    modelUrl: "/models/house.fbx",
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "utility-helicopter-01",
    name: "Utility Helicopter",
    category: "Vehicles",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A flyable helicopter with rotor rig, used for the aerial traversal mode in DriveVerse City.",
    preview: null,
    modelUrl: null,
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "car-01",
    name: "Sports Car",
    category: "Vehicles",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A custom sports car imported as FBX and shown in viewport solid mode for quick preview.",
    preview: null,
    modelUrl: "/models/Car.fbx",
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "street-props-01",
    name: "Street Prop Kit",
    category: "Props",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "In Progress",
    polyCount: null,
    textures: null,
    description:
      "A kit of streetlights, signage, benches and barriers used to dress the open world.",
    preview: null,
    modelUrl: null,
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "helicopter-01",
    name: "Utility Helicopter",
    category: "Vehicles",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A flyable helicopter with rotor rig, used for the aerial traversal mode in DriveVerse City.",
    preview: null,
    modelUrl: null,
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "collectible-crate",
    name: "Mission Crate",
    category: "Game Assets",
    software: "Blender",
    pipeline: "Blender → FBX → Unity",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A low-poly, game-ready crate used for pickup and delivery mission objectives.",
    preview: null,
    modelUrl: null,
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "sword-01",
    name: "Sword",
    category: "Props",
    software: "Blender",
    pipeline: "Blender → FBX",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A stylized sword asset exported from Blender for use in props, combat scenes, and fantasy environments.",
    preview: null,
    modelUrl: "/models/Sword.fbx",
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "old-well-01",
    name: "Old Well",
    category: "Environments",
    software: "Blender",
    pipeline: "Blender → FBX",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A detailed stone well environment asset suitable for medieval ruins, village scenes, and exploration-focused levels.",
    preview: null,
    modelUrl: "/models/Old_Well.fbx",
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "door-01",
    name: "Door",
    category: "Props",
    software: "Blender",
    pipeline: "Blender → FBX",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A modular door prop crafted for fantasy interiors, dungeon scenes, and interactive environment storytelling.",
    preview: null,
    modelUrl: "/models/Door.fbx",
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
  {
    id: "key-01",
    name: "Key",
    category: "Props",
    software: "Blender",
    pipeline: "Blender → FBX",
    status: "Game Ready",
    polyCount: null,
    textures: null,
    description:
      "A collectible key prop designed for puzzles, quests, and object interaction systems in game levels.",
    preview: null,
    modelUrl: "/models/Key.fbx",
    wireframe: null,
    textureSheet: null,
    unityShot: null,
  },
];

const availableModelUrls = new Set(
  Object.keys(import.meta.glob("/public/models/*.fbx")).map((filePath) => filePath.replace("/public", ""))
);

export const visibleModels = models.filter(
  (asset) => asset.modelUrl && availableModelUrls.has(asset.modelUrl)
);

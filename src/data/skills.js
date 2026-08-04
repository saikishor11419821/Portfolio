// GAMEPLAY ARSENAL DATA
// Grouped skill cards. Add a new group or push a new skill string
// into an existing group's `items` array.

export const skillGroups = [
  {
    id: "gameplay-programming",
    title: "Gameplay Programming",
    code: "ARS.01",
    items: [
      "Unity",
      "C#",
      "Player Controllers",
      "Character Movement",
      "Combat Systems",
      "Interaction Systems",
      "Mission Systems",
      "Quest Systems",
      "Vehicle Systems",
      "Physics",
      "Game Logic",
    ],
  },
  {
    id: "game-systems",
    title: "Game Systems",
    code: "ARS.02",
    items: [
      "Inventory Systems",
      "Health Systems",
      "Economy Systems",
      "Save Systems",
      "UI Systems",
      "Mini-map",
      "GPS Systems",
      "Mission Tracking",
      "Scene Management",
    ],
  },
  {
    id: "3d-game-dev",
    title: "3D Game Development",
    code: "ARS.03",
    items: [
      "Blender",
      "3D Modeling",
      "UV Mapping",
      "Texturing",
      "Materials",
      "Lighting",
      "Environment Creation",
      "Game-Ready Assets",
      "FBX Workflow",
    ],
  },
  {
    id: "game-art-vfx",
    title: "Game Art & VFX",
    code: "ARS.04",
    items: [
      "Unity Particle Systems",
      "Fire",
      "Smoke",
      "Sparks",
      "Dust",
      "Rain",
      "Snow",
      "Environmental Effects",
    ],
  },
  {
    id: "tools",
    title: "Game Development Tools",
    code: "ARS.05",
    items: ["Unity", "Blender", "Git", "GitHub", "Mixamo", "Unity Asset Store"],
  },
];

// UNDER THE HOOD — technical systems breakdown
export const technicalSystems = [
  {
    id: "player-controller",
    title: "Player Controller",
    what: "Handles movement, jumping, sliding and animation blending for the third-person character.",
    tech: ["Unity", "C#", "Animator Controller", "Character Controller"],
  },
  {
    id: "vehicle-controller",
    title: "Vehicle Controller",
    what: "Wheel-collider driving physics with enter/exit handling and speed-based camera behaviour.",
    tech: ["Unity", "C#", "Wheel Colliders", "Cinemachine"],
  },
  {
    id: "mission-manager",
    title: "Mission Manager",
    what: "Drives mission state — start, objectives, completion — from a data-driven mission list.",
    tech: ["Unity", "C#", "ScriptableObjects"],
  },
  {
    id: "taxi-system",
    title: "Taxi System",
    what: "Passenger spawning, pickup detection, and fare-based rewards for taxi missions.",
    tech: ["Unity", "C#"],
  },
  {
    id: "gps-system",
    title: "GPS System",
    what: "Converts a world-space destination into a screen-space directional arrow for navigation.",
    tech: ["Unity", "C#", "UI Toolkit"],
  },
  {
    id: "mini-map",
    title: "Mini-Map",
    what: "A secondary render-texture camera tracking the player and points of interest in real time.",
    tech: ["Unity", "Render Textures"],
  },
  {
    id: "garage-system",
    title: "Garage System",
    what: "Vehicle storage, spawning, and swapping tied to garage locations across the map.",
    tech: ["Unity", "C#"],
  },
  {
    id: "game-economy",
    title: "Game Economy",
    what: "Tracks player currency, mission rewards, and vehicle purchase / sale transactions.",
    tech: ["Unity", "C#", "PlayerPrefs / Save Data"],
  },
  {
    id: "health-system",
    title: "Health System",
    what: "Damage, regeneration, and state-change handling for player and vehicle health.",
    tech: ["Unity", "C#"],
  },
  {
    id: "scene-management",
    title: "Scene Management",
    what: "Additive scene loading to stream large open-world areas without hard load screens.",
    tech: ["Unity", "SceneManager", "Addressables"],
  },
  {
    id: "save-system",
    title: "Save System",
    what: "Serializes player progress, currency, and owned vehicles between sessions.",
    tech: ["Unity", "C#", "JSON Serialization"],
  },
  {
    id: "ui-system",
    title: "UI System",
    what: "HUD, menus, and mission trackers built with a reusable, data-driven UI framework.",
    tech: ["Unity UI", "C#"],
  },
];

// BLENDER → UNITY ART PIPELINE
export const artPipeline = [
  "Blender",
  "Modeling",
  "UV Unwrapping",
  "Texturing",
  "Materials",
  "FBX",
  "Unity",
  "Game-Ready Asset",
];

// HOW I BUILD A GAME
export const devWorkflow = [
  { step: "01", title: "Concept" },
  { step: "02", title: "Game Design" },
  { step: "03", title: "3D Assets" },
  { step: "04", title: "Gameplay Programming" },
  { step: "05", title: "Animation" },
  { step: "06", title: "VFX" },
  { step: "07", title: "Testing" },
  { step: "08", title: "Build & Deploy" },
];

// DEVELOPMENT TIMELINE
export const timeline = [
  { year: "2023", text: "Started B.Tech CSE (AI & ML)." },
  { year: "2024", text: "Started exploring programming and application development." },
  { year: "2025", text: "Expanded into mobile development and interactive applications." },
  {
    year: "2026",
    text: "Focused heavily on Unity Game Development, Blender 3D Modeling, VFX, and game projects.",
  },
  {
    year: "2026–2027",
    text: "Building professional game development portfolio and seeking paid internship opportunities.",
  },
];

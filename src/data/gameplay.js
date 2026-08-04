// GAMEPLAY SYSTEMS SHOWCASE DATA
// To add a new gameplay system, push one object into this array.
// GameplayShowcase.jsx renders entirely from this data.
//
// media: { type: "video" | "gif" | "image", src: "/gameplay/xxx.mp4" }
// Leave media as null until you have a capture — the card will show
// a placeholder state instead of a broken asset.

export const gameplaySystems = [
  {
    id: "player-movement",
    title: "Player Movement",
    tag: "CORE",
    points: ["Walking", "Running", "Jumping", "Sliding", "Animations"],
    description:
      "A responsive third-person controller built on Unity's Character Controller and root-motion animation blending.",
    media: null,
  },
  {
    id: "vehicle-system",
    title: "Vehicle System",
    tag: "SYSTEM",
    points: ["Car driving", "Enter / Exit", "Vehicle physics", "Dynamic camera"],
    description:
      "Wheel-collider based driving physics with seamless enter/exit and a camera rig that adapts to vehicle speed.",
    media: null,
  },
  {
    id: "mission-system",
    title: "Mission System",
    tag: "SYSTEM",
    points: ["Mission start", "Objectives", "Pickup", "Drop-off", "Mission completion"],
    description:
      "A data-driven mission manager that tracks objectives, spawns targets, and rewards completion in real time.",
    media: null,
  },
  {
    id: "gps-system",
    title: "GPS System",
    tag: "UI",
    points: ["GPS arrow", "Mini-map", "Destination tracking"],
    description:
      "A world-space to screen-space GPS arrow paired with a live mini-map for destination tracking during missions.",
    media: null,
  },
  {
    id: "game-economy",
    title: "Game Economy",
    tag: "SYSTEM",
    points: ["Cash", "Vehicle purchase", "Vehicle selling", "Rewards"],
    description:
      "A persistent in-game currency system tied to missions, vehicle trading, and player progression.",
    media: null,
  },
  {
    id: "vfx",
    title: "VFX",
    tag: "ART",
    points: ["Fire", "Smoke", "Sparks", "Rain", "Snow", "Dust"],
    description:
      "Unity Particle System effects used to sell environmental atmosphere and gameplay feedback.",
    media: null,
  },
];

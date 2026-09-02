// GAME LIBRARY DATA
// To add a new game, push one object into this array. GameProjects.jsx
// and GameProjectCard.jsx render entirely from this data — no other
// file needs to change.
//
// thumbnail: path under /src/assets/projects/ (import it) or a URL.
// status: "Playable" | "In Development" | "Prototype" | "Coming Soon"

export const featuredProject = {
  id: "driveverse-city",
  title: "DriveVerse City",
  subtitle: "Open-World 3D Driving Experience",
  description:
    "DriveVerse City is an open-world 3D driving game developed in Unity. The game allows players to explore a large environment, drive different vehicles, complete missions, interact with the world, and earn money through various activities.",
  genre: "Open World / Driving",
  engine: "Unity",
  platform: "PC / WebGL",
  status: "Playable",
  features: [
    "Open-world exploration",
    "Multiple vehicles",
    "Car driving",
    "Helicopter gameplay",
    "Taxi missions",
    "Passenger pickup and drop-off",
    "Vehicle garage",
    "Vehicle purchasing",
    "Vehicle selling",
    "Mission system",
    "GPS navigation",
    "Mini-map",
    "Dynamic camera",
    "Game economy",
    "Multiple environments",
    "Player interaction",
  ],
  tech: ["Unity", "C#", "Blender", "Mixamo", "GitHub", "WebGL"],
  playUrl: "https://kishor111.itch.io/drive",
  githubUrl: "https://github.com/saikishor11419821/Driveverse-City.git",
  // Drop a hero image/poster at this path, or a short capture/GIF.
  cover: "/gameplay/player-movement.png",
  video: null,
  gallery: [
    "/gameplay/player-movement.png",
    "/gameplay/vehicle-system.png",
    "/gameplay/mission-system.png",
    "/gameplay/gps-system.png",
    "/gameplay/game-economy.png",
    "/gameplay/vfx.png",
  ],
};

export const projects = [
  {
    id: "driveverse-city",
    title: "DriveVerse City",
    genre: "Open World / Driving",
    engine: "Unity",
    platform: "PC / WebGL",
    status: "Playable",
    description:
      "An open-world driving game with taxi missions, vehicle ownership, and a live in-world economy.",
    thumbnail: null,
    playUrl: "https://kishor111.itch.io/drive",
    githubUrl: "https://github.com/saikishor11419821/Driveverse-City.git",
    trailerUrl: null,
    tags: ["Unity", "C#", "Open World", "Vehicles"],
  },
  {
    id: "flying-bird",
    title: "FlyingBird",
    genre: "2D Endless Runner",
    engine: "Unity",
    platform: "Mobile",
    status: "Playable",
    description: "A simple tap-to-fly 2D endless runner where you control a bird and dodge obstacles.",
    thumbnail: null,
    playUrl: "https://kishor111.itch.io/flying-bird",
    githubUrl: "https://github.com/saikishor11419821/FlyingBird",
    trailerUrl: null,
    tags: ["Unity", "C#", "Mobile", "Endless Runner"],
  },
  {
    id: "dont-stop-running",
    title: "Don't Stop Running",
    genre: "Endless Runner",
    engine: "Unity",
    platform: "Mobile",
    status: "Coming Soon",
    description: "An endless runner in the style of Subway Surfers — coming soon.",
    thumbnail: null,
    playUrl: null,
    githubUrl: null,
    trailerUrl: null,
    tags: ["Unity", "Mobile", "Coming Soon"],
  },
];

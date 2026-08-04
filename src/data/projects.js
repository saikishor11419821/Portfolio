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
  playUrl: "https://unitygames.vercel.app",
  githubUrl: "https://github.com/saikishor11419821/Driveverse-City.git",
  // Drop a hero image/poster at this path, or a short capture/GIF.
  cover: null,
  video: null,
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
    playUrl: "https://unitygames.vercel.app",
    githubUrl: "https://github.com/saikishor11419821/Driveverse-City.git",
    trailerUrl: null,
    tags: ["Unity", "C#", "Open World", "Vehicles"],
  },
  {
    id: "project-02",
    title: "Coming Soon",
    genre: "Unity Game",
    engine: "Unity",
    platform: "PC",
    status: "In Development",
    description: "A new Unity project currently in active development.",
    thumbnail: null,
    playUrl: null,
    githubUrl: null,
    trailerUrl: null,
    tags: ["Unity"],
  },
  {
    id: "project-03",
    title: "Coming Soon",
    genre: "Mobile Game",
    engine: "Unity",
    platform: "Mobile",
    status: "Prototype",
    description: "An early-stage mobile game prototype.",
    thumbnail: null,
    playUrl: null,
    githubUrl: null,
    trailerUrl: null,
    tags: ["Unity", "Mobile"],
  },
  {
    id: "project-04",
    title: "Coming Soon",
    genre: "3D Game",
    engine: "Unity",
    platform: "PC",
    status: "In Development",
    description: "A 3D gameplay experiment currently in development.",
    thumbnail: null,
    playUrl: null,
    githubUrl: null,
    trailerUrl: null,
    tags: ["Unity", "3D"],
  },
];

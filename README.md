# Kishor — Unity Game Developer Portfolio

A cinematic, HUD-styled portfolio built for applying to Unity Game
Developer, 3D Game Artist, and Game Design internships/roles. Built with
React, Vite, Tailwind CSS, Framer Motion, and an interactive Three.js /
React Three Fiber 3D model viewer.

---

## 1. How to install

```bash
npm install
```

Requires Node.js 18+.

## 2. How to run (local dev)

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). The site
hot-reloads as you edit files.

To check a production build locally:

```bash
npm run build
npm run preview
```

---

## 3. How to add a Unity project

Open `src/data/projects.js` and push one object into the `projects` array:

```js
{
  id: "my-new-game",
  title: "My New Game",
  genre: "Platformer",
  engine: "Unity",
  platform: "PC / WebGL",
  status: "Playable", // "Playable" | "In Development" | "Prototype" | "Coming Soon"
  description: "A short one- or two-sentence description.",
  thumbnail: null, // see below for how to add an image
  playUrl: "https://your-play-link.com",
  githubUrl: "https://github.com/you/repo",
  trailerUrl: null,
  tags: ["Unity", "C#", "2D"],
},
```

It will automatically appear as a new card in the **My Games** section —
no other file needs to change.

To update the big **Featured Game** showcase (currently DriveVerse City),
edit the `featuredProject` object at the top of the same file.

## 4. How to add a Blender model

Open `src/data/models.js` and push one object into the `models` array:

```js
{
  id: "my-new-model",
  name: "Sci-Fi Crate",
  category: "Props", // Vehicles | Environments | Buildings | Props | Game Assets | Characters | Other
  software: "Blender",
  pipeline: "Blender → FBX → Unity",
  status: "Game Ready", // or "In Progress"
  polyCount: "3.2k tris",
  textures: "2K PBR",
  description: "What this asset is and where it's used.",
  preview: "/models-preview/crate.jpg", // still render, see below
  modelUrl: "/models/crate.fbx",        // interactive model, see below
  wireframe: null,
  textureSheet: null,
  unityShot: null,
},
```

It will automatically appear in the **3D Asset Vault**, filterable by
category, with a working interactive viewer if `modelUrl` is set.

## 5. How to upload an FBX model

1. Export your model from Blender as `.fbx`.
2. Drop the file into `public/models/` (create the folder if it doesn't
   exist), e.g. `public/models/crate.fbx`.
3. Set `modelUrl: "/models/crate.fbx"` on that asset's object in
   `src/data/models.js`.

If `modelUrl` is left as `null`, the asset card and detail page will
automatically fall back to the static `preview` image (or a labeled
placeholder if there's no preview yet either) — nothing will break.

## 6. How to add screenshots

- **Game thumbnails**: put images in `src/assets/projects/`, import them
  at the top of `src/data/projects.js` (e.g.
  `import driveverseCover from "../assets/projects/driveverse-cover.jpg";`)
  and set that variable as a project's `thumbnail`.
- **3D asset renders**: put images in `src/assets/models/` (or
  `public/models-preview/`) and set them as `preview`, `wireframe`,
  `textureSheet`, or `unityShot` on the relevant object in
  `src/data/models.js`.

## 7. How to add gameplay videos

- Put video files, GIFs, or screenshots in `src/assets/gameplay/`.
- Open `src/data/gameplay.js` and set the `media` field on the relevant
  system, e.g. `media: { type: "video", src: "/gameplay/vehicle-demo.mp4" }`.
- Clicking that card opens it in the fullscreen `MediaModal`.

## 8. How to update GitHub links

All external links live in `src/data/socials.js` and inside each project
object in `src/data/projects.js` / `src/data/models.js`. Update
`socials.github` for your profile link, and `githubUrl` on each project
for that specific repo. URLs are only ever used as link targets — the
raw URL text is never printed on the page.

## 9. How to update the resume

1. Replace the placeholder in `public/resume/` with your real file,
   named `Kishor_Resume.pdf` (or update the path below to match your
   filename).
2. The path is set once in `src/data/socials.js`:

   ```js
   export const resumePath = "/resume/Kishor_Resume.pdf";
   ```

   Every "Download Resume" button across the site reads from this one
   constant.

## 10. How to configure the contact form

The form uses [Formspree](https://formspree.io) — no custom backend
required.

1. Create a free account at formspree.io and create a new form.
2. Copy the endpoint it gives you (looks like
   `https://formspree.io/f/abcdwxyz`).
3. Open `src/components/Contact.jsx` and replace the placeholder:

   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";
   ```

   with your real endpoint.

   Alternatively, create a `.env` file in the project root and add:

   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```

   Then restart the Vite dev server.

Prefer EmailJS instead? Swap the `fetch()` call inside the `onSubmit`
function in `Contact.jsx` for an `emailjs.send(...)` call — the form UI
and validation stay the same either way.

Also update the direct contact details (email, LinkedIn, GitHub, Itch.io,
YouTube) in `src/data/socials.js` — the Contact section and Footer both
read from there.

## 11. How to deploy to Vercel

**Option A — via GitHub (recommended):**

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite. Framework preset: **Vite**, build command
   `npm run build`, output directory `dist`. Click **Deploy**.

**Option B — via CLI:**

```bash
npm install -g vercel
vercel
```

Follow the prompts (link/create a project, confirm build settings), then
run `vercel --prod` to push to production.

A `vercel.json` is already included with an SPA rewrite rule so
client-side scrolling/anchors work correctly on refresh.

---

## Project structure

```
src/
  components/
    HUD/            Reusable HUD primitives (Reticle, SectionHeading, GlowButton)
    Effects/         Ambient grid, particles, cursor glow, easter egg
    IntroScreen.jsx  Loading sequence + "Press Enter" gate (localStorage-aware)
    Navbar.jsx       Sticky HUD nav + mobile fullscreen menu
    Hero.jsx         Cinematic fullscreen intro
    About.jsx        "The Developer" + PlayerProfile.jsx card
    FeaturedGame.jsx DriveVerse City showcase
    GameProjects.jsx + GameProjectCard.jsx   Game library grid
    GameplayShowcase.jsx + MediaModal.jsx    Gameplay systems + fullscreen media
    AssetVault.jsx + AssetCard.jsx + AssetDetails.jsx + ModelViewer.jsx
                     3D asset database, filtering, and interactive FBX viewer
    Pipeline.jsx     Blender → Unity pipeline + "How I Build a Game"
    TechnicalSystems.jsx  "Under the Hood" engineering breakdown
    Skills.jsx       "Gameplay Arsenal" skill cards
    Resume.jsx        "Character Profile" + dev timeline
    Certifications.jsx
    Contact.jsx      Formspree-ready contact form
    Footer.jsx
  data/
    projects.js models.js gameplay.js skills.js certifications.js socials.js
public/
  models/            Your .fbx files go here
  resume/            Your resume PDF goes here
```

Every list-based section (games, 3D assets, gameplay systems, skills,
certifications) is fully data-driven — add a new entry by adding one
object to the matching file in `src/data/`, no component code required.

## Notes

- **Fonts**: Orbitron, Rajdhani, and JetBrains Mono are loaded from Google
  Fonts in `index.html` at runtime — no local font files needed.
- **Reduced motion**: the ambient particle field and page-load intro
  respect `prefers-reduced-motion`.
- **Mobile**: 3D particle density is automatically reduced on narrow /
  low-end devices, and the 3D model viewer is lazy-loaded so it's only
  downloaded when a visitor opens an asset.
- **Easter egg**: try the classic ↑ ↑ ↓ ↓ ← → ← → sequence anywhere on
  the page.

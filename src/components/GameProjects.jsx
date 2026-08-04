import SectionHeading from "./HUD/SectionHeading";
import GameProjectCard from "./GameProjectCard";
import { projects } from "../data/projects";

export default function GameProjects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Game Library"
          title="My Games"
          subtitle="A growing library of Unity projects — from a shipped open-world driving game to prototypes still in development."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <GameProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

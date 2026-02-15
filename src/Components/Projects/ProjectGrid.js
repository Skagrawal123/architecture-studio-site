import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "10px",
        padding: "40px",
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

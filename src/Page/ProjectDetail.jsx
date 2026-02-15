import { useParams } from "react-router-dom";
import projects from "../Data/project";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div style={{ padding: 40 }}>Project Not Found</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 40, marginBottom: 30 }}>
        {project.title}
      </h1>

      <img
        src={project.image}
        style={{
          width: "100%",
          height: 600,
          objectFit: "cover",
        }}
      />
    </div>
  );
}

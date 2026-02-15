import ProjectGrid from "../Components/Projects/ProjectGrid";
import projects from "../Data/project";

export default function Home() {
  return <ProjectGrid projects={projects} />;
}

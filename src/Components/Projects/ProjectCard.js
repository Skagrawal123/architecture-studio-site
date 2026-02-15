import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center" 
      }}
    >
      <Link
        to={`/projects/${project.id}`}
        style={{
          textDecoration: "none",
          width: "50%"
        }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          style={{
            position: "relative",
            overflow: "hidden",
            cursor: "pointer"
          }}
        >
          <img
            src={project.image}
            alt="img"
            style={{
              width: "100%",
              height: 500,
              objectFit: "cover"
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "20px",
              fontSize: "18px",
              letterSpacing: "2px"
            }}
          >
            {project.title}
          </div>
        </motion.div>
      </Link>
    </div>
  );
}

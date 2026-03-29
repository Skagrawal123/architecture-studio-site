import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <Link
        to={`/projects/${project.id}`}
        style={{
          textDecoration: "none",
          width: "min(90%, 900px)" // responsive max width
        }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          style={{
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            width: "100%"
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              aspectRatio: "4 / 5",    // 🔥 responsive height control
              objectFit: "cover",
              display: "block"
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "clamp(12px, 3vw, 20px)",
              fontSize: "clamp(14px, 2vw, 18px)",
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

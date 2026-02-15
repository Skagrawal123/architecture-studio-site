import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout/Layout1";
import Home from "./Page/Home";
import ProjectDetail from "./Page/ProjectDetail";
import About from "./Page/About";
import Projects from "./Components/Projects/ProjectGrid"; // if you want grid as page

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

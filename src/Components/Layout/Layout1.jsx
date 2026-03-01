import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../CSSFiles/Header.css"

export default function Layout() {
  return (
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
      <Header />
      <div className="main-content" style={{ marginTop: 70 }}>
        <Outlet />
      </div>
    </div>
  );
}

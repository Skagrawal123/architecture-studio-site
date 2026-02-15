import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
      <Header />
      <div style={{ marginTop: 70 }}>
        <Outlet />
      </div>
    </div>
  );
}

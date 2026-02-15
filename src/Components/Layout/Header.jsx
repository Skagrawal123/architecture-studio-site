import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarJson from "../../Data/NavbarJson";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(NavbarJson[0]);

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 40px",
    width: "100%"
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#f3f3f3",
        borderBottom: "1px solid #ddd",
        zIndex: 1000
      }}
    >
      {/* TOP ROW */}
      <div
        style={{
          ...containerStyle,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* LEFT */}
        <Link
  to="/"
  style={{
    textDecoration: "none",
    color: "#000",
    display: "flex",
    flexDirection: "column",
    lineHeight: 1
  }}
>
  <span
    style={{
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: "1px"
    }}
  >
    RK
  </span>

  <span
    style={{
      fontSize: 12,
      letterSpacing: "3px",
      marginTop: "2px"
    }}
  >
    ARCHITECTS
  </span>
</Link>

        

        {/* CENTER MAIN NAV */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            fontSize: 14,
            letterSpacing: "2px"
          }}
        >
          {NavbarJson.map((item) => (
            <span
              key={item.id}
              onClick={() => setActiveMenu(item)}
              style={{
                cursor: "pointer",
                fontWeight:
                  activeMenu.slug === item.slug ? "600" : "400"
              }}
            >
              {item.name.toUpperCase()}
            </span>
          ))}
        </div>

        {/* RIGHT SEARCH */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "1px solid #999",
            paddingBottom: "3px"
          }}
        >
          {/* Search Icon */}
          <span style={{ fontSize: 14 }}>🔍</span>

          <input
            type="text"
            placeholder="SEARCH"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 14,
              letterSpacing: "2px",
              width: "120px"
            }}
          />
        </div>

      </div>

      {/* SUB NAV ROW */}
      {activeMenu.subMenu.length > 0 && (
        <div
          style={{
            ...containerStyle,
            display: "flex",
            justifyContent: "center",
            gap: "35px",
            paddingBottom: 15,
            fontSize: 14
          }}
        >
          {activeMenu.subMenu.map((sub, index) => (
            <span
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => console.log(sub)}
            >
              {sub}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

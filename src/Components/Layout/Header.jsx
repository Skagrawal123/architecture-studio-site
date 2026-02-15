import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NavbarJson from "../../Data/NavbarJson";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(NavbarJson[0]);
  const [showIntro, setShowIntro] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoRef = useRef(null);
  const [targetPosition, setTargetPosition] = useState(null);

  /* ================= RESPONSIVE LISTENER ================= */
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  /* ================= GET LOGO POSITION FOR INTRO ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        setTargetPosition({
          x: rect.left,
          y: rect.top
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  /* ================= INTRO TIMER ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: isMobile ? "0 20px" : "0 40px",
    width: "100%"
  };

  return (
    <>
      {/* ================= INTRO ANIMATION ================= */}
      {showIntro && targetPosition && (
        <motion.div
          initial={{
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            position: "fixed"
          }}
          animate={{
            top: targetPosition.y,
            left: targetPosition.x,
            translateX: "0%",
            translateY: "0%",
            scale: 0.4
          }}
          transition={{
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1]
          }}
          style={{
            color: "white",
            zIndex: 3000
          }}
        >
          <div style={{ fontSize: 70, fontWeight: 600 }}>RK</div>
          <div style={{ fontSize: 18, letterSpacing: "6px" }}>
            ARCHITECTS
          </div>
        </motion.div>
      )}

      {/* BLACK BACKGROUND */}
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "black",
            zIndex: 2000
          }}
        />
      )}

      {/* ================= NAVBAR ================= */}
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
          {/* LOGO */}
          <Link
            to="/"
            ref={logoRef}
            style={{
              textDecoration: "none",
              color: "#000",
              display: "flex",
              flexDirection: "column",
              lineHeight: 1
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 600 }}>RK</span>
            <span style={{ fontSize: 12, letterSpacing: "3px" }}>
              ARCHITECTS
            </span>
          </Link>

          {/* CENTER NAV (DESKTOP ONLY) */}
          {!isMobile && (
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
          )}

          {/* RIGHT SECTION */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderBottom: "1px solid #999",
                  paddingBottom: "3px"
                }}
              >
                🔍
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
            )}

            {isMobile && (
              <div
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  fontSize: 24,
                  cursor: "pointer"
                }}
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {isMobile && mobileMenuOpen && (
          <div
            style={{
              backgroundColor: "#f3f3f3",
              padding: "20px"
            }}
          >
            {NavbarJson.map((item) => (
              <div key={item.id} style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "8px",
                    cursor: "pointer"
                  }}
                  onClick={() => setActiveMenu(item)}
                >
                  {item.name}
                </div>

                {item.subMenu.map((sub, index) => (
                  <div
                    key={index}
                    style={{
                      paddingLeft: "15px",
                      fontSize: "14px",
                      marginBottom: "5px",
                      cursor: "pointer"
                    }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* DESKTOP SUB NAV */}
        {!isMobile &&
          activeMenu.subMenu &&
          activeMenu.subMenu.length > 0 && (
            <div
              style={{
                ...containerStyle,
                display: "flex",
                justifyContent: "center",
                gap: "35px",
                padding: "10px 0",
                fontSize: 14
              }}
            >
              {activeMenu.subMenu.map((sub, index) => (
                <span key={index} style={{ cursor: "pointer" }}>
                  {sub}
                </span>
              ))}
            </div>
          )}
      </div>
    </>
  );
}

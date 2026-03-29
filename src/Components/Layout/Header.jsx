import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavbarJson from "../../Data/NavbarJson";
import "../CSSFiles/Header.css";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(NavbarJson[0]);
  const [showIntro, setShowIntro] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState(null);

  const logoRef = useRef(null);
  const [targetPosition, setTargetPosition] = useState(null);

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
    width: "100%",
    margin: "0 auto",
    padding: "0 20px"
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
          <div style={{ fontSize: "clamp(40px, 8vw, 70px)", fontWeight: 600 }}>
            RK
          </div>
          <div
            style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              letterSpacing: "6px"
            }}
          >
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
      <div className="header-wrapper">
        {/* TOP ROW */}
        <div style={containerStyle} className="top-row">
          {/* LOGO */}
          <Link
            to="/"
            ref={logoRef}
            className="logo"
          >
            <span className="logo-main">RK</span>
            <span className="logo-sub">ARCHITECTS</span>
          </Link>

          {/* CENTER NAV */}
          <div className="nav-center">
            {NavbarJson.map((item) => (
              <span
                key={item.id}
                onClick={() =>
                  setActiveMenu(activeMenu.slug === item.slug ? {} : item)
                }
                className={`nav-item ${activeMenu.slug === item.slug ? "active" : ""
                  }`}
              >
                {item.name.toUpperCase()}
              </span>
            ))}
          </div>

          {/* RIGHT SECTION */}
          <div className="right-section">
            <div className="search-box">
              🔍
              <input type="text" placeholder="SEARCH" />
            </div>

            <div
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                   position: "fixed",
  top: "90px",
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 998
                }}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}   // start from right
                animate={{ x: 0 }}
                exit={{ x: "100%" }}      // go back to right
                transition={{ duration: 0.3 }}
                className="mobile-sidebar"
              >
                {NavbarJson.map((item) => (
                  <div key={item.id} className="mobile-menu-item">

                    {/* MAIN NAV */}
                    <div
                      className="mobile-main"
                      onClick={() =>
                        setMobileActiveMenu(
                          mobileActiveMenu === item.id ? null : item.id
                        )
                      }
                    >
                      {item.name}
                    </div>

                    {/* SUB NAV */}
                    <AnimatePresence>
                      {mobileActiveMenu === item.id &&
                        item.subMenu?.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.subMenu.map((sub, index) => (
                              <div
                                key={index}
                                className="mobile-sub"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileActiveMenu(null);
                                  setActiveMenu(item);
                                }}
                              >
                                {sub}
                              </div>
                            ))}
                          </motion.div>
                        )}
                    </AnimatePresence>

                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* DESKTOP SUB NAV */}
        {activeMenu.subMenu?.length > 0 && (
          <div style={containerStyle} className="desktop-subnav">
            {activeMenu.subMenu.map((sub, index) => (
              <span key={index}>{sub}</span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
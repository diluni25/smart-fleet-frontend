import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";

import "../../styles/global.css";
import "../../styles/app.css";

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="lr-app">
      <Header onMenuClick={() => setMenuOpen((v) => !v)} />

      <div className="lr-body">
        {menuOpen && (
          <button
            className="lr-overlay"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <div className={`lr-sidebar-wrap ${menuOpen ? "is-open" : ""}`}>
          <Sidebar onNavigate={() => setMenuOpen(false)} />
        </div>

        <div className="lr-main-column">
          <main className="lr-main">
            <div className="content">
              <Outlet />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <div className={open ? 'sidebar-wrap open' : 'sidebar-wrap'} onClick={() => setOpen(false)}>
        <Sidebar />
      </div>
      {open && <button className="mobile-overlay" onClick={() => setOpen(false)} aria-label="Close menu" />}
      <div className="main-area">
        <Header onMenuClick={() => setOpen((value) => !value)} />
        <main className="content"><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
}

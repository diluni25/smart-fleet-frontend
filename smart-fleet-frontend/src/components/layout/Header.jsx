import { ArrowRight, Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="topbar">
      <button className="mobile-menu icon-button" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </button>
      <a className="site-brand" href="/dashboard" aria-label="RelayOps home">
        <span className="site-brand-mark"><span /><span /></span>
        <span><strong>RelayOps</strong><small>TRANSPORT CONTROL</small></span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#platform">Platform</a>
        <a href="#how-it-works">How it works</a>
        <a href="#resources">Resources</a>
      </nav>
      <div className="header-actions">
        <a className="help-link" href="#support">Help center</a>
        <span className="header-divider" />
        <a className="workspace-cta" href="/dashboard">Open workspace <ArrowRight size={16} /></a>
      </div>
    </header>
  );
}

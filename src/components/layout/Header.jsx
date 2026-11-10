import { Menu } from "lucide-react";
import logo from "../../assets/logiroute-logo.png";

export default function Header({ onMenuClick }) {
  return (
    <header className="lr-header">
      <div className="lr-brand">
        <button
          type="button"
          className="lr-mobile-toggle"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        <img src={logo} className="lr-logo" alt="Logiroute logo" />
        <strong className="lr-brand-title">LOGIROUTE FLEET OPS</strong>
      </div>
      <div className="lr-header-right">
        <input
          className="lr-search"
          type="search"
          placeholder="Search transfers, store routes..."
          aria-label="Search"
        />
        <span className="lr-status-dot" title="Status" />
        <div className="lr-profile">
          <strong>
            Operations
            <br />
            Lead
          </strong>
          <span>Dispatch North</span>
        </div>
        <div className="lr-avatar" aria-label="Profile placeholder">
          OL
        </div>
      </div>
    </header>
  );
}

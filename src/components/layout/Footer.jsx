import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-intro">
          <a className="site-brand" href="/dashboard" aria-label="RelayOps home">
            <span className="site-brand-mark"><span /><span /></span>
            <span><strong>RelayOps</strong><small>TRANSPORT CONTROL</small></span>
          </a>
          <p>One place for bookings, trips, store slots and vehicles. Keep transportation across all three stores coordinated.</p>
        </div>
        <div className="footer-links" id="platform">
          <div><h2>Platform</h2><a href="/bookings">Booking management</a><a href="/trips">Trip coordination</a><a href="/schedules">Store schedules</a><a href="/vehicles">Vehicle management</a></div>
          <div id="support"><h2>Support</h2><a href="#support">Help center</a><a href="#getting-started">Getting started</a><a href="#contact">Contact support</a></div>
          <div><h2>Legal</h2><a href="#privacy">Privacy policy</a><a href="#terms">Terms of use</a><a href="#cookies">Cookie preferences</a></div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} RelayOps. All rights reserved.</span>
        <a href="/dashboard">Open workspace <ArrowRight size={16} /></a>
      </div>
    </footer>
  );
}

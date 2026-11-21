import { NavLink } from 'react-router-dom';
import { BarChart3, ClipboardList, Route, Truck, UserRoundCog } from 'lucide-react';

const navigation = [
  { to: '/bookings', label: 'Booking Queue', icon: ClipboardList },
  { to: '/trips', label: 'Trip Planner', icon: Route },
  { to: '/vehicles', label: 'Transport Units', icon: Truck },
  { to: '/settings', label: 'Drivers & Shifts', icon: UserRoundCog },
  { to: '/dashboard', label: 'System Reports', icon: BarChart3 },
];

export default function DispatchSidebar() {
  return <aside className="sidebar dispatch-sidebar">
    <div className="dispatch-brand"><span className="dispatch-brand-mark"><Truck size={15} /></span><span><strong>LOGIROUTE</strong><small>FLEET CONTROL</small></span></div>
    <p className="dispatch-heading">DISPATCH OPS</p>
    <nav aria-label="Dispatch navigation">{navigation.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `nav-item dispatch-nav-item ${isActive ? 'active' : ''}`}><Icon size={13} /><span>{label}</span></NavLink>)}</nav>
    <div className="dispatch-sidebar-bottom">Fleet operations<br /><span>Admin workspace</span></div>
  </aside>;
}

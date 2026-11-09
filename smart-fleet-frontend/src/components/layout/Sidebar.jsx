import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarPlus, ClipboardList, Store, Truck, Route, CalendarDays, Settings } from 'lucide-react';
const navigation = [
  { to:'/dashboard', label:'Dashboard', icon:LayoutDashboard },
  { to:'/bookings/create', label:'Create Booking', icon:CalendarPlus },
  { to:'/bookings', label:'Bookings', icon:ClipboardList },
  { to:'/stores', label:'Stores', icon:Store },
  { to:'/vehicles', label:'Vehicles', icon:Truck },
  { to:'/trips', label:'Trips', icon:Route },
  { to:'/schedules', label:'Schedules', icon:CalendarDays },
  { to:'/settings', label:'Settings', icon:Settings },
];
export default function Sidebar() {
  return <aside className="sidebar"><div className="brand"><span className="brand-mark">F</span><span><strong>FUCHSIUS</strong><small>Smart Fleet Management</small></span></div>
    <p className="nav-heading">WORKSPACE</p><nav aria-label="Main navigation">{navigation.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} className={({isActive})=>`nav-item ${isActive?'active':''}`}><Icon size={19}/>{label}</NavLink>)}</nav><div className="sidebar-bottom">Transportation Management System<br/><span>Frontend Starter • Sprint 1</span></div></aside>;
}
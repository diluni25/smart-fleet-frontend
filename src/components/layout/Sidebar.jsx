import { NavLink } from "react-router-dom";
import {
  ClipboardList,
  CirclePlus,
  Route,
  Truck,
  BriefcaseBusiness,
  PackageOpen,
  ClipboardCheck,
  TriangleAlert,
  ChartNoAxesColumn,
} from "lucide-react";

const menu = [
  { to: "/bookings", label: "Booking Queue", icon: ClipboardList },
  { to: "/bookings/create", label: "Create booking", icon: CirclePlus },
  { to: "/trips", label: "Trip Planner", icon: Route },
  { to: "/vehicles", label: "Transport Units", icon: Truck },
  { to: "/drivers-shifts", label: "Drivers & Shifts", icon: BriefcaseBusiness },
  { to: "/goods/handover", label: "Goods handover", icon: PackageOpen },
  { to: "/goods/receipt", label: "Receipt confirmation", icon: ClipboardCheck },
  { to: "/goods/discrepancies", label: "Discrepancies", icon: TriangleAlert },
  { to: "/reports", label: "System Reports", icon: ChartNoAxesColumn },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="lr-sidebar">
      <div className="lr-nav-heading">DISPATCH OPS</div>
      <nav className="lr-nav" aria-label="Dispatch navigation">
        {menu.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `lr-nav-item${isActive ? " is-active" : ""}`
            }
          >
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

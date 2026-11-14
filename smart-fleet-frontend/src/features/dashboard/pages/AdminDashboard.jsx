import { Activity, CalendarDays, CalendarPlus, CheckCircle2, ClipboardList, Clock3, Store, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { activityItems } from '../../operations/data/operationsData.js';

const activityIcons = { booking: CalendarPlus, vehicle: Truck, store: Store, check: CheckCircle2 };

export default function AdminDashboard() {
  const stats = [[ClipboardList, 'Active bookings', '24', '+12% this week'], [Truck, 'Available vehicles', '18', 'of 24 vehicles'], [Store, 'Stores connected', '12', '3 need attention'], [CalendarDays, 'Today’s slots', '48', '8 reserved']];
  return <>
    <div className="page-title page-title-row"><div><span className="eyebrow">OVERVIEW</span><h1>Admin dashboard</h1><p>Monitor your transportation network and daily operations.</p></div><Link className="btn primary" to="/bookings/create"><CalendarPlus size={17} /> Create booking</Link></div>
    <div className="stat-grid">{stats.map(([Icon, title, value, detail]) => <div key={title} className="card stat-card kpi-card"><div className="kpi-top"><div className="stat-icon"><Icon size={20} /></div><span className="kpi-trend">{title === 'Active bookings' ? '↗' : '•'}</span></div><strong className="kpi-value">{value}</strong><span>{title}</span><small>{detail}</small></div>)}</div>
    <div className="dashboard-grid">
      <div className="card activity-card"><div className="panel-heading"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Activity summary</h2></div><Activity size={20} /></div><div className="activity-list">{activityItems.map((item) => { const Icon = activityIcons[item.icon]; return <div className="activity-item" key={item.title}><span className="activity-icon"><Icon size={16} /></span><div><strong>{item.title}</strong><p>{item.detail}</p></div><time>{item.time}</time></div>; })}</div><Link className="text-link" to="/bookings">View all activity →</Link></div>
      <div className="card quick-actions"><div className="panel-heading"><div><span className="eyebrow">QUICK ACTIONS</span><h2>Manage operations</h2></div></div><Link to="/schedules"><CalendarDays size={18} /><span><strong>Store schedule</strong><small>Configure loading slots</small></span></Link><Link to="/stores"><Store size={18} /><span><strong>Store management</strong><small>Update store hours</small></span></Link><Link to="/vehicles"><Truck size={18} /><span><strong>Vehicle management</strong><small>View fleet availability</small></span></Link><div className="operations-note"><Clock3 size={16} /><span>Next slot closes in <strong>32 minutes</strong></span></div></div>
    </div>
  </>;
}

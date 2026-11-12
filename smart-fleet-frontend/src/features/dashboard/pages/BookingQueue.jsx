import React, { useState } from 'react';
import { 
  Search, Bell, User, LayoutDashboard, Truck, Calendar, Settings, 
  FileText, Download, CheckCircle2, AlertCircle, RefreshCw, Filter, 
  ChevronRight, MoreVertical, Check, Edit3, ShieldAlert, Layers
} from 'lucide-react';

export default function BookingQueue() {
  const [selectedTab, setSelectedTab] = useState('All (42)');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [bookings, setBookings] = useState([
    { id: 'BK-9804', pickup: 'Store A', dest: 'Store B', items: 'Packed Goods', qty: '38 Units\n145 kg', time: 'Today, 14:30', status: 'Pending', urgent: true },
    { id: 'BK-9805', pickup: 'Store C', dest: 'Store B', items: 'Spare Parts', qty: '120 Cartons\n480 kg', time: 'Today, 16:00', status: 'Pending', urgent: false },
    { id: 'BK-9806', pickup: 'Store A', dest: 'Store C', items: 'Store Supplies', qty: '4 Pallets\n1,120 kg', time: 'Tomorrow, 08:00', status: 'Pending', urgent: true },
    { id: 'BK-9807', pickup: 'Store A', dest: 'Main Warehouse', items: 'General Store Goods', qty: '6 Cases\n32 kg', time: 'Today, 15:15', status: 'Pending', urgent: false },
    { id: 'BK-9808', pickup: 'Store B', dest: 'Store A', items: 'Store Equipment', qty: '35 Crates\n810 kg', time: 'Today, 17:45', status: 'Pending', urgent: false },
    { id: 'BK-9809', pickup: 'Store C', dest: 'Store B', items: 'Display Shelves', qty: '8 Bundles\n1,940 kg', time: 'Tomorrow, 09:30', status: 'Pending', urgent: true },
    { id: 'BK-9810', pickup: 'Store C', dest: 'Main Warehouse', items: 'Point of Sale Terminals', qty: '14 Units\n42 kg', time: 'Today, 18:30', status: 'Pending', urgent: false },
    { id: 'BK-9811', pickup: 'Main Warehouse', dest: 'Store A', items: 'Maintenance Tools', qty: '2 Crates\n19 kg', time: 'Today, 14:45', status: 'Pending', urgent: false },
  ]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBookings(bookings.map(b => b.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedBookings.includes(id)) {
      setSelectedBookings(selectedBookings.filter(item => item !== id));
    } else {
      setSelectedBookings([...selectedBookings, id]);
    }
  };

  const handleApprove = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Approved' } : b));
  };

  const handleBatchApprove = () => {
    setBookings(bookings.map(b => selectedBookings.includes(b.id) ? { ...b, status: 'Approved' } : b));
    setSelectedBookings([]);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Logo Area */}
          <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 tracking-wide text-sm">LOGIROUTE</h1>
              <p className="text-[10px] font-semibold text-emerald-600 tracking-wider">FLEET OPS</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm transition-all">
              <LayoutDashboard className="w-4 h-4" />
              <span>Booking Queue</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-all">
              <Calendar className="w-4 h-4" />
              <span>Trip Planner</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-all">
              <Truck className="w-4 h-4" />
              <span>Transport Units</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-all">
              <User className="w-4 h-4" />
              <span>Drivers & Shifts</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-all">
              <FileText className="w-4 h-4" />
              <span>System Reports</span>
            </a>
          </nav>
        </div>

        {/* System Status Footer Card */}
        <div className="p-4 m-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-xs font-medium text-slate-700">GPS Feed: 99.98%</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Hub: Main Warehouse</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center w-96 bg-slate-100 rounded-xl px-3.5 py-2 border border-slate-200/60">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search transfers, store routes..." 
              className="bg-transparent border-none outline-none text-xs w-full text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center space-x-5">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="h-6 w-[1px] bg-slate-200"></div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">Operations Lead</p>
                <p className="text-[10px] text-slate-500">Dispatch North</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Profile" 
                className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          
          {/* Page Title & Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Booking Review Queue</h2>
              <p className="text-xs text-slate-500 mt-1">Review, approve, or reject incoming store-to-store transfer requests.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export Manifest</span>
              </button>
              <button 
                onClick={handleBatchApprove}
                disabled={selectedBookings.length === 0}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white shadow-md transition-all ${
                  selectedBookings.length > 0 ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 cursor-pointer' : 'bg-emerald-400 cursor-not-allowed opacity-70'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Batch Approve ({selectedBookings.length})</span>
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Total Pending</span>
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Layers className="w-4 h-4" /></span>
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-3xl font-black text-slate-900">42</h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+8/hr</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Awaiting store transfer approval</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Urgent Deliveries</span>
                <span className="p-2 bg-rose-50 text-rose-600 rounded-xl"><ShieldAlert className="w-4 h-4" /></span>
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-3xl font-black text-slate-900">9</h3>
                <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Urgent Transfers</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">High priority store requests</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Capacity Allocation</span>
                <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Truck className="w-4 h-4" /></span>
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-3xl font-black text-slate-900">84.2%</h3>
                <span className="text-[10px] font-semibold text-slate-500">3,347 / 3,470 kg</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84.2%' }}></div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Approved Today</span>
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><CheckCircle2 className="w-4 h-4" /></span>
              </div>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-3xl font-black text-slate-900">128</h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">98.4% On-time</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Successfully dispatched today</p>
            </div>

          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            
            {/* Filter Toolbar */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                {['All (42)', 'High Priority (9)', 'Scheduled Today (21)', 'Standard Transfers (7)'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedTab === tab 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Search booking ID, store..." 
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none w-64 text-slate-700 placeholder-slate-400"
                  />
                </div>
                <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-6 w-10">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={selectedBookings.length === bookings.length && bookings.length > 0}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                      />
                    </th>
                    <th className="py-3.5 px-4">Booking ID</th>
                    <th className="py-3.5 px-4">Pickup Store</th>
                    <th className="py-3.5 px-4">Destination Store</th>
                    <th className="py-3.5 px-4">Items</th>
                    <th className="py-3.5 px-4">Quantity</th>
                    <th className="py-3.5 px-4">Requested Time</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {bookings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <input 
                          type="checkbox" 
                          checked={selectedBookings.includes(item.id)}
                          onChange={() => handleSelectOne(item.id)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer" 
                        />
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900 flex items-center space-x-2">
                        <span>{item.id}</span>
                        {item.urgent && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-700">{item.pickup}</td>
                      <td className="py-4 px-4 font-semibold text-slate-700">{item.dest}</td>
                      <td className="py-4 px-4 text-slate-600">{item.items}</td>
                      <td className="py-4 px-4 font-medium text-slate-650 whitespace-pre-line leading-tight">{item.qty}</td>
                      <td className="py-4 px-4 font-medium text-slate-700">{item.time}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          item.status === 'Approved' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          ● {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {item.status === 'Pending' ? (
                          <button 
                            onClick={() => handleApprove(item.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-sm transition-all cursor-pointer"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold text-[11px]">Approved</span>
                        )}
                        <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px] transition-all cursor-pointer">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span>Showing <strong>1-8</strong> of <strong>42</strong> bookings</span>
                <span className="ml-4">Show per page:</span>
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none text-xs font-semibold text-slate-700">
                  <option>8</option>
                  <option>15</option>
                  <option>30</option>
                </select>
              </div>

              <div className="flex items-center space-x-1">
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium">Previous</button>
                <button className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold">1</button>
                <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 font-medium">2</button>
                <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 font-medium">3</button>
                <span className="px-2">...</span>
                <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 font-medium">6</button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium">Next</button>
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
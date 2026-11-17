import React, { useState } from 'react';
import { 
  Search, Bell, User, LayoutDashboard, Truck, Calendar, Settings, 
  FileText, Download, CheckCircle2, AlertCircle, RefreshCw, Filter, 
  MapPin, ArrowRight, Layers, ShieldAlert, Navigation, Clock, Check
} from 'lucide-react';

export default function TripPlanner() {
  const [mapView, setMapView] = useState('vector'); // 'vector' | 'topology'

  const [stagingBookings, setStagingBookings] = useState([
    { id: 'BK-8901-CHI', route: 'Store A → Main Warehouse', load: '2,450 kg', pal: '8 EPAL', time: '08:00 - 10:30', status: 'APPROVED' },
    { id: 'BK-8902-ORD', route: 'Main Warehouse → Store B', load: '3,120 kg', pal: '11 EPAL', time: '11:00 - 13:00', status: 'APPROVED' },
    { id: 'BK-8903-WST', route: 'Store B → Store C', load: '1,800 kg', pal: '6 EPAL', time: '13:30 - 15:00', status: 'APPROVED' },
    { id: 'BK-8904-EXP', route: 'Store C → Store A', load: '940 kg', pal: '3 EPAL', time: '15:15 - 16:45', status: 'HIGH PRIORITY' },
  ]);

  const [sequenceSteps, setSequenceSteps] = useState([
    { step: 1, title: 'Main Warehouse Pickup', status: 'Active • On Schedule', time: '08:00 - 08:30', detail: 'Loading 8,400 kg (25 Pallets)', verified: true },
    { step: 2, title: 'Store A Drop-off', status: 'On Schedule', time: '09:15 - 09:45', detail: 'Unload: 2,450 kg (8 EPAL) | PO: #9902-REV', delay: 'Dwell: 33 mins' },
    { step: 3, title: 'Store B Drop-off', status: 'Pending Load - Delay Risk', time: '10:20 - 11:15', detail: 'Unload: 3,120 kg (11 EPAL)', warning: 'Window Closes: 11:30' },
    { step: 4, title: 'Store C Drop-off', status: 'Blockage • Traffic Alert (+22m)', time: '11:15 (Est. 12:35)', detail: 'Final Delivery: 1,800 kg (6 EPAL)', danger: 'Internal Route Congestion' },
    { step: 5, title: 'Return to Main Warehouse', status: 'Scheduled Terminal Lock', time: '14:50 - 15:10', detail: 'Vehicle Inspection, Refuel & Post-Trip Handover' },
  ]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 tracking-wide text-sm">LOGIROUTE</h1>
              <p className="text-[10px] font-semibold text-emerald-600 tracking-wider">FLEET OPS</p>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            <a href="/admin/bookings" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium text-sm transition-all">
              <LayoutDashboard className="w-4 h-4" />
              <span>Booking Queue</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm transition-all">
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
              placeholder="Search shipments, routes, trucks..." 
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
          
          {/* Page Banner Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">Trip Planning & Multi-Stop Sequence Editor</h2>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-200">V-SYNC ACTIVE</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Real-time load balancing, sequence optimization & active vehicle assignment</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                Revert Draft
              </button>
              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                Reorder Automatically
              </button>
              <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all">
                Save & Dispatch Sequence
              </button>
            </div>
          </div>

          {/* Two Column Layout (Left: Staging Bookings, Right: Sequence & Map) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Staging Bookings */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-slate-900">Staging Bookings</h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">6 Ready</span>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1">
                  <span>Batch Assign</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Filter Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text" 
                  placeholder="Filter ID, store, or transfer code..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none text-slate-700 placeholder-slate-400"
                />
              </div>

              <div className="flex items-center space-x-2 mb-4 text-[11px] font-semibold text-slate-500 overflow-x-auto pb-1">
                <span className="px-3 py-1 bg-slate-900 text-white rounded-lg">All Regions</span>
                <span className="px-3 py-1 bg-slate-100 rounded-lg">Any Vehicle</span>
                <span className="px-3 py-1 bg-slate-100 rounded-lg">All Weights</span>
              </div>

              {/* Booking Cards List */}
              <div className="space-y-3">
                {stagingBookings.map((item) => (
                  <div key={item.id} className="p-4 bg-white border border-slate-200/80 rounded-xl hover:border-blue-300 transition-all cursor-grab active:cursor-grabbing shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-slate-900">{item.id}</span>
                      <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md ${
                        item.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 mb-2">{item.route}</p>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Cargo Load</span>
                        <span className="font-semibold text-slate-700">{item.load}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Pallets</span>
                        <span className="font-semibold text-slate-700">{item.pal}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Time Window</span>
                        <span className="font-semibold text-slate-700">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-center">
                <p className="text-[11px] text-blue-700 font-medium">💡 Drag any booking card into the timeline or click route auto-assign</p>
              </div>
            </div>

            {/* Right Column: Transport Unit & Sequence Workflow */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Transport Unit Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-700 text-xs">
                      TRK
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Transport Unit - 01 <span className="text-slate-400 font-normal">TRK-4849</span></h4>
                      <p className="text-[11px] text-slate-500">Hub: Main Warehouse</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                    Transport Unit - 01 (Marcus Vance)
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Payload Utilization</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-black text-slate-900">84.2%</span>
                      <span className="text-[10px] text-emerald-600 font-bold">Safe</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84.2%' }}></div>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">3,347 kg / 3,970 kg max</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Est. Route Distance</span>
                    <span className="text-lg font-black text-slate-900 block">142.8 <span className="text-xs font-normal text-slate-500">km</span></span>
                    <span className="text-[9px] text-slate-400 mt-2 block">Optimized via North Corridor</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Shift Duration</span>
                    <span className="text-lg font-black text-slate-900 block">5h 20m <span className="text-xs font-normal text-slate-500">ETA 14:30</span></span>
                    <span className="text-[9px] text-emerald-600 font-semibold mt-2 block">● Within driver limit</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-100">
                  <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-200 flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Optimize Route</span>
                  </button>
                  <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200">
                    Add Manual Waypoint
                  </button>
                  <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200">
                    Recalculate ETA
                  </button>
                </div>
              </div>

              {/* Stop Sequence Workflow */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">Stop Sequence Workflow <span className="text-slate-400 font-normal text-xs">(5 Waypoints Active)</span></h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DISPATCH BATCH #SEQ-932</span>
                </div>

                <div className="space-y-4">
                  {sequenceSteps.map((s, idx) => (
                    <div key={idx} className="relative pl-8 border-l-2 border-slate-200 ml-3 pb-4 last:pb-0">
                      <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                        idx === 0 ? 'bg-emerald-600' : idx === 1 ? 'bg-emerald-500' : idx === 2 ? 'bg-amber-500' : idx === 3 ? 'bg-rose-600' : 'bg-slate-400'
                      }`}>
                        {s.step}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                          <span className="text-xs font-semibold text-slate-600">{s.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mb-2">{s.detail}</p>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.verified ? 'bg-emerald-50 text-emerald-700' : s.delay ? 'bg-amber-50 text-amber-700' : s.danger ? 'bg-rose-50 text-rose-700' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {s.status}
                          </span>
                          {s.verified && <span className="text-[10px] text-emerald-600 font-medium">✓ Manifest Verified</span>}
                          {s.delay && <span className="text-[10px] text-amber-600 font-medium">⚠ {s.delay}</span>}
                          {s.warning && <span className="text-[10px] text-amber-600 font-medium">⏰ {s.warning}</span>}
                          {s.danger && <span className="text-[10px] text-rose-600 font-medium">🚨 {s.danger}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schematic Route Map Preview (Fixed with interactive toggle) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">Schematic Route Leg & Geographic Preview</h3>
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold cursor-pointer">
                    <button 
                      onClick={() => setMapView('vector')}
                      className={`px-3 py-1 rounded-lg transition-all ${mapView === 'vector' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Vector Map
                    </button>
                    <button 
                      onClick={() => setMapView('topology')}
                      className={`px-3 py-1 rounded-lg transition-all ${mapView === 'topology' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Topology View
                    </button>
                  </div>
                </div>

                <div className="h-48 bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center transition-all">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {mapView === 'vector' ? (
                    <div className="text-center z-10">
                      <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-bounce" />
                      <p className="text-xs font-bold text-slate-700">Active Corridor: Main Warehouse & Store Route</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">5 Nodes Connected • Real-time GPS Vector Telemetry Active</p>
                    </div>
                  ) : (
                    <div className="text-center z-10">
                      <Navigation className="w-8 h-8 text-emerald-600 mx-auto mb-2 animate-pulse" />
                      <p className="text-xs font-bold text-slate-700">Topology Network Graph: 5 Hubs Interlinked</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Optimized Mesh Matrix • Latency: 12ms</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
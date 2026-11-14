export const initialStores = [
  { id: 'store-001', name: 'Store A - Colombo', code: 'COL-001', address: '45 Union Place, Colombo 02', manager: 'Nadeesha Perera', phone: '+94 77 234 5678', open: '08:00', close: '18:00', slotDuration: 60, capacity: 3, status: 'Active' },
  { id: 'store-002', name: 'Store B - Kandy', code: 'KAN-002', address: '12 Dalada Veediya, Kandy', manager: 'Kasun Silva', phone: '+94 71 345 6789', open: '08:30', close: '17:30', slotDuration: 60, capacity: 2, status: 'Active' },
  { id: 'store-003', name: 'Store C - Galle', code: 'GAL-003', address: '8 Wakwella Road, Galle', manager: 'Tharushi Fernando', phone: '+94 76 456 7890', open: '09:00', close: '17:00', slotDuration: 30, capacity: 2, status: 'Inactive' },
];

export const initialVehicles = [
  { id: 'vehicle-001', registration: 'WP CAB-1234', type: 'Box truck', capacity: '3,500 kg', driver: 'Saman Kumara', phone: '+94 77 111 2233', lastService: '2026-04-20', status: 'Available' },
  { id: 'vehicle-002', registration: 'CP KDA-5678', type: 'Refrigerated van', capacity: '1,500 kg', driver: 'Dinesh Jayasuriya', phone: '+94 71 222 3344', lastService: '2026-05-02', status: 'On trip' },
  { id: 'vehicle-003', registration: 'SP GAL-9012', type: 'Flatbed truck', capacity: '5,000 kg', driver: 'Ruwan Perera', phone: '+94 76 333 4455', lastService: '2026-03-14', status: 'Maintenance' },
];

export const activityItems = [
  { icon: 'booking', title: 'New booking created', detail: 'BK-2026-0042 · Store A to Store B', time: '12 min ago' },
  { icon: 'vehicle', title: 'Vehicle assigned', detail: 'WP CAB-1234 assigned to Trip #TR-108', time: '38 min ago' },
  { icon: 'store', title: 'Store schedule updated', detail: 'Store B loading hours changed', time: '1 hr ago' },
  { icon: 'check', title: 'Goods receipt confirmed', detail: 'Booking BK-2026-0039 completed', time: '2 hrs ago' },
];

export const slotStatuses = ['Available', 'Reserved', 'Blocked'];

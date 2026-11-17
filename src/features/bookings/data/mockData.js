export const stores = [
  { id: "main", name: "Main Warehouse" },
  { id: "colombo", name: "Colombo Central Store" },
  { id: "kandy", name: "Kandy Store" },
];

export const catalog = [
  {
    id: "ITM-024",
    name: "Printer Paper A4",
    unit: "Carton",
    stock: 60,
  },
  {
    id: "ITM-071",
    name: "Packing Tape",
    unit: "Box",
    stock: 35,
  },
  {
    id: "ITM-108",
    name: "Thermal Labels",
    unit: "Pack",
    stock: 42,
  },
];

export const timeWindows = [
  "08:00–08:45",
  "09:00–09:45",
  "10:30–11:15",
  "13:00–13:45",
  "14:00–14:45",
  "15:00–15:45",
];

export const storeName = (id) => stores.find(s => s.id === id)?.name || id || "Not selected";
export const itemName = (id) => catalog.find(i => i.id === id)?.name || id;
export const itemUnit = (id) => catalog.find(i => i.id === id)?.unit || "units";

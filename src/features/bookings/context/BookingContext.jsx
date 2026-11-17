import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const BookingContext = createContext(null);
const KEY = 'logiroute-demo-bookings-v2';
const seed = [
  { id:'BK-1048', origin:'main',destination:'colombo',transferDate:'2026-11-18',timeWindow:'10:30–11:15',status:'Approved',tripId:'TRP-1842',vehicle:'TRK-4089',items:[{id:'ITM-024',quantity:24},{id:'ITM-071',quantity:12},{id:'ITM-108',quantity:8}],handedOver:{'ITM-024':24,'ITM-071':12,'ITM-108':8},received:{'ITM-024':22,'ITM-071':12,'ITM-108':8},handoverConfirmed:true,receiptConfirmed:false,discrepancies:[] },
  { id:'BK-1053',origin:'main',destination:'kandy',transferDate:'2026-11-20',timeWindow:'13:00–13:45',status:'Approved',tripId:'TRP-1850',vehicle:'TRK-4090',items:[{id:'ITM-024',quantity:10},{id:'ITM-071',quantity:5}],handedOver:{},received:{},handoverConfirmed:false,receiptConfirmed:false,discrepancies:[] },
  { id:'BK-1049', origin:'kandy',destination:'main',transferDate:'2026-11-19',timeWindow:'09:00–09:45',status:'Pending',items:[{id:'ITM-071',quantity:3}],handedOver:{},received:{},handoverConfirmed:false,receiptConfirmed:false,discrepancies:[] },
  { id:'BK-1051', origin:'main',destination:'kandy',transferDate:'2026-11-12',timeWindow:'08:00–08:45',status:'Completed',items:[{id:'ITM-108',quantity:5}],handedOver:{'ITM-108':5},received:{'ITM-108':5},handoverConfirmed:true,receiptConfirmed:true,discrepancies:[] },
  { id:'BK-1052', origin:'kandy',destination:'colombo',transferDate:'2026-11-10',timeWindow:'14:00–14:45',status:'Cancelled',items:[{id:'ITM-024',quantity:2}],handedOver:{},received:{},handoverConfirmed:false,receiptConfirmed:false,discrepancies:[] },
];
function initial() {
  try { const raw = localStorage.getItem(KEY); const value = JSON.parse(raw); return Array.isArray(value) ? value : seed; }
  catch { return seed; }
}
export function BookingProvider({children}) {
  const [bookings,setBookings] = useState(initial);
  useEffect(()=>{try { localStorage.setItem(KEY,JSON.stringify(bookings)); } catch {}},[bookings]);
  const addBooking = (booking) => {
    const id = `BK-${Math.max(1052,...bookings.map(b=>Number(b.id.split('-')[1])||0))+1}`;
    setBookings(p=>[{ ...booking,id,status:'Pending',handedOver:{},received:{},handoverConfirmed:false,receiptConfirmed:false,discrepancies:[]},...p]);
    return id;
  };
  const updateBooking = (id,patch) => setBookings(p=>p.map(b=>b.id===id?{...b,...patch}:b));
  const getBooking = id=>bookings.find(b=>b.id===id);
  const value = useMemo(()=>({bookings,addBooking,updateBooking,getBooking,resetDemo:()=>setBookings(seed)}),[bookings]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
export function useBookings(){const ctx=useContext(BookingContext);if(!ctx)throw new Error('Wrap the app in BookingProvider');return ctx;}

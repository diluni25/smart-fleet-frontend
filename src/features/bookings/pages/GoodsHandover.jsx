import {useEffect,useState} from 'react';
import {Link,useNavigate,useSearchParams} from 'react-router-dom';
import {Check,CheckCircle2,Info,Warehouse,CalendarDays,ClipboardCheck} from 'lucide-react';
import {useBookings} from '../context/BookingContext';
import {itemName,itemUnit} from '../data/mockData';
import {GoodsBar,GoodsStepper,GoodsBottom,GoodsSteps,GoodsCard,StatusTag} from '../components/GoodsUi';
import '../../../styles/goods-figma.css';
export default function GoodsHandover(){
 const {bookings,updateBooking}=useBookings();const [params,setParams]=useSearchParams();const navigate=useNavigate();
 const candidates=bookings.filter(b=>b.status==='Approved'||b.status==='In Transit'||b.handoverConfirmed);
 const selected=candidates.find(b=>b.id===params.get('booking'))||candidates.find(b=>!b.handoverConfirmed)||candidates[0];
 const [quantities,setQuantities]=useState({});const [checks,setChecks]=useState({prepared:true,verified:true,driver:true});const [message,setMessage]=useState('');
 useEffect(()=>{setQuantities({});setChecks({prepared:true,verified:true,driver:true});setMessage('')},[selected?.id]);
 if(!selected)return <div className="goods-page"><h1>Goods handover</h1><p>No approved bookings available for handover.</p></div>;
 const getQ=i=>Number(quantities[i.id]??selected.handedOver?.[i.id]??i.quantity);
 const setQ=(id,q)=>setQuantities(prev=>({...prev,[id]:Math.max(0,q)}));
 const matched=selected.items.filter(i=>getQ(i)===Number(i.quantity)).length;
 function confirm(){if(!Object.values(checks).every(Boolean)){setMessage('Complete the release checklist before handover.');return}if(selected.items.some(i=>!Number.isInteger(getQ(i)))){setMessage('Enter whole-number quantities.');return}const handedOver=Object.fromEntries(selected.items.map(i=>[i.id,getQ(i)]));updateBooking(selected.id,{handedOver,handoverConfirmed:true,status:'In Transit'});navigate(`/goods/receipt?booking=${selected.id}`)}
 return <div className="goods-page">
 <header className="goods-heading"><div><h1>Goods handover</h1><p>Verify dispatched quantities before releasing the load.</p></div><Link className="goods-outline-btn" to={`/bookings/${selected.id}`}>View booking</Link></header>
 <GoodsBar booking={selected} status={selected.handoverConfirmed?'Handover confirmed':'Ready for handover'}/>
 <div className="goods-chooser"><label>Booking <select value={selected.id} onChange={e=>setParams({booking:e.target.value})}>{candidates.map(b=><option key={b.id} value={b.id}>{b.id}</option>)}</select></label></div>
 <GoodsSteps/>
 <div className="goods-columns"><GoodsCard title="Dispatch verification"><div className="goods-overflow"><table className="goods-table"><thead><tr><th>Item</th><th>Planned</th><th>Handed over</th><th>Status</th></tr></thead><tbody>{selected.items.map(i=><tr key={i.id}><td><strong>{i.id}</strong><small>{itemName(i.id)}</small></td><td>{i.quantity} {itemUnit(i.id).toLowerCase()}s</td><td><GoodsStepper label={i.id} number={getQ(i)} disabled={selected.handoverConfirmed} onDown={()=>setQ(i.id,getQ(i)-1)} onUp={()=>setQ(i.id,getQ(i)+1)}/></td><td><StatusTag matched={getQ(i)===Number(i.quantity)} difference={getQ(i)-Number(i.quantity)} unit={itemUnit(i.id)}/></td></tr>)}</tbody></table></div><p className="goods-note"><Info size={18}/> Dispatch note: {matched===selected.items.length?'All planned quantities have been handed over for transport.':'Some quantities differ from the plan. Check before release.'}</p></GoodsCard>
 <div className="goods-side"><GoodsCard title="Handover details"><div className="goods-detail-row"><Warehouse size={18}/>Loading bay</div><div className="goods-detail-row"><CalendarDays size={18}/>{new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div></GoodsCard><GoodsCard title="Release checklist">{[['prepared','Goods prepared'],['verified','Quantities verified'],['driver','Driver acknowledged']].map(([key,label])=><label className="goods-check" key={key}><input type="checkbox" checked={checks[key]} disabled={selected.handoverConfirmed} onChange={e=>setChecks(p=>({...p,[key]:e.target.checked}))}/>{label}</label>)}</GoodsCard></div></div>
 {message&&<p className="goods-error" role="alert">{message}</p>}
 <GoodsBottom><div className="goods-verified"><CheckCircle2 size={19}/> {matched} of {selected.items.length} item lines verified</div><button className="goods-primary-btn" disabled={selected.handoverConfirmed} onClick={confirm}>{selected.handoverConfirmed?'Handover confirmed':'Confirm handover'}</button></GoodsBottom>
 </div>
}

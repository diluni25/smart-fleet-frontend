import {useEffect,useState} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';
import {AlertTriangle,CalendarDays,Clock3,MapPin,Save,Warehouse} from 'lucide-react';
import {useBookings} from '../context/BookingContext';
import {itemName,itemUnit,storeName} from '../data/mockData';
import {GoodsBar,GoodsStepper,GoodsBottom,GoodsCard,StatusTag} from '../components/GoodsUi';
import '../../../styles/goods-figma.css';
export default function ReceiptConfirmation(){
 const {bookings,updateBooking}=useBookings();const [params,setParams]=useSearchParams();const navigate=useNavigate();const candidates=bookings.filter(b=>b.handoverConfirmed);
 const selected=candidates.find(b=>b.id===params.get('booking'))||candidates.find(b=>!b.receiptConfirmed)||candidates[0];
 const [values,setValues]=useState({});const [notice,setNotice]=useState('');useEffect(()=>{setValues({});setNotice('')},[selected?.id]);
 if(!selected)return <div className="goods-page"><h1>Confirm goods receipt</h1><p>Confirm a goods handover first.</p></div>;
 const dispatched=i=>Number(selected.handedOver?.[i.id]??i.quantity);
 const received=i=>Number(values[i.id]??selected.received?.[i.id]??dispatched(i));
 const setQ=(id,q)=>setValues(p=>({...p,[id]:Math.max(0,q)}));
 const variance=i=>received(i)-dispatched(i);const flags=selected.items.filter(i=>variance(i)!==0).length;const matched=selected.items.length-flags;
 const storeDraft=()=>{const receipt=Object.fromEntries(selected.items.map(i=>[i.id,received(i)]));if(Object.values(receipt).some(q=>!Number.isInteger(q)||q<0)){setNotice('Enter valid whole-number quantities.');return false}updateBooking(selected.id,{received:receipt});return true};
 const submit=()=>{if(!storeDraft())return;if(flags){updateBooking(selected.id,{status:'Needs Review',receiptConfirmed:false});const first=selected.items.find(i=>variance(i)!==0);navigate(`/goods/discrepancies?booking=${selected.id}&item=${first.id}`)}else{updateBooking(selected.id,{status:'Completed',receiptConfirmed:true});navigate(`/bookings/${selected.id}`)}};
 return <div className="goods-page"><header className="goods-heading"><div><h1>Confirm goods receipt</h1><p>Count arriving stock and compare it with the dispatch record.</p></div></header>
 <GoodsBar booking={selected} status={flags?'Awaiting confirmation':'Ready to confirm'} warning={flags>0}/>
 <div className="goods-chooser"><label>Booking <select value={selected.id} onChange={e=>setParams({booking:e.target.value})}>{candidates.map(b=><option key={b.id} value={b.id}>{b.id}</option>)}</select></label></div>
 <div className="goods-columns"><GoodsCard title="Received quantities"><div className="goods-overflow"><table className="goods-table"><thead><tr><th>Item</th><th>Dispatched</th><th>Received</th><th>Variance</th></tr></thead><tbody>{selected.items.map(i=><tr key={i.id}><td><strong>{i.id}</strong><small>{itemName(i.id)}</small></td><td>{dispatched(i)} {itemUnit(i.id).toLowerCase()}s</td><td><GoodsStepper label={i.id} number={received(i)} onDown={()=>setQ(i.id,received(i)-1)} onUp={()=>setQ(i.id,received(i)+1)}/></td><td><StatusTag matched={variance(i)===0} difference={variance(i)} unit={itemUnit(i.id).toLowerCase()+'s'}/></td></tr>)}</tbody></table></div><div className={flags?'goods-warning-note':'goods-note'}>{flags?<AlertTriangle size={19}/>:null}{flags?'A quantity mismatch needs review':'All item quantities matched'}</div></GoodsCard>
 <div className="goods-side"><GoodsCard title="Receipt details"><div className="goods-detail-row goods-detail-plain"><Warehouse size={17}/>{storeName(selected.destination)}</div><div className="goods-detail-row goods-detail-plain"><MapPin size={17}/>Bay 03</div><div className="goods-detail-row goods-detail-plain"><CalendarDays size={17}/>{new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</div><div className="goods-detail-row goods-detail-plain"><Clock3 size={17}/>{new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</div></GoodsCard><GoodsCard title="Verification summary"><div className="goods-meter"><span style={{width:`${selected.items.length?matched/selected.items.length*100:0}%`}}/></div><div className="goods-meter-labels"><span><i className="goods-green-square"/> {matched} matched</span><span><i className="goods-yellow-square"/> {flags} flagged</span></div></GoodsCard></div></div>
 {notice&&<p className="goods-error" role="status">{notice}</p>}<GoodsBottom><button className="goods-outline-btn" onClick={()=>{if(storeDraft())setNotice('Receipt draft saved in this browser demo.')}}><Save size={17}/>Save draft</button><button className="goods-primary-btn" onClick={submit}>{flags?'Review discrepancies':'Confirm receipt'}</button></GoodsBottom>
 </div>
}

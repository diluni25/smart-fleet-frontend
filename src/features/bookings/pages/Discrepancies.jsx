import {useState} from 'react';
import {Link,useNavigate,useSearchParams} from 'react-router-dom';
import {AlertTriangle,ArrowLeft,Check,Clock3,FileText,Package,Save,UploadCloud,Warehouse} from 'lucide-react';
import {useBookings} from '../context/BookingContext';
import {itemName,itemUnit,storeName} from '../data/mockData';
import {GoodsBar,GoodsCard,GoodsBottom} from '../components/GoodsUi';
import '../../../styles/goods-figma.css';
export default function Discrepancies(){
 const {bookings,updateBooking}=useBookings();const [params,setParams]=useSearchParams();const navigate=useNavigate();const candidates=bookings.filter(b=>b.handoverConfirmed);
 const selected=candidates.find(b=>b.id===params.get('booking'))||candidates.find(b=>b.received&&Object.keys(b.received).length)||candidates[0];
 const [reason,setReason]=useState('Quantity shortage');const [note,setNote]=useState('');const [file,setFile]=useState(null);const [error,setError]=useState('');
 if(!selected)return <div className="goods-page"><h1>Record discrepancy</h1><p>No receipt information available.</p></div>;
 const mismatch=selected.items.filter(i=>Number(selected.received?.[i.id]??selected.handedOver?.[i.id]??i.quantity)!==Number(selected.handedOver?.[i.id]??i.quantity));
 const item=mismatch.find(i=>i.id===params.get('item'))||mismatch[0];const dispatched=Number(selected.handedOver?.[item?.id]??item?.quantity??0);const received=Number(selected.received?.[item?.id]??dispatched);const diff=received-dispatched;
 function chooseFile(e){const f=e.target.files?.[0];if(!f)return;if(!['image/png','image/jpeg','application/pdf'].includes(f.type)||f.size>10*1024*1024){setError('Only PNG, JPG, or PDF files up to 10 MB are allowed.');setFile(null);e.target.value='';return}setFile(f);setError('')}
 function submit(e){e.preventDefault();if(!item){setError('There is no mismatched item to record.');return}if(!note.trim()){setError('Please enter a note explaining the discrepancy.');return}const record={itemId:item.id,reason,note:note.trim(),difference:diff,evidenceName:file?.name||null,recordedAt:new Date().toISOString()};updateBooking(selected.id,{status:'Needs Review',discrepancies:[...(selected.discrepancies||[]).filter(d=>d.itemId!==item.id),record]});navigate(`/bookings/${selected.id}`)}
 return <div className="goods-page"><header className="goods-heading"><div><h1>Record discrepancy</h1><p>Document the difference between dispatched and received stock.</p></div></header>
 <GoodsBar booking={selected} status="Needs review" warning/>
 <div className="goods-chooser"><label>Booking <select value={selected.id} onChange={e=>setParams({booking:e.target.value})}>{candidates.map(b=><option key={b.id} value={b.id}>{b.id}</option>)}</select></label></div>
 <div className="goods-columns"><form onSubmit={submit} id="goods-discrepancy-form"><GoodsCard title="Discrepancy details"><label className="goods-label">Item<select className="goods-highlight-select" value={item?.id||''} onChange={e=>setParams({booking:selected.id,item:e.target.value})}>{mismatch.length?mismatch.map(i=><option key={i.id} value={i.id}>{i.id} · {itemName(i.id)}</option>):<option value="">No mismatches recorded</option>}</select></label><div className="goods-facts"><div><small>Dispatched</small><strong>{dispatched} {itemUnit(item?.id).toLowerCase()}s</strong></div><div><small>Received</small><strong>{received} {itemUnit(item?.id).toLowerCase()}s</strong></div><div className="goods-fact-warning"><small>{diff<0?'Shortage':diff>0?'Excess':'Difference'}</small><strong>{Math.abs(diff)} {itemUnit(item?.id).toLowerCase()}s</strong></div></div>
 <label className="goods-label">Reason<select value={reason} onChange={e=>setReason(e.target.value)}><option>Quantity shortage</option><option>Excess quantity</option><option>Damaged goods</option><option>Other</option></select></label>
 <label className="goods-label">Note<textarea rows="3" placeholder="Describe the quantity difference" value={note} onChange={e=>setNote(e.target.value)}/></label>
 <label className="goods-label">Add evidence (optional)<div className="goods-upload"><UploadCloud size={24}/><strong>{file?file.name:'Upload file or drag and drop'}</strong><small>PNG, JPG or PDF (max 10 MB)</small><input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={chooseFile} aria-label="Add evidence"/></div></label>
 {error&&<p className="goods-error" role="alert">{error}</p>}</GoodsCard></form>
 <div className="goods-side"><GoodsCard title="Booking activity"><div className="goods-timeline"><div><span className="goods-tick"><Check size={14}/></span><p>Handover confirmed <small>10:42</small></p></div><div><span className="goods-tick"><Check size={14}/></span><p>Vehicle arrived <small>11:05</small></p></div><div><span className="goods-tick goods-tick-yellow">!</span><p>Mismatch recorded <small>11:08</small></p></div></div></GoodsCard><GoodsCard title="Transfer route"><div className="goods-detail-row"><Warehouse size={18}/>{storeName(selected.origin)} → {storeName(selected.destination)}</div></GoodsCard></div></div>
 <GoodsBottom><Link className="goods-outline-btn" to={`/goods/receipt?booking=${selected.id}`}><ArrowLeft size={17}/>Back to receipt</Link><div className="goods-bottom-right"><button type="button" className="goods-outline-btn" onClick={()=>setError('Draft remains in this browser until you submit.') }><Save size={17}/>Save draft</button><button type="submit" form="goods-discrepancy-form" className="goods-primary-btn">Submit discrepancy</button></div></GoodsBottom>
 </div>
}

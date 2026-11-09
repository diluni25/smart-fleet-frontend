import { useState } from 'react';
import { CalendarDays, Truck, CheckCircle2 } from 'lucide-react';
import Field from '../../../components/ui/Field.jsx';
import ItemQuantity from './ItemQuantity.jsx';
import { stores,items } from '../data/mockData.js';
import {validateBooking} from '../utils/bookingValidation.js';
const initial={pickupStore:'',destinationStore:'',requestedDate:'',requestedTime:'',itemId:'',quantity:''};
export default function BookingForm(){
 const [values,setValues]=useState(initial);
 const [errors,setErrors]=useState({});
 const [submitted,setSubmitted]=useState(false);
 const onChange=e=>{ const {id,value}=e.target;setValues(v=>({...v,[id]:value}));setErrors(e=>({...e,[id]:undefined}));setSubmitted(false); };
 const onReset=()=>{setValues(initial);setErrors({});setSubmitted(false);};
 const onSubmit=e=>{ e.preventDefault();const next=validateBooking(values);setErrors(next);if(Object.keys(next).length===0){setSubmitted(true);} };
 const selectedItem=items.find(i=>i.id===values.itemId);
 const nameOf=id=>stores.find(s=>s.id===id)?.name||'Not selected';
 return <form noValidate onSubmit={onSubmit}>
  <div className="booking-grid"><div className="form-main">
    <section className="card form-card"><div className="section-header"><span className="section-icon"><Truck size={22}/></span><div><h2>Transportation Details</h2><p>Choose pickup and destination stores</p></div></div><div className="field-grid">
    <Field id="pickupStore" label="Pickup Store" required error={errors.pickupStore}><select id="pickupStore" value={values.pickupStore} onChange={onChange} aria-invalid={!!errors.pickupStore}><option value="">Select pickup store</option>{stores.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
    <Field id="destinationStore" label="Destination Store" required error={errors.destinationStore}><select id="destinationStore" value={values.destinationStore} onChange={onChange} aria-invalid={!!errors.destinationStore}><option value="">Select destination store</option>{stores.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
    <Field id="requestedDate" label="Requested Date" required error={errors.requestedDate}><input id="requestedDate" type="date" value={values.requestedDate} onChange={onChange} aria-invalid={!!errors.requestedDate}/></Field>
    <Field id="requestedTime" label="Requested Time" required error={errors.requestedTime}><input id="requestedTime" type="time" value={values.requestedTime} onChange={onChange} aria-invalid={!!errors.requestedTime}/></Field>
    </div></section>
    <ItemQuantity values={values} errors={errors} onChange={onChange}/>
    {submitted&&<div className="success-banner" role="status"><CheckCircle2 size={23}/><div><strong>Booking form validated successfully.</strong><p>Demo mode: this booking has NOT been saved to a server or database.</p></div></div>}
    <div className="form-actions"><button type="button" className="btn secondary" onClick={onReset}>Reset Form</button><button type="submit" className="btn primary">Validate Booking</button></div>
  </div><aside className="card summary"><div className="summary-top"><CalendarDays size={23}/><h2>Booking Summary</h2></div><div className="summary-row"><span>Pickup Store</span><strong>{nameOf(values.pickupStore)}</strong></div><div className="summary-row"><span>Destination</span><strong>{nameOf(values.destinationStore)}</strong></div><div className="summary-row"><span>Requested Date</span><strong>{values.requestedDate||'Not selected'}</strong></div><div className="summary-row"><span>Requested Time</span><strong>{values.requestedTime||'Not selected'}</strong></div><hr/><h3>Goods</h3><div className="summary-item"><strong>{selectedItem?.code||'No item selected'}</strong><span>{values.quantity?`${values.quantity} ${selectedItem?.unit||''}`:'—'}</span></div><div className="summary-notice">Vehicle allocation and administrator review are handled in later workflows.</div></aside></div>
 </form>;
}
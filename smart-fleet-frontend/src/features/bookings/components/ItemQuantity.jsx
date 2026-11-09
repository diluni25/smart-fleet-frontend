import Field from '../../../components/ui/Field.jsx';
import { items } from '../data/mockData.js';
export default function ItemQuantity({values,errors,onChange}) {
 const selected=items.find(x=>x.id===values.itemId);
 return <section className="card form-card"><div className="section-header"><span className="section-icon">▣</span><div><h2>Goods Information</h2><p>Select the goods and specify the quantity</p></div></div><div className="goods-grid">
 <Field id="itemId" label="Item" error={errors.itemId} required><select id="itemId" value={values.itemId} onChange={onChange} aria-invalid={!!errors.itemId}><option value="">Select an item</option>{items.map(i=><option key={i.id} value={i.id}>{i.code} — {i.name}</option>)}</select></Field>
 <Field id="quantity" label="Quantity" error={errors.quantity} required><input id="quantity" type="number" min="1" step="1" value={values.quantity} onChange={onChange} placeholder="e.g. 20" aria-invalid={!!errors.quantity}/></Field>
 <Field id="unit" label="Unit of Measure"><input id="unit" value={selected?.unit??''} placeholder="Select item first" disabled readOnly /></Field></div><p className="section-note">Adding multiple items will be available in Sprint 2.</p></section>;
}
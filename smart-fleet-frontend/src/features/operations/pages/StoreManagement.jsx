import { useMemo, useState } from 'react';
import { Clock3, Edit3, MapPin, Plus, Search, Trash2, X } from 'lucide-react';
import { initialStores } from '../data/operationsData.js';

const emptyStore = { name: '', code: '', address: '', manager: '', phone: '', open: '08:00', close: '18:00', slotDuration: 60, capacity: 2, status: 'Active' };

function StoreForm({ value, onChange, onClose, onSave }) {
  const update = (field) => (event) => onChange({ ...value, [field]: event.target.value });
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="store-form-title">
      <div className="modal-heading"><div><span className="eyebrow">STORE PROFILE</span><h2 id="store-form-title">{value.id ? 'Edit store' : 'Add store'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div>
      <div className="field-grid">
        <div className="field"><label htmlFor="store-name">Store name *</label><input id="store-name" value={value.name} onChange={update('name')} placeholder="Store A - Colombo" /></div>
        <div className="field"><label htmlFor="store-code">Store code *</label><input id="store-code" value={value.code} onChange={update('code')} placeholder="COL-001" /></div>
        <div className="field field-wide"><label htmlFor="store-address">Address *</label><input id="store-address" value={value.address} onChange={update('address')} placeholder="Street, city" /></div>
        <div className="field"><label htmlFor="store-manager">Store manager</label><input id="store-manager" value={value.manager} onChange={update('manager')} /></div>
        <div className="field"><label htmlFor="store-phone">Contact number</label><input id="store-phone" value={value.phone} onChange={update('phone')} /></div>
      </div>
      <div className="config-section"><div className="config-section-heading"><Clock3 size={18} /><div><h3>Operating hours & loading slots</h3><p>Configure when carriers can arrive at this store.</p></div></div>
        <div className="field-grid"><div className="field"><label htmlFor="store-open">Opening time</label><input id="store-open" type="time" value={value.open} onChange={update('open')} /></div><div className="field"><label htmlFor="store-close">Closing time</label><input id="store-close" type="time" value={value.close} onChange={update('close')} /></div><div className="field"><label htmlFor="slot-duration">Slot duration</label><select id="slot-duration" value={value.slotDuration} onChange={update('slotDuration')}><option value="30">30 minutes</option><option value="60">60 minutes</option><option value="90">90 minutes</option></select></div><div className="field"><label htmlFor="slot-capacity">Vehicles per slot</label><input id="slot-capacity" type="number" min="1" max="10" value={value.capacity} onChange={update('capacity')} /></div></div>
      </div>
      <div className="modal-actions"><button className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary" onClick={onSave} disabled={!value.name || !value.code}>Save store</button></div>
    </section>
  </div>;
}

export default function StoreManagement() {
  const [stores, setStores] = useState(initialStores);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const filtered = useMemo(() => stores.filter((store) => `${store.name} ${store.code} ${store.manager}`.toLowerCase().includes(query.toLowerCase())), [stores, query]);
  const save = () => { setStores((items) => editing.id ? items.map((item) => item.id === editing.id ? editing : item) : [...items, { ...editing, id: `store-${Date.now()}` }]); setEditing(null); };
  const remove = (store) => { if (window.confirm(`Remove ${store.name}?`)) setStores((items) => items.filter((item) => item.id !== store.id)); };
  return <>
    <div className="page-title page-title-row"><div><span className="eyebrow">OPERATIONS</span><h1>Store management</h1><p>Manage store profiles, operating hours and loading capacity.</p></div><button className="btn primary" onClick={() => setEditing({ ...emptyStore })}><Plus size={17} /> Add store</button></div>
    <div className="toolbar card"><div className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stores" /></div><span className="toolbar-count">{filtered.length} stores</span></div>
    <div className="card data-table-wrap"><table className="data-table"><thead><tr><th>Store</th><th>Location</th><th>Operating hours</th><th>Loading slots</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filtered.map((store) => <tr key={store.id}><td><strong>{store.name}</strong><small>{store.code}</small></td><td><span className="table-icon-text"><MapPin size={14} />{store.address}</span><small>{store.manager}</small></td><td><strong>{store.open} – {store.close}</strong><small>{store.slotDuration} minute slots</small></td><td><strong>{store.capacity} vehicles</strong><small>per loading slot</small></td><td><span className={`status-pill ${store.status.toLowerCase()}`}>{store.status}</span></td><td><div className="row-actions"><button className="icon-button" onClick={() => setEditing({ ...store })} aria-label={`Edit ${store.name}`}><Edit3 size={16} /></button><button className="icon-button danger-icon" onClick={() => remove(store)} aria-label={`Delete ${store.name}`}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table>{!filtered.length && <div className="table-empty">No stores match your search.</div>}</div>
    {editing && <StoreForm value={editing} onChange={setEditing} onClose={() => setEditing(null)} onSave={save} />}
  </>;
}

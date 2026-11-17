# PDF-based UI update

This project retains the existing LOGIROUTE Header, Sidebar, Footer, Create Booking, Booking Queue, History, Edit and routing implementations. Only the three goods pages were reworked to follow the supplied PDFs:
- Goods handover: dispatch verification, dark-green booking strip, three-step progress, release checklist, confirmation footer.
- Confirm goods receipt: received/dispatched quantity steppers, variance badges, receipt details, verification summary, bottom actions.
- Record discrepancy: item/quantity cards, reason, note, evidence area, booking timeline and transfer route, bottom actions.

`CreateBooking.jsx` and its existing CSS were intentionally not changed. Booking Queue was not redesigned. The 3 goods pages are styled through `src/styles/goods-figma.css`, scoped under `.goods-*` classes and imported by those pages only.

Run `npm install` and `npm run dev`.

This is a frontend demo that persists booking state in browser localStorage; server verification and uploads still require backend implementation. Prior demo data may be cached: clear the key `logiroute-demo-bookings-v2` in browser localStorage only if you want to reset the demo.

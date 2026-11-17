# Sprint 2 additions for your EXISTING LOGIROUTE project

This ZIP contains ONLY files to add/replace, not an entire frontend project. It was prepared by inspecting `smart transfort.rar`.

## UI preserved
- Existing `Header.jsx`, `Sidebar.jsx`, `Footer.jsx`, `MainLayout.jsx`, `BookingForm.jsx`, `ItemQuantity.jsx`, `global.css`, `app.css`, `booking.css`, `booking-history.css` are NOT included or changed.
- Existing CreateBooking JSX layout, cards, table and styles remain the same. Only Confirm Booking interaction is appended in its Review step.
- Existing Booking Queue and Booking History markup/styles remain; data source and navigation logic are connected.
- New Goods pages use the green/white UI layout and core fields from your previously uploaded Figma PDFs. They are approximations of the existing designs, not pixel-perfect reproductions.

## Install
1. Back up your existing project.
2. Extract these files into the SAME project root, retaining paths. Replace only files included in the ZIP.
3. Run `npm run dev`.
4. Visit `/bookings/create` and complete valid date/time and items. Click Review Booking, then Confirm Booking.
5. Visit `/bookings` for queue, `/bookings/history` for history, `/bookings/:id` for details and `/bookings/:id/edit` to edit a pending booking.
6. Visit `/goods/handover` (demo booking BK-1053 ready), `/goods/receipt` (BK-1048 seeded for receipt), `/goods/discrepancies`.

## Demo data and limitations
- Browser localStorage key: `logiroute-demo-bookings-v2`. Data survives refresh in the same browser only; no backend synchronization.
- Cancel changes pending status in the demo only. Approved/pending distinctions are illustrative and do not establish role-based permissions.
- File evidence is NOT uploaded; it stores an evidence filename only.
- Current project uses sample date strings; validate with present/future dates.
- New pages are functional approximations of the supplied visual designs. Existing project UI assets were not modified.
- This patch was source-inspected but could not be built in this environment because npm dependencies were unavailable offline.

# Smart Fleet Frontend Starter (React + Vite)

A starter for the Smart Fleet and Store Transportation Management System.

## Requirements
- Node.js 20.19+ or 22.12+ (a supported Vite 6 version also works with Node 18+)
- npm

## Quick start
```bash
npm install
npm run dev
```
Open the localhost URL shown by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## What's included
- React, Vite, React Router, Lucide icons
- Responsive sidebar, header, shared layout
- Dashboard starter
- `/bookings/create` working form with React state, validation, reset, live summary, and a demo success message
- Mock data for the three initial stores and example items
- Placeholder pages for future modules

## Note on behavior
This is a **frontend-only** starter. The form checks input but **does not send a request or save a booking**. The demo items and stores are illustrative, not official company master data. Replace them with API data when the backend is available. Server-side validation and role permissions must be added before production use.

## Structure
```
src/
  assets/
  components/layout/    # Shared sidebar, header and page layout
  components/ui/        # Reusable field and placeholder components
  features/dashboard/   # Dashboard starter
  features/bookings/    # Booking form, mock data and validation
  routes/               # React Router configuration
  styles/               # Global styles
```

## Next sprint
Multiple item rows, booking lists/history, editing/cancellation, handover and receipt confirmation are intentionally not implemented.

# LOGIROUTE Fleet Ops — Complete frontend project

This is the complete frontend source project assembled from the inspected uploaded project and the Sprint 2 feature additions. It is NOT just a changed-files patch.

## Run

1. Extract the ZIP.
2. Open `smart-fleet-frontend` in VS Code.
3. Run `npm install` and then `npm run dev`.

## URLs

- `/bookings/create` Create booking
- `/bookings` Booking queue
- `/bookings/history` Booking history
- `/bookings/:id` Booking details
- `/bookings/:id/edit` Edit booking
- `/goods/handover` Handover
- `/goods/receipt` Receipt confirmation
- `/goods/discrepancies` Record discrepancy

## UI fidelity

Existing source layouts, styles, header/sidebar/footer and logo from the previously inspected project have been retained. New Sprint 2 screens follow the supplied design as closely as possible but have not been visually tested in a running browser.

## Important

- No backend integration yet. Demo data uses localStorage.
- Node dependencies (`node_modules`) are intentionally not bundled.
- `.env` from the uploaded archive is not included to avoid exposing secrets. `.env.example` is included.
- A package-lock file was not available to copy from the RAR; `npm install` generates one.

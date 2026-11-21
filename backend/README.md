# LOGIROUTE Backend – Sprint 1

Express + MongoDB starter, with Item model, CRUD routes and error handling. This is **backend-only**; your frontend remains unchanged.

## Setup
1. Install Node.js and run a local MongoDB server, or use a MongoDB Atlas URI.
2. Open a terminal in this folder and run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI`.
4. Run `npm run dev`.
5. Check `http://localhost:5000/api/health`.

## Item APIs
- `GET /api/items` – list all items
- `GET /api/items/:id` – get item by MongoDB ID
- `POST /api/items` – create item
- `PUT /api/items/:id` – update item
- `DELETE /api/items/:id` – delete item

Example POST JSON:
```json
{"code":"ITM-024","name":"Printer Paper A4","unit":"Carton","stock":60}
```

## Store, vehicle and scheduling APIs

- `GET|POST /api/stores` and `GET|PUT|DELETE /api/stores/:id` – store CRUD
- `PATCH /api/stores/:id/operating-hours` – update `{ "open": "08:00", "close": "18:00" }`
- `PATCH /api/stores/:id/loading-slot-rules` – update `{ "docks": 1, "minSlot": 30 }`
- `GET|POST /api/vehicles` and `GET|PUT|DELETE /api/vehicles/:id` – vehicle CRUD
- `GET|POST /api/reservations` and `GET|PUT|DELETE /api/reservations/:id` – slot reservations
- `GET /api/schedule?date=2026-11-04&storeId=<storeId>` – reservations grouped with store schedule data
- `GET /api/dashboard/kpis?date=2026-11-04` – vehicle, store and reservation KPI aggregation
- `GET /api/dashboard/activity?limit=20` – recent reservation activity summary

Reservation creation and updates validate store operating hours, minimum slot duration, dock capacity, and vehicle overlap. Conflicting requests return HTTP `409` with a `conflicts` array.

This starter does not yet include authentication or authorization; do not deploy its write APIs publicly. Booking APIs and Goods Confirmation are Sprint 2 tasks.

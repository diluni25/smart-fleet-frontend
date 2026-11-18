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

This starter does not yet include authentication or authorization; do not deploy its write APIs publicly. Booking APIs and Goods Confirmation are Sprint 2 tasks.

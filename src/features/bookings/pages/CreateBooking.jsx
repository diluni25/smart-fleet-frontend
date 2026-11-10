import { useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  List,
  Save,
  Truck,
} from "lucide-react";

import BookingForm from "../components/BookingForm";
import ItemQuantity from "../components/ItemQuantity";

import { catalog, stores } from "../data/mockData";

import { validateBooking } from "../utils/bookingValidation";

import "../../../styles/booking.css";

const initialBooking = {
  origin: "main",
  destination: "colombo",
  transferDate: "",
  timeWindow: "10:30–11:15",
  items: [
    { id: "ITM-024", quantity: 24 },
    { id: "ITM-071", quantity: 12 },
    { id: "ITM-108", quantity: 8 },
  ],
};

export default function CreateBooking() {
  const [booking, setBooking] = useState(initialBooking);

  const [selectedId, setSelectedId] = useState("ITM-024");

  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [review, setReview] = useState(false);

  // Selected item details
  const selectedItem = catalog.find((item) => item.id === selectedId);

  const selectedEntry = booking.items.find((entry) => entry.id === selectedId);

  // Get store name
  const storeName = (id) =>
    stores.find((store) => store.id === id)?.name || "Not selected";

  // Handle form field changes
  function fieldChange(field, value) {
    setBooking((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setNotice("");
  }

  // Increase or decrease item quantity
  function quantityChange(id, delta) {
    setBooking((prev) => ({
      ...prev,
      items: prev.items.map((entry) => {
        if (entry.id !== id) {
          return entry;
        }

        const item = catalog.find((candidate) => candidate.id === id);

        return {
          ...entry,
          quantity: Math.min(item.stock, Math.max(1, entry.quantity + delta)),
        };
      }),
    }));

    setErrors((prev) => ({
      ...prev,
      items: undefined,
    }));
  }

  // Add new item
  function addItem(id) {
    if (booking.items.some((entry) => entry.id === id)) {
      return;
    }

    setBooking((prev) => ({
      ...prev,
      items: [...prev.items, { id, quantity: 1 }],
    }));

    setSelectedId(id);
    setErrors((prev) => ({
      ...prev,
      items: undefined,
    }));
  }

  // Remove booking item
  function removeItem(id) {
    const next = booking.items.filter((entry) => entry.id !== id);

    setBooking((prev) => ({
      ...prev,
      items: next,
    }));

    if (selectedId === id) {
      setSelectedId(next[0]?.id ?? "");
    }
  }

  // Validate before review
  function reviewBooking() {
    const nextErrors = validateBooking(booking, catalog);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setNotice("Please correct the highlighted fields.");

      return;
    }

    setReview(true);

    setNotice(
      "Booking details are valid. This is a frontend preview; no booking has been submitted.",
    );
  }

  // Frontend-only draft
  function saveDraft() {
    setNotice(
      "Draft kept in this page only. It has not been saved to a server or browser storage.",
    );
  }

  return (
    <div className="bk-page">
      {/* PAGE TITLE */}
      <div className="bk-title-row">
        <div>
          <div className="bk-eyebrow">STORE OPERATIONS</div>

          <h1>Create transport booking</h1>

          <p>Request a stock transfer between stores.</p>
        </div>

        <button type="button" className="bk-draft" onClick={saveDraft}>
          <Save size={18} />
          Save draft
        </button>
      </div>

      {/* BOOKING STEPS */}
      <div className="bk-progress" aria-label="Booking progress">
        <div className="bk-step bk-done">
          <CheckCircle2 size={24} />
          <strong>01</strong>
          Transfer details
        </div>

        <span className="bk-progress-line" />

        <div className={`bk-step ${review ? "bk-done" : "bk-current"}`}>
          <b>{review ? <Check size={16} /> : "02"}</b>
          Items &amp; quantities
        </div>

        <span className="bk-progress-line muted" />

        <div className={`bk-step bk-last ${review ? "bk-current" : ""}`}>
          <strong>03</strong>
          Review
        </div>
      </div>

      {/* BOOKING FORM */}
      {!review ? (
        <div className="bk-grid">
          <BookingForm
            booking={booking}
            onFieldChange={fieldChange}
            onSelectItem={setSelectedId}
            onRemoveItem={removeItem}
            onAddItem={addItem}
            selectedId={selectedId}
            onQuantityChange={quantityChange}
            errors={errors}
          />

          {/* RIGHT PANEL */}
          <div className="bk-right">
            <ItemQuantity
              item={selectedItem}
              quantity={selectedEntry?.quantity ?? 0}
              onChange={(delta) => quantityChange(selectedId, delta)}
              onApply={() =>
                setNotice("Item quantity updated in this booking.")
              }
            />

            {/* BOOKING SUMMARY */}
            <section className="bk-card bk-summary">
              <h2>
                <ClipboardList size={22} />
                Booking summary
              </h2>

              <p>
                <List size={18} />
                {booking.items.length} item line
                {booking.items.length === 1 ? "" : "s"}
              </p>

              <p>
                <Truck size={18} />
                {storeName(booking.origin)}
                {" → "}
                {storeName(booking.destination)}
              </p>

              <p>
                <CalendarDays size={18} />
                {booking.transferDate || "No date selected"}
              </p>

              <p>
                <Clock3 size={18} />
                {booking.timeWindow || "No time selected"}
              </p>
            </section>
          </div>
        </div>
      ) : (
        /* REVIEW SCREEN */
        <section className="bk-card bk-review">
          <h2>Review booking</h2>

          <p>
            <strong>Origin:</strong> {storeName(booking.origin)}
          </p>

          <p>
            <strong>Destination:</strong> {storeName(booking.destination)}
          </p>

          <p>
            <strong>Date:</strong> {booking.transferDate}
          </p>

          <p>
            <strong>Time window:</strong> {booking.timeWindow}
          </p>

          <h3>Items</h3>

          {booking.items.map((entry) => {
            const item = catalog.find((x) => x.id === entry.id);

            return (
              <p key={entry.id}>
                {item?.id} · {item?.name}
                {" — "}
                {entry.quantity} {item?.unit}
              </p>
            );
          })}

          <div className="bk-stock">
            Frontend review only — backend submission will be implemented later.
          </div>
        </section>
      )}

      {/* NOTIFICATION */}
      {notice && (
        <div className="bk-notice" role="status">
          {notice}
        </div>
      )}

      {/* BOTTOM BUTTONS */}
      <div className="bk-actions">
        <button
          type="button"
          className="bk-back"
          onClick={() => {
            setReview(false);
            setNotice("");
          }}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        {!review && (
          <button type="button" className="bk-next" onClick={reviewBooking}>
            Review booking
          </button>
        )}
      </div>
    </div>
  );
}

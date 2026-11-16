import { AlertTriangle, X } from "lucide-react";

export default function CancelBookingModal({ booking, onClose, onConfirm }) {
  if (!booking) return null;

  return (
    <div className="bq-modal-overlay">
      <div
        className="bq-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-title"
      >
        <button
          type="button"
          className="bq-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <AlertTriangle size={36} color="#d97706" />

        <h2 id="cancel-title">Cancel Booking?</h2>

        <p>
          Are you sure you want to cancel booking <strong>{booking.id}</strong>?
        </p>

        <div className="bq-modal-actions">
          <button type="button" className="bq-btn-secondary" onClick={onClose}>
            Keep Booking
          </button>

          <button type="button" className="bq-btn-danger" onClick={onConfirm}>
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

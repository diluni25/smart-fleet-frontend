import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plus, Search, ClipboardList } from "lucide-react";

import BookingTable from "../components/BookingTable";
import CancelBookingModal from "../components/CancelBookingModal";
import { mockBookings } from "../data/mockBookings";

import "../../../styles/booking-history.css";

export default function BookingHistory() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState(mockBookings);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [cancelBooking, setCancelBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const keyword = search.toLowerCase().trim();

      const matchesSearch =
        booking.id.toLowerCase().includes(keyword) ||
        booking.origin.toLowerCase().includes(keyword) ||
        booking.destination.toLowerCase().includes(keyword);

      const matchesStatus = status === "All" || booking.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, status]);

  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  const approvedCount = bookings.filter((b) => b.status === "Approved").length;

  const completedCount = bookings.filter(
    (b) => b.status === "Completed",
  ).length;

  function handleCancel() {
    if (!cancelBooking) return;

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === cancelBooking.id
          ? { ...booking, status: "Cancelled" }
          : booking,
      ),
    );

    setNotice(`${cancelBooking.id} cancelled in this frontend demo.`);

    setCancelBooking(null);
  }

  function handleView(booking) {
    setSelectedBooking(booking);
  }

  function handleEdit(booking) {
    // Edit page will be connected in next step.
    setNotice(
      `Edit Booking ${booking.id} will be connected to the Edit Booking page.`,
    );
  }

  return (
    <div className="bq-page">
      <div className="bq-heading">
        <div>
          <span className="bq-eyebrow">STORE OPERATIONS</span>

          <h1>Booking Queue</h1>

          <p>Manage and monitor transportation bookings between stores.</p>
        </div>

        <button
          type="button"
          className="bq-btn-primary"
          onClick={() => navigate("/bookings/create")}
        >
          <Plus size={18} />
          Create Booking
        </button>
      </div>

      <div className="bq-stats">
        <div className="bq-stat-card">
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="bq-stat-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="bq-stat-card">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </div>

        <div className="bq-stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </div>

      <section className="bq-card">
        <div className="bq-card-header">
          <h2>
            <ClipboardList size={21} />
            Transport Bookings
          </h2>
        </div>

        <div className="bq-filters">
          <div className="bq-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search Booking ID or store..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter bookings by status"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <BookingTable
          bookings={filteredBookings}
          onView={handleView}
          onEdit={handleEdit}
          onCancel={setCancelBooking}
        />

        <div className="bq-table-footer">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      </section>

      {notice && (
        <div className="bq-notice" role="status">
          {notice}
        </div>
      )}

      {selectedBooking && (
        <div className="bq-modal-overlay">
          <div
            className="bq-modal bq-details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-details-title"
          >
            <h2 id="booking-details-title">Booking Details</h2>

            <div className="bq-detail-list">
              <p>
                <strong>Booking ID:</strong> {selectedBooking.id}
              </p>
              <p>
                <strong>Origin:</strong> {selectedBooking.origin}
              </p>
              <p>
                <strong>Destination:</strong> {selectedBooking.destination}
              </p>
              <p>
                <strong>Date:</strong> {selectedBooking.date}
              </p>
              <p>
                <strong>Time:</strong> {selectedBooking.time}
              </p>
              <p>
                <strong>Items:</strong> {selectedBooking.items}
              </p>
              <p>
                <strong>Status:</strong> {selectedBooking.status}
              </p>
            </div>

            <button
              type="button"
              className="bq-btn-primary"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <CancelBookingModal
        booking={cancelBooking}
        onClose={() => setCancelBooking(null)}
        onConfirm={handleCancel}
      />
    </div>
  );
}

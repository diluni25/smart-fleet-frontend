import { useState } from "react";
import { Search, Eye, History } from "lucide-react";
import { useBookings } from "../context/BookingContext.jsx";
import { storeName } from "../data/mockData.js";
import "../../../styles/booking-history.css";

export default function BookingHistoryTable() {
  const { bookings } = useBookings();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const historyBookings = bookings.filter((booking) =>
    ["Completed", "Cancelled"].includes(booking.status),
  ).map(b => ({...b,origin:storeName(b.origin),destination:storeName(b.destination), date:b.transferDate,time:b.timeWindow,items:b.items.length}));

  const filteredBookings = historyBookings.filter((booking) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      booking.id.toLowerCase().includes(keyword) ||
      booking.origin.toLowerCase().includes(keyword) ||
      booking.destination.toLowerCase().includes(keyword);

    const matchesStatus = status === "All" || booking.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bq-page">
      <div className="bq-heading">
        <div>
          <span className="bq-eyebrow">STORE OPERATIONS</span>
          <h1>Booking History</h1>
          <p>View completed and cancelled transport bookings.</p>
        </div>
      </div>

      <section className="bq-card">
        <div className="bq-card-header">
          <h2>
            <History size={21} />
            Booking History Records
          </h2>
        </div>

        <div className="bq-filters">
          <div className="bq-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search booking ID or store..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter booking history"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="bq-table-wrapper">
          <table className="bq-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Time</th>
                <th>Items</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="bq-booking-id">{booking.id}</td>
                  <td>{booking.origin}</td>
                  <td>{booking.destination}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.items}</td>
                  <td>
                    <span
                      className={`bq-status ${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="bq-history-view"
                      onClick={() => setSelectedBooking(booking)}
                      title="View booking"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="bq-empty">
                    No history records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bq-table-footer">
          Showing {filteredBookings.length} history records
        </div>
      </section>

      {selectedBooking && (
        <div className="bq-modal-overlay">
          <div
            className="bq-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="history-details-title"
          >
            <h2 id="history-details-title">Booking Details</h2>

            <p>
              <strong>ID:</strong> {selectedBooking.id}
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
              <strong>Status:</strong> {selectedBooking.status}
            </p>

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
    </div>
  );
}

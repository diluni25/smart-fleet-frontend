import { Eye, Pencil, Trash2, ArrowRight } from "lucide-react";

export default function BookingTable({ bookings, onView, onEdit, onCancel }) {
  if (bookings.length === 0) {
    return <div className="bq-empty">No bookings found.</div>;
  }

  return (
    <div className="bq-table-wrapper">
      <table className="bq-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Transport Route</th>
            <th>Date</th>
            <th>Time</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="bq-booking-id">{booking.id}</td>

              <td>
                <div className="bq-route">
                  <span>{booking.origin}</span>
                  <ArrowRight size={15} />
                  <span>{booking.destination}</span>
                </div>
              </td>

              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.items}</td>

              <td>
                <span className={`bq-status ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </td>

              <td>
                <div className="bq-actions-cell">
                  <button
                    type="button"
                    title="View booking"
                    aria-label={`View ${booking.id}`}
                    onClick={() => onView(booking)}
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    type="button"
                    title="Edit booking"
                    aria-label={`Edit ${booking.id}`}
                    disabled={booking.status !== "Pending"}
                    onClick={() => onEdit(booking)}
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    title="Cancel booking"
                    aria-label={`Cancel ${booking.id}`}
                    disabled={booking.status !== "Pending"}
                    onClick={() => onCancel(booking)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

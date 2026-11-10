import { CalendarDays, Clock3, Package, Plus, Trash2 } from "lucide-react";

import { catalog, stores, timeWindows } from "../data/mockData";

export default function BookingForm({
  booking,
  onFieldChange,
  onSelectItem,
  onRemoveItem,
  onAddItem,
  selectedId,
  errors,
  onQuantityChange,
}) {
  const availableItems = catalog.filter(
    (item) => !booking.items.some((entry) => entry.id === item.id),
  );

  return (
    <div className="bk-left">
      {/* TRANSFER DETAILS */}
      <section className="bk-card">
        <h2>Transfer details</h2>

        <div className="bk-field-grid">
          <label className="bk-field">
            Origin
            <select
              value={booking.origin}
              onChange={(e) => onFieldChange("origin", e.target.value)}
            >
              <option value="">Select origin store</option>

              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
            {errors.origin && (
              <small className="bk-error">{errors.origin}</small>
            )}
          </label>

          <label className="bk-field">
            Destination
            <select
              value={booking.destination}
              onChange={(e) => onFieldChange("destination", e.target.value)}
            >
              <option value="">Select destination store</option>

              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
            {errors.destination && (
              <small className="bk-error">{errors.destination}</small>
            )}
          </label>

          <label className="bk-field">
            Transfer date
            <span className="bk-input-icon">
              <CalendarDays size={17} />

              <input
                type="date"
                value={booking.transferDate}
                onChange={(e) => onFieldChange("transferDate", e.target.value)}
              />
            </span>
            {errors.transferDate && (
              <small className="bk-error">{errors.transferDate}</small>
            )}
          </label>

          <label className="bk-field">
            Time window
            <span className="bk-input-icon">
              <Clock3 size={17} />

              <select
                value={booking.timeWindow}
                onChange={(e) => onFieldChange("timeWindow", e.target.value)}
              >
                <option value="">Select time window</option>

                {timeWindows.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </span>
            {errors.timeWindow && (
              <small className="bk-error">{errors.timeWindow}</small>
            )}
          </label>
        </div>
      </section>

      {/* BOOKING ITEMS */}
      <section className="bk-card">
        <div className="bk-card-head">
          <h2>Booking items</h2>

          <div className="bk-add-controls">
            <select
              id="bk-new-item"
              aria-label="Select an item to add"
              defaultValue=""
            >
              <option value="">Select item</option>

              {availableItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="bk-outline-green"
              onClick={() => {
                const element = document.getElementById("bk-new-item");

                if (element?.value) {
                  onAddItem(element.value);
                  element.value = "";
                }
              }}
            >
              <Plus size={16} />
              Add item
            </button>
          </div>
        </div>

        <div className="bk-table-scroll">
          <table className="bk-table">
            <thead>
              <tr>
                <th>Item code</th>
                <th>Item description</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {booking.items.map(({ id, quantity }) => {
                const item = catalog.find((x) => x.id === id);

                if (!item) return null;

                return (
                  <tr
                    key={id}
                    className={id === selectedId ? "bk-selected" : ""}
                    onClick={() => onSelectItem(id)}
                  >
                    <td>{item.id}</td>

                    <td>{item.name}</td>

                    <td>
                      <div className="bk-mini-stepper">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuantityChange(id, -1);
                          }}
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          aria-label={`Increase ${item.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuantityChange(id, 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>{item.unit}</td>

                    <td>
                      <button
                        type="button"
                        className="bk-icon-button"
                        aria-label={`Remove ${item.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveItem(id);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {errors.items && <small className="bk-error">{errors.items}</small>}

        {!booking.items.length && (
          <p className="bk-empty">
            <Package size={17} />
            No items added yet.
          </p>
        )}
      </section>
    </div>
  );
}

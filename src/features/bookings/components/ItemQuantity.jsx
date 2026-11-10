import { CheckCircle2, Package, Minus, Plus } from "lucide-react";

export default function ItemQuantity({ item, quantity, onChange, onApply }) {
  return (
    <section className="bk-card bk-quantity-card">
      <h2>Item quantity</h2>

      {item ? (
        <>
          <div className="bk-item-banner">
            <Package size={19} />
            {item.id} · {item.name}
          </div>

          <div className="bk-quantity-fields">
            <div>
              <label>Quantity</label>

              <div className="bk-stepper">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => onChange(-1)}
                >
                  <Minus size={16} />
                </button>

                <strong>{quantity}</strong>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => onChange(1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div>
              <label>Unit of measure</label>

              <div className="bk-readonly">{item.unit}</div>
            </div>
          </div>

          <div className="bk-stock">
            <CheckCircle2 size={18} />
            {item.stock} {item.unit.toLowerCase()}s in stock
          </div>

          <button type="button" className="bk-apply" onClick={onApply}>
            <CheckCircle2 size={17} />
            Apply quantity
          </button>
        </>
      ) : (
        <p className="bk-empty">Select an item in the booking table.</p>
      )}
    </section>
  );
}

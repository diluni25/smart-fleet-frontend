export function validateBooking(booking, catalog) {
  const errors = {};

  if (!booking.origin) {
    errors.origin = "Choose an origin store.";
  }

  if (!booking.destination) {
    errors.destination = "Choose a destination store.";
  }

  if (
    booking.origin &&
    booking.destination &&
    booking.origin === booking.destination
  ) {
    errors.destination = "Origin and destination must be different.";
  }

  const today = new Date();

  const todayLocal = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  if (!booking.transferDate) {
    errors.transferDate = "Choose a transfer date.";
  } else if (booking.transferDate < todayLocal) {
    errors.transferDate = "Transfer date cannot be in the past.";
  }

  if (!booking.timeWindow) {
    errors.timeWindow = "Choose a time window.";
  }

  if (!booking.items.length) {
    errors.items = "Add at least one booking item.";
  } else {
    const invalid = booking.items.some(({ id, quantity }) => {
      const item = catalog.find((x) => x.id === id);

      return (
        !item ||
        !Number.isInteger(Number(quantity)) ||
        Number(quantity) < 1 ||
        Number(quantity) > item.stock
      );
    });

    if (invalid) {
      errors.items = "Each item needs a valid quantity within available stock.";
    }
  }

  return errors;
}

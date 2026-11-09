export function validateBooking(values) {
  const errors = {};
  if (!values.pickupStore) errors.pickupStore='Select a pickup store.';
  if (!values.destinationStore) errors.destinationStore='Select a destination store.';
  if (values.pickupStore && values.destinationStore && values.pickupStore === values.destinationStore) errors.destinationStore='Destination must be different from pickup store.';
  if (!values.requestedDate) errors.requestedDate='Select a requested date.';
  else { const localNow=new Date(); const today=`${localNow.getFullYear()}-${String(localNow.getMonth()+1).padStart(2,'0')}-${String(localNow.getDate()).padStart(2,'0')}`; if(values.requestedDate < today) errors.requestedDate='Date cannot be in the past.'; }
  if (!values.requestedTime) errors.requestedTime='Select a requested time.';
  if (!values.itemId) errors.itemId='Select an item.';
  if (!values.quantity) errors.quantity='Enter a quantity.';
  else if (!Number.isInteger(Number(values.quantity)) || Number(values.quantity)<=0) errors.quantity='Quantity must be a whole number greater than zero.';
  return errors;
}
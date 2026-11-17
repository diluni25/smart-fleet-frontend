import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout.jsx";
import Dashboard from "../features/dashboard/pages/Dashboard.jsx";
import CreateBooking from "../features/bookings/pages/CreateBooking.jsx";
import PlaceholderPage from "../components/ui/PlaceholderPage.jsx";
import BookingHistory from "../features/bookings/pages/BookingHistory.jsx";
import BookingHistoryTable from "../features/bookings/pages/BookingHistoryTable.jsx";
import BookingDetails from "../features/bookings/pages/BookingDetails.jsx";
import EditBooking from "../features/bookings/pages/EditBooking.jsx";
import GoodsHandover from "../features/bookings/pages/GoodsHandover.jsx";
import ReceiptConfirmation from "../features/bookings/pages/ReceiptConfirmation.jsx";
import Discrepancies from "../features/bookings/pages/Discrepancies.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings/create" element={<CreateBooking />} />
        <Route path="/bookings" element={<BookingHistory />} />
        <Route path="/bookings/history" element={<BookingHistoryTable />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
        <Route path="/bookings/:id/edit" element={<EditBooking />} />
        <Route path="/goods/handover" element={<GoodsHandover />} />
        <Route path="/goods/receipt" element={<ReceiptConfirmation />} />
        <Route path="/goods/discrepancies" element={<Discrepancies />} />
        <Route path="/stores" element={<PlaceholderPage title="Stores" />} />
        <Route
          path="/vehicles"
          element={<PlaceholderPage title="Vehicles" />}
        />
        <Route path="/trips" element={<PlaceholderPage title="Trips" />} />
        <Route
          path="/schedules"
          element={<PlaceholderPage title="Schedules" />}
        />
        <Route
          path="/settings"
          element={<PlaceholderPage title="Settings" />}
        />
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Page not found"
              description="This route does not exist."
            />
          }
        />
      </Route>
    </Routes>
  );
}

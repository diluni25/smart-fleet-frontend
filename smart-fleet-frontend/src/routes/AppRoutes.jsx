import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import Dashboard from '../features/dashboard/pages/Dashboard.jsx';
import AdminDashboard from '../features/dashboard/pages/AdminDashboard.jsx';
import CreateBooking from '../features/bookings/pages/CreateBooking.jsx';
import PlaceholderPage from '../components/ui/PlaceholderPage.jsx';
import StoreManagement from '../features/operations/pages/StoreManagement.jsx';
import VehicleManagement from '../features/operations/pages/VehicleManagement.jsx';
import StoreSchedule from '../features/operations/pages/StoreSchedule.jsx';
export default function AppRoutes() {
  return <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/bookings/create" element={<CreateBooking />} />
      <Route path="/bookings" element={<PlaceholderPage title="Bookings" description="Booking history, search and management will be added in a future sprint." />} />
      <Route path="/stores" element={<StoreManagement />} />
      <Route path="/vehicles" element={<VehicleManagement />} />
      <Route path="/trips" element={<PlaceholderPage title="Trips" />} />
      <Route path="/schedules" element={<StoreSchedule />} />
      <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" description="This route does not exist." />} />
    </Route>
  </Routes>;
}

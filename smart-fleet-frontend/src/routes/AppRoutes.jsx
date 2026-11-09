import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import Dashboard from '../features/dashboard/pages/Dashboard.jsx';
import CreateBooking from '../features/bookings/pages/CreateBooking.jsx';
import PlaceholderPage from '../components/ui/PlaceholderPage.jsx';
export default function AppRoutes() {
  return <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings/create" element={<CreateBooking />} />
      <Route path="/bookings" element={<PlaceholderPage title="Bookings" description="Booking history, search and management will be added in a future sprint." />} />
      <Route path="/stores" element={<PlaceholderPage title="Stores" />} />
      <Route path="/vehicles" element={<PlaceholderPage title="Vehicles" />} />
      <Route path="/trips" element={<PlaceholderPage title="Trips" />} />
      <Route path="/schedules" element={<PlaceholderPage title="Schedules" />} />
      <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" description="This route does not exist." />} />
    </Route>
  </Routes>;
}
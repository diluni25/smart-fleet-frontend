import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import PlaceholderPage from '../components/ui/PlaceholderPage.jsx';

// Auth සහ Booking Queue components
import AuthLayout from '../features/auth/AuthLayout.jsx';
import BookingQueue from '../features/dashboard/pages/BookingQueue.jsx';
import Dashboard from '../features/dashboard/pages/Dashboard.jsx';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Authentication Routes (Sign In, Sign Up, Forgot & Reset Password) */}
        <Route path="/auth" element={<AuthLayout />} />

        {/* 2. Admin Booking Review Queue Route */}
        <Route path="/admin/bookings" element={<BookingQueue />} />

        {/* 3. Main Dashboard Layout & Other Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings/create" element={<PlaceholderPage title="Create Booking" description="Create store-to-store transfer bookings." />} />
          <Route path="/bookings" element={<PlaceholderPage title="Bookings" description="Booking history and management." />} />
          <Route path="/stores" element={<PlaceholderPage title="Stores" description="Store locations and management." />} />
          <Route path="/vehicles" element={<PlaceholderPage title="Vehicles" description="Vehicle fleet and availability." />} />
          <Route path="/trips" element={<PlaceholderPage title="Trips" description="Trip planning and multi-stop management." />} />
          <Route path="/schedules" element={<PlaceholderPage title="Schedules" description="Store loading and unloading time slots." />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" description="System configuration and user roles." />} />
        </Route>

        {/* 4. Default Redirect */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" description="This route does not exist." />} />
      </Routes>
    </BrowserRouter>
  );
}
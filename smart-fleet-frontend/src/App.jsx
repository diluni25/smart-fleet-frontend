import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './features/auth/AuthLayout.jsx';
import BookingQueue from './features/dashboard/pages/BookingQueue.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/admin/bookings" element={<BookingQueue />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
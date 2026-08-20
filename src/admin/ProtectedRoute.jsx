import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAdminAuth();

  if (loading) return <div className="admin-page"><p>Loading...</p></div>;
  if (!session) return <Navigate to="/admin/login" replace />;

  return children;
}

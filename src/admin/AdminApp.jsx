import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './AdminAuthContext';
import ProtectedRoute from './ProtectedRoute';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminOverview from './AdminOverview';
import AdminStudents from './AdminStudents';
import AdminCourses from './AdminCourses';
import AdminFAQ from './AdminFAQ';
import AdminMedia from './AdminMedia';
import AdminImages from './AdminImages';
import AdminPages from './AdminPages';
import AdminSections from './AdminSections';
import AdminHolidayCamp from './AdminHolidayCamp';
import AdminSettings from './AdminSettings';

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path=""
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="faq" element={<AdminFAQ />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="images" element={<AdminImages />} />
          <Route path="pages" element={<AdminPages />} />
          <Route path="sections" element={<AdminSections />} />
          <Route path="holiday-camp" element={<AdminHolidayCamp />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

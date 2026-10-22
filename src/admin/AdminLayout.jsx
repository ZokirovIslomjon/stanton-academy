import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import './admin.css';

export default function AdminLayout() {
  const { session, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // On phones the sidebar is a slide-in drawer; close it after every navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className={`admin-shell${menuOpen ? ' menu-open' : ''}`}>
      <div className="admin-mobile-bar">
        <button
          type="button"
          className="admin-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        Stanton Academy Admin
      </div>
      <div className="admin-backdrop" onClick={() => setMenuOpen(false)} />
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          Stanton Academy
          <span>Admin</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Overview
          </NavLink>
          <NavLink to="/admin/students" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Students
          </NavLink>
          <NavLink to="/admin/courses" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Courses
          </NavLink>
          <NavLink to="/admin/faq" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            FAQ
          </NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Blog
          </NavLink>
          <NavLink to="/admin/media" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Media
          </NavLink>
          <NavLink to="/admin/images" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Images
          </NavLink>
          <NavLink to="/admin/pages" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Pages
          </NavLink>
          <NavLink to="/admin/sections" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Sections
          </NavLink>
          <NavLink to="/admin/holiday-camp" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Holiday Camp
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}>
            Settings
          </NavLink>
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-user-email">{session?.user?.email}</div>
          <button className="admin-btn admin-btn-ghost" onClick={handleSignOut}>Sign Out</button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import logo from '../assets/logo-new.png';
import './admin.css';

const NAV_GROUPS = [
  {
    label: null,
    items: [{ to: '/admin', end: true, icon: 'fa-solid fa-gauge-high', label: 'Overview' }],
  },
  {
    label: 'Admissions',
    items: [
      { to: '/admin/students', icon: 'fa-solid fa-user-graduate', label: 'Students' },
      { to: '/admin/courses', icon: 'fa-solid fa-book-open', label: 'Courses' },
      { to: '/admin/holiday-camp', icon: 'fa-solid fa-umbrella-beach', label: 'Holiday Camp' },
    ],
  },
  {
    label: 'Website Content',
    items: [
      { to: '/admin/pages', icon: 'fa-solid fa-file-lines', label: 'Pages' },
      { to: '/admin/sections', icon: 'fa-solid fa-layer-group', label: 'Sections' },
      { to: '/admin/faq', icon: 'fa-solid fa-circle-question', label: 'FAQ' },
      { to: '/admin/media', icon: 'fa-solid fa-folder-open', label: 'Media' },
      { to: '/admin/images', icon: 'fa-solid fa-image', label: 'Images' },
    ],
  },
  {
    label: 'System',
    items: [{ to: '/admin/settings', icon: 'fa-solid fa-gear', label: 'Settings' }],
  },
];

function displayNameFromEmail(email) {
  if (!email) return 'Admin';
  const local = email.split('@')[0];
  return local.charAt(0).toUpperCase() + local.slice(1);
}

function initialsFromEmail(email) {
  if (!email) return 'A';
  return email.charAt(0).toUpperCase();
}

export default function AdminLayout() {
  const { session, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const email = session?.user?.email;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const isOverview = location.pathname === '/admin';
  const rangeFrom = searchParams.get('from') || '';
  const rangeTo = searchParams.get('to') || '';

  const updateRange = (from, to) => {
    const next = new URLSearchParams(searchParams);
    if (from) next.set('from', from);
    else next.delete('from');
    if (to) next.set('to', to);
    else next.delete('to');
    setSearchParams(next);
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <img className="admin-sidebar-logo" src={logo} alt="Stanton Academy" />
          <span>Admin</span>
        </div>
        <nav className="admin-nav">
          {NAV_GROUPS.map((group, gi) => (
            <React.Fragment key={group.label || `group-${gi}`}>
              {group.label && <div className="admin-nav-group-label">{group.label}</div>}
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}
                >
                  <i className={item.icon} />
                  {item.label}
                </NavLink>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-user-email">{email}</div>
          <button className="admin-btn admin-btn-ghost" onClick={handleSignOut}>Sign Out</button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <div className="admin-topbar-welcome">Welcome back, {displayNameFromEmail(email)}!</div>
            <div className="admin-topbar-date">{today}</div>
          </div>
          <div className="admin-topbar-actions">
            {isOverview && (
              <div className="admin-topbar-daterange">
                <i className="fa-solid fa-calendar-days admin-topbar-daterange-icon" />
                <input
                  type="date"
                  className="admin-topbar-date-input"
                  value={rangeFrom}
                  max={rangeTo || undefined}
                  onChange={(e) => updateRange(e.target.value, rangeTo)}
                />
                <span className="admin-topbar-daterange-sep">to</span>
                <input
                  type="date"
                  className="admin-topbar-date-input"
                  value={rangeTo}
                  min={rangeFrom || undefined}
                  onChange={(e) => updateRange(rangeFrom, e.target.value)}
                />
                {(rangeFrom || rangeTo) && (
                  <button type="button" className="admin-topbar-icon-btn" title="Clear date range" onClick={() => updateRange('', '')}>
                    <i className="fa-solid fa-xmark" />
                  </button>
                )}
              </div>
            )}
            <button className="admin-topbar-icon-btn" type="button" title="Notifications">
              <i className="fa-solid fa-bell" />
            </button>
            <div className="admin-topbar-avatar">{initialsFromEmail(email)}</div>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

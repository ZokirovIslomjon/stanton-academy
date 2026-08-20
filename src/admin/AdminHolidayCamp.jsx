import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { MONTH_NAMES } from '../lib/calendarGrid';
import './admin.css';

const EVENT_TYPES = [
  { value: 'arrival', label: 'Arrival Day' },
  { value: 'start', label: 'Start Day' },
  { value: 'trip', label: 'Trip / Excursion' },
  { value: 'night', label: 'Night Event (Movie / Culture Night)' },
  { value: 'sport', label: 'Sport Day' },
  { value: 'farewell', label: 'Farewell / Departure' },
];

const THEMES = ['blue', 'orange', 'gray', 'gold', 'dark'];

const STATUSES = [
  { value: 'included', label: '✓ Included' },
  { value: 'excluded', label: '✗ Not Included' },
  { value: 'info', label: 'ℹ Info Only' },
];

const emptyMonthForm = { year: 2026, month: 7 };
const emptyEventForm = { id: null, event_date: '', label: '', event_type: 'trip' };
const emptyPackageForm = { id: null, category: 'student', name: '', theme: 'blue', highlight: false, badge_label: '', price: '' };
const emptyFeatureForm = { id: null, text: '', status: 'included' };

export default function AdminHolidayCamp() {
  const [tab, setTab] = useState('calendar');
  const [error, setError] = useState('');

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Holiday Camp</h1>
      <p className="admin-empty" style={{ marginBottom: 20 }}>
        Manage the itinerary calendar and package tiers shown on the Holiday Camp page. Hero text, the "About Stanton
        Academy" description, and the Terms/FAQ list are edited on the Sections page.
      </p>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button className={tab === 'calendar' ? 'admin-btn admin-btn-primary' : 'admin-btn admin-btn-ghost'} onClick={() => setTab('calendar')}>
          Calendar
        </button>
        <button className={tab === 'packages' ? 'admin-btn admin-btn-primary' : 'admin-btn admin-btn-ghost'} onClick={() => setTab('packages')}>
          Packages
        </button>
      </div>

      {tab === 'calendar' ? <CalendarTab onError={setError} /> : <PackagesTab onError={setError} />}
    </div>
  );
}

function CalendarTab({ onError }) {
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonthId, setSelectedMonthId] = useState(null);
  const [monthForm, setMonthForm] = useState(null);
  const [eventForm, setEventForm] = useState(null);
  const [saving, setSaving] = useState(false);

  async function loadCalendar() {
    setLoading(true);
    onError('');
    const { data: monthsData, error: monthsError } = await supabase.from('camp_months').select('*').order('display_order', { ascending: true });
    if (monthsError) {
      onError(monthsError.message);
      setLoading(false);
      return;
    }
    const { data: eventsData, error: eventsError } = await supabase.from('camp_events').select('*').order('event_date', { ascending: true });
    if (eventsError) {
      onError(eventsError.message);
      setLoading(false);
      return;
    }
    const eventsByMonth = {};
    (eventsData || []).forEach((e) => {
      if (!eventsByMonth[e.month_id]) eventsByMonth[e.month_id] = [];
      eventsByMonth[e.month_id].push(e);
    });
    setMonths((monthsData || []).map((m) => ({ ...m, events: eventsByMonth[m.id] || [] })));
    setLoading(false);
  }

  useEffect(() => {
    loadCalendar();
  }, []);

  const openAddMonth = () => setMonthForm({ ...emptyMonthForm });
  const closeMonthForm = () => setMonthForm(null);

  const handleSaveMonth = async (e) => {
    e.preventDefault();
    setSaving(true);
    onError('');
    const maxOrder = months.reduce((max, m) => Math.max(max, m.display_order), 0);
    const { error: insertError } = await supabase.from('camp_months').insert({
      year: Number(monthForm.year),
      month: Number(monthForm.month),
      display_order: maxOrder + 1,
    });
    setSaving(false);
    if (insertError) {
      onError(insertError.message);
      return;
    }
    setMonthForm(null);
    loadCalendar();
  };

  const handleDeleteMonth = async (month) => {
    if (!window.confirm(`Delete ${MONTH_NAMES[month.month - 1]} ${month.year} and all its events? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from('camp_months').delete().eq('id', month.id);
    if (deleteError) {
      onError(deleteError.message);
      return;
    }
    if (selectedMonthId === month.id) setSelectedMonthId(null);
    loadCalendar();
  };

  const openAddEvent = () => setEventForm({ ...emptyEventForm });
  const openEditEvent = (event) => setEventForm({ ...event });
  const closeEventForm = () => setEventForm(null);

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setSaving(true);
    onError('');
    const payload = {
      month_id: selectedMonthId,
      event_date: eventForm.event_date,
      label: eventForm.label.trim(),
      event_type: eventForm.event_type,
    };
    const result = eventForm.id
      ? await supabase.from('camp_events').update(payload).eq('id', eventForm.id)
      : await supabase.from('camp_events').insert(payload);
    setSaving(false);
    if (result.error) {
      onError(result.error.message);
      return;
    }
    setEventForm(null);
    loadCalendar();
  };

  const handleDeleteEvent = async (event) => {
    if (!window.confirm('Delete this event?')) return;
    const { error: deleteError } = await supabase.from('camp_events').delete().eq('id', event.id);
    if (deleteError) onError(deleteError.message);
    else loadCalendar();
  };

  if (loading) return <p>Loading calendar...</p>;

  const selectedMonth = months.find((m) => m.id === selectedMonthId);

  return (
    <>
      <div className="admin-page-header">
        <h2 className="admin-section-title">Camp Sessions</h2>
        <button className="admin-btn admin-btn-primary" onClick={openAddMonth}>
          + Add Month
        </button>
      </div>

      {monthForm && (
        <form className="admin-panel" onSubmit={handleSaveMonth} style={{ marginBottom: 20 }}>
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Year</span>
              <input className="admin-input" type="number" value={monthForm.year} onChange={(e) => setMonthForm({ ...monthForm, year: e.target.value })} required />
            </label>
            <label className="admin-field">
              <span>Month</span>
              <select className="admin-select" value={monthForm.month} onChange={(e) => setMonthForm({ ...monthForm, month: e.target.value })}>
                {MONTH_NAMES.map((name, i) => (
                  <option key={name} value={i + 1}>{name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={closeMonthForm}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Add Month'}</button>
          </div>
        </form>
      )}

      <table className="admin-table" style={{ marginBottom: 24 }}>
        <thead>
          <tr>
            <th>Session</th>
            <th>Events</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {months.map((m) => (
            <tr key={m.id} style={selectedMonthId === m.id ? { background: '#f4f9f6' } : undefined}>
              <td>{MONTH_NAMES[m.month - 1]} {m.year}</td>
              <td>{m.events.length}</td>
              <td className="admin-table-actions">
                <button className="admin-btn admin-btn-ghost" onClick={() => setSelectedMonthId(m.id)}>Manage Events</button>
                <button className="admin-btn admin-btn-danger-text" onClick={() => handleDeleteMonth(m)}>Delete</button>
              </td>
            </tr>
          ))}
          {months.length === 0 && (
            <tr>
              <td colSpan={3} className="admin-empty">No sessions yet. Add one above.</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedMonth && (
        <div className="admin-panel">
          <div className="admin-page-header">
            <h2 className="admin-section-title">Events — {MONTH_NAMES[selectedMonth.month - 1]} {selectedMonth.year}</h2>
            <button className="admin-btn admin-btn-primary" onClick={openAddEvent}>+ Add Event</button>
          </div>

          {eventForm && (
            <form className="admin-panel" onSubmit={handleSaveEvent} style={{ marginBottom: 20 }}>
              <div className="admin-form-grid">
                <label className="admin-field">
                  <span>Date</span>
                  <input className="admin-input" type="date" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} required />
                </label>
                <label className="admin-field">
                  <span>Label</span>
                  <input className="admin-input" value={eventForm.label} onChange={(e) => setEventForm({ ...eventForm, label: e.target.value })} required />
                </label>
                <label className="admin-field">
                  <span>Type</span>
                  <select className="admin-select" value={eventForm.event_type} onChange={(e) => setEventForm({ ...eventForm, event_type: e.target.value })}>
                    {EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </label>
              </div>
              <div className="admin-form-actions">
                <button type="button" className="admin-btn admin-btn-ghost" onClick={closeEventForm}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Event'}</button>
              </div>
            </form>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Label</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedMonth.events.map((ev) => (
                <tr key={ev.id}>
                  <td>{ev.event_date}</td>
                  <td>{ev.label}</td>
                  <td>{EVENT_TYPES.find((t) => t.value === ev.event_type)?.label || ev.event_type}</td>
                  <td className="admin-table-actions">
                    <button className="admin-btn admin-btn-ghost" onClick={() => openEditEvent(ev)}>Edit</button>
                    <button className="admin-btn admin-btn-danger-text" onClick={() => handleDeleteEvent(ev)}>Delete</button>
                  </td>
                </tr>
              ))}
              {selectedMonth.events.length === 0 && (
                <tr>
                  <td colSpan={4} className="admin-empty">No events yet. Add one above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function PackagesTab({ onError }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [packageForm, setPackageForm] = useState(null);
  const [featureForm, setFeatureForm] = useState(null);
  const [saving, setSaving] = useState(false);

  async function loadPackages() {
    setLoading(true);
    onError('');
    const { data: pkgData, error: pkgError } = await supabase.from('camp_packages').select('*').order('category', { ascending: true }).order('display_order', { ascending: true });
    if (pkgError) {
      onError(pkgError.message);
      setLoading(false);
      return;
    }
    const { data: featData, error: featError } = await supabase.from('camp_package_features').select('*').order('display_order', { ascending: true });
    if (featError) {
      onError(featError.message);
      setLoading(false);
      return;
    }
    const featuresByPkg = {};
    (featData || []).forEach((f) => {
      if (!featuresByPkg[f.package_id]) featuresByPkg[f.package_id] = [];
      featuresByPkg[f.package_id].push(f);
    });
    setPackages((pkgData || []).map((p) => ({ ...p, features: featuresByPkg[p.id] || [] })));
    setLoading(false);
  }

  useEffect(() => {
    loadPackages();
  }, []);

  const openAddPackage = (category) => setPackageForm({ ...emptyPackageForm, category });
  const openEditPackage = (pkg) => setPackageForm({ id: pkg.id, category: pkg.category, name: pkg.name, theme: pkg.theme, highlight: pkg.highlight, badge_label: pkg.badge_label || '', price: pkg.price || '' });
  const closePackageForm = () => setPackageForm(null);

  const handleSavePackage = async (e) => {
    e.preventDefault();
    setSaving(true);
    onError('');
    const payload = {
      category: packageForm.category,
      name: packageForm.name.trim(),
      theme: packageForm.theme,
      highlight: packageForm.highlight,
      badge_label: packageForm.badge_label.trim() || null,
      price: packageForm.price.trim() || null,
    };
    const result = packageForm.id
      ? await supabase.from('camp_packages').update(payload).eq('id', packageForm.id)
      : await supabase.from('camp_packages').insert({ ...payload, display_order: packages.filter((p) => p.category === packageForm.category).length });
    setSaving(false);
    if (result.error) {
      onError(result.error.message);
      return;
    }
    setPackageForm(null);
    loadPackages();
  };

  const handleDeletePackage = async (pkg) => {
    if (!window.confirm(`Delete package "${pkg.name}" and all its features? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from('camp_packages').delete().eq('id', pkg.id);
    if (deleteError) {
      onError(deleteError.message);
      return;
    }
    if (selectedPackageId === pkg.id) setSelectedPackageId(null);
    loadPackages();
  };

  const openAddFeature = () => setFeatureForm({ ...emptyFeatureForm });
  const openEditFeature = (feature) => setFeatureForm({ ...feature });
  const closeFeatureForm = () => setFeatureForm(null);

  const handleSaveFeature = async (e) => {
    e.preventDefault();
    setSaving(true);
    onError('');
    const payload = {
      package_id: selectedPackageId,
      text: featureForm.text.trim(),
      status: featureForm.status,
    };
    const selectedPackage = packages.find((p) => p.id === selectedPackageId);
    const result = featureForm.id
      ? await supabase.from('camp_package_features').update(payload).eq('id', featureForm.id)
      : await supabase.from('camp_package_features').insert({ ...payload, display_order: selectedPackage ? selectedPackage.features.length : 0 });
    setSaving(false);
    if (result.error) {
      onError(result.error.message);
      return;
    }
    setFeatureForm(null);
    loadPackages();
  };

  const handleDeleteFeature = async (feature) => {
    if (!window.confirm('Delete this feature?')) return;
    const { error: deleteError } = await supabase.from('camp_package_features').delete().eq('id', feature.id);
    if (deleteError) onError(deleteError.message);
    else loadPackages();
  };

  if (loading) return <p>Loading packages...</p>;

  const selectedPackage = packages.find((p) => p.id === selectedPackageId);

  return (
    <>
      {packageForm && (
        <form className="admin-panel" onSubmit={handleSavePackage} style={{ marginBottom: 20 }}>
          <h2 className="admin-section-title">{packageForm.id ? 'Edit Package' : `New ${packageForm.category === 'guardian' ? 'Guardian' : 'Student'} Package`}</h2>
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Name</span>
              <input className="admin-input" value={packageForm.name} onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })} required />
            </label>
            <label className="admin-field">
              <span>Theme (card color)</span>
              <select className="admin-select" value={packageForm.theme} onChange={(e) => setPackageForm({ ...packageForm, theme: e.target.value })}>
                {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label className="admin-field">
              <span>Price (optional)</span>
              <input className="admin-input" placeholder="e.g. RM 1,200" value={packageForm.price} onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Badge label (optional)</span>
              <input className="admin-input" placeholder="e.g. Most Popular" value={packageForm.badge_label} onChange={(e) => setPackageForm({ ...packageForm, badge_label: e.target.value })} />
            </label>
            <label className="admin-field admin-field-checkbox">
              <input type="checkbox" checked={packageForm.highlight} onChange={(e) => setPackageForm({ ...packageForm, highlight: e.target.checked })} />
              <span>Highlight this tier (shows the badge)</span>
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={closePackageForm}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Package'}</button>
          </div>
        </form>
      )}

      <PackageCategoryTable
        title="Student Packages"
        category="student"
        packages={packages.filter((p) => p.category === 'student')}
        selectedPackageId={selectedPackageId}
        onSelect={setSelectedPackageId}
        onAdd={() => openAddPackage('student')}
        onEdit={openEditPackage}
        onDelete={handleDeletePackage}
      />

      <PackageCategoryTable
        title="Guardian Packages"
        category="guardian"
        packages={packages.filter((p) => p.category === 'guardian')}
        selectedPackageId={selectedPackageId}
        onSelect={setSelectedPackageId}
        onAdd={() => openAddPackage('guardian')}
        onEdit={openEditPackage}
        onDelete={handleDeletePackage}
      />

      {selectedPackage && (
        <div className="admin-panel">
          <div className="admin-page-header">
            <h2 className="admin-section-title">Features — {selectedPackage.name}</h2>
            <button className="admin-btn admin-btn-primary" onClick={openAddFeature}>+ Add Feature</button>
          </div>

          {featureForm && (
            <form className="admin-panel" onSubmit={handleSaveFeature} style={{ marginBottom: 20 }}>
              <div className="admin-form-grid">
                <label className="admin-field">
                  <span>Text</span>
                  <input className="admin-input" value={featureForm.text} onChange={(e) => setFeatureForm({ ...featureForm, text: e.target.value })} required />
                </label>
                <label className="admin-field">
                  <span>Status</span>
                  <select className="admin-select" value={featureForm.status} onChange={(e) => setFeatureForm({ ...featureForm, status: e.target.value })}>
                    {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </label>
              </div>
              <div className="admin-form-actions">
                <button type="button" className="admin-btn admin-btn-ghost" onClick={closeFeatureForm}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Feature'}</button>
              </div>
            </form>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th>Text</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedPackage.features.map((f) => (
                <tr key={f.id}>
                  <td>{f.text}</td>
                  <td>{STATUSES.find((s) => s.value === f.status)?.label || f.status}</td>
                  <td className="admin-table-actions">
                    <button className="admin-btn admin-btn-ghost" onClick={() => openEditFeature(f)}>Edit</button>
                    <button className="admin-btn admin-btn-danger-text" onClick={() => handleDeleteFeature(f)}>Delete</button>
                  </td>
                </tr>
              ))}
              {selectedPackage.features.length === 0 && (
                <tr>
                  <td colSpan={3} className="admin-empty">No features yet. Add one above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function PackageCategoryTable({ title, packages, selectedPackageId, onSelect, onAdd, onEdit, onDelete }) {
  return (
    <>
      <div className="admin-page-header">
        <h2 className="admin-section-title">{title}</h2>
        <button className="admin-btn admin-btn-primary" onClick={onAdd}>+ Add Package</button>
      </div>
      <table className="admin-table" style={{ marginBottom: 24 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Theme</th>
            <th>Price</th>
            <th>Highlight</th>
            <th>Features</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {packages.map((p) => (
            <tr key={p.id} style={selectedPackageId === p.id ? { background: '#f4f9f6' } : undefined}>
              <td>{p.name}</td>
              <td>{p.theme}</td>
              <td>{p.price || '—'}</td>
              <td>{p.highlight ? `⭐ ${p.badge_label || ''}` : '—'}</td>
              <td>{p.features.length}</td>
              <td className="admin-table-actions">
                <button className="admin-btn admin-btn-ghost" onClick={() => onSelect(p.id)}>Manage Features</button>
                <button className="admin-btn admin-btn-ghost" onClick={() => onEdit(p)}>Edit</button>
                <button className="admin-btn admin-btn-danger-text" onClick={() => onDelete(p)}>Delete</button>
              </td>
            </tr>
          ))}
          {packages.length === 0 && (
            <tr>
              <td colSpan={6} className="admin-empty">No packages yet. Add one above.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

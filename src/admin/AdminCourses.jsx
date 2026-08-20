import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

const THEMES = ['blue', 'orange', 'green', 'red'];

const emptyForm = {
  id: null,
  slug: '',
  title: '',
  theme: 'blue',
  frequency: '',
  duration: '',
  price: '',
  capacity: '',
  level_note: '',
  features: '',
  image_url: '',
  link: '',
  display_order: 0,
  is_active: true,
};

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  async function loadCourses() {
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await supabase
      .from('courses')
      .select('*')
      .order('display_order', { ascending: true });
    if (fetchError) setError(fetchError.message);
    else setCourses(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const openAdd = () => setForm({ ...emptyForm, display_order: courses.length });
  const openEdit = (course) =>
    setForm({
      ...course,
      price: course.price ?? '',
      capacity: course.capacity ?? '',
      features: (course.features || []).join('\n'),
    });
  const closeForm = () => setForm(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      theme: form.theme,
      frequency: form.frequency.trim() || null,
      duration: form.duration.trim() || null,
      price: form.price === '' ? null : Number(form.price),
      capacity: form.capacity === '' ? null : Number(form.capacity),
      level_note: form.level_note.trim() || null,
      features: form.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      image_url: form.image_url.trim() || null,
      link: form.link.trim() || null,
      display_order: Number(form.display_order) || 0,
      is_active: form.is_active,
    };

    const result = form.id
      ? await supabase.from('courses').update(payload).eq('id', form.id)
      : await supabase.from('courses').insert(payload);

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setForm(null);
    loadCourses();
  };

  const handleDelete = async (course) => {
    if (!window.confirm(`Remove "${course.title}"? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from('courses').delete().eq('id', course.id);
    if (deleteError) setError(deleteError.message);
    else loadCourses();
  };

  const handleToggleActive = async (course) => {
    const { error: updateError } = await supabase
      .from('courses')
      .update({ is_active: !course.is_active })
      .eq('id', course.id);
    if (updateError) setError(updateError.message);
    else loadCourses();
  };

  if (loading) return <div className="admin-page"><p>Loading courses...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Courses</h1>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          + Add Course
        </button>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {form && (
        <form className="admin-panel admin-course-form" onSubmit={handleSave}>
          <h2 className="admin-section-title">{form.id ? 'Edit Course' : 'New Course'}</h2>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Title</span>
              <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </label>

            <label className="admin-field">
              <span>Slug (URL-safe id)</span>
              <input className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </label>

            <label className="admin-field">
              <span>Theme Color</span>
              <select className="admin-select" value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })}>
                {THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Frequency</span>
              <input
                className="admin-input"
                placeholder="e.g. 5x a week"
                value={form.frequency}
                onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Duration</span>
              <input
                className="admin-input"
                placeholder="e.g. 4 hours"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Price (RM/month)</span>
              <input
                className="admin-input"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Seat Capacity</span>
              <input
                className="admin-input"
                type="number"
                placeholder="e.g. 20"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Level Note</span>
              <input
                className="admin-input"
                placeholder="e.g. Target Band 7.0+"
                value={form.level_note}
                onChange={(e) => setForm({ ...form, level_note: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Page Link</span>
              <input
                className="admin-input"
                placeholder="/general-english"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Image URL</span>
              <input className="admin-input" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            </label>

            <label className="admin-field">
              <span>Display Order</span>
              <input
                className="admin-input"
                type="number"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: e.target.value })}
              />
            </label>

            <label className="admin-field admin-field-checkbox">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              <span>Visible on website</span>
            </label>
          </div>

          <label className="admin-field">
            <span>Features (one per line)</span>
            <textarea
              className="admin-textarea"
              rows={4}
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
            />
          </label>

          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Course'}
            </button>
          </div>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Schedule</th>
            <th>Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.price != null ? `${c.price_currency || 'RM'} ${c.price}/${c.billing_period || 'month'}` : '—'}</td>
              <td>{[c.frequency, c.duration].filter(Boolean).join(' · ') || '—'}</td>
              <td>
                <button className="admin-badge-toggle" onClick={() => handleToggleActive(c)}>
                  {c.is_active ? 'Active' : 'Hidden'}
                </button>
              </td>
              <td className="admin-table-actions">
                <button className="admin-btn admin-btn-ghost" onClick={() => openEdit(c)}>
                  Edit
                </button>
                <button className="admin-btn admin-btn-danger-text" onClick={() => handleDelete(c)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

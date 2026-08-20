import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

export default function AdminSections() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error: fetchError } = await supabase.from('page_content').select('*').order('page', { ascending: true });
      if (fetchError) setError(fetchError.message);
      else setRows(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleChange = (id, value) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, value } : row)));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    for (const row of rows) {
      const { error: updateError } = await supabase.from('page_content').update({ value: row.value }).eq('id', row.id);
      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <div className="admin-page"><p>Loading sections...</p></div>;

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Sections</h1>
      <p className="admin-empty" style={{ marginBottom: 20 }}>
        Text blocks from the About and Contact pages. Edit and save — the design stays the same, only the words change.
        For a bullet list, keep one bullet per line; text before the first colon is shown in bold.
      </p>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {saved && (
        <div className="admin-alert" style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' }}>
          Saved.
        </div>
      )}

      {rows.length === 0 ? (
        <p className="admin-empty">No sections found. Run the Phase 2c migration in Supabase first.</p>
      ) : (
        <form className="admin-panel" onSubmit={handleSave}>
          {rows.map((row) => (
            <label className="admin-field" key={row.id} style={{ marginBottom: 20 }}>
              <span>{row.label} <span className="admin-muted">({row.page} page)</span></span>
              <textarea
                className="admin-textarea"
                rows={row.content_type === 'list' ? 6 : 4}
                value={row.value}
                onChange={(e) => handleChange(row.id, e.target.value)}
              />
            </label>
          ))}

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Sections'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

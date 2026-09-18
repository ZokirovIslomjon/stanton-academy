import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useEditMode } from '../lib/EditModeContext';

// Generic click-to-edit wrapper around content already stored in Supabase (page_content,
// site_settings, faqs, ...). `children` is a render function: `(value) => <JSX using value>`.
// Outside Edit Mode this renders exactly `children(value)` and nothing else — same output as
// before this existed — so it can never change what a normal visitor sees.
export default function Editable({ table, match, field, value, multiline = false, onSaved, children }) {
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  if (!editMode) return children(value);

  const startEdit = (e) => {
    e.stopPropagation();
    setDraft(value || '');
    setErr('');
    setEditing(true);
  };

  const save = async () => {
    setSaving(true);
    setErr('');
    let query = supabase.from(table).update({ [field]: draft });
    Object.entries(match).forEach(([key, val]) => {
      query = query.eq(key, val);
    });
    const { error } = await query;
    setSaving(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setEditing(false);
    if (onSaved) onSaved(draft);
  };

  if (editing) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#fffbe6', outline: '2px solid #FFC72C', borderRadius: 8, padding: 10, margin: '4px 0' }}
      >
        {err && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: 6 }}>{err}</div>}
        {multiline ? (
          <textarea
            autoFocus
            rows={4}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{ width: '100%', fontFamily: 'inherit', fontSize: '0.95rem', padding: 8, borderRadius: 6, border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{ width: '100%', fontFamily: 'inherit', fontSize: 'inherit', padding: 8, borderRadius: 6, border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
        )}
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            style={{ background: '#006B3F', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setEditing(false); }}
            style={{ background: '#e5e7eb', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={startEdit} title="Click to edit" style={{ cursor: 'pointer', outline: '2px dashed #FFC72C', outlineOffset: 3, borderRadius: 4 }}>
      {children(value)}
    </div>
  );
}

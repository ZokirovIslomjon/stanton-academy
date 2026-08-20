import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

const emptyForm = { id: null, question: '', answer: '', display_order: 0, is_active: true };

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  async function loadFaqs() {
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await supabase.from('faqs').select('*').order('display_order', { ascending: true });
    if (fetchError) setError(fetchError.message);
    else setFaqs(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadFaqs();
  }, []);

  const openAdd = () => setForm({ ...emptyForm, display_order: faqs.length });
  const openEdit = (faq) => setForm({ ...faq });
  const closeForm = () => setForm(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      display_order: Number(form.display_order) || 0,
      is_active: form.is_active,
    };

    const result = form.id
      ? await supabase.from('faqs').update(payload).eq('id', form.id)
      : await supabase.from('faqs').insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setForm(null);
    loadFaqs();
  };

  const handleDelete = async (faq) => {
    if (!window.confirm('Delete this FAQ?')) return;
    const { error: deleteError } = await supabase.from('faqs').delete().eq('id', faq.id);
    if (deleteError) setError(deleteError.message);
    else loadFaqs();
  };

  const handleToggleActive = async (faq) => {
    const { error: updateError } = await supabase.from('faqs').update({ is_active: !faq.is_active }).eq('id', faq.id);
    if (updateError) setError(updateError.message);
    else loadFaqs();
  };

  if (loading) return <div className="admin-page"><p>Loading FAQs...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">FAQ</h1>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          + Add FAQ
        </button>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {form && (
        <form className="admin-panel" onSubmit={handleSave}>
          <h2 className="admin-section-title">{form.id ? 'Edit FAQ' : 'New FAQ'}</h2>

          <label className="admin-field">
            <span>Question</span>
            <input className="admin-input" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
          </label>

          <label className="admin-field" style={{ marginTop: 12 }}>
            <span>Answer</span>
            <textarea className="admin-textarea" rows={3} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
          </label>

          <div className="admin-form-grid" style={{ marginTop: 12 }}>
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

          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Order</th>
            <th>Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((f) => (
            <tr key={f.id}>
              <td>{f.question}</td>
              <td>{f.display_order}</td>
              <td>
                <button className="admin-badge-toggle" onClick={() => handleToggleActive(f)}>
                  {f.is_active ? 'Active' : 'Hidden'}
                </button>
              </td>
              <td className="admin-table-actions">
                <button className="admin-btn admin-btn-ghost" onClick={() => openEdit(f)}>
                  Edit
                </button>
                <button className="admin-btn admin-btn-danger-text" onClick={() => handleDelete(f)}>
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

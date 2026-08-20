import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

const empty = {
  site_name: '',
  phone: '',
  email: '',
  whatsapp_url: '',
  address: '',
  instagram_url: '',
  facebook_url: '',
  telegram_url: '',
};

export default function AdminSettings() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error: fetchError } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (fetchError) setError(fetchError.message);
      else if (data) setForm(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    const { error: updateError } = await supabase
      .from('site_settings')
      .update({
        site_name: form.site_name,
        phone: form.phone,
        email: form.email,
        whatsapp_url: form.whatsapp_url,
        address: form.address,
        instagram_url: form.instagram_url,
        facebook_url: form.facebook_url,
        telegram_url: form.telegram_url,
      })
      .eq('id', 1);
    setSaving(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  if (loading) return <div className="admin-page"><p>Loading settings...</p></div>;

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Website Settings</h1>
      <p className="admin-empty" style={{ marginBottom: 20 }}>
        Shown in the site footer. Update here instead of editing code.
      </p>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {saved && (
        <div className="admin-alert" style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' }}>
          Saved.
        </div>
      )}

      <form className="admin-panel" onSubmit={handleSave}>
        <div className="admin-form-grid">
          <label className="admin-field">
            <span>Site Name</span>
            <input className="admin-input" value={form.site_name || ''} onChange={(e) => setForm({ ...form, site_name: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Phone</span>
            <input className="admin-input" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Email</span>
            <input className="admin-input" type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>WhatsApp Link</span>
            <input className="admin-input" value={form.whatsapp_url || ''} onChange={(e) => setForm({ ...form, whatsapp_url: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Instagram Link</span>
            <input className="admin-input" value={form.instagram_url || ''} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Facebook Link</span>
            <input className="admin-input" value={form.facebook_url || ''} onChange={(e) => setForm({ ...form, facebook_url: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Telegram Link</span>
            <input className="admin-input" value={form.telegram_url || ''} onChange={(e) => setForm({ ...form, telegram_url: e.target.value })} />
          </label>
        </div>

        <label className="admin-field">
          <span>Address</span>
          <textarea className="admin-textarea" rows={2} value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </label>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

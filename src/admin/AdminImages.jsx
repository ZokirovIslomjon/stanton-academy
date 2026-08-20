import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

export default function AdminImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadingKey, setUploadingKey] = useState(null);
  const inputRefs = useRef({});

  async function loadImages() {
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await supabase.from('site_images').select('*').order('label', { ascending: true });
    if (fetchError) setError(fetchError.message);
    else setImages(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadImages();
  }, []);

  const handleReplace = async (row, file) => {
    if (!file) return;
    setUploadingKey(row.key);
    setError('');

    const safeName = `${Date.now()}-${row.key}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    const { error: uploadError } = await supabase.storage.from('media').upload(safeName, file);
    if (uploadError) {
      setError(uploadError.message);
      setUploadingKey(null);
      return;
    }

    const publicUrl = supabase.storage.from('media').getPublicUrl(safeName).data.publicUrl;
    const { error: updateError } = await supabase.from('site_images').update({ url: publicUrl }).eq('id', row.id);

    setUploadingKey(null);
    if (updateError) setError(updateError.message);
    else loadImages();
  };

  const handleReset = async (row) => {
    if (!window.confirm(`Reset "${row.label}" back to the site's original default image?`)) return;
    const { error: updateError } = await supabase.from('site_images').update({ url: null }).eq('id', row.id);
    if (updateError) setError(updateError.message);
    else loadImages();
  };

  if (loading) return <div className="admin-page"><p>Loading images...</p></div>;

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Images</h1>
      <p className="admin-empty" style={{ marginBottom: 20 }}>
        Every image currently used on the live site, and where. Replace one to swap it everywhere it appears; reset to
        go back to the original.
      </p>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-media-grid">
        {images.map((row) => (
          <div key={row.id} className="admin-media-card">
            {row.url ? (
              <img src={row.url} alt={row.label} className="admin-media-thumb" />
            ) : (
              <div className="admin-media-thumb admin-media-thumb-empty">Using site default</div>
            )}
            <div style={{ padding: '10px 10px 0' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{row.label}</div>
              <div className="admin-muted">{row.location_note}</div>
            </div>
            <div className="admin-media-actions">
              <label className="admin-btn admin-btn-ghost admin-upload-label">
                {uploadingKey === row.key ? 'Uploading...' : 'Replace'}
                <input
                  ref={(el) => (inputRefs.current[row.key] = el)}
                  type="file"
                  accept="image/*"
                  className="admin-upload-input"
                  disabled={uploadingKey === row.key}
                  onChange={(e) => handleReplace(row, e.target.files?.[0])}
                />
              </label>
              {row.url && (
                <button className="admin-btn admin-btn-danger-text" onClick={() => handleReset(row)}>
                  Reset
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

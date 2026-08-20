import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

export default function AdminMedia() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  async function loadFiles() {
    setLoading(true);
    setError('');
    const { data, error: listError } = await supabase.storage.from('media').list('', {
      sortBy: { column: 'created_at', order: 'desc' },
    });
    if (listError) {
      setError(listError.message);
    } else {
      setFiles((data || []).filter((f) => f.name !== '.emptyFolderPlaceholder'));
    }
    setLoading(false);
  }

  useEffect(() => {
    loadFiles();
  }, []);

  const publicUrl = (name) => supabase.storage.from('media').getPublicUrl(name).data.publicUrl;

  const handleUpload = async (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    setUploading(true);
    setError('');

    for (const file of selected) {
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
      const { error: uploadError } = await supabase.storage.from('media').upload(safeName, file);
      if (uploadError) setError(uploadError.message);
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
    loadFiles();
  };

  const handleDelete = async (name) => {
    if (!window.confirm('Delete this file? Any pages/courses referencing its URL will break.')) return;
    const { error: deleteError } = await supabase.storage.from('media').remove([name]);
    if (deleteError) setError(deleteError.message);
    else loadFiles();
  };

  const handleCopy = async (name) => {
    const url = publicUrl(name);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('Copy this URL:', url);
    }
  };

  if (loading) return <div className="admin-page"><p>Loading media...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Media Library</h1>
        <label className="admin-btn admin-btn-primary admin-upload-label">
          {uploading ? 'Uploading...' : '+ Upload Images'}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="admin-upload-input"
          />
        </label>
      </div>

      <p className="admin-empty" style={{ marginBottom: 20 }}>
        Upload images here, then copy the URL into a course, page block, or anywhere else that takes an image link.
      </p>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {files.length === 0 ? (
        <p className="admin-empty">No images uploaded yet.</p>
      ) : (
        <div className="admin-media-grid">
          {files.map((f) => (
            <div key={f.name} className="admin-media-card">
              <img src={publicUrl(f.name)} alt={f.name} className="admin-media-thumb" />
              <div className="admin-media-actions">
                <button className="admin-btn admin-btn-ghost" onClick={() => handleCopy(f.name)}>
                  Copy URL
                </button>
                <button className="admin-btn admin-btn-danger-text" onClick={() => handleDelete(f.name)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

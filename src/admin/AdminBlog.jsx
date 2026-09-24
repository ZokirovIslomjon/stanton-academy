import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

const emptyForm = {
  id: null,
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  cover_image_url: '',
  display_order: 0,
  is_published: true,
};

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingRow, setUploadingRow] = useState(false);
  const coverInputRef = useRef(null);
  const rowInputRef = useRef(null);

  // Same upload pattern as AdminMedia.jsx: store in the 'media' bucket under a
  // timestamped, sanitized filename, then return its public URL.
  async function uploadToMedia(file) {
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    const { error: uploadError } = await supabase.storage.from('media').upload(safeName, file);
    if (uploadError) throw uploadError;
    return supabase.storage.from('media').getPublicUrl(safeName).data.publicUrl;
  }

  const handleUploadCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setError('');
    try {
      const url = await uploadToMedia(file);
      setForm((f) => ({ ...f, cover_image_url: url }));
    } catch (err) {
      setError(err.message);
    }
    setUploadingCover(false);
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  // Uploads 1-3 photos and appends them to the body as one "[[img]]url|url|url"
  // line, which BlogPostPage.jsx's renderBody() turns into a side-by-side row —
  // the same layout used on the "Why Study English in Malaysia" article.
  const handleInsertImageRow = async (e) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    if (files.length === 0) return;
    setUploadingRow(true);
    setError('');
    try {
      const urls = [];
      for (const file of files) {
        urls.push(await uploadToMedia(file));
      }
      const line = `[[img]]${urls.join('|')}`;
      setForm((f) => ({ ...f, body: f.body ? `${f.body}\n${line}` : line }));
    } catch (err) {
      setError(err.message);
    }
    setUploadingRow(false);
    if (rowInputRef.current) rowInputRef.current.value = '';
  };

  async function loadPosts() {
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('display_order', { ascending: true });
    if (fetchError) setError(fetchError.message);
    else setPosts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const openAdd = () => setForm({ ...emptyForm, display_order: posts.length });
  // Nullable DB fields (excerpt, body, cover_image_url can all be null) must be
  // normalized to '' here — otherwise handleSave's `.trim()` calls throw on a
  // null value, which happens before setSaving(false) runs, leaving the Save
  // button stuck on "Saving..." forever. Same pattern as AdminCourses.jsx.
  const openEdit = (post) =>
    setForm({
      ...post,
      excerpt: post.excerpt ?? '',
      body: post.body ?? '',
      cover_image_url: post.cover_image_url ?? '',
    });
  const closeForm = () => setForm(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const slug = form.slug.trim() || slugify(form.title);

    const payload = {
      title: form.title.trim(),
      slug,
      excerpt: form.excerpt.trim() || null,
      body: form.body.trim(),
      cover_image_url: form.cover_image_url.trim() || null,
      display_order: Number(form.display_order) || 0,
      is_published: form.is_published,
    };

    const result = form.id
      ? await supabase.from('blog_posts').update(payload).eq('id', form.id)
      : await supabase.from('blog_posts').insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setForm(null);
    loadPosts();
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', post.id);
    if (deleteError) setError(deleteError.message);
    else loadPosts();
  };

  const handleTogglePublished = async (post) => {
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ is_published: !post.is_published })
      .eq('id', post.id);
    if (updateError) setError(updateError.message);
    else loadPosts();
  };

  if (loading) return <div className="admin-page"><p>Loading blog posts...</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Blog</h1>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          + Add Article
        </button>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      {form && (
        <form className="admin-panel" onSubmit={handleSave}>
          <h2 className="admin-section-title">{form.id ? 'Edit Article' : 'New Article'}</h2>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Title</span>
              <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </label>

            <label className="admin-field">
              <span>Slug (leave blank to auto-generate from title)</span>
              <input className="admin-input" placeholder="why-learn-english-in-malaysia" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </label>

            <div className="admin-field">
              <span>Cover Image URL</span>
              <input className="admin-input" value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} />
              <label className="admin-btn admin-btn-ghost admin-upload-label" style={{ marginTop: 8, display: 'inline-block' }}>
                {uploadingCover ? 'Uploading...' : '+ Upload Cover Image'}
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUploadCover}
                  disabled={uploadingCover}
                  className="admin-upload-input"
                />
              </label>
            </div>

            <label className="admin-field">
              <span>Display Order</span>
              <input className="admin-input" type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} />
            </label>

            <label className="admin-field admin-field-checkbox">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
              <span>Visible on website</span>
            </label>
          </div>

          <label className="admin-field" style={{ marginTop: 12 }}>
            <span>Excerpt (short summary shown on cards)</span>
            <textarea className="admin-textarea" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </label>

          <div className="admin-field" style={{ marginTop: 12 }}>
            <span>Body — one paragraph per line. Start a line with "## " for a heading (e.g. "## Discover Kuala Lumpur"). Use "+ Add Image Row" below to insert photos.</span>
            <textarea className="admin-textarea" rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
            <label className="admin-btn admin-btn-ghost admin-upload-label" style={{ marginTop: 8, display: 'inline-block' }}>
              {uploadingRow ? 'Uploading...' : '+ Add Image Row (1–3 photos)'}
              <input
                ref={rowInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleInsertImageRow}
                disabled={uploadingRow}
                className="admin-upload-input"
              />
            </label>
          </div>

          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Published</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.slug}</td>
              <td>
                <button className="admin-badge-toggle" onClick={() => handleTogglePublished(p)}>
                  {p.is_published ? 'Published' : 'Hidden'}
                </button>
              </td>
              <td className="admin-table-actions">
                <button className="admin-btn admin-btn-ghost" onClick={() => openEdit(p)}>
                  Edit
                </button>
                <button className="admin-btn admin-btn-danger-text" onClick={() => handleDelete(p)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={4} className="admin-empty">No articles yet. Add one above.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
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
  const openEdit = (post) => setForm({ ...post });
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

            <label className="admin-field">
              <span>Cover Image URL</span>
              <input className="admin-input" value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} />
            </label>

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

          <label className="admin-field" style={{ marginTop: 12 }}>
            <span>Body (full article text — leave a blank line between paragraphs)</span>
            <textarea className="admin-textarea" rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
          </label>

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

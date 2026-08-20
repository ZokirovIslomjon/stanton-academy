import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './admin.css';

const BLOCK_TYPES = ['heading', 'text', 'image', 'cta', 'spacer'];

const defaultContent = {
  heading: { text: '', level: 'h2' },
  text: { text: '' },
  image: { url: '', alt: '' },
  cta: { text: '', link: '' },
  spacer: { height: 40 },
};

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [newPage, setNewPage] = useState({ slug: '', title: '' });
  const [creating, setCreating] = useState(false);

  const [blocks, setBlocks] = useState([]);
  const [blocksLoading, setBlocksLoading] = useState(false);

  async function loadPages() {
    setLoading(true);
    setError('');
    const { data, error: fetchError } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
    if (fetchError) setError(fetchError.message);
    else setPages(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadPages();
  }, []);

  async function loadBlocks(pageId) {
    setBlocksLoading(true);
    const { data, error: fetchError } = await supabase
      .from('page_blocks')
      .select('*')
      .eq('page_id', pageId)
      .order('display_order', { ascending: true });
    if (fetchError) setError(fetchError.message);
    else setBlocks(data || []);
    setBlocksLoading(false);
  }

  const selectPage = (page) => {
    setSelectedPageId(page.id);
    loadBlocks(page.id);
  };

  const handleCreatePage = async (e) => {
    e.preventDefault();
    if (!newPage.slug.trim() || !newPage.title.trim()) return;
    setCreating(true);
    setError('');
    const { data, error: insertError } = await supabase
      .from('pages')
      .insert({ slug: newPage.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'), title: newPage.title.trim() })
      .select()
      .single();
    setCreating(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setNewPage({ slug: '', title: '' });
    await loadPages();
    if (data) selectPage(data);
  };

  const handleDeletePage = async (page) => {
    if (!window.confirm(`Delete page "${page.title}" and all its blocks? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from('pages').delete().eq('id', page.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    if (selectedPageId === page.id) {
      setSelectedPageId(null);
      setBlocks([]);
    }
    loadPages();
  };

  const handleTogglePageActive = async (page) => {
    const { error: updateError } = await supabase.from('pages').update({ is_active: !page.is_active }).eq('id', page.id);
    if (updateError) setError(updateError.message);
    else loadPages();
  };

  const handleAddBlock = async (blockType) => {
    if (!selectedPageId) return;
    const { error: insertError } = await supabase.from('page_blocks').insert({
      page_id: selectedPageId,
      block_type: blockType,
      content: defaultContent[blockType],
      display_order: blocks.length,
    });
    if (insertError) setError(insertError.message);
    else loadBlocks(selectedPageId);
  };

  const handleUpdateBlockContent = (blockId, content) => {
    setBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, content } : b)));
  };

  const handleSaveBlock = async (block) => {
    const { error: updateError } = await supabase.from('page_blocks').update({ content: block.content }).eq('id', block.id);
    if (updateError) setError(updateError.message);
  };

  const handleDeleteBlock = async (block) => {
    if (!window.confirm('Delete this block?')) return;
    const { error: deleteError } = await supabase.from('page_blocks').delete().eq('id', block.id);
    if (deleteError) setError(deleteError.message);
    else loadBlocks(selectedPageId);
  };

  const handleMoveBlock = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const a = blocks[index];
    const b = blocks[targetIndex];
    const [r1, r2] = await Promise.all([
      supabase.from('page_blocks').update({ display_order: b.display_order }).eq('id', a.id),
      supabase.from('page_blocks').update({ display_order: a.display_order }).eq('id', b.id),
    ]);
    if (r1.error || r2.error) setError((r1.error || r2.error).message);
    loadBlocks(selectedPageId);
  };

  const selectedPage = pages.find((p) => p.id === selectedPageId);

  if (loading) return <div className="admin-page"><p>Loading pages...</p></div>;

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Pages</h1>
      <p className="admin-empty" style={{ marginBottom: 20 }}>
        Build new pages from content blocks. Published pages are live at <code>/p/&lt;slug&gt;</code>. This does not
        affect the existing About / Contact / Location / Holiday Camp pages.
      </p>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form className="admin-inline-form" onSubmit={handleCreatePage}>
        <input
          className="admin-input"
          placeholder="Page title"
          value={newPage.title}
          onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
          required
        />
        <input
          className="admin-input"
          placeholder="URL slug (e.g. promo)"
          value={newPage.slug}
          onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
          required
        />
        <button className="admin-btn admin-btn-primary" type="submit" disabled={creating}>
          {creating ? 'Creating...' : '+ New Page'}
        </button>
      </form>

      <table className="admin-table" style={{ marginBottom: 24 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id} style={selectedPageId === p.id ? { background: '#f4f9f6' } : undefined}>
              <td>{p.title}</td>
              <td>/p/{p.slug}</td>
              <td>
                <button className="admin-badge-toggle" onClick={() => handleTogglePageActive(p)}>
                  {p.is_active ? 'Active' : 'Hidden'}
                </button>
              </td>
              <td className="admin-table-actions">
                <button className="admin-btn admin-btn-ghost" onClick={() => selectPage(p)}>
                  Manage Blocks
                </button>
                <button className="admin-btn admin-btn-danger-text" onClick={() => handleDeletePage(p)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {pages.length === 0 && (
            <tr>
              <td colSpan={4} className="admin-empty">
                No pages yet. Create one above.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedPage && (
        <div className="admin-panel">
          <h2 className="admin-section-title">Blocks for &quot;{selectedPage.title}&quot;</h2>

          {blocksLoading ? (
            <p>Loading blocks...</p>
          ) : (
            <>
              {blocks.length === 0 && <p className="admin-empty">No blocks yet. Add one below.</p>}

              {blocks.map((block, index) => (
                <div key={block.id} className="admin-block-editor">
                  <div className="admin-block-editor-header">
                    <span className="admin-badge">{block.block_type}</span>
                    <div className="admin-block-editor-controls">
                      <button type="button" className="admin-btn admin-btn-ghost" onClick={() => handleMoveBlock(index, -1)} disabled={index === 0}>
                        ↑
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-ghost"
                        onClick={() => handleMoveBlock(index, 1)}
                        disabled={index === blocks.length - 1}
                      >
                        ↓
                      </button>
                      <button type="button" className="admin-btn admin-btn-danger-text" onClick={() => handleDeleteBlock(block)}>
                        Delete
                      </button>
                    </div>
                  </div>

                  <BlockFields block={block} onChange={(content) => handleUpdateBlockContent(block.id, content)} />

                  <div className="admin-form-actions">
                    <button type="button" className="admin-btn admin-btn-primary" onClick={() => handleSaveBlock(block)}>
                      Save Block
                    </button>
                  </div>
                </div>
              ))}

              <div className="admin-add-block-row">
                <span>Add block:</span>
                {BLOCK_TYPES.map((t) => (
                  <button key={t} type="button" className="admin-btn admin-btn-ghost" onClick={() => handleAddBlock(t)}>
                    + {t}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function BlockFields({ block, onChange }) {
  const content = block.content || {};

  if (block.block_type === 'heading') {
    return (
      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Text</span>
          <input className="admin-input" value={content.text || ''} onChange={(e) => onChange({ ...content, text: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Size</span>
          <select className="admin-select" value={content.level || 'h2'} onChange={(e) => onChange({ ...content, level: e.target.value })}>
            <option value="h1">Large (H1)</option>
            <option value="h2">Medium (H2)</option>
            <option value="h3">Small (H3)</option>
          </select>
        </label>
      </div>
    );
  }

  if (block.block_type === 'text') {
    return (
      <label className="admin-field">
        <span>Paragraph</span>
        <textarea className="admin-textarea" rows={3} value={content.text || ''} onChange={(e) => onChange({ ...content, text: e.target.value })} />
      </label>
    );
  }

  if (block.block_type === 'image') {
    return (
      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Image URL (upload in Media Library, then paste the URL here)</span>
          <input className="admin-input" value={content.url || ''} onChange={(e) => onChange({ ...content, url: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Alt Text</span>
          <input className="admin-input" value={content.alt || ''} onChange={(e) => onChange({ ...content, alt: e.target.value })} />
        </label>
      </div>
    );
  }

  if (block.block_type === 'cta') {
    return (
      <div className="admin-form-grid">
        <label className="admin-field">
          <span>Button Text</span>
          <input className="admin-input" value={content.text || ''} onChange={(e) => onChange({ ...content, text: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Link (e.g. /signup)</span>
          <input className="admin-input" value={content.link || ''} onChange={(e) => onChange({ ...content, link: e.target.value })} />
        </label>
      </div>
    );
  }

  if (block.block_type === 'spacer') {
    return (
      <label className="admin-field">
        <span>Height (px)</span>
        <input
          className="admin-input"
          type="number"
          value={content.height ?? 40}
          onChange={(e) => onChange({ ...content, height: Number(e.target.value) })}
        />
      </label>
    );
  }

  return null;
}

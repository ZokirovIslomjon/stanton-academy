import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function PublicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setNotFound(false);

      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (cancelled) return;

      if (pageError || !pageData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPage(pageData);

      const { data: blockData, error: blockError } = await supabase
        .from('page_blocks')
        .select('*')
        .eq('page_id', pageData.id)
        .order('display_order', { ascending: true });

      if (cancelled) return;
      if (blockError) console.error('Failed to load blocks:', blockError.message);
      setBlocks(blockData || []);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <main style={{ padding: '160px 20px 80px', textAlign: 'center' }}>Loading...</main>;
  }

  if (notFound) {
    return (
      <main style={{ padding: '160px 20px 80px', textAlign: 'center' }}>
        <h1>Page not found</h1>
        <p>
          <Link to="/">Back to homepage</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: '160px 20px 80px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {page && <h1 style={{ display: 'none' }}>{page.title}</h1>}
        {blocks.map((block) => (
          <PageBlock key={block.id} block={block} />
        ))}
      </div>
    </main>
  );
}

const HEADING_SIZES = { h1: '2.5rem', h2: '2rem', h3: '1.5rem' };

function PageBlock({ block }) {
  const content = block.content || {};

  switch (block.block_type) {
    case 'heading': {
      const Tag = content.level || 'h2';
      return (
        <Tag
          style={{
            margin: '0 0 16px',
            fontWeight: 800,
            color: 'var(--primary-green)',
            fontSize: HEADING_SIZES[Tag] || HEADING_SIZES.h2,
          }}
        >
          {content.text}
        </Tag>
      );
    }
    case 'text':
      return <p style={{ lineHeight: 1.7, color: 'var(--light-text)', marginBottom: 16 }}>{content.text}</p>;
    case 'image':
      return content.url ? (
        <img
          src={content.url}
          alt={content.alt || ''}
          style={{ width: '100%', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', marginBottom: 16 }}
        />
      ) : null;
    case 'cta':
      return content.text ? (
        <Link to={content.link || '/signup'} className="btn btn-primary" style={{ marginBottom: 16 }}>
          {content.text}
        </Link>
      ) : null;
    case 'spacer':
      return <div style={{ height: content.height ?? 40 }} />;
    default:
      return null;
  }
}

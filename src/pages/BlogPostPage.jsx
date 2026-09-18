import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      setLoading(true);
      setNotFound(false);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        console.error('Failed to load blog post:', error.message);
      }
      if (!data) setNotFound(true);
      else setPost(data);
      setLoading(false);
    }

    loadPost();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="blog-post-page">
      <style>{`
        .blog-post-page { padding: 160px 0 80px; min-height: 60vh; }
        .blog-post-back { display: inline-block; margin-bottom: 24px; font-weight: 600; color: var(--primary-green); }
        .blog-post-content { max-width: 760px; margin: 0 auto; }
        .blog-post-title { font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800; color: var(--dark-text); line-height: 1.3; margin-bottom: 24px; }
        .blog-post-img { width: 100%; max-height: 420px; object-fit: cover; border-radius: var(--radius); box-shadow: var(--shadow); margin-bottom: 32px; }
        .blog-post-body { font-size: 1.05rem; line-height: 1.8; color: var(--dark-text); }
        .blog-post-body p { margin-bottom: 20px; }
      `}</style>

      <div className="container">
        <div className="blog-post-content">
          <Link to="/blog" className="blog-post-back">← Back to Blog</Link>

          {loading ? (
            <p>Loading article...</p>
          ) : notFound ? (
            <p>Article not found. <Link to="/blog">Return to the blog.</Link></p>
          ) : (
            <>
              <h1 className="blog-post-title">{post.title}</h1>
              {post.cover_image_url && <img src={post.cover_image_url} alt={post.title} className="blog-post-img" />}
              <div className="blog-post-body">
                {(post.body || '').split('\n').filter((p) => p.trim()).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;

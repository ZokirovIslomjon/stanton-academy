import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .limit(4);

      if (cancelled) return;
      if (error) {
        console.error('Failed to load blog posts:', error.message);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && posts.length === 0) return null;

  // With exactly 4 posts, lay them out like the reference: one plain card, one
  // bold highlighted card, and two smaller cards stacked in the third column.
  const featured = posts.length === 4;

  return (
    <section className="blog-section">
      <style>{`
        .blog-section { padding: 80px 0; background-color: #ffffff; }
        .blog-section-header { display: flex; justify-content: flex-end; align-items: flex-end; margin-bottom: 40px; gap: 20px; flex-wrap: wrap; }
        .blog-view-all { font-weight: 700; color: var(--primary-green); white-space: nowrap; }
        .blog-view-all:hover { text-decoration: underline; }

        .blog-card { display: flex; flex-direction: column; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); transition: transform 0.3s ease; background: #fff; }
        .blog-card:hover { transform: translateY(-6px); }
        .blog-card-img { width: 100%; height: 150px; object-fit: cover; background-color: var(--bg-light); }
        .blog-card-body { padding: 26px; display: flex; flex-direction: column; flex: 1; }
        .blog-card-tag { display: inline-block; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--primary-green); margin-bottom: 14px; }
        .blog-card-title { font-size: 1.3rem; font-weight: 800; color: var(--dark-text); margin-bottom: 12px; line-height: 1.35; }
        .blog-card-excerpt { font-size: 0.92rem; color: var(--light-text); line-height: 1.6; margin-bottom: 16px; flex: 1; }
        .blog-card-link { font-weight: 700; color: var(--primary-green); font-size: 0.9rem; }
        .blog-card-link:hover { text-decoration: underline; }

        /* Simple grid (used when there isn't exactly 4 posts) */
        .blog-grid-simple { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .blog-grid-simple .blog-card { min-height: 280px; }

        /* Featured grid: plain card, bold card, two stacked cards */
        .blog-grid-featured { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: stretch; }
        .blog-card--light { background: var(--bg-light); min-height: 320px; }
        .blog-card--bold { background: linear-gradient(135deg, var(--primary-green), #00351f); min-height: 320px; }
        .blog-card--bold .blog-card-tag { color: var(--primary-gold); }
        .blog-card--bold .blog-card-title { color: #fff; }
        .blog-card--bold .blog-card-excerpt { color: rgba(255, 255, 255, 0.85); }
        .blog-card--bold .blog-card-link { color: var(--primary-gold); }

        .blog-card-stack { display: flex; flex-direction: column; gap: 24px; }
        .blog-card--dark { background: #14241c; flex: 1; }
        .blog-card--dark .blog-card-body { padding: 20px; }
        .blog-card--dark .blog-card-tag { color: var(--primary-gold); }
        .blog-card--dark .blog-card-title { color: #fff; font-size: 1.05rem; margin-bottom: 0; }
        .blog-card--dark .blog-card-img { height: 110px; }

        @media (max-width: 900px) {
          .blog-grid-simple { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
          .blog-grid-featured { grid-template-columns: 1fr; }
          .blog-card-stack { flex-direction: row; }
        }
        @media (max-width: 600px) {
          .blog-card-stack { flex-direction: column; }
        }
      `}</style>

      <div className="container">
        <div className="blog-section-header">
          <Link to="/blog" className="blog-view-all">View All Articles →</Link>
        </div>

        {loading ? (
          <p>Loading articles...</p>
        ) : featured ? (
          <div className="blog-grid-featured">
            <BlogCard post={posts[0]} variant="light" />
            <BlogCard post={posts[1]} variant="bold" />
            <div className="blog-card-stack">
              <BlogCard post={posts[2]} variant="dark" />
              <BlogCard post={posts[3]} variant="dark" />
            </div>
          </div>
        ) : (
          <div className="blog-grid-simple">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} variant="light" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

function BlogCard({ post, variant }) {
  return (
    <Link to={`/blog/${post.slug}`} className={`blog-card blog-card--${variant}`}>
      {post.cover_image_url && <img src={post.cover_image_url} alt={post.title} className="blog-card-img" />}
      <div className="blog-card-body">
        <span className="blog-card-tag">News</span>
        <h3 className="blog-card-title">{post.title}</h3>
        {variant !== 'dark' && <p className="blog-card-excerpt">{post.excerpt}</p>}
        <span className="blog-card-link">{variant === 'dark' ? 'Read' : 'Read More →'}</span>
      </div>
    </Link>
  );
}

export default BlogSection;

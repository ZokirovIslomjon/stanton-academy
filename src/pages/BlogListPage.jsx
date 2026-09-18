import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (cancelled) return;
      if (error) console.error('Failed to load blog posts:', error.message);
      else setPosts(data || []);
      setLoading(false);
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="blog-list-page">
      <style>{`
        .blog-list-page { padding: 160px 0 80px; min-height: 60vh; }
        .blog-list-header { text-align: center; margin-bottom: 50px; }
        .blog-list-header h1 { font-size: 2.5rem; font-weight: 800; color: var(--primary-green); margin-bottom: 12px; }
        .blog-list-header h1 span { color: var(--primary-gold); }
        .blog-list-header p { color: var(--light-text); font-size: 1.05rem; }

        .blog-list-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .blog-list-card { display: flex; flex-direction: column; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); background: #fff; transition: transform 0.3s ease; }
        .blog-list-card:hover { transform: translateY(-6px); }
        .blog-list-card-img { width: 100%; height: 190px; object-fit: cover; background-color: var(--bg-light); }
        .blog-list-card-body { padding: 22px; display: flex; flex-direction: column; flex: 1; }
        .blog-list-card-title { font-size: 1.2rem; font-weight: 700; color: var(--dark-text); margin-bottom: 12px; line-height: 1.4; }
        .blog-list-card-excerpt { font-size: 0.95rem; color: var(--light-text); line-height: 1.6; margin-bottom: 18px; flex: 1; }
        .blog-list-card-link { font-weight: 700; color: var(--primary-green); font-size: 0.9rem; }
      `}</style>

      <div className="container">
        <div className="blog-list-header">
          <h1>News &amp; <span>Blog</span></h1>
          <p>Insights on language learning, exam prep, and life in Malaysia.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading articles...</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No articles yet — check back soon.</p>
        ) : (
          <div className="blog-list-grid">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-list-card">
                {post.cover_image_url && <img src={post.cover_image_url} alt={post.title} className="blog-list-card-img" />}
                <div className="blog-list-card-body">
                  <h2 className="blog-list-card-title">{post.title}</h2>
                  <p className="blog-list-card-excerpt">{post.excerpt}</p>
                  <span className="blog-list-card-link">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogListPage;

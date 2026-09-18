import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../lib/LanguageContext';

// Picks the field in the current language, falling back to the English (base) field
// when a translation is missing or blank.
function localized(obj, field, lang) {
  if (lang === 'en') return obj[field];
  return obj[`${field}_${lang}`] || obj[field];
}

const BlogListPage = () => {
  const { t, lang } = useLanguage();
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
          <h1>{t('blogPage.heading')}<span>{t('blogPage.headingHighlight')}</span></h1>
          <p>{t('blogPage.subheading')}</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>{t('blog.loading')}</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: 'center' }}>{t('blogPage.empty')}</p>
        ) : (
          <div className="blog-list-grid">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-list-card">
                {post.cover_image_url && <img src={post.cover_image_url} alt={localized(post, 'title', lang)} className="blog-list-card-img" />}
                <div className="blog-list-card-body">
                  <h2 className="blog-list-card-title">{localized(post, 'title', lang)}</h2>
                  <p className="blog-list-card-excerpt">{localized(post, 'excerpt', lang)}</p>
                  <span className="blog-list-card-link">{t('blog.readMore')}</span>
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

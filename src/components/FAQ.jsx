import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFaqs() {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (cancelled) return;
      if (error) {
        console.error('Failed to load FAQs:', error.message);
      } else {
        setFaqs(data || []);
      }
      setLoading(false);
    }

    loadFaqs();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || faqs.length === 0) return null;

  return (
    <section className="faq-section" id="faq">
      <style>{`
        .faq-section { padding: 80px 20px; background: #f9fdfb; }
        .faq-section .section-header { text-align: center; margin-bottom: 40px; }
        .faq-section .section-header h2 { font-size: 2.2rem; font-weight: 800; }
        .faq-section .section-header span { color: #006B3F; }
        .faq-list { max-width: 780px; margin: 0 auto; }
        .faq-item { background: #ffffff; border: 1px solid #eef2f0; border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
        .faq-question { width: 100%; text-align: left; background: none; border: none; padding: 18px 22px; font-size: 1rem; font-weight: 700; color: #1a1a1a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-family: inherit; }
        .faq-answer { padding: 0 22px 18px; color: #4b5563; line-height: 1.6; }
        .faq-icon { flex-shrink: 0; transition: transform 0.2s; color: #006B3F; font-size: 1.2rem; }
        .faq-icon.open { transform: rotate(45deg); }
      `}</style>
      <div className="container">
        <div className="section-header">
          <h2>
            Frequently Asked <span>Questions</span>
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div className="faq-item" key={faq.id}>
                <button className="faq-question" onClick={() => setOpenId(isOpen ? null : faq.id)}>
                  {faq.question}
                  <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
                </button>
                {isOpen && <div className="faq-answer">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../lib/LanguageContext';

// Fee box for course detail pages. Tuition for locals and international students
// comes from the `courses` row (price / price_international / price_currency,
// editable in the admin dashboard) unless `override` ({ local, international })
// is passed — used by the General English page, which has a different fee per
// duration tab. The extra fees and notes are the same for every course and live
// in translations.js under `courseFees`. Renders nothing if no active course
// matches `slug`, so it is safe to drop onto any page.
export default function CourseFees({ slug, override }) {
  const { t } = useLanguage();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase
        .from('courses')
        .select('price, price_international, price_currency')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (cancelled) return;
      if (error) console.error('Failed to load course fee:', error.message);
      setCourse(data || null);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!course) return null;

  const local = override ? override.local : course.price;
  const international = override ? override.international : (course.price_international ?? course.price);
  const currency = course.price_currency || 'RM';
  const amount = (n) => Number(n).toLocaleString('en-MY');
  const tuition = (n) => `${t('courseFees.fromPrefix')}${currency} ${amount(n)}${t('courseFees.fromSuffix')}`;
  const extras = t('courseFees.extras');

  return (
    <div className="course-fees">
      <style>{`
        .course-fees { margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid #FFC72C; }
        .course-fees-main { display: flex; flex-direction: column; gap: 10px; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid #f0f0f0; }
        .course-fees-tuition { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
        .course-fees-main-label { font-size: 0.85rem; color: #888; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; }
        .course-fees-main-price { font-size: 1.4rem; font-weight: 800; color: #006B3F; white-space: nowrap; }
        .course-fees-row { display: flex; justify-content: space-between; gap: 16px; padding: 6px 0; font-size: 0.95rem; color: #444; }
        .course-fees-row strong { color: #111; white-space: nowrap; }
        .course-fees-notes { list-style: none; padding: 0; margin: 14px 0 0; font-size: 0.85rem; color: #666; line-height: 1.6; }
        .course-fees-notes li { margin-bottom: 4px; }
      `}</style>

      <div className="course-fees-main">
        {local != null && (
          <div className="course-fees-tuition">
            <span className="course-fees-main-label">{t('courseFees.tuitionLocals')}</span>
            <span className="course-fees-main-price">{tuition(local)}</span>
          </div>
        )}
        {international != null && (
          <div className="course-fees-tuition">
            <span className="course-fees-main-label">{t('courseFees.tuitionInternational')}</span>
            <span className="course-fees-main-price">{tuition(international)}</span>
          </div>
        )}
      </div>

      {extras.map((item, i) => (
        <div key={i} className="course-fees-row">
          <span>{item.label}</span>
          <strong>RM {amount(item.amount)}{item.asterisk ? '*' : ''}</strong>
        </div>
      ))}

      <ul className="course-fees-notes">
        {t('courseFees.notes').map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { translations, LANGUAGES } from '../locales/translations';

const LanguageContext = createContext(null);

const RTL_LANGS = ['ar'];
export const SUPPORTED_LANGS = LANGUAGES.map((l) => l.code);

// Last language the visitor used. Only consulted to pick where a URL with no
// language prefix (e.g. "/" or an old "/courses" link) should send them.
export function getPreferredLang() {
  try {
    const stored = localStorage.getItem('sa_lang');
    return SUPPORTED_LANGS.includes(stored) ? stored : 'en';
  } catch {
    return 'en';
  }
}

// The language is owned by the URL: /en/..., /ru/..., /ar/..., /zh/...
export function LanguageProvider({ children }) {
  const { lang: urlLang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const lang = SUPPORTED_LANGS.includes(urlLang) ? urlLang : 'en';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('sa_lang', lang);
    } catch {
      /* storage unavailable — the URL still carries the language */
    }
  }, [lang]);

  // Switching language swaps the prefix and keeps the rest of the URL, so
  // /en/course/ielts becomes /ru/course/ielts.
  const setLang = (next) => {
    if (next === lang) return;
    const rest = location.pathname.slice(lang.length + 1);
    navigate(`/${next}${rest}${location.search}${location.hash}`);
  };

  const t = (key) => {
    const parts = key.split('.');
    let node = translations[lang];
    for (const p of parts) node = node?.[p];
    if (node !== undefined) return node;
    let fallback = translations.en;
    for (const p of parts) fallback = fallback?.[p];
    return fallback ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

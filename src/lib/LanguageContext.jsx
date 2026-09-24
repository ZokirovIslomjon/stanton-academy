import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext(null);

const RTL_LANGS = ['ar'];
const SUPPORTED_LANGS = ['en', 'zh'];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem('sa_lang');
    // Arabic was removed from the language switcher; fall back to English for
    // any returning visitor whose browser still has 'ar' saved, so they aren't
    // stuck on a language with no way to switch out of it.
    return SUPPORTED_LANGS.includes(stored) ? stored : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (next) => {
    localStorage.setItem('sa_lang', next);
    setLangState(next);
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

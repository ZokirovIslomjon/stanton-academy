import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext(null);

const RTL_LANGS = ['ar'];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('sa_lang') || 'en');

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

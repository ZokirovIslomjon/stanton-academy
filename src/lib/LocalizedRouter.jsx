import React from 'react';
import { Link as RouterLink, Navigate as RouterNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

// Public pages live under /:lang (en, ru, ar, zh). These drop-in replacements for
// react-router's Link/Navigate prefix absolute internal paths with the current
// language, so call sites keep writing to="/courses". Anything else (external URLs,
// "#anchors", relative paths, already-prefixed paths) passes through untouched.
const LANG_PREFIX = /^\/(en|ru|ar|zh)(\/|$|\?|#)/;

export function localizePath(to, lang) {
  if (typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//') || LANG_PREFIX.test(to)) return to;
  return to === '/' ? `/${lang}` : `/${lang}${to}`;
}

export function Link({ to, ...props }) {
  const { lang } = useLanguage();
  return <RouterLink to={localizePath(to, lang)} {...props} />;
}

export function Navigate({ to, ...props }) {
  const { lang } = useLanguage();
  return <RouterNavigate to={localizePath(to, lang)} {...props} />;
}

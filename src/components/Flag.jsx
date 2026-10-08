import React from 'react';

// Small inline-SVG flags for the language switcher, keyed by language code.
// Drawn as SVG (not flag emoji) because Windows browsers don't render flag emoji.
// Each flag is based on the language's main country: English → UK, 中文 → China,
// العربية → UAE, Русский → Russia.
const FLAGS = {
  en: (
    <>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30,0 V30 M0,15 H60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </>
  ),
  zh: (
    <>
      <rect width="60" height="30" fill="#DE2910" />
      <polygon
        transform="scale(2)"
        fill="#FFDE00"
        points="5.00,2.00 5.71,4.03 7.85,4.07 6.14,5.37 6.76,7.43 5.00,6.20 3.24,7.43 3.86,5.37 2.15,4.07 4.29,4.03"
      />
    </>
  ),
  ar: (
    <>
      <rect width="60" height="10" fill="#00732F" />
      <rect y="10" width="60" height="10" fill="#ffffff" />
      <rect y="20" width="60" height="10" fill="#000000" />
      <rect width="15" height="30" fill="#FF0000" />
    </>
  ),
  ru: (
    <>
      <rect width="60" height="10" fill="#ffffff" />
      <rect y="10" width="60" height="10" fill="#0039A6" />
      <rect y="20" width="60" height="10" fill="#D52B1E" />
    </>
  ),
};

export default function Flag({ code }) {
  if (!FLAGS[code]) return null;
  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 60 30"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ flexShrink: 0, borderRadius: 2, boxShadow: '0 0 0 1px rgba(0,0,0,0.15)' }}
    >
      {FLAGS[code]}
    </svg>
  );
}

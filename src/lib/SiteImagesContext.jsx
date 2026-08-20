import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const SiteImagesContext = createContext({});

export function SiteImagesProvider({ children }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase.from('site_images').select('key, url');
      if (cancelled) return;
      if (error) {
        console.error('Failed to load site images:', error.message);
        return;
      }
      const map = {};
      (data || []).forEach((row) => {
        if (row.url) map[row.key] = row.url;
      });
      setImages(map);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteImagesContext.Provider value={images}>{children}</SiteImagesContext.Provider>;
}

// Usage: const images = useSiteImages(); <img src={images.header_logo_dark || fallbackImport} />
export function useSiteImages() {
  return useContext(SiteImagesContext);
}

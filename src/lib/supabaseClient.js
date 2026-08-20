import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase env vars. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in .env, then restart the dev server (npm run dev).'
  );
}

// Fall back to placeholder values so a missing/misconfigured .env doesn't crash
// the entire site at import time (createClient throws immediately if either
// argument is empty). With placeholders, the app still loads — Supabase calls
// will just fail gracefully with an error object, which every caller already checks.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

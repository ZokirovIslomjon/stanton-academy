import { supabase } from './supabaseClient';

// Website registration forms post to the Google Sheet (SheetDB); this also saves the
// registration in the `students` table so it shows up in the admin dashboard.
// Fire-and-forget: a failure here is logged but never blocks the visitor's submission.
export function saveStudent({ name, email, phone, course, notes }) {
  return supabase
    .from('students')
    .insert({
      name: name.trim(),
      email: email.trim(),
      phone,
      course_name: course || null,
      status: 'pending',
      source: 'website',
      notes: notes || null,
    })
    .then(({ error }) => {
      if (error) console.error('Failed to save student:', error.message);
    });
}

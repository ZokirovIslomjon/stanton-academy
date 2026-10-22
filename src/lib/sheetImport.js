import { supabase } from './supabaseClient';

// Same SheetDB endpoint the Sign Up, Courses and Holiday Camp forms post to.
const SHEET_URL = 'https://sheetdb.io/api/v1/k5ohu0497ek0x';

const cell = (row, header) => {
  const key = Object.keys(row).find((k) => k.trim().toLowerCase() === header);
  return key ? String(row[key] ?? '').trim() : '';
};
const dedupeKey = (email, course) => `${email.trim().toLowerCase()}|${(course || '').trim().toLowerCase()}`;

// Reads every registration row from the Google Sheet and adds the ones that are not
// already in the `students` table (matched on email + course). Returns how many were added.
// Rows from the Contact form are enquiries, not registrations, so they are skipped.
export async function importStudentsFromSheet() {
  const response = await fetch(SHEET_URL);
  if (!response.ok) throw new Error(`Google Sheet request failed (${response.status})`);
  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error('Unexpected response from the Google Sheet.');

  const { data: existing, error } = await supabase.from('students').select('email, course_name');
  if (error) throw error;
  const seen = new Set((existing || []).map((s) => dedupeKey(s.email || '', s.course_name)));

  const toInsert = [];
  for (const row of rows) {
    const name = cell(row, 'name');
    const email = cell(row, 'email');
    if (!name || !email || cell(row, 'hearabout') === 'Contact Page') continue;

    // Forms write "Course (option)": study mode for courses, package for the camp.
    const rawCourse = cell(row, 'course');
    const match = rawCourse.match(/^(.*?)\s*\(([^()]*)\)$/);
    const course = match ? match[1] : rawCourse;
    const key = dedupeKey(email, course);
    if (seen.has(key)) continue;
    seen.add(key);

    const optionLabel = /^summer camp/i.test(course) ? 'Package' : 'Study mode';
    const notes = [
      match && `${optionLabel}: ${match[2]}`,
      cell(row, 'nationality') && `Nationality: ${cell(row, 'nationality')}`,
      cell(row, 'age') && `Age: ${cell(row, 'age')}`,
      cell(row, 'hearabout') && `Heard via: ${cell(row, 'hearabout')}`,
      cell(row, 'message') && cell(row, 'message') !== 'None' && `Message: ${cell(row, 'message')}`,
      cell(row, 'date') && `Registered: ${cell(row, 'date')}`,
    ].filter(Boolean).join('\n');

    toInsert.push({
      name,
      email,
      phone: cell(row, 'phone').replace(/^'/, '') || null,
      course_name: course || null,
      status: 'pending',
      source: 'google_sheet',
      notes: notes || null,
    });
  }

  if (toInsert.length > 0) {
    const { error: insertError } = await supabase.from('students').insert(toInsert);
    if (insertError) throw insertError;
  }
  return toInsert.length;
}

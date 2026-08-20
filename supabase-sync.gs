/**
 * Stanton Academy — sync new Google Sheet rows into the Supabase `students`
 * table, so manually-typed rows (and every other lead source that writes
 * into this sheet) show up on the Admin Students page, not just the ones
 * the website already writes to Supabase directly.
 *
 * SETUP (one time, ~5 minutes):
 *   1. Open the actual Google Sheet (the one sheetdb.io writes into).
 *   2. Extensions > Apps Script.
 *   3. Delete whatever's in Code.gs, paste this whole file in, save.
 *   4. In the function dropdown at the top, choose "setupTrigger", click Run.
 *      Google will ask you to authorize the script — allow it (it's your
 *      own script, running under your own account).
 *   5. Reload the actual Google Sheet. You should see a new "Supabase Sync"
 *      menu — that confirms it's wired up.
 *   6. Test it: add a row by hand (Name + Email at minimum), then from the
 *      Supabase Sync menu click "Sync new rows now" and check the Admin
 *      Students page. Once you've confirmed the automatic trigger fires on
 *      its own for a manual edit (give it a few seconds after typing), also
 *      test a real website signup to confirm rows written by sheetdb.io
 *      (not typed by hand) trigger it too — Google's onChange trigger is
 *      supposed to fire for API writes as well as manual ones, but that's
 *      worth confirming for real since it can't be tested from outside your
 *      account. If the automatic side doesn't fire for one of those two
 *      cases, "Sync new rows now" always works as a manual catch-up, and a
 *      time-based trigger (every few minutes) is a reliable fallback if
 *      needed — ask and I'll swap it in.
 *
 * WHAT IT SKIPS:
 *   - Rows with HearAbout = "Contact Page" — those are contact-form
 *     messages, not registrations, so they don't belong in Students.
 *   - Rows with no Name or no Email — incomplete, nothing to save.
 *   - Rows already saved by the website's own direct Supabase write
 *     (marked with a "Synced" = yes column so they aren't double-added —
 *     see the matching SignUpPage.jsx change).
 *
 * If your sheet has more than one tab, change SHEET_INDEX below (0 = first
 * tab) to point at the right one.
 */

const SUPABASE_URL = 'https://misqjbbbxgdqybvucxci.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_e1eYfMwGlo_F3kP3Vvetdg_05PwlFfv';
const SHEET_INDEX = 0;

function syncNewRowsToSupabase() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[SHEET_INDEX];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return; // header only, nothing to sync

  const headers = values[0].map((h) => String(h).trim());
  const col = {};
  headers.forEach((h, i) => { col[h] = i; });

  const props = PropertiesService.getScriptProperties();
  const lastRow = parseInt(props.getProperty('lastSyncedRow') || '1', 10); // row 1 = header
  const totalRows = values.length;
  if (totalRows <= lastRow) return; // nothing new since last run

  for (let r = lastRow; r < totalRows; r++) {
    const row = values[r];

    const alreadySynced = col['Synced'] !== undefined && String(row[col['Synced']]).trim().toLowerCase() === 'yes';
    if (alreadySynced) continue;

    const hearAbout = col['HearAbout'] !== undefined ? String(row[col['HearAbout']]).trim() : '';
    if (hearAbout === 'Contact Page') continue;

    const name = col['Name'] !== undefined ? String(row[col['Name']]).trim() : '';
    const email = col['Email'] !== undefined ? String(row[col['Email']]).trim() : '';
    if (!name || !email) continue;

    let phone = col['Phone'] !== undefined ? String(row[col['Phone']]).trim() : '';
    if (phone.charAt(0) === "'") phone = phone.slice(1); // strip the anti-autoformat quote some forms add

    const courseName = col['Course'] !== undefined ? String(row[col['Course']]).trim() : '';

    const payload = {
      name: name,
      email: email,
      phone: phone || null,
      course_name: courseName || null,
      status: 'pending',
      source: 'google_sheet',
    };

    const response = UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/students', {
      method: 'post',
      contentType: 'application/json',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });

    if (response.getResponseCode() >= 300) {
      Logger.log('Sync failed at row ' + (r + 1) + ': ' + response.getContentText());
      return; // stop here so this row (and later ones) retry next run
    }
  }

  props.setProperty('lastSyncedRow', String(totalRows));
}

// Run this once from the Apps Script editor to install the automatic trigger.
function setupTrigger() {
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === 'syncNewRowsToSupabase') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('syncNewRowsToSupabase')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create();
  Logger.log('Auto-sync trigger installed.');
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Supabase Sync')
    .addItem('Sync new rows now', 'syncNewRowsToSupabase')
    .addItem('Install auto-sync trigger (run once)', 'setupTrigger')
    .addToUi();
}

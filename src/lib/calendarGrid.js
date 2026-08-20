// Builds a Mon–Sun calendar grid for a given year/month, placing events on
// their real date. In-month days always show their number (with or without
// an event); days from the previous/next month only appear if they carry an
// event for this session (e.g. a camp's arrival day landing in the last days
// of the prior month) — otherwise they're blank filler, same as a normal
// month calendar.
export function buildCalendarGrid(year, month, events) {
  const eventsByDate = {};
  events.forEach((e) => { eventsByDate[e.event_date] = e; });

  const toISO = (d) => {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const firstOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const jsWeekday = firstOfMonth.getUTCDay(); // 0=Sun..6=Sat
  const leadingCount = (jsWeekday + 6) % 7; // 0=Mon..6=Sun

  const cells = [];

  for (let i = leadingCount; i >= 1; i--) {
    const d = new Date(firstOfMonth);
    d.setUTCDate(d.getUTCDate() - i);
    const iso = toISO(d);
    const event = eventsByDate[iso] || null;
    if (event) {
      const monthShort = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
      cells.push({ type: 'day', iso, dayLabel: `${d.getUTCDate()} ${monthShort}`, event });
    } else {
      cells.push({ type: 'empty' });
    }
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(Date.UTC(year, month - 1, day));
    const iso = toISO(d);
    cells.push({ type: 'day', iso, dayLabel: String(day), event: eventsByDate[iso] || null });
  }

  const trailingCount = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= trailingCount; i++) {
    const d = new Date(Date.UTC(year, month, i));
    const iso = toISO(d);
    const event = eventsByDate[iso] || null;
    if (event) {
      const monthShort = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
      cells.push({ type: 'day', iso, dayLabel: `${d.getUTCDate()} ${monthShort}`, event });
    } else {
      cells.push({ type: 'empty' });
    }
  }

  return cells;
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

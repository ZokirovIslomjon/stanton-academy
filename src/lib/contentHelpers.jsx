// Shared helpers for page_content 'list' rows (see AdminSections.jsx).
// One item per line, "Label: description" — text before the first colon is
// the label.

// Parses a list row into {title, desc} objects, for UIs that need the two
// parts separately (e.g. an accordion header + body).
export function parseListItems(value) {
  return value
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(':');
      if (idx === -1) return { title: line, desc: '' };
      return { title: line.slice(0, idx), desc: line.slice(idx + 1).trim() };
    });
}

// Renders a list row as <li> bullets with the label bolded, matching the
// site's existing "Label: description" bullet style with no delimiter
// syntax to learn.
export function renderListItems(value) {
  return value
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line, i) => {
      const idx = line.indexOf(':');
      if (idx === -1) return <li key={i}>{line}</li>;
      return (
        <li key={i}>
          <strong>{line.slice(0, idx + 1)}</strong>{line.slice(idx + 1)}
        </li>
      );
    });
}

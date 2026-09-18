-- Phase 9: consistent course detail page template
-- Adds the content fields the new CourseDetailPage.jsx template needs, and points any course
-- without a working custom page link at the new template.

alter table courses add column if not exists tagline text;
alter table courses add column if not exists overview text;
alter table courses add column if not exists best_for text;
alter table courses add column if not exists outcome text;
alter table courses add column if not exists accent_color text default '#006B3F';

-- Fix up existing rows: anything with no link, a blank link, or a link into the old
-- Page Builder ("/p/...") now gets routed to the new standard course page instead.
-- Courses with a real custom link (e.g. /general-english, /ielts-preparation) are untouched.
update courses
set link = '/course/' || slug
where link is null or link = '' or link like '/p/%';

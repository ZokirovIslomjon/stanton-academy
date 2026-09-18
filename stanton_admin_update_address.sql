-- Updates the office address shown on the site (Location/Contact pages, Editable inline edit).
-- Run this in the Supabase SQL editor.

update site_settings
set address = '116 Jalan Pudu, 50200 Kampung Cendana, Kuala Lumpur'
where id = 1;

-- Phase 11: Blog module + homepage redesign support
-- Run this in the Supabase SQL editor.

-- 1. Blog posts table
create table if not exists blog_posts (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  body text not null,
  cover_image_url text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table blog_posts enable row level security;

drop policy if exists "Public can view published blog posts" on blog_posts;
create policy "Public can view published blog posts"
  on blog_posts for select
  using (is_published = true);

drop policy if exists "Authenticated users can manage blog posts" on blog_posts;
create policy "Authenticated users can manage blog posts"
  on blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 2. Seed the 4 launch articles
insert into blog_posts (title, slug, excerpt, body, display_order, is_published)
values
  (
    'Why Learn English in Malaysia?',
    'why-learn-english-in-malaysia',
    'Malaysia is more than a destination to study — it is a multicultural environment where people from different countries, languages, and backgrounds come together every day.',
    'Malaysia is more than a destination to study. It is a multicultural environment where people from different countries, languages, and backgrounds come together every day. For students who want to improve their English, this makes Malaysia an excellent place to learn and practise the language in real-life situations.',
    0,
    true
  ),
  (
    'Why Learn Mandarin in Malaysia?',
    'why-learn-mandarin-in-malaysia',
    'Chinese is one of the most widely spoken languages in the world and an increasingly valuable skill for students, professionals, and business owners.',
    'Chinese is one of the most widely spoken languages in the world and an increasingly valuable skill for students, professionals, and business owners. In Malaysia, learning Chinese can be especially useful because of the country''s multicultural environment and strong connections with the Chinese-speaking community.',
    1,
    true
  ),
  (
    'Why Business Communication Skills Matter in Today''s Global Workplace',
    'why-business-communication-skills-matter',
    'In today''s global business environment, strong communication skills are more important than ever.',
    'In today''s global business environment, strong communication skills are more important than ever. Companies work with international clients, partners, and teams every day, making clear and confident communication an essential professional skill.',
    2,
    true
  ),
  (
    'IELTS: 7 Facts You Should Know Before Taking the Test',
    'ielts-7-facts-you-should-know',
    'Planning to study abroad, work internationally, or improve your English credentials? Here are seven important facts every candidate should know.',
    'Planning to study abroad, work internationally, or improve your English credentials? IELTS is one of the most widely recognised English-language proficiency tests. Before booking your test, here are seven important facts every candidate should know.',
    3,
    true
  )
on conflict (slug) do nothing;

-- 3. Register a homepage hero banner image slot so admin can replace it
--    from Admin -> Images, same as every other site image.
insert into site_images (key, label, location_note, url)
select 'hero_banner', 'Homepage Hero Banner', 'Homepage hero section, right-hand image', null
where not exists (select 1 from site_images where key = 'hero_banner');

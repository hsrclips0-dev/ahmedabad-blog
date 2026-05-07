-- Admin content tables
-- Run this in your Supabase SQL Editor after the base schema.sql

-- ── POSTS ──────────────────────────────────────────────────────────────────
create table if not exists posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  slug          text unique not null,
  title         text not null,
  subtitle      text,
  author        text not null default 'The Editors',
  category_slug text,
  body          text not null default '',
  excerpt       text,
  cover_img     text,
  tags          text[],
  published     boolean default false,
  published_at  timestamptz
);

alter table posts enable row level security;

create policy "public can read published posts"
  on posts for select
  using (published = true);

create policy "authenticated users can manage posts"
  on posts for all
  to authenticated
  using (true)
  with check (true);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();


-- ── LISTINGS ───────────────────────────────────────────────────────────────
create table if not exists listings (
  id            text primary key default gen_random_uuid()::text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  rank_order    smallint default 99,
  name          text not null,
  category_slug text not null,
  neighborhood  text not null,
  subtitle      text,
  featured      boolean default false,
  verified      boolean default false,
  pick          boolean default false,
  rating        numeric(3,1) default 4.0,
  review_count  integer default 0,
  price         smallint default 1 check (price between 1 and 3),
  tags          text[],
  img           text,
  review        text not null default '',
  pull          text default '',
  hours         text,
  phone         text,
  address       text,
  body_paras    text[],
  pull_quote    text,
  attribution   text,
  scores        jsonb default '{}',
  details       jsonb default '{}',
  published     boolean default true
);

alter table listings enable row level security;

create policy "public can read published listings"
  on listings for select
  using (published = true);

create policy "authenticated users can manage listings"
  on listings for all
  to authenticated
  using (true)
  with check (true);

create trigger listings_updated_at
  before update on listings
  for each row execute function update_updated_at();


-- ── LISTICLES ──────────────────────────────────────────────────────────────
create table if not exists listicles (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  slug          text unique not null,
  title         text not null,
  subtitle      text,
  author        text not null default 'The Editors',
  category_slug text,
  intro         text,
  cover_img     text,
  items         jsonb default '[]',
  published     boolean default false,
  published_at  timestamptz
);

alter table listicles enable row level security;

create policy "public can read published listicles"
  on listicles for select
  using (published = true);

create policy "authenticated users can manage listicles"
  on listicles for all
  to authenticated
  using (true)
  with check (true);

create trigger listicles_updated_at
  before update on listicles
  for each row execute function update_updated_at();

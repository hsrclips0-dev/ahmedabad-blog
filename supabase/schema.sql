-- ahmedabad.blog — Supabase schema
-- Run this in your Supabase SQL editor to set up the tables

-- Leads: from the "Get 3 Free Quotes" form on the homepage and category pages
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  category text not null,
  area text,
  phone text not null,
  status text not null default 'new'  -- new | contacted | converted | invalid
);

-- Claims: from the "Claim your listing" form on the advertise page
create table if not exists claims (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  business_name text not null,
  role text not null,
  email text not null,
  phone text not null,
  notes text,
  status text not null default 'pending'  -- pending | verified | rejected
);

-- Advertise applications: from the "Apply to receive leads" form
create table if not exists advertise_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  business_name text not null,
  category text not null,
  service_area text,
  budget text,
  phone text not null,
  status text not null default 'new'  -- new | reviewing | approved | rejected
);

-- Row Level Security: only service role can read (protect PII)
alter table leads enable row level security;
alter table claims enable row level security;
alter table advertise_applications enable row level security;

-- Allow inserts from anon (public form submissions)
create policy "Allow public inserts on leads"
  on leads for insert
  to anon
  with check (true);

create policy "Allow public inserts on claims"
  on claims for insert
  to anon
  with check (true);

create policy "Allow public inserts on advertise_applications"
  on advertise_applications for insert
  to anon
  with check (true);

-- Future tables (add as needed):
--
-- listings: when you want to manage businesses in the database
-- create table listings (
--   id text primary key,
--   name text not null,
--   category text not null,
--   neighborhood text,
--   featured boolean default false,
--   verified boolean default false,
--   ...
-- );
--
-- posts / blog: when you want to add editorial articles
-- create table posts (
--   id uuid primary key default gen_random_uuid(),
--   slug text unique not null,
--   title text not null,
--   body text,
--   category text,
--   published_at timestamptz,
--   ...
-- );

-- Run this in the Supabase dashboard → SQL Editor.
-- Backs the /api/preorder-interest endpoint (fake-checkout lead capture).

create table if not exists public.preorder_interest (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    email       text not null,
    address     text,
    created_at  timestamptz not null default now()
);

create index if not exists preorder_interest_email_idx
    on public.preorder_interest (email);

-- The serverless handler uses the service-role key, which bypasses RLS.
-- Enable RLS with no policies so the anon/public keys cannot read or write
-- this table (same posture as pre_orders / waitlist).
alter table public.preorder_interest enable row level security;

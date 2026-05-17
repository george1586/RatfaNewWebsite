-- Run this in the Supabase dashboard → SQL Editor.
-- Backs the /api/preorder-interest endpoint (fake-checkout lead capture).

create table if not exists public.preorder_interest (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    email       text not null unique,
    address     text,
    created_at  timestamptz not null default now()
);

-- The handler stores email lowercased + trimmed, so this UNIQUE constraint
-- blocks duplicate sign-ups for the same address.
create unique index if not exists preorder_interest_email_key
    on public.preorder_interest (email);

-- If the table already exists without the constraint, run this once instead:
-- alter table public.preorder_interest
--     add constraint preorder_interest_email_unique unique (email);

-- The serverless handler uses the service-role key, which bypasses RLS.
-- Enable RLS with no policies so the anon/public keys cannot read or write
-- this table (same posture as pre_orders / waitlist).
alter table public.preorder_interest enable row level security;

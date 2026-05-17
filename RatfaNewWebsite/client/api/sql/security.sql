-- Run in the Supabase dashboard → SQL Editor.
-- Hardening for the Stripe webhooks (idempotency) and RLS verification.

-- 1. Webhook idempotency: the .upsert(onConflict:'stripe_session_id') in
--    webhook.js / preorder-webhook.js needs these unique constraints.
create unique index if not exists orders_stripe_session_id_key
    on public.orders (stripe_session_id);

create unique index if not exists pre_orders_stripe_session_id_key
    on public.pre_orders (stripe_session_id);

-- 2. RLS check. The browser ships the anon key, so every table MUST have RLS
--    enabled or its rows are publicly readable. Run this and confirm
--    rowsecurity = true for ALL rows:
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('pre_orders', 'orders', 'waitlist', 'preorder_interest');

-- 3. For any table above with rowsecurity = false, enable it. With no
--    policies, the anon/public keys get zero access while the service-role
--    key used by the API handlers still bypasses RLS.
alter table public.pre_orders       enable row level security;
alter table public.orders           enable row level security;
alter table public.waitlist         enable row level security;
alter table public.preorder_interest enable row level security;

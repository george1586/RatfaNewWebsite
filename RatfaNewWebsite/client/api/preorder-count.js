import { createClient } from "@supabase/supabase-js";

const FAKE_BASE = 13;
const TOTAL = 100;

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");

    const { count, error } = await supabase
        .from("pre_orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "confirmed");

    if (error) {
        return res.status(200).json({ claimed: FAKE_BASE, total: TOTAL });
    }

    return res.status(200).json({
        claimed: FAKE_BASE + (count ?? 0),
        total: TOTAL,
    });
}

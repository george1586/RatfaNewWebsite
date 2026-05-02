import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { email } = req.body || {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email required" });
    }

    const { error } = await supabase.from("waitlist").insert({
        email: email.trim().toLowerCase(),
        created_at: new Date().toISOString(),
    });

    if (error) {
        if (error.code === "23505") {
            return res.status(200).json({ ok: true });
        }
        return res.status(500).json({ error: "Could not join waitlist" });
    }

    return res.status(200).json({ ok: true });
}

import { createClient } from "@supabase/supabase-js";
import { rateLimit } from "./_rateLimit.js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const MAX_EMAIL = 254;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { limited, retryAfter } = rateLimit(req);
    if (limited) {
        res.setHeader("Retry-After", String(retryAfter));
        return res.status(429).json({ error: "Too many requests. Please try again shortly." });
    }

    try {
        const { email, company } = req.body || {};

        // Honeypot — bots fill hidden fields; pretend success.
        if (company) {
            return res.status(200).json({ ok: true });
        }

        if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
            return res.status(400).json({ error: "A valid email is required" });
        }

        const cleanEmail = email.trim().toLowerCase().slice(0, MAX_EMAIL);

        const { error } = await supabase.from("waitlist").insert({
            email: cleanEmail,
            created_at: new Date().toISOString(),
        });

        if (error) {
            // Duplicate email — already on the list, treat as success.
            if (error.code === "23505") {
                return res.status(200).json({ ok: true });
            }
            console.error("waitlist insert failed:", error.message);
            return res.status(500).json({ error: "Could not join waitlist" });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("waitlist unhandled error:", err?.message || err);
        return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
}

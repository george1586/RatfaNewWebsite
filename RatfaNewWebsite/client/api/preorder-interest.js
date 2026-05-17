import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { rateLimit } from "./_rateLimit.js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend requires a verified sender domain. Override with RESEND_FROM in env.
const FROM = process.env.RESEND_FROM || "George<ichim.george@steelgate.tech>";

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_ADDRESS = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Prevent HTML/script injection when interpolating user input into the email.
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => (
        { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
}

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
        const { name, email, address, company } = req.body || {};

        // Honeypot: real users never fill the hidden "company" field.
        // Pretend success so bots don't probe for the check.
        if (company) {
            return res.status(200).json({ ok: true });
        }

        // --- Validation ---------------------------------------------------
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
            return res.status(400).json({ error: "A valid email is required" });
        }
        if (address != null && typeof address !== "string") {
            return res.status(400).json({ error: "Invalid address" });
        }

        const cleanName = name.trim().slice(0, MAX_NAME);
        const cleanEmail = email.trim().toLowerCase().slice(0, MAX_EMAIL);
        const cleanAddress = (address || "").trim().slice(0, MAX_ADDRESS);

        // --- Dedupe: if this email already requested, succeed silently and
        // do NOT send another email (prevents repeat-submit email spam). ---
        const { data: existing, error: lookupError } = await supabase
            .from("preorder_interest")
            .select("id")
            .eq("email", cleanEmail)
            .maybeSingle();

        if (lookupError) {
            // Table missing / DB down — log server-side, fall through to email
            // so the lead is still captured.
            console.error("preorder-interest lookup failed:", lookupError.message);
        }

        if (existing) {
            return res.status(200).json({ ok: true, duplicate: true });
        }

        // --- Store the lead ----------------------------------------------
        const { error: insertError } = await supabase
            .from("preorder_interest")
            .insert({
                name: cleanName,
                email: cleanEmail,
                address: cleanAddress,
                created_at: new Date().toISOString(),
            });

        if (insertError) {
            // Unique-violation race: another request inserted the same email
            // first. Treat as a duplicate, don't double-send.
            if (insertError.code === "23505") {
                return res.status(200).json({ ok: true, duplicate: true });
            }
            // Any other DB error: log it, but still send the email so the
            // lead isn't lost.
            console.error("preorder-interest insert failed:", insertError.message);
        }

        // --- Confirmation email ------------------------------------------
        try {
            const { error: emailError } = await resend.emails.send({
                from: FROM,
                to: cleanEmail,
                subject: "We received your Steelgate pre-order request",
                html: `
                    <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;line-height:1.6;max-width:480px;margin:0 auto;">
                        <h2 style="margin:0 0 16px;">Thanks, ${escapeHtml(cleanName)}.</h2>
                        <p>We've received your request to reserve a founding Steelgate unit.</p>
                        <p><strong>We're currently out of stock</strong>, but founding spots are being processed in order. We'll reach out to you as soon as a spot opens up — no payment is needed right now.</p>
                        <p style="margin-top:24px;color:#666;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
                        <p style="color:#666;font-size:13px;">— The Steelgate team</p>
                    </div>
                `,
            });
            if (emailError) {
                console.error("preorder-interest email failed:", emailError.message);
                return res.status(502).json({ error: "Could not send confirmation email" });
            }
        } catch (err) {
            console.error("preorder-interest email threw:", err?.message || err);
            return res.status(502).json({ error: "Could not send confirmation email" });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("preorder-interest unhandled error:", err?.message || err);
        return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
}

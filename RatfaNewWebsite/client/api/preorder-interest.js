import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend requires a verified sender domain. Override with RESEND_FROM in env.
const FROM = process.env.RESEND_FROM || "Steelgate <onboarding@resend.dev>";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { name, email, address } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ error: "Name required" });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanAddress = (address || "").trim();

    // Best-effort: store the lead. Don't fail the flow if the table/insert errors.
    try {
        await supabase.from("preorder_interest").insert({
            name: cleanName,
            email: cleanEmail,
            address: cleanAddress,
            created_at: new Date().toISOString(),
        });
    } catch {
        // swallow — capturing the lead via email is the fallback
    }

    try {
        await resend.emails.send({
            from: FROM,
            to: cleanEmail,
            subject: "We received your Steelgate pre-order request",
            html: `
                <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;line-height:1.6;max-width:480px;margin:0 auto;">
                    <h2 style="margin:0 0 16px;">Thanks, ${cleanName}.</h2>
                    <p>We've received your request to reserve a founding Steelgate unit.</p>
                    <p><strong>We're currently out of stock</strong>, but founding spots are being processed in order. We'll reach out to you as soon as a spot opens up — no payment is needed right now.</p>
                    <p style="margin-top:24px;color:#666;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
                    <p style="color:#666;font-size:13px;">— The Steelgate team</p>
                </div>
            `,
        });
    } catch (err) {
        return res.status(500).json({ error: "Could not send confirmation email" });
    }

    return res.status(200).json({ ok: true });
}

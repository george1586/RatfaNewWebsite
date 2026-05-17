import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

async function getRawBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on("data", chunk => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks)));
        req.on("error", reject);
    });
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const rawBody = await getRawBody(req);
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("preorder-webhook signature verification failed:", err?.message || err);
        return res.status(400).json({ error: "Invalid signature" });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        if (session.metadata?.type !== "preorder") {
            return res.status(200).json({ received: true });
        }

        const email = session.customer_details?.email ?? null;

        // Idempotent: Stripe may redeliver this event. Unique constraint on
        // stripe_session_id + ignoreDuplicates keeps the pre-order count
        // accurate and stops a duplicate confirmation email.
        const { data: upserted, error: upsertError } = await supabase
            .from("pre_orders")
            .upsert(
                {
                    stripe_session_id: session.id,
                    amount_total: session.amount_total,
                    currency: session.currency,
                    customer_email: email,
                    status: "confirmed",
                    created_at: new Date().toISOString(),
                },
                { onConflict: "stripe_session_id", ignoreDuplicates: true }
            )
            .select();

        if (upsertError) {
            console.error("preorder-webhook upsert failed:", upsertError.message);
            return res.status(500).json({ error: "Could not record pre-order" });
        }

        // upserted is empty when the row already existed (duplicate event) —
        // skip the email so we don't send the confirmation twice.
        const isNew = Array.isArray(upserted) && upserted.length > 0;

        if (isNew && email && process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: "Steelgate <hello@steelgate.io>",
                to: email,
                subject: "You're in — Steelgate founding spot confirmed",
                html: `
                    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:48px 24px;color:#1a1a1a;">

                        <!-- Header -->
                        <p style="font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin:0 0 16px;">Steelgate — Founding Pre-Order</p>
                        <h1 style="font-size:32px;font-weight:800;margin:0 0 12px;line-height:1.1;">You're in.</h1>
                        <p style="font-size:16px;color:#444;margin:0 0 32px;line-height:1.6;">
                            Welcome to the founding group. Your €45 payment is confirmed and your spot is locked in.
                        </p>

                        <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 32px;" />

                        <!-- What's confirmed -->
                        <p style="font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#888;margin:0 0 14px;">What's confirmed</p>
                        <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
                            <tr>
                                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#444;">Payment</td>
                                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;font-weight:600;text-align:right;">€45 — one-time</td>
                            </tr>
                            <tr>
                                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#444;">Founding price</td>
                                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;font-weight:600;text-align:right;">Locked in for life</td>
                            </tr>
                            <tr>
                                <td style="padding:10px 0;font-size:15px;color:#444;">Target ship date</td>
                                <td style="padding:10px 0;font-size:15px;font-weight:600;text-align:right;">Q4 2026 — you ship first</td>
                            </tr>
                        </table>

                        <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 32px;" />

                        <!-- What to expect -->
                        <p style="font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#888;margin:0 0 14px;">What happens next</p>
                        <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 12px;">
                            Over the coming months we'll send you behind-the-scenes updates as we move through production — hardware milestones, app previews, and a full how-to video before the device ships so you're ready to set it up from day one.
                        </p>
                        <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 32px;">
                            All of that comes to this email address. To make sure you don't miss anything, please add <strong>hello@steelgate.io</strong> to your contacts now — it takes 5 seconds and ensures our updates don't end up in spam.
                        </p>

                        <!-- Spam tip callout -->
                        <div style="background:#f7f7f5;border-left:3px solid #1a1a1a;padding:16px 20px;border-radius:4px;margin-bottom:32px;">
                            <p style="font-size:14px;font-weight:700;margin:0 0 6px;">Keep our emails out of spam</p>
                            <p style="font-size:14px;color:#555;margin:0;line-height:1.6;">
                                Add <strong>hello@steelgate.io</strong> to your contacts or mark this email as "Not spam" if it landed there. Gmail and Outlook users: drag this email into your Primary inbox.
                            </p>
                        </div>

                        <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 32px;" />

                        <!-- Refund note -->
                        <p style="font-size:13px;color:#888;line-height:1.6;margin:0 0 32px;">
                            Changed your mind? Your €45 is fully refundable at any point before we ship. Just reply to this email and we'll sort it within a few days — no questions asked.
                        </p>

                        <p style="font-size:14px;color:#aaa;margin:0;">— The Steelgate Team</p>
                    </div>
                `,
            }).catch(() => {});
        }
    }

    return res.status(200).json({ received: true });
}

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
        return res.status(400).json({ error: `Webhook error: ${err.message}` });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        if (session.metadata?.type !== "preorder") {
            return res.status(200).json({ received: true });
        }

        const email = session.customer_details?.email ?? null;

        await supabase.from("pre_orders").insert({
            stripe_session_id: session.id,
            amount_total: session.amount_total,
            currency: session.currency,
            customer_email: email,
            status: "confirmed",
            created_at: new Date().toISOString(),
        });

        if (email && process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: "Steelgate <noreply@steelgate.io>",
                to: email,
                subject: "You're in — Steelgate founding spot confirmed",
                html: `
                    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;">
                        <h1 style="font-size:28px;font-weight:800;margin-bottom:8px;">You're in.</h1>
                        <p style="color:#444;margin-bottom:24px;">Your Steelgate founding spot is confirmed. Here's what to expect:</p>
                        <ul style="color:#222;padding-left:20px;line-height:2;">
                            <li>Your €10 deposit is confirmed</li>
                            <li>Your annual rate is locked at €59/year for life</li>
                            <li>We'll send updates as we build toward Q3 2027</li>
                            <li>Founding customers ship first</li>
                        </ul>
                        <p style="margin-top:24px;color:#666;font-size:14px;">
                            Your deposit is fully refundable before we ship — just reply to this email.
                        </p>
                        <p style="margin-top:32px;font-size:14px;color:#aaa;">— The Steelgate Team</p>
                    </div>
                `,
            }).catch(() => {});
        }
    }

    return res.status(200).json({ received: true });
}

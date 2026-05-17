import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
        console.error("webhook signature verification failed:", err?.message || err);
        return res.status(400).json({ error: "Invalid signature" });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // Idempotent: Stripe can deliver the same event more than once.
        // Unique constraint on stripe_session_id + ignoreDuplicates prevents
        // duplicate order rows.
        const { error } = await supabase.from("orders").upsert(
            {
                stripe_session_id: session.id,
                amount_total: session.amount_total,
                currency: session.currency,
                customer_email: session.customer_details?.email ?? null,
                status: "paid",
                created_at: new Date().toISOString(),
            },
            { onConflict: "stripe_session_id", ignoreDuplicates: true }
        );

        if (error) {
            console.error("webhook orders upsert failed:", error.message);
            return res.status(500).json({ error: "Could not record order" });
        }
    }

    return res.status(200).json({ received: true });
}

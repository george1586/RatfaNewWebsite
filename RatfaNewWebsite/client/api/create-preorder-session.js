import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const appUrl = process.env.VITE_APP_URL || "http://localhost:5173";

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            currency: "eur",
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        unit_amount: 6500,
                        product_data: {
                            name: "Steelgate — Founding Pre-Order",
                            description: "One-time €65 founding pre-order. Ships Q4 2026. Founding customers ship first.",
                        },
                    },
                    quantity: 1,    
                },
            ],
            metadata: {
                type: "preorder",
            },
            success_url: `${appUrl}/preorder/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/products`,
        });

        return res.status(200).json({ url: session.url });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

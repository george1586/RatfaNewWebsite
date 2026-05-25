import { rateLimit } from "./_rateLimit.js";
import { lookupPromo } from "./_promoCodes.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { limited, retryAfter } = rateLimit(req, { max: 10 });
    if (limited) {
        res.setHeader("Retry-After", String(retryAfter));
        return res.status(429).json({ error: "Too many requests. Please try again shortly." });
    }

    const { code } = req.body || {};
    if (typeof code !== "string" || !code.trim()) {
        return res.status(400).json({ valid: false, error: "Enter a code first." });
    }

    const match = lookupPromo(code);
    if (!match) {
        return res.status(200).json({ valid: false });
    }

    return res.status(200).json({
        valid: true,
        code: match.code,
        discountPct: match.discountPct,
        label: match.label,
    });
}

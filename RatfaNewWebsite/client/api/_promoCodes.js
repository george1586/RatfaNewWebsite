// Server-side source of truth for promo codes. Never exposed to the client.

const PROMO_CODES = {
    INNO: { discountPct: 100, label: "Full discount applied" },
};

export function lookupPromo(rawCode) {
    if (typeof rawCode !== "string") return null;
    const code = rawCode.trim().toUpperCase();
    if (!code) return null;
    const entry = PROMO_CODES[code];
    if (!entry) return null;
    return { code, ...entry };
}

// Best-effort in-memory IP rate limiter for the public form endpoints.
//
// Note: serverless instances are ephemeral, so this resets on cold start and
// is per-instance, not global. It meaningfully blocks naive scripted abuse
// with zero infra. For a hard guarantee under load, back this with Upstash
// Ratelimit / Vercel KV (swap the Map for a KV incr+expire).

const WINDOW_MS = 60_000;
const DEFAULT_MAX = 5;
const hits = new Map(); // ip -> number[] (request timestamps)

export function clientIp(req) {
    const xff = req.headers["x-forwarded-for"];
    if (xff) return xff.split(",")[0].trim();
    return (
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "unknown"
    );
}

// Returns { limited: boolean, retryAfter: seconds }.
export function rateLimit(req, { max = DEFAULT_MAX, windowMs = WINDOW_MS } = {}) {
    const ip = clientIp(req);
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter(t => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);

    // Opportunistic cleanup so the Map can't grow unbounded.
    if (hits.size > 5000) {
        for (const [k, v] of hits) {
            if (!v.some(t => now - t < windowMs)) hits.delete(k);
        }
    }

    return {
        limited: recent.length > max,
        retryAfter: Math.ceil(windowMs / 1000),
    };
}

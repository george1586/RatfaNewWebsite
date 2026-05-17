import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { createPreorderSession } from "../lib/api";
import { track } from "../lib/analytics";

export default function PreOrderPanel() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", address: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Spots counter disabled for now ---------------------------------
    // const [spots, setSpots] = useState({ claimed: 13, total: 100 });
    // useEffect(() => {
    //     fetch("/api/preorder-count")
    //         .then(r => r.json())
    //         .then(data => setSpots(data))
    //         .catch(() => { });
    // }, []);

    // --- Stripe checkout (disabled — kept for when we re-enable payments) -
    // const handlePreorder = async () => {
    //     const startedAt = performance.now();
    //     const checkoutContext = {
    //         price_eur: 45,
    //         currency: 'EUR',
    //         spots_claimed: spots.claimed,
    //         spots_remaining: spots.total - spots.claimed,
    //         spots_total: spots.total,
    //     };
    //     track('preorder_clicked', {
    //         page: 'products',
    //         placement: 'preorder_panel',
    //         cta_text: 'Pre-Order NOW',
    //         cta_variant: 'primary_button',
    //         ...checkoutContext,
    //     });
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const { url } = await createPreorderSession();
    //         track('checkout_started', {
    //             ...checkoutContext,
    //             provider: 'stripe',
    //             session_latency_ms: Math.round(performance.now() - startedAt),
    //         });
    //         window.location.href = url;
    //     } catch (err) {
    //         track('checkout_failed', {
    //             ...checkoutContext,
    //             provider: 'stripe',
    //             session_latency_ms: Math.round(performance.now() - startedAt),
    //             error_message: err?.message || 'unknown',
    //         });
    //         setError("Could not start checkout. Please try again.");
    //         setLoading(false);
    //     }
    // };
    // --------------------------------------------------------------------

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        track('preorder_clicked', {
            page: 'products',
            placement: 'preorder_panel',
            cta_text: 'Finish Checkout',
            cta_variant: 'primary_button',
        });
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/preorder-interest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Something went wrong");
            }
            track('preorder_interest_submitted', { page: 'products' });
            navigate("/preorder/unavailable");
        } catch (err) {
            setError(err.message || "Could not submit. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div data-preorder className="space-y-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-4 xs:p-6 sm:p-7">

            {/* Title */}
            <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--primary)] mb-2">
                    Founding Pre-Order
                </p>
                <h1 className="font-display text-[clamp(1.6rem,4vw,2.2rem)] text-[var(--ink)] leading-tight">
                    Steelgate
                </h1>
            </div>

            <hr className="border-[var(--border)]" />

            {/* Pricing */}
            <div className="space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                    <span className="text-[2rem] font-bold text-[var(--ink)] tracking-[-0.03em] leading-none">€45</span>
                    <span className="text-[15px] text-[var(--ink-muted)]">one-time · standard price is €89/year</span>
                </div>
                <p className="text-[13px] text-[var(--ink-muted)]">
                    VAT included · Fully refundable before ship date
                </p>
            </div>

            {/* Founding supporter perks */}
            <div className="space-y-2.5">
                <p className="text-[13px] font-semibold text-[var(--ink)]">What founding supporters get</p>
                <ul className="space-y-2">
                    {[
                        "Hardware at €45, one-time — standard price is €89/year",
                        "First year of any future service updates, free",
                        "Your name on our founding supporters page (opt-in)",
                        "Direct line to the founders for product feedback",
                    ].map(perk => (
                        <li key={perk} className="flex items-start gap-2 text-[13px] text-[var(--ink-muted)] leading-snug">
                            <span className="text-[var(--primary)] shrink-0 font-bold">✓</span>
                            {perk}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Founding spot bar — disabled for now */}
            {/*
            <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                    <span className="text-[13px] font-medium text-[var(--ink)]">Founding spots</span>
                    <span className="text-[13px] font-semibold text-[var(--primary)]">
                        {spots.total - spots.claimed} of {spots.total} remaining
                    </span>
                </div>
                <div className="w-full h-1.5 bg-[var(--bg-alt)] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--primary)] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${(spots.claimed / spots.total) * 100}%` }}
                    />
                </div>
                <p className="text-[12px] text-[var(--ink-muted)]">
                    After 100 founding supporters, Steelgate moves to €89/year. The founding price is permanent for the first cohort — because they're helping us build.
                </p>
            </div>
            */}

            {/* Checkout form */}
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1.5">
                    <label htmlFor="po-name" className="text-[13px] font-medium text-[var(--ink)]">Full name</label>
                    <input
                        id="po-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-xl text-[14px] text-[var(--ink)] bg-[var(--bg)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--ink)] transition-colors duration-150"
                    />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="po-email" className="text-[13px] font-medium text-[var(--ink)]">Email</label>
                    <input
                        id="po-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-xl text-[14px] text-[var(--ink)] bg-[var(--bg)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--ink)] transition-colors duration-150"
                    />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="po-address" className="text-[13px] font-medium text-[var(--ink)]">Shipping address</label>
                    <textarea
                        id="po-address"
                        name="address"
                        rows={3}
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Street, city, postal code, country"
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-xl text-[14px] text-[var(--ink)] bg-[var(--bg)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--ink)] transition-colors duration-150 resize-none"
                    />
                </div>

                {error && <p className="text-[14px] text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-[16px] font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Submitting…" : "Finish Checkout"}
                </button>
            </form>

            <hr className="border-[var(--border)]" />

            {/* Trust row */}
            <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 text-center">
                {["One-time, €45 for life", "All updates included", "Ships Q4 2026"].map(t => (
                    <p key={t} className="text-[12px] text-[var(--ink-muted)] leading-snug">{t}</p>
                ))}
            </div>

            <hr className="border-[var(--border)]" />

            {/* Info sections */}
            <div className="space-y-5">
                {[
                    { title: "What you're pre-ordering", body: "A compact network device that plugs into your router and controls what every device in your home can reach — and when. Block apps and sites on a schedule, household-wide, without touching each device individually." },
                    { title: "Why pre-order now?", body: "Founding supporter spots are capped at 100. Once they're gone, Steelgate moves to €89/year. Pre-ordering now locks in your €45 price for life and ensures you ship first." },
                    { title: "Timeline", body: "We're targeting Q4 2026 for shipment. You'll receive progress updates along the way. Founding customers ship first." },
                ].map(({ title, body }) => (
                    <div key={title}>
                        <p className="text-[14px] font-semibold text-[var(--ink)] mb-1.5">{title}</p>
                        <p className="text-[14px] text-[var(--ink-muted)] leading-[1.65]">{body}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { track } from "../lib/analytics";
import { useSeo } from "../lib/useSeo";

const PERKS = [
    "Hardware at €45, one-time — standard price is €89/year",
    "First year of any future service updates, free",
    "Your name on our founding supporters page (opt-in)",
    "Direct line to the founders for product feedback",
];

export default function CheckoutPage() {
    useSeo({ title: "Checkout — Steelgate Founding Pre-Order" });
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [form, setForm] = useState({ name: "", email: "", address: "" });
    const [status, setStatus] = useState("idle"); // idle | submitting | done
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        track('preorder_clicked', {
            page: 'checkout',
            placement: 'checkout_form',
            cta_text: 'Finish Checkout',
            cta_variant: 'primary_button',
        });
        setStatus("submitting");
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
            track('preorder_interest_submitted', { page: 'checkout' });
            setStatus("done");
        } catch (err) {
            setError(err.message || "Could not submit. Please try again.");
            setStatus("idle");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[var(--bg)] px-5 sm:px-8 pt-28 pb-20">
                <div className="max-w-[1040px] mx-auto">

                    {status === "done" ? (
                        /* ---- Part 2: out-of-stock confirmation ---- */
                        <div className="max-w-[480px] mx-auto text-center space-y-7 py-10">
                            <div className="w-14 h-14 rounded-full bg-[var(--bg-alt)] border border-[var(--border)] flex items-center justify-center mx-auto">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="9" />
                                    <line x1="12" y1="8" x2="12" y2="13" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="font-display text-[clamp(2rem,6vw,3rem)] text-[var(--ink)] tracking-[-0.02em] leading-tight mb-3">
                                    Sorry — we're out of stock.
                                </h1>
                                <p className="text-[16px] text-[var(--ink-muted)] leading-[1.65]">
                                    We've run out of founding units right now, but we've saved your
                                    details and will get back to you as soon as possible — no payment
                                    was taken.
                                </p>
                            </div>
                            <div className="border border-[var(--border)] rounded-2xl bg-[var(--bg-alt)] px-6 py-5 text-left space-y-3">
                                <p className="text-[13px] font-semibold text-[var(--ink-muted)] uppercase tracking-widest">What happens next</p>
                                <ul className="space-y-2.5">
                                    {[
                                        "We've emailed you a confirmation of your request",
                                        "You're in the queue for the next founding batch",
                                        "We'll reach out the moment a spot opens up",
                                        "No charge until a unit is reserved for you",
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-3 text-[15px] text-[var(--ink)]">
                                            <span className="text-[var(--primary)] mt-0.5">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/"
                                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[var(--ink)] hover:bg-black text-white text-[15px] font-semibold transition-colors duration-150">
                                Back to Home
                            </Link>
                        </div>
                    ) : (
                        /* ---- Part 1: information + order summary ---- */
                        <>
                            <div className="mb-8">
                                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--primary)] mb-2">
                                    Checkout
                                </p>
                                <h1 className="font-display text-[clamp(1.8rem,5vw,2.6rem)] text-[var(--ink)] leading-tight">
                                    Reserve your founding Steelgate
                                </h1>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-8 items-start">

                                {/* Information form */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5 bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-5 sm:p-7"
                                >
                                    <p className="text-[13px] font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
                                        1 — Your information
                                    </p>

                                    <div className="space-y-1.5">
                                        <label htmlFor="co-name" className="text-[13px] font-medium text-[var(--ink)]">Full name</label>
                                        <input
                                            id="co-name"
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
                                        <label htmlFor="co-email" className="text-[13px] font-medium text-[var(--ink)]">Email</label>
                                        <input
                                            id="co-email"
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
                                        <label htmlFor="co-address" className="text-[13px] font-medium text-[var(--ink)]">Shipping address</label>
                                        <textarea
                                            id="co-address"
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
                                        disabled={status === "submitting"}
                                        className="w-full py-4 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-[16px] font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "submitting" ? "Finishing…" : "Finish Checkout"}
                                    </button>

                                    <p className="text-[12px] text-[var(--ink-muted)] text-center">
                                        No payment is taken now — your founding price is reserved.
                                    </p>
                                </form>

                                {/* Order summary */}
                                <div className="space-y-5 bg-[var(--bg-alt)] border border-[var(--border)] rounded-2xl p-5 sm:p-7">
                                    <p className="text-[13px] font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
                                        Order summary
                                    </p>

                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[15px] text-[var(--ink)]">Steelgate — Founding Pre-Order</span>
                                        <span className="text-[2rem] font-bold text-[var(--ink)] tracking-[-0.03em] leading-none">€45</span>
                                    </div>
                                    <p className="text-[13px] text-[var(--ink-muted)]">
                                        One-time · VAT included · Fully refundable before ship date · Ships Q4 2026
                                    </p>

                                    <hr className="border-[var(--border)]" />

                                    <ul className="space-y-2">
                                        {PERKS.map(perk => (
                                            <li key={perk} className="flex items-start gap-2 text-[13px] text-[var(--ink-muted)] leading-snug">
                                                <span className="text-[var(--primary)] shrink-0 font-bold">✓</span>
                                                {perk}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </>
                    )}

                </div>
            </div>
            <Footer />
        </>
    );
}

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

const BASE_PRICE = 45;

// Per-field validators. Return "" when the value is acceptable, otherwise the
// message shown next to the field. The API re-validates regardless.
const VALIDATORS = {
    name: (v) => (v.trim() ? "" : "Please enter your name."),
    email: (v) =>
        !v.trim()
            ? "Please enter your email."
            : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
                ? ""
                : "Please enter a valid email address.",
    phone: (v) =>
        !v.trim()
            ? "Please enter your phone number."
            : /^[+\d][\d\s\-().]{5,}$/.test(v.trim())
                ? ""
                : "Please enter a valid phone number.",
};

// Small green tick shown on a correctly-filled field.
function CheckMark() {
    return (
        <svg
            className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--primary)]"
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export default function CheckoutPage() {
    useSeo({ title: "Checkout — Steelgate Founding Order" });
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", promoCode: "", company: "" });
    const [touched, setTouched] = useState({}); // which validated fields have been blurred
    const [status, setStatus] = useState("idle"); // idle | submitting | done
    const [error, setError] = useState(null);
    const [promo, setPromo] = useState({ state: "idle", code: null, discountPct: 0, message: null });
    // state: idle | checking | valid | invalid

    const discountedPrice = promo.state === "valid"
        ? Math.max(0, Math.round(BASE_PRICE * (1 - promo.discountPct / 100)))
        : BASE_PRICE;

    // Once a field has been blurred, errors/ticks update live as the user types.
    const fieldError = (name) => (touched[name] ? VALIDATORS[name](form[name]) : "");
    const fieldValid = (name) => touched[name] && !VALIDATORS[name](form[name]);

    const inputBorder = (name) =>
        fieldError(name)
            ? "border-red-400 focus:border-red-500"
            : fieldValid(name)
                ? "border-[var(--primary)] focus:border-[var(--primary)]"
                : "border-[var(--border)] focus:border-[var(--ink)]";

    const handleBlur = (e) => {
        const { name } = e.target;
        if (VALIDATORS[name]) setTouched(t => ({ ...t, [name]: true }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        // Reset any previously-applied promo when the code is edited.
        if (name === "promoCode" && promo.state !== "idle") {
            setPromo({ state: "idle", code: null, discountPct: 0, message: null });
        }
    };

    const handleCheckPromo = async () => {
        if (promo.state === "checking") return;
        const code = form.promoCode.trim().toUpperCase();
        if (!code) {
            setPromo({ state: "invalid", code: null, discountPct: 0, message: "Enter a code first." });
            return;
        }

        setPromo({ state: "checking", code, discountPct: 0, message: null });

        try {
            const res = await fetch("/api/validate-promo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setPromo({
                    state: "invalid",
                    code,
                    discountPct: 0,
                    message: data.error || "Couldn't check the code. Please try again.",
                });
                return;
            }

            if (!data.valid) {
                setPromo({ state: "invalid", code, discountPct: 0, message: "That code isn't valid." });
                return;
            }

            setPromo({
                state: "valid",
                code: data.code,
                discountPct: data.discountPct,
                message: data.label || "Promo applied",
            });
        } catch {
            setPromo({
                state: "invalid",
                code,
                discountPct: 0,
                message: "Couldn't reach the server. Please try again.",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "submitting") return;

        const name = form.name.trim();
        const email = form.email.trim();
        const phone = form.phone.trim();
        const address = form.address.trim();
        const promoCode = form.promoCode.trim();

        // Client-side validation (the API re-validates regardless). Reveal any
        // per-field errors by marking the validated fields as touched.
        const firstInvalid = Object.keys(VALIDATORS).find(key => VALIDATORS[key](form[key]));
        if (firstInvalid) {
            setTouched({ name: true, email: true, phone: true });
            setError(null);
            document.getElementById(`co-${firstInvalid}`)?.focus();
            return;
        }

        track('preorder_clicked', {
            page: 'checkout',
            placement: 'checkout_form',
            cta_text: 'Finish Checkout',
            cta_variant: 'primary_button',
        });
        setStatus("submitting");
        setError(null);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
            const res = await fetch("/api/preorder-interest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, address, promoCode, company: form.company }),
                signal: controller.signal,
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(
                    data.error ||
                    (res.status >= 500
                        ? "Our server had a problem. Please try again in a moment."
                        : "Please check your details and try again.")
                );
            }

            track('preorder_interest_submitted', {
                page: 'checkout',
                duplicate: !!data.duplicate,
            });
            setStatus("done");
        } catch (err) {
            const message =
                err.name === "AbortError"
                    ? "The request timed out. Please check your connection and try again."
                    : err instanceof TypeError
                        ? "Couldn't reach the server. Please check your connection and try again."
                        : err.message || "Could not submit. Please try again.";
            setError(message);
            setStatus("idle");
        } finally {
            clearTimeout(timeout);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[var(--bg)] px-5 sm:px-8 pt-28 pb-20">
                <div className="max-w-[1040px] mx-auto">

                    {status === "done" ? (
                        /* ---- Part 2: reservation confirmation ---- */
                        <div className="max-w-[480px] mx-auto text-center space-y-7 py-10">
                            <div className="w-14 h-14 rounded-full bg-[var(--bg-alt)] border border-[var(--border)] flex items-center justify-center mx-auto">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="9" />
                                    <polyline points="8 12.5 11 15.5 16.5 10" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="font-display text-[clamp(2rem,6vw,3rem)] text-[var(--ink)] tracking-[-0.02em] leading-tight mb-3">
                                    Reservation confirmed.
                                </h1>
                                <p className="text-[16px] text-[var(--ink-muted)] leading-[1.65]">
                                    Thank you for your support — your reservation has been made.
                                    We'll get back to you shortly with the next steps.
                                </p>
                            </div>
                            <div className="border border-[var(--border)] rounded-2xl bg-[var(--bg-alt)] px-6 py-5 text-left space-y-3">
                                <p className="text-[13px] font-semibold text-[var(--ink-muted)] uppercase tracking-widest">What happens next</p>
                                <ul className="space-y-2.5">
                                    {[
                                        "We've emailed you a confirmation of your reservation",
                                        "Your founding spot is locked in at the price shown",
                                        "We'll reach out shortly with shipping and next steps",
                                        "No payment is needed right now",
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
                                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-2">
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
                                        <div className="relative">
                                            <input
                                                id="co-name"
                                                name="name"
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={!!fieldError("name")}
                                                placeholder="Jane Doe"
                                                className={`w-full px-4 py-3 pr-10 border rounded-xl text-[14px] text-[var(--ink)] bg-[var(--bg)] placeholder:text-[var(--ink-muted)] outline-none transition-colors duration-150 ${inputBorder("name")}`}
                                            />
                                            {fieldValid("name") && <CheckMark />}
                                        </div>
                                        {fieldError("name") && <p className="text-[13px] text-red-600">{fieldError("name")}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="co-email" className="text-[13px] font-medium text-[var(--ink)]">Email</label>
                                        <div className="relative">
                                            <input
                                                id="co-email"
                                                name="email"
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={!!fieldError("email")}
                                                placeholder="your@email.com"
                                                className={`w-full px-4 py-3 pr-10 border rounded-xl text-[14px] text-[var(--ink)] bg-[var(--bg)] placeholder:text-[var(--ink-muted)] outline-none transition-colors duration-150 ${inputBorder("email")}`}
                                            />
                                            {fieldValid("email") && <CheckMark />}
                                        </div>
                                        {fieldError("email") && <p className="text-[13px] text-red-600">{fieldError("email")}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="co-phone" className="text-[13px] font-medium text-[var(--ink)]">Phone</label>
                                        <div className="relative">
                                            <input
                                                id="co-phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                autoComplete="tel"
                                                value={form.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={!!fieldError("phone")}
                                                placeholder="+40 712 345 678"
                                                className={`w-full px-4 py-3 pr-10 border rounded-xl text-[14px] text-[var(--ink)] bg-[var(--bg)] placeholder:text-[var(--ink-muted)] outline-none transition-colors duration-150 ${inputBorder("phone")}`}
                                            />
                                            {fieldValid("phone") && <CheckMark />}
                                        </div>
                                        {fieldError("phone") && <p className="text-[13px] text-red-600">{fieldError("phone")}</p>}
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

                                    <div className="space-y-1.5">
                                        <label htmlFor="co-promo" className="text-[13px] font-medium text-[var(--ink)]">
                                            Promo code <span className="text-[var(--ink-muted)] font-normal">(optional)</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                id="co-promo"
                                                name="promoCode"
                                                type="text"
                                                autoComplete="off"
                                                value={form.promoCode}
                                                onChange={handleChange}
                                                placeholder="FOUNDER10"
                                                className="flex-1 min-w-0 px-4 py-3 border border-[var(--border)] rounded-xl text-[14px] text-[var(--ink)] bg-[var(--bg)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--ink)] transition-colors duration-150 uppercase"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCheckPromo}
                                                disabled={promo.state === "checking"}
                                                className="shrink-0 px-5 rounded-xl border border-[var(--ink)] text-[14px] font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {promo.state === "checking" ? "Checking…" : "Check"}
                                            </button>
                                        </div>
                                        {promo.message && (
                                            <p className={`text-[13px] ${promo.state === "valid" ? "text-[var(--primary)]" : "text-red-600"}`}>
                                                {promo.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Honeypot — hidden from real users, catches bots */}
                                    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                                        <label htmlFor="co-company">Company</label>
                                        <input
                                            id="co-company"
                                            name="company"
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={form.company}
                                            onChange={handleChange}
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

                                    <div className="flex justify-between items-baseline gap-3">
                                        <span className="text-[15px] text-[var(--ink)]">Steelgate — Founding Order</span>
                                        {promo.state === "valid" ? (
                                            <span className="flex items-baseline gap-2">
                                                <span className="text-[1.1rem] font-medium text-[var(--ink-muted)] line-through">€{BASE_PRICE}</span>
                                                <span className="text-[2rem] font-bold text-[var(--primary)] tracking-[-0.03em] leading-none">
                                                    {discountedPrice === 0 ? "Free" : `€${discountedPrice}`}
                                                </span>
                                            </span>
                                        ) : (
                                            <span className="text-[2rem] font-bold text-[var(--ink)] tracking-[-0.03em] leading-none">€{BASE_PRICE}</span>
                                        )}
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

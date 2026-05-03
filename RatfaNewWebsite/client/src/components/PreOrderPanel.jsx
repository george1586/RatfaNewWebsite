import { useState } from "react";
import { createPreorderSession } from "../lib/api";
import { track } from "../lib/analytics";

export default function PreOrderPanel() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePreorder = async () => {
        track('preorder_clicked', { location: 'product_page' });
        setLoading(true);
        setError(null);
        try {
            const { url } = await createPreorderSession();
            track('checkout_started');
            window.location.href = url;
        } catch {
            track('checkout_failed');
            setError("Could not start checkout. Please try again.");
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
                    <span className="text-[2rem] font-bold text-[var(--ink)] tracking-[-0.03em] leading-none">€10</span>
                    <span className="text-[15px] text-[var(--ink-muted)]">deposit now</span>
                </div>
                <p className="text-[15px] text-[var(--ink)]">
                    then <strong>€49/year</strong> for life — vs €89/year regular price
                </p>
                <p className="text-[13px] text-[var(--ink-muted)]">
                    VAT included · Fully refundable before ship date
                </p>
            </div>

            {/* Founding spot bar */}
            <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                    <span className="text-[13px] font-medium text-[var(--ink)]">Founding spots</span>
                    <span className="text-[13px] font-semibold text-[var(--ink)]">87 / 100</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--bg-alt)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: '13%' }} />
                </div>
                <p className="text-[12px] text-[var(--ink-muted)]">13 spots claimed — founding pricing ends at 100</p>
            </div>

            {/* CTA */}
            {error && <p className="text-[14px] text-red-600">{error}</p>}
            <button
                onClick={handlePreorder}
                disabled={loading}
                className="w-full py-4 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-[16px] font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Redirecting…" : "Pre-Order — €10 Deposit"}
            </button>

            <hr className="border-[var(--border)]" />

            {/* Trust row */}
            <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 text-center">
                {["Deposit refundable", "Founding price for life", "Ships Q1 2027"].map(t => (
                    <p key={t} className="text-[12px] text-[var(--ink-muted)] leading-snug">{t}</p>
                ))}
            </div>

            <hr className="border-[var(--border)]" />

            {/* Info sections */}
            <div className="space-y-5">
                {[
                    { title: "What you're pre-ordering", body: "A compact network device that plugs into your router and controls what every device in your home can reach — and when. Block apps and sites on a schedule, household-wide, without touching each device individually." },
                    { title: "Why pre-order now?", body: "Founding customers get Steelgate at €49/year — permanently. After launch, regular pricing will be €89/year. Your €10 deposit reserves your founding spot and is fully refundable if you change your mind before we ship." },
                    { title: "Timeline", body: "We're targeting Q3 2027 for shipment. You'll receive progress updates along the way. Founding customers ship first." },
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

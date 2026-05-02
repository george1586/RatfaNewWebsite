import { useState } from "react";
import { createPreorderSession } from "../lib/api";

export default function PreOrderPanel() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePreorder = async () => {
        setLoading(true);
        setError(null);
        try {
            const { url } = await createPreorderSession();
            window.location.href = url;
        } catch {
            setError("Could not start checkout. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">

            <div>
                <h1 className="text-xl sm:text-5xl font-black text-[var(--text-dark)] [font-family:var(--font-alt)] leading-none">
                    Steelgate
                </h1>
                <p className="text-sm font-semibold text-[var(--primary)] [font-family:var(--font-body)] mt-2 uppercase tracking-widest">
                    Founding Pre-Order
                </p>
            </div>

            <hr className="border-[var(--border-light)]" />

            {/* Pricing */}
            <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-[var(--text-dark)] [font-family:var(--font-alt)]">
                        €10 deposit
                    </span>
                    <span className="text-sm text-[var(--text-dark)] opacity-60 [font-family:var(--font-body)]">
                        now
                    </span>
                </div>
                <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)]">
                    then <strong>€49/year</strong> for life — vs €89/year regular price
                </p>
                <p className="text-xs text-[var(--text-dark)] opacity-60 [font-family:var(--font-body)]">
                    VAT included · Deposit fully refundable before ship date
                </p>
            </div>

            <hr className="border-[var(--border-light)]" />

            {/* Founding spot counter */}
            <div className="rounded-2xl border border-[var(--border-light)] bg-white px-4 py-4 space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                        Founding spots remaining
                    </span>
                    <span className="text-sm font-bold text-[var(--primary)] [font-family:var(--font-alt)]">
                        87 / 100
                    </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: "13%" }} />
                </div>
                <p className="text-xs text-[var(--text-dark)] opacity-60 [font-family:var(--font-body)]">
                    13 spots claimed — founding pricing ends at 100
                </p>
            </div>

            {error && (
                <p className="text-sm text-red-500 [font-family:var(--font-body)]">{error}</p>
            )}

            <button
                onClick={handlePreorder}
                disabled={loading}
                className="w-full py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-2xl font-bold text-lg [font-family:var(--font-alt)] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? "Redirecting to payment…" : "Pre-Order — €10 Deposit"}
            </button>

            <hr className="border-[var(--border-light)]" />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
                <p className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)]">
                    Deposit fully refundable
                </p>
                <p className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)]">
                    Founding price locked for life
                </p>
                <p className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)]">
                    Ships Q1 2027
                </p>
            </div>

            <hr className="border-[var(--border-light)]" />

            {/* Info sections */}
            <div className="space-y-5">
                <div>
                    <h3 className="font-bold text-base text-[var(--text-dark)] [font-family:var(--font-body)] mb-1.5">
                        What you're pre-ordering
                    </h3>
                    <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                        A compact network device that plugs into your router and controls what every device in your home can reach — and when. Block apps and sites on a schedule, household-wide, without touching each device individually.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-base text-[var(--text-dark)] [font-family:var(--font-body)] mb-1.5">
                        Why pre-order now?
                    </h3>
                    <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                        Founding customers get Steelgate at €49/year — permanently. After launch, regular pricing will be €89/year. Your €10 deposit reserves your founding spot and is fully refundable if you change your mind before we ship.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-base text-[var(--text-dark)] [font-family:var(--font-body)] mb-1.5">
                        Timeline
                    </h3>
                    <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                        We're targeting Q3 2027 for shipment. You'll receive progress updates along the way. Founding customers ship first.
                    </p>
                </div>
            </div>

        </div>
    );
}

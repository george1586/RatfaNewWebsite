import { useState } from "react";

export default function WaitlistForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        setError(null);
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Something went wrong");
            }
            setStatus("done");
        } catch (err) {
            setError(err.message);
            setStatus("idle");
        }
    };

    if (status === "done") {
        return (
            <div className="border border-[var(--border)] rounded-2xl px-6 py-5 text-center space-y-1">
                <p className="text-[15px] font-semibold text-[var(--ink)]">You're on the list.</p>
                <p className="text-[13px] text-[var(--ink-muted)]">We'll let you know when Steelgate launches.</p>
            </div>
        );
    }

    return (
        <div className="border border-[var(--border)] rounded-2xl px-6 py-5 space-y-3 bg-[var(--bg-alt)]">
            <p className="text-[14px] font-semibold text-[var(--ink)]">Not ready to pre-order?</p>
            <p className="text-[13px] text-[var(--ink-muted)]">
                Join the waitlist and we'll notify you when Steelgate launches.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row gap-2">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 px-4 py-2.5 border border-[var(--border)] rounded-full text-[14px] text-[var(--ink)] bg-[var(--bg)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--ink)] transition-colors duration-150"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full xs:w-auto px-5 py-2.5 bg-[var(--ink)] hover:bg-black text-white rounded-full text-[14px] font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {status === "loading" ? "…" : "Join waitlist"}
                </button>
            </form>
            {error && <p className="text-[13px] text-red-600">{error}</p>}
        </div>
    );
}

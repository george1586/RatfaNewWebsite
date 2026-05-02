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
            <div className="rounded-2xl border border-[var(--border-light)] bg-white px-5 py-5 text-center space-y-2">
                <p className="font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                    You're on the list.
                </p>
                <p className="text-sm text-[var(--text-dark)] opacity-60 [font-family:var(--font-body)]">
                    We'll let you know when Steelgate launches.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-[var(--border-light)] bg-white px-5 py-5 space-y-3">
            <p className="text-sm font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                Not ready to pre-order?
            </p>
            <p className="text-xs text-[var(--text-dark)] opacity-60 [font-family:var(--font-body)]">
                Join the waitlist and we'll notify you when Steelgate launches.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-dark)] [font-family:var(--font-body)] outline-none focus:border-[var(--primary)] transition-colors"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-4 py-2.5 bg-[var(--text-dark)] hover:bg-black text-white rounded-xl text-sm font-semibold [font-family:var(--font-body)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {status === "loading" ? "…" : "Join"}
                </button>
            </form>
            {error && (
                <p className="text-xs text-red-500 [font-family:var(--font-body)]">{error}</p>
            )}
        </div>
    );
}

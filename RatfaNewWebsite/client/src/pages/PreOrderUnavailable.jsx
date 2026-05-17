import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PreOrderUnavailable() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-[440px] w-full space-y-7">

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
                        We've run out of founding units for now, but we've saved your details and
                        will get back to you as soon as possible — no payment was taken.
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
        </div>
    );
}

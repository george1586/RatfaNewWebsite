import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PreOrderSuccess() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-[440px] w-full space-y-7">

                <div className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center mx-auto">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <div>
                    <h1 className="font-display text-[clamp(2rem,6vw,3rem)] text-[var(--ink)] tracking-[-0.02em] leading-tight mb-3">
                        You're in.
                    </h1>
                    <p className="text-[16px] text-[var(--ink-muted)] leading-[1.65]">
                        Your founding spot is reserved. We've emailed you a confirmation.
                    </p>
                </div>

                <div className="border border-[var(--border)] rounded-2xl bg-[var(--bg-alt)] px-6 py-5 text-left space-y-3">
                    <p className="text-[13px] font-semibold text-[var(--ink-muted)] uppercase tracking-widest">What happens next</p>
                    <ul className="space-y-2.5">
                        {[
                            "Your €10 deposit is confirmed",
                            "Your annual rate is locked at €49/year for life",
                            "You'll hear from us with updates as we build toward Q3 2027",
                            "Founding customers ship first",
                        ].map(item => (
                            <li key={item} className="flex items-start gap-3 text-[15px] text-[var(--ink)]">
                                <span className="text-[var(--primary)] mt-0.5">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-[13px] text-[var(--ink-muted)]">
                    Deposit fully refundable before we ship — no questions asked.
                </p>

                <Link to="/"
                    className="inline-flex items-center px-7 py-3.5 rounded-full bg-[var(--ink)] hover:bg-black text-white text-[15px] font-semibold transition-colors duration-150">
                    Back to Home
                </Link>

            </div>
        </div>
    );
}

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PreOrderSuccess() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-md space-y-6">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center mx-auto">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] [font-family:var(--font-alt)]">
                    You're in.
                </h1>

                <p className="text-base text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                    Your founding spot is reserved. We've emailed you a confirmation with everything you need to know.
                </p>

                <div className="rounded-2xl border border-[var(--border-light)] bg-white px-6 py-5 text-left space-y-3">
                    <p className="text-sm font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">What happens next</p>
                    <ul className="space-y-2 text-sm text-[var(--text-dark)] [font-family:var(--font-body)]">
                        <li>✓ &nbsp;Your €10 deposit is confirmed</li>
                        <li>✓ &nbsp;Your annual rate is locked at €59/year for life</li>
                        <li>✓ &nbsp;You'll hear from us with updates as we build toward Q3 2027</li>
                        <li>✓ &nbsp;Founding customers ship first</li>
                    </ul>
                </div>

                <p className="text-xs text-[var(--text-dark)] opacity-60 [font-family:var(--font-body)]">
                    Your deposit is fully refundable before we ship — no questions asked.
                </p>

                <Link
                    to="/"
                    className="inline-block px-8 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-2xl font-bold [font-family:var(--font-alt)] transition-colors duration-150"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

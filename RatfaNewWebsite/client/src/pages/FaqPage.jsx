import { useState } from "react";
import { faqData } from "../components/Faq";
import Footer from "../components/Footer";

function FaqItem({ question, answer, isOpen, onToggle }) {
    return (
        <div className="border-b border-[var(--border)]">
            <button
                onClick={onToggle}
                className="w-full flex items-start justify-between gap-8 py-7 text-left group"
            >
                <span className="text-[18px] font-semibold text-[var(--ink)] leading-snug tracking-[-0.01em] group-hover:text-[var(--ink-muted)] transition-colors duration-150">
                    {question}
                </span>
                <span
                    className="text-[var(--ink-muted)] text-2xl shrink-0 mt-0.5 transition-transform duration-200 leading-none"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                >
                    +
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] mb-7' : 'max-h-0'}`}>
                <p className="text-[16px] text-[var(--ink-muted)] leading-[1.75] pr-10">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FaqPage() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="bg-[var(--bg)] min-h-screen">

            {/* ── Intro ── */}
            <section className="pt-[calc(var(--header-h)+80px)] pb-16 px-6">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-6">
                        FAQ
                    </p>
                    <h1
                        className="text-[clamp(2.6rem,6vw,4.5rem)] font-display leading-[1.05] tracking-tight text-[var(--ink)] mb-6"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Questions worth asking.
                    </h1>
                    <p className="text-[17px] text-[var(--ink-muted)] leading-relaxed">
                        We're here to help — reach out to{' '}
                        <a href="mailto:hello@steelgate.io" className="text-[var(--ink)] underline underline-offset-2 hover:opacity-60 transition-opacity">
                            hello@steelgate.io
                        </a>
                        {' '}if your question isn't answered below.
                    </p>
                </div>
            </section>

            {/* ── Questions ── */}
            <section className="px-6 pb-24">
                <div className="max-w-[var(--prose-w)] mx-auto border-t border-[var(--border)]">
                    {faqData.map((item, i) => (
                        <FaqItem
                            key={i}
                            question={item.q}
                            answer={item.a}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </section>

            {/* ── Still have questions ── */}
            <section className="px-6 mb-24">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <div
                        className="rounded-2xl p-8 md:p-12 border"
                        style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    >
                        <p className="text-[17px] font-semibold text-[var(--ink)] mb-2">Still have questions?</p>
                        <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed mb-5">
                            We read every email. Drop us a line and we'll get back to you.
                        </p>
                        <a
                            href="mailto:hello@steelgate.io"
                            className="inline-flex items-center px-6 py-3 rounded-full text-white text-[14px] font-semibold transition-colors duration-150"
                            style={{ background: 'var(--ink)' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#000'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
                        >
                            Email us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

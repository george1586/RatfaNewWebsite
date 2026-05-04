import { useState } from "react";

export const faqData = [
    { q: "When will Steelgate ship?", a: "We're targeting Q1 2027. Pre-ordering now locks in your founding price and reserves your spot. We'll keep you updated as production progresses — you'll hear from us before anyone else." },
    { q: "What if I change my mind? Can I cancel my pre-order?", a: "Yes. Your €10 deposit is fully refundable before we ship. Just email us and we'll process the refund within a few days. No questions asked." },
    { q: "Why should I pre-order instead of waiting for the full launch?", a: "Founding customers get Steelgate at €49/year — for life. After launch, the regular price will be €89/year. Pre-ordering is the only way to lock in the founding rate permanently." },
    { q: "Why is the founding price lower? What's the catch?", a: "There's no catch. We're offering a lower lifetime price to the people who believe in Steelgate early — before we've shipped a single unit. That trust helps us validate demand and fund production. In return, you get a permanently lower rate and priority shipping." },
    { q: "What happens if you don't reach 100 pre-orders?", a: "If we don't hit the minimum needed to move to production, every pre-order will be fully refunded. You won't lose anything." },
    { q: "How is Steelgate different from a parental control app or Pi-hole?", a: "Parental control apps only work on the device they're installed on — and your kids can delete them. Pi-hole blocks ads at the DNS level but requires technical setup and doesn't handle scheduling or app-specific blocking. Steelgate sits between your router and your devices, which means it works on every screen in the house automatically — including phones, tablets, laptops, and smart TVs — with no app to install on each device." },
    { q: "Will this slow down my internet or affect streaming and gaming?", a: "No. Steelgate processes traffic locally and is built to add minimal latency. In practice, pages often load faster because ads and tracking scripts are removed before they reach your devices. If something gets blocked that shouldn't be, you can whitelist it instantly." },
    { q: "How does Steelgate protect my privacy? Do you see my traffic?", a: "Steelgate runs entirely on your local network. Filtering decisions happen on-device, not in the cloud. We don't collect or store your browsing data — your traffic stays inside your home." },
    { q: "Is it really plug-and-play, or do I need to configure my router?", a: "It's designed to be as close to plug-and-play as possible. In most setups, you just connect it to your network and it starts working. Advanced users can fine-tune rules, but the default experience is built for people who don't want to touch their router config." },
    { q: "Who is Steelgate for?", a: "Steelgate is for households that want real control over screen time and digital habits — without fighting each device individually, setting up complicated software, or relying on restrictions that are easy to bypass. If you have kids, or you're trying to break your own phone habits, this is built for you." },
];

function FaqItem({ number, question, answer, isOpen, onToggle }) {
    return (
        <div className="border-b border-[var(--border)]">
            <button
                onClick={onToggle}
                className="w-full flex items-start gap-6 py-6 text-left group"
            >
                <span className="text-[12px] font-semibold text-[var(--ink-muted)] tabular-nums mt-1 shrink-0 group-hover:text-[var(--ink)] transition-colors duration-150">
                    {String(number).padStart(2, '0')}
                </span>
                <span className="flex-1 text-[17px] sm:text-[18px] font-medium text-[var(--ink)] leading-snug tracking-[-0.01em]">
                    {question}
                </span>
                <span className="text-[var(--ink-muted)] text-xl mt-0.5 shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                    +
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[400px] mb-6' : 'max-h-0'}`}>
                <p className="pl-[calc(1.5rem+24px)] pr-8 text-[16px] text-[var(--ink-muted)] leading-[1.7]">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="w-full bg-[var(--bg-alt)] px-6 py-[var(--section-y)]">
            <div className="max-w-[var(--content-w)] mx-auto">

                <div className="max-w-[640px] mb-14">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
                        FAQ
                    </p>
                    <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-[var(--ink)] leading-[1.1] tracking-[-0.03em]">
                        Questions worth asking.
                    </h2>
                </div>

                <div className="max-w-[720px]">
                    {faqData.map((item, i) => (
                        <FaqItem
                            key={i}
                            number={i + 1}
                            question={item.q}
                            answer={item.a}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

import { useState } from "react";

const faqData = [
    {
        question: "When will Steelgate ship?",
        answer: "We’re targeting Q3 2027. Pre-ordering now locks in your founding price and reserves your spot. We’ll keep you updated as production progresses — you’ll hear from us before anyone else."
    },
    {
        question: "What if I change my mind? Can I cancel my pre-order?",
        answer: "Yes. Your €10 deposit is fully refundable before we ship. Just email us and we’ll process the refund within a few days. No questions asked."
    },
    {
        question: "Why should I pre-order instead of waiting for the full launch?",
        answer: "Founding customers get Steelgate at €59/year — for life. After launch, the regular price will be €89/year. Pre-ordering is the only way to lock in the founding rate permanently."
    },
    {
        question: "Why is the founding price lower? What’s the catch?",
        answer: "There’s no catch. We’re offering a lower lifetime price to the people who believe in Steelgate early — before we’ve shipped a single unit. That trust helps us validate demand and fund production. In return, you get a permanently lower rate and priority shipping."
    },
    {
        question: "What happens if you don’t reach 100 pre-orders?",
        answer: "If we don’t hit the minimum needed to move to production, every pre-order will be fully refunded. You won’t lose anything."
    },
    {
        question: "How is Steelgate different from a parental control app or Pi-hole?",
        answer: "Parental control apps only work on the device they’re installed on — and your kids can delete them. Pi-hole blocks ads at the DNS level but requires technical setup and doesn’t handle scheduling or app-specific blocking. Steelgate sits between your router and your devices, which means it works on every screen in the house automatically — including phones, tablets, laptops, and smart TVs — with no app to install on each device."
    },
    {
        question: "Will this slow down my internet or affect streaming and gaming?",
        answer: "No. Steelgate processes traffic locally and is built to add minimal latency. In practice, pages often load faster because ads and tracking scripts are removed before they reach your devices. If something gets blocked that shouldn’t be, you can whitelist it instantly."
    },
    {
        question: "How does Steelgate protect my privacy? Do you see my traffic?",
        answer: "Steelgate runs entirely on your local network. Filtering decisions happen on-device, not in the cloud. We don’t collect or store your browsing data — your traffic stays inside your home."
    },
    {
        question: "Is it really plug-and-play, or do I need to configure my router?",
        answer: "It’s designed to be as close to plug-and-play as possible. In most setups, you just connect it to your network and it starts working. Advanced users can fine-tune rules, but the default experience is built for people who don’t want to touch their router config."
    },
    {
        question: "Who is Steelgate for?",
        answer: "Steelgate is for households that want real control over screen time and digital habits — without fighting each device individually, setting up complicated software, or relying on restrictions that are easy to bypass. If you have kids, or you’re trying to break your own phone habits, this is built for you."
    }
];

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-24 bg-[#f0f0f0]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-landing)]">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-[var(--text-light)]">
                        Everything you need to know about Steelgate.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="border border-[var(--border-light)] rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center px-6 py-5 text-left"
                            >
                                <span className="text-lg text-[var(--text-landing)]">
                                    {item.question}
                                </span>

                                <span className="text-[var(--text-light)] text-xl">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-[300px]" : "max-h-0"
                                    }`}
                            >
                                <p className="px-6 pb-5 text-[var(--text-light)]">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
import { useState } from "react";

const faqData = [
    {
        question: "How is Steelgate different from something like Pi-hole or browser ad blockers?",
        answer: "Most tools like Pi-hole or browser extensions only block ads at the DNS or browser level, which means they miss a lot of traffic — especially inside mobile apps or smart TVs. Steelgate works at the network level and analyzes traffic across all devices, regardless of platform. It goes beyond simple domain blocking by applying real-time filtering and detection logic, giving you actual control over what reaches your network."
    },
    {
        question: "Does Steelgate protect against phishing or malicious websites?",
        answer: "Yes. Steelgate is designed to stop threats in real time, including phishing attempts, malicious domains, and suspicious traffic patterns. Instead of relying only on static blocklists, it can identify risky behavior and block connections before a device even loads the page. This is especially important for the most vulnerable users — like family members or employees — who may not recognize a phishing attempt before it's too late."
    },
    {
        question: "How does the real-time protection actually work?",
        answer: "Steelgate sits inside your network and monitors outgoing requests as they happen. When a device tries to connect to a domain or service, the system evaluates it using a combination of known threat intelligence, behavior patterns, and filtering rules. If something looks suspicious — like a known phishing endpoint or a domain behaving like one — the request is blocked instantly. This happens locally, without sending your data to external servers."
    },
    {
        question: "Will this slow down my internet or affect streaming/gaming?",
        answer: "In normal use, you shouldn’t notice any slowdown. Steelgate processes traffic locally and is optimized to handle requests efficiently, so it avoids the latency of cloud-based filtering. In some cases, things may actually feel faster because ads, trackers, and unnecessary requests are removed before they load. If a service behaves unexpectedly, you can always whitelist it instantly."
    },
    {
        question: "How does Steelgate protect my privacy? Do you see my traffic?",
        answer: "Steelgate runs locally in your network, which means your traffic stays inside your environment. Filtering decisions are made on-device, not in the cloud. We don’t collect or store browsing data. The goal is to give you control and visibility without introducing another party into your data flow."
    },
    {
        question: "Is it really plug-and-play, or do I need to configure my router?",
        answer: "Steelgate is designed to be as close to plug-and-play as possible. In most setups, you just connect it to your network and it starts working automatically. Advanced users can fine-tune behavior, but the default experience is built for people who don’t want to deal with router configs or complex networking setups."
    },
    {
        question: "Can Steelgate be used in a business environment?",
        answer: "Yes. Steelgate can give business owners visibility into network usage without requiring constant supervision. You can see patterns like which services are being accessed, detect risky behavior, and enforce basic policies — all at the network level. It’s not about micromanaging employees, but about maintaining a secure and productive environment without adding friction."
    },
    {
        question: "What happens if something breaks or a site stops working?",
        answer: "Because Steelgate actively filters traffic, there may be rare cases where something gets blocked incorrectly. When that happens, you can quickly whitelist a service or disable filtering for that specific case. The system is designed to give you control, not lock you out."
    },
    {
        question: "Why would I pay for this instead of using free tools?",
        answer: "Free tools typically solve a narrow part of the problem — like blocking known ad domains. Steelgate is built as a full network control and protection layer: real-time threat detection, better handling of modern apps, and a unified system across all devices. The subscription supports continuous updates, improved detection, and new features over time."
    },
    {
        question: "Who is this actually for?",
        answer: "Steelgate is for people who want more control over their network without becoming network engineers. That includes privacy-focused users, families who want safer internet access, and businesses that need better visibility and protection without deploying complex infrastructure."
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
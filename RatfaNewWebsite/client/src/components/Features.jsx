import { useEffect, useRef, useState } from "react";

const features = [
    { title: "App & Site Blocking",      desc: "Block TikTok, Instagram, Reddit, YouTube, or any site — on every device in the house, without touching each one individually." },
    { title: "Custom Schedules",         desc: "Set different rules for weekdays, weekends, homework time, and bedtime. The schedule runs itself." },
    { title: "Household-Wide Coverage",  desc: "Works on every device automatically — phones, tablets, laptops, smart TVs. No app to install on each device." },
    { title: "Ad & Tracker Blocking",    desc: "Removes ads and tracking scripts before they load, across all devices and apps. Faster pages, less noise." },
    { title: "Adult Content Filtering",  desc: "Block categories of content network-wide without configuring each device separately." },
    { title: "Dopamine Detox Mode",      desc: "Disable short-form video feeds while keeping messaging and other functions of a platform intact." },
    { title: "Real-Time Threat Blocking",desc: "Known phishing domains, malware endpoints, and suspicious traffic are blocked before a device ever loads them." },
    { title: "Privacy Protection",       desc: "Your traffic stays on your network. No data leaves your home and your ISP can't see what you're browsing." },
    { title: "Easy To Set Up",           desc: "Connect it to your network. That's it. No router config, no IT knowledge needed." },
    { title: "Easy To Manage",           desc: "A simple local dashboard lets you adjust rules, check activity, and whitelist anything that gets blocked incorrectly." },
];

function Feature({ title, desc }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.25 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`flex gap-5 items-start transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
        >
            <div className="w-px h-full min-h-[40px] bg-[var(--border)] self-stretch shrink-0 mt-1" />
            <div className="pb-8">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[var(--ink)] tracking-[-0.02em] mb-2">
                    {title}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[var(--ink-muted)] leading-[1.65] max-w-[440px]">
                    {desc}
                </p>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <section id="features" className="w-full px-6 py-[var(--section-y)] bg-[var(--bg)]">
            <div className="max-w-[var(--content-w)] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* Sticky left */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="lg:sticky lg:top-24">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
                            Features
                        </p>
                        <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-[var(--ink)] leading-[1.1] tracking-[-0.03em] mb-6">
                            Give your household its attention back.
                        </h2>
                        <p className="text-[16px] text-[var(--ink-muted)] leading-[1.65]">
                            One device that controls every screen in your home — without complicated setup or easy bypasses.
                        </p>
                    </div>
                </div>

                {/* Scrolling features */}
                <div className="flex-1 pt-1">
                    {features.map((f, i) => (
                        <Feature key={i} title={f.title} desc={f.desc} />
                    ))}
                </div>

            </div>
        </section>
    );
}

import appBlockingImg from "../assets/images/feature-app-blocking.svg";
import schedulesImg from "../assets/images/feature-schedules.svg";
import coverageImg from "../assets/images/feature-coverage.svg";
import adBlockingImg from "../assets/images/feature-ad-blocking.svg";
import contentFilterImg from "../assets/images/feature-content-filter.svg";
import privacyImg from "../assets/images/feature-privacy.svg";
import firewallImg from "../assets/images/feature-firewall.svg";
import { useState, useEffect, useRef } from "react";

const features = [
    { title: "App & Site Blocking",      img: appBlockingImg },
    { title: "Custom Schedules",         img: schedulesImg },
    { title: "Household-Wide Coverage",  img: coverageImg },
    { title: "Ad & Tracker Blocking",    img: adBlockingImg },
    { title: "Adult Content Filtering",  img: contentFilterImg },
    { title: "Privacy Protection",       img: privacyImg },
    { title: "Firewall",                 img: firewallImg },
];

export default function FeaturesShowcase() {
    const [active, setActive] = useState(0);
    const [displayed, setDisplayed] = useState(0);
    const [visible, setVisible] = useState(true);
    const [inView, setInView] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.4 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView || userInteracted) return;
        const id = setInterval(() => setActive(p => (p + 1) % features.length), 2200);
        return () => clearInterval(id);
    }, [inView, userInteracted]);

    useEffect(() => {
        if (active === displayed) return;
        setVisible(false);
        const id = setTimeout(() => { setDisplayed(active); setVisible(true); }, 180);
        return () => clearTimeout(id);
    }, [active, displayed]);

    return (
        <section ref={sectionRef} className="w-full bg-[var(--bg-alt)] px-6 py-[var(--section-y)]">
            <div className="max-w-[var(--content-w)] mx-auto">

                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4 text-center">
                    What it does
                </p>
                <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em] text-center mb-14">
                    Everything, network-wide.
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="w-full max-w-[360px] aspect-square rounded-2xl bg-[var(--bg)] border border-[var(--border)] overflow-hidden">
                            <img
                                src={features[displayed].img}
                                alt={features[displayed].title}
                                className={`w-full h-full object-cover transition-all duration-200 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'}`}
                            />
                        </div>
                    </div>

                    {/* Feature list */}
                    <div className="w-full md:w-1/2 flex flex-col gap-1">
                        {features.map((f, i) => (
                            <button
                                key={i}
                                onClick={() => { setActive(i); setUserInteracted(true); }}
                                className={`flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200 ${active === i ? 'bg-[var(--bg)] shadow-sm' : 'hover:bg-[var(--bg)]/60'}`}
                            >
                                <div className={`w-1.5 h-6 rounded-full flex-shrink-0 transition-all duration-200 ${active === i ? 'bg-[var(--ink)]' : 'bg-[var(--border)] scale-y-75'}`} />
                                <span className={`text-[17px] font-medium transition-colors duration-200 ${active === i ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)]'}`}>
                                    {f.title}
                                </span>
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

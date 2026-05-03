import { useEffect, useRef, useState } from "react";
import LifeImg from "../assets/images/EnjoyLife.jpg"
import FamilyImg from "../assets/images/family.jpg"
import LearningImg from "../assets/images/learning.png"
import LockIn from "../assets/images/lockin.png"

const cards = [
    {
        src: LockIn,
        alt: "Lock in at the office, protect your most productive hours",
    },
    {
        src: LearningImg,
        alt: "Study without distractions. Stay focused and retain more.",
    },
    {
        src: FamilyImg,
        alt: "Woman lifting a child in a kitchen with a text bubble about being present and putting down the phone to show up fully",
    },
    {
        src: LifeImg,
        alt: "Enjoy the world around you. Reconnect with what matters most.",
    },
];

function ScenarioCard({ src, alt, index }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.12 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="overflow-hidden rounded-2xl aspect-[3/4]"
            style={{
                transition: `opacity 0.6s ease-out ${index * 100}ms, transform 0.6s ease-out ${index * 100}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
            }}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                loading="lazy"
            />
        </div>
    );
}

export default function Scenarios() {
    return (
        <section className="w-full px-6 py-[var(--section-y)] bg-[var(--bg-alt)]">
            <div className="max-w-[var(--content-w)] mx-auto">

                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4 text-center">
                    In practice
                </p>
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--ink)] tracking-[-0.03em] leading-[1.1] text-center mb-14 max-w-[680px] mx-auto">
                    Unlike anything you've tried before.
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                    {cards.map((card, i) => (
                        <ScenarioCard key={i} {...card} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}

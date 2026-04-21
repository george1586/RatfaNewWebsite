import { useEffect, useRef, useState } from "react";

function Features() {
    return (
        <section className="flex flex-col lg:flex-row pl-6 lg:px-12 py-24">

            <div className="w-full lg:w-1/2">

                <div className="lg:sticky lg:top-24">
                    <div className="max-w-[500px]">
                        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-landing)]">
                            Strengthen Your Digital Defense
                        </h1>

                        <p className="mt-6 text-[var(--text-light)]">
                            Stay ahead of cyber threats with hands-on training.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <span className="px-4 py-2 border border-[var(--border-light)] rounded">
                                500+ Breaches Stopped
                            </span>
                            <span className="px-4 py-2 border border-[var(--border-light)] rounded">
                                1M+ Data Secured
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="
        hidden lg:block
        w-[3px]
        bg-[var(--border-light)]
        mr-8
    " />
            <div className="
                w-full lg:w-1/2
                lg: max-h-1/2
                flex flex-col
                gap-24
                mt-16 lg:mt-0
            ">

                <Feature title="Risk Awareness Training" />
                <Feature title="Phishing Attack Defense" />
                <Feature title="Incident Response Drills" />
                <Feature title="Penetration Testing Basics" />
                <Feature title="Data Protection Strategies" />
                <Feature title="Threat Intelligence Services" />

            </div>

        </section>
    );
}
function Feature({ title }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            {
                threshold: 0.3
            }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`
                flex gap-4 items-start
                transition-all duration-700 ease-out
                ${visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"}
            `}
        >
            <div className="w-10 h-10 border border-[var(--border-light)] flex items-center justify-center rounded">
                ✔
            </div>

            <div>
                <h3 className="text-xl sm:text-2xl text-[var(--text-landing)]">
                    {title}
                </h3>

                <p className="mt-2 max-w-sm text-[var(--text-light)]">
                    Learn to detect threats and respond effectively.
                </p>
            </div>
        </div>
    );
}

export default Features;
import { useEffect, useRef, useState } from "react";

function Features() {
    return (
        <section className="flex flex-col lg:flex-row px-6 lg:px-12 py-24">

            <div className="w-full lg:w-1/2">

                <div className="lg:sticky lg:top-24">
                    <div className="max-w-[500px] ml-auto">
                        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-landing)]">
                            Strengthen Your Digital Defense
                        </h1>

                        <p className="mt-6 text-[var(--text-light)]">
                            Stay ahead of cyber threats, ads, trackers and make the most out of your network without any technical knowledge
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <span className="px-4 py-2 border border-[var(--border-light)] rounded">
                                500+ Breaches Stopped
                            </span>
                            <span className="px-4 py-2 border border-[var(--border-light)] rounded">
                                1M+ Data Secured
                            </span>
                            <span className="px-4 py-2 border border-[var(--border-light)] rounded">
                                3M+ Ads Blocked Stopped
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
                gap-12
                lg:gap-24
                mt-16 lg:mt-0
            ">

                <Feature title="Real Time Protection" desc="A locally run AI processes websites to let you know if they are safe or not" />
                <Feature title="Ad And Tracker Blocker" desc="Permanent list of known ads and trackers is continuosly blocked before even loading on your screen" />
                <Feature title="Phishing Attack Defense" desc="Permanent list of known phishing websites and malware is continuosly blocked before even loading on your screen" />
                <Feature title="Parental Control" desc="Control what your child/elders can see online, or if they can even browse online" />
                <Feature title="Easy To Set Up" desc="Plug it up, make sure you connect the included ethernet cable into Steelgate and forget about it" />
                <Feature title="Easy To Use And Manage" desc="Really intuitive local website will be enabled once the device boots up, also there is a build for mobile app" />
                <Feature title="Real Data Protection" desc="With a own DNS, not even your ISP will be able to see what you are browsing for online" />
                <Feature title="No Information Leaves Your Home" desc="We don't see your data and make sure it is private so no information leaves your home" />

            </div>

        </section>
    );
}
function Feature({ title, desc }) {
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
                    {desc}
                </p>
            </div>
        </div>
    );
}

export default Features;
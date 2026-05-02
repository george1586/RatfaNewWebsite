import { useEffect, useRef, useState } from "react";

function Features() {
    return (
        <section className="flex flex-col lg:flex-row px-6 lg:px-12 py-24">

            <div className="w-full lg:w-1/2">

                <div className="lg:sticky lg:top-24">
                    <div className="max-w-[500px] ml-auto">
                        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-landing)]">
                            Give your household its attention back.
                        </h1>

                        <p className="mt-6 text-[var(--text-light)]">
                            One device that controls every screen in your home — without complicated setup or easy bypasses.
                        </p>
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

                <Feature title="App & Site Blocking" desc="Block TikTok, Instagram, Reddit, YouTube, or any site — on every device in the house, without touching each one individually." />
                <Feature title="Custom Schedules" desc="Set different rules for weekdays, weekends, homework time, and bedtime. The schedule runs itself." />
                <Feature title="Household-Wide Coverage" desc="Works on every device automatically — phones, tablets, laptops, smart TVs. No app to install on each device." />
                <Feature title="Ad & Tracker Blocking" desc="Removes ads and tracking scripts before they load, across all devices and apps. Faster pages, less noise." />
                <Feature title="Adult Content Filtering" desc="Block categories of content network-wide without configuring each device separately." />
                <Feature title="Dopamine Detox Mode" desc="Disable short-form video feeds while keeping messaging and other functions of a platform intact." />
                <Feature title="Real-Time Threat Blocking" desc="Known phishing domains, malware endpoints, and suspicious traffic are blocked before a device ever loads them." />
                <Feature title="Privacy Protection" desc="Your traffic stays on your network. No data leaves your home and your ISP can't see what you're browsing." />
                <Feature title="Easy To Set Up" desc="Connect it to your network. That's it. No router config, no IT knowledge needed." />
                <Feature title="Easy To Manage" desc="A simple local dashboard lets you adjust rules, check activity, and whitelist anything that gets blocked incorrectly." />

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
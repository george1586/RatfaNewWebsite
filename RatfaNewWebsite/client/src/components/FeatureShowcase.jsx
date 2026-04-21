import firewallImg from "../assets/images/ratfa.png";
import parentalImg from "../assets/images/productimage.png";
import { useState, useEffect, useRef } from "react";

const features = [
    { title: "Firewall", img: firewallImg },
    { title: "Parental Control", img: parentalImg },
    { title: "VPN Server & Client" },
    { title: "Ad Block" },
    { title: "Intrusion Prevention" },
    { title: "Network Segment" },
    { title: "Bandwidth Usage" },
];


function FeaturesShowcase() {
    const [active, setActive] = useState(0);
    const [displayed, setDisplayed] = useState(0);
    const [visible, setVisible] = useState(true);
    const [inView, setInView] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);

    const sectionRef = useRef(null);

    // 👁️ Detect when section enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 🔄 Auto scroll logic
    useEffect(() => {
        if (!inView || userInteracted) return;

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % features.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [inView, userInteracted]);

    // 🎬 Fade animation
    useEffect(() => {
        if (active !== displayed) {
            setVisible(false);

            const timeout = setTimeout(() => {
                setDisplayed(active);
                setVisible(true);
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [active, displayed]);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[var(--bg-top)] px-6 md:px-16 py-20"
        >
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* IMAGE */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={features[displayed].img}
                        className={`
                            w-full max-w-[350px] object-contain
                            transition-all duration-300
                            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                        `}
                    />
                </div>

                {/* FEATURES */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setActive(index);
                                setUserInteracted(true); // 🛑 stop autoplay
                            }}
                            className={`
                                flex items-center gap-4 cursor-pointer
                                transition-all duration-300
                                ${active === index
                                    ? "text-black"
                                    : "text-gray-400"}
                            `}
                        >
                            <div
                                className={`
                                    w-[4px] h-10 rounded
                                    transition-all duration-300
                                    ${active === index
                                        ? "bg-purple-500"
                                        : "bg-transparent"}
                                `}
                            />

                            <div className="text-xl opacity-80">●</div>

                            <span className="text-lg sm:text-xl font-medium">
                                {feature.title}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default FeaturesShowcase;
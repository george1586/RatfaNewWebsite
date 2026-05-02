import { useState } from "react";
import { ShieldCheck, ChevronDown, Check, X } from "lucide-react";
import PreOrderPanel from "./PreOrderPanel";
import productImg from "../assets/images/productimage.png";
import steelgateImg from "../assets/images/steelgate.png";
import heroImg from "../assets/images/newImgHero.png";
import ratfaImg from "../assets/images/ratfa.png";

const thumbnails = [productImg, steelgateImg, heroImg, ratfaImg];

const howItWorksSteps = [
    { title: "Plug it into your router", desc: "Connect Steelgate to your existing router with the included ethernet cable. No rewiring, no IT knowledge — takes under a minute." },
    { title: "Download the app", desc: "Get the Steelgate app on iOS or Android. Your device is detected automatically within seconds of plugging in." },
    { title: "Set your rules", desc: "Choose which apps and sites to block, for which devices, and on what schedule. TikTok off after 9pm, Reddit off during homework hours — you decide." },
    { title: "Forget about it", desc: "Your schedule runs automatically. You're in control without having to think about it every day." },
];

const appFeatures = [
    { label: "Block & Unblock Devices", desc: "Instantly cut or restore internet access for any device on your network from anywhere in the world." },
    { label: "Customize Sites & Apps", desc: "Build a blocklist tailored to your household or workplace. Block social media, adult content, gambling — or anything you choose." },
    { label: "Schedule Blocking", desc: "Set time-based rules so certain content is only available at certain hours. Perfect for kids' bedtimes or work-hour focus." },
    { label: "View Network History", desc: "See a full log of every domain visited across all devices, with timestamps and categories." },
    { label: "Remote Access", desc: "Manage your network from anywhere via the Steelgate app — no VPN or port forwarding required." },
    { label: "Strict Mode", desc: "Lock down the network completely with one tap. Great for study sessions or when you need a distraction-free environment." },
];

const comparisonRows = [
    { label: "Works on every device automatically", steelgate: true, router: false, vpn: false },
    { label: "Can't be bypassed or uninstalled by kids", steelgate: true, router: false, vpn: false },
    { label: "Schedule-based blocking", steelgate: true, router: false, vpn: false },
    { label: "App & site-specific filtering", steelgate: true, router: false, vpn: false },
    { label: "Ad & tracker blocking", steelgate: true, router: false, vpn: true },
    { label: "No technical setup required", steelgate: true, router: false, vpn: true },
];

function StepAccordion({ steps }) {
    const [open, setOpen] = useState(0);
    return (
        <div className="space-y-2">
            {steps.map((step, i) => (
                <div key={i} className="border border-[var(--border-light)] rounded-xl overflow-hidden bg-white">
                    <button
                        onClick={() => setOpen(open === i ? -1 : i)}
                        className="w-full flex justify-between items-center px-5 py-4 text-left gap-4"
                    >
                        <span className="font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                            {String(i + 1).padStart(2, "0")}. {step.title}
                        </span>
                        <ChevronDown
                            size={18}
                            className={`shrink-0 text-[var(--text-dark)] transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                        />
                    </button>
                    {open === i && (
                        <p className="px-5 pb-4 text-sm text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                            {step.desc}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}


function ProductShowcase() {
    const [activeImg, setActiveImg] = useState(0);
    const [activeTab, setActiveTab] = useState("blocked");
    const [openFeature, setOpenFeature] = useState(null);

    return (
        <div className="w-full">

            {/* ── 1. Product hero ── */}
            <section className="w-full px-6 pt-[96px] pb-20 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left — gallery */}
                    <div className="flex flex-col gap-3">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#f0f0f0] flex items-center justify-center">
                            <img
                                src={thumbnails[activeImg]}
                                alt="Steelgate Device"
                                className="w-full h-full object-contain p-6"
                            />
                        </div>
                        <div className="flex gap-2">
                            {thumbnails.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`w-[70px] h-[70px] rounded-lg border-2 overflow-hidden flex items-center justify-center bg-[#f0f0f0] transition-all ${activeImg === i
                                            ? "border-[var(--primary)]"
                                            : "border-[var(--border-light)] hover:border-[var(--text-dark)]"
                                        }`}
                                >
                                    <img src={img} className="w-full h-full object-contain p-1" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-[88px]">
                        <PreOrderPanel />
                    </div>
                </div>
            </section>

            {/* ── 2. How It Works ── */}
            <section className="w-full px-6 py-20 border-t border-[var(--border-light)]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[var(--text-dark)] [font-family:var(--font-alt)] mb-12">
                        Up and running in under a minute
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center order-last lg:order-first">
                            <span className="text-gray-500 text-sm [font-family:var(--font-body)]">Device Lifestyle Image</span>
                        </div>
                        <StepAccordion steps={howItWorksSteps} />
                    </div>
                </div>
            </section>

            {/* ── 3. Stats ── */}
            <section className="w-full bg-[var(--bg-top)] px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] [font-family:var(--font-alt)] mb-2">
                        The numbers behind household screen time
                    </h2>
                    <p className="text-[var(--text-dark)] [font-family:var(--font-body)] mb-12 text-sm">
                        Why families are choosing a hardware-level solution
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        {[
                            { stat: "4.8h", label: "Average daily screen time", sub: "Per person in a household — adults included" },
                            { stat: "67%", label: "Kids bypass app limits", sub: "Most software controls are easy to get around" },
                            { stat: "1 device", label: "Controls your whole home", sub: "Every phone, tablet, laptop, and smart TV" },
                        ].map(({ stat, label, sub }) => (
                            <div key={label} className="border border-[var(--border-light)] rounded-2xl bg-white px-6 py-8 text-center">
                                <p className="text-4xl font-bold text-[var(--text-dark)] [font-family:var(--font-alt)]">{stat}</p>
                                <p className="text-base font-semibold text-[var(--text-dark)] mt-1 [font-family:var(--font-body)]">{label}</p>
                                <p className="text-xs text-[var(--text-dark)] opacity-60 mt-2 [font-family:var(--font-body)]">{sub}</p>
                            </div>
                        ))}
                    </div>
                    <a href="/products" className="inline-block px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl font-bold text-base [font-family:var(--font-alt)] transition-colors duration-150">
                        Pre-Order — €10 Deposit
                    </a>
                </div>
            </section>

            {/* ── 4. App Features ── */}
            <section className="w-full px-6 py-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[var(--text-dark)] [font-family:var(--font-alt)] mb-8">
                        Our app gives you full control
                    </h2>

                    <div className="flex justify-center gap-2 mb-10">
                        {["blocked", "allowed"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold [font-family:var(--font-body)] transition-all ${activeTab === tab
                                        ? "bg-[var(--text-dark)] text-white"
                                        : "bg-[var(--border-light)] text-[var(--text-dark)] hover:bg-gray-300"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="w-full h-[300px] sm:h-[380px] rounded-2xl bg-gray-200 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center gap-2 mb-12">
                        <span className="text-gray-500 text-sm [font-family:var(--font-body)]">App Dashboard Screenshots</span>
                        <span className="text-gray-400 text-xs [font-family:var(--font-body)]">
                            {activeTab === "blocked" ? "Blocked Content View" : "Allowed Content View"}
                        </span>
                    </div>

                    <div className="space-y-2 max-w-xl mx-auto">
                        {appFeatures.map((feature, i) => (
                            <div key={i} className="border border-[var(--border-light)] rounded-xl overflow-hidden bg-white">
                                <button
                                    onClick={() => setOpenFeature(openFeature === i ? null : i)}
                                    className="w-full flex justify-between items-center px-5 py-4 text-left gap-4"
                                >
                                    <span className="text-sm font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                                        {feature.label}
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className={`shrink-0 text-[var(--text-dark)] transition-transform duration-200 ${openFeature === i ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {openFeature === i && (
                                    <p className="px-5 pb-4 text-sm text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                                        {feature.desc}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. Comparison Table ── */}
            <section className="w-full bg-[var(--bg-top)] px-6 py-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[var(--text-dark)] [font-family:var(--font-alt)] mb-12">
                        What sets us apart
                    </h2>
                    <div className="overflow-x-auto rounded-2xl border border-[var(--border-light)]">
                        <table className="w-full border-collapse bg-white">
                            <thead>
                                <tr className="border-b border-[var(--border-light)]">
                                    <th className="text-left py-4 px-5 w-1/2" />
                                    <th className="py-4 px-4 text-center">
                                        <div className="flex flex-col items-center gap-1.5">
                                            <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                                                <ShieldCheck size={16} className="text-white" />
                                            </div>
                                            <span className="text-xs font-bold text-[var(--text-dark)] [font-family:var(--font-body)]">Steelgate</span>
                                        </div>
                                    </th>
                                    <th className="py-4 px-4 text-center text-xs font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                                        Phone<br />Controls
                                    </th>
                                    <th className="py-4 px-4 text-center text-xs font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                                        DNS<br />Tool
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map(({ label, steelgate, router, vpn }, i) => (
                                    <tr key={i} className={`${i < comparisonRows.length - 1 ? "border-b border-[var(--border-light)]" : ""} ${i % 2 === 1 ? "bg-gray-50" : ""}`}>
                                        <td className="py-3.5 px-5 text-sm text-[var(--text-dark)] [font-family:var(--font-body)]">{label}</td>
                                        <td className="py-3.5 px-4 text-center">
                                            {steelgate ? <Check size={18} className="mx-auto text-[var(--primary)]" /> : <X size={18} className="mx-auto text-gray-300" />}
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            {router ? <Check size={18} className="mx-auto text-[var(--primary)]" /> : <X size={18} className="mx-auto text-gray-300" />}
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            {vpn ? <Check size={18} className="mx-auto text-[var(--primary)]" /> : <X size={18} className="mx-auto text-gray-300" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── 6. Testimonials ── */}
            <section className="w-full px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[var(--text-dark)] [font-family:var(--font-alt)] mb-10">
                        What our customers are saying
                    </h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                        {["Customer 1", "Customer 2", "Customer 3", "Customer 4"].map((name, i) => (
                            <div
                                key={i}
                                className="min-w-[260px] sm:min-w-[300px] h-[380px] rounded-2xl bg-gray-200 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center gap-2 snap-start flex-shrink-0"
                            >
                                <span className="text-gray-500 text-sm [font-family:var(--font-body)]">Testimonial Video</span>
                                <span className="text-gray-400 text-xs [font-family:var(--font-body)]">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default ProductShowcase;

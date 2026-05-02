import { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import PreOrderPanel from "./PreOrderPanel";
import WaitlistForm from "./WaitlistForm";
import productImg  from "../assets/images/productimage.png";
import steelgateImg from "../assets/images/steelgate.png";
import heroImg     from "../assets/images/newImgHero.png";
import ratfaImg    from "../assets/images/ratfa.png";

const thumbnails = [productImg, steelgateImg, heroImg, ratfaImg];

const howItWorksSteps = [
    { title: "Plug it into your router",    desc: "Connect Steelgate to your existing router with the included ethernet cable. No rewiring, no IT knowledge — takes under a minute." },
    { title: "Download the app",            desc: "Get the Steelgate app on iOS or Android. Your device is detected automatically within seconds of plugging in." },
    { title: "Set your rules",              desc: "Choose which apps and sites to block, for which devices, and on what schedule. TikTok off after 9pm, Reddit off during homework hours — you decide." },
    { title: "Forget about it",             desc: "Your schedule runs automatically. You're in control without having to think about it every day." },
];

const appFeatures = [
    { label: "Block & Unblock Devices",  desc: "Instantly cut or restore internet access for any device on your network from anywhere in the world." },
    { label: "Customize Sites & Apps",   desc: "Build a blocklist tailored to your household. Block social media, adult content, gambling — or anything you choose." },
    { label: "Schedule Blocking",        desc: "Set time-based rules so certain content is only available at certain hours. Perfect for kids' bedtimes or focus hours." },
    { label: "View Network History",     desc: "See a full log of every domain visited across all devices, with timestamps and categories." },
    { label: "Remote Access",            desc: "Manage your network from anywhere via the Steelgate app — no VPN or port forwarding required." },
    { label: "Strict Mode",              desc: "Lock down the network completely with one tap. Great for study sessions or distraction-free time." },
];

const comparisonRows = [
    { label: "Works on every device automatically",       sg: true,  phone: false, dns: false },
    { label: "Can't be bypassed or uninstalled by kids",  sg: true,  phone: false, dns: false },
    { label: "Schedule-based blocking",                   sg: true,  phone: false, dns: false },
    { label: "App & site-specific filtering",             sg: true,  phone: false, dns: false },
    { label: "Ad & tracker blocking",                     sg: true,  phone: false, dns: true  },
    { label: "No technical setup required",               sg: true,  phone: false, dns: true  },
];

function StepAccordion({ steps }) {
    const [open, setOpen] = useState(0);
    return (
        <div className="divide-y divide-[var(--border)]">
            {steps.map((step, i) => (
                <div key={i}>
                    <button
                        onClick={() => setOpen(open === i ? -1 : i)}
                        className="w-full flex items-center gap-5 py-5 text-left group"
                    >
                        <span className="text-[12px] font-semibold text-[var(--ink-muted)] tabular-nums shrink-0">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 text-[16px] font-semibold text-[var(--ink)]">{step.title}</span>
                        <ChevronDown size={16} className={`shrink-0 text-[var(--ink-muted)] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-250 ease-in-out ${open === i ? 'max-h-[160px] pb-5' : 'max-h-0'}`}>
                        <p className="pl-[2.75rem] text-[15px] text-[var(--ink-muted)] leading-[1.65]">{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Tick({ value }) {
    return value
        ? <Check size={16} className="mx-auto text-[var(--primary)]" strokeWidth={2.5} />
        : <X     size={16} className="mx-auto text-[var(--border)] opacity-60" />;
}

export default function ProductShowcase() {
    const [activeImg, setActiveImg]     = useState(0);
    const [activeTab, setActiveTab]     = useState("blocked");
    const [openFeature, setOpenFeature] = useState(null);

    return (
        <div className="w-full overflow-x-hidden">

            {/* ── 1. Product hero ── */}
            <section className="w-full px-4 sm:px-6 bg-[var(--bg)]" style={{ paddingTop: 'calc(var(--header-h) + 48px)', paddingBottom: 'var(--section-y)' }}>
                <div className="max-w-[var(--content-w)] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Gallery */}
                    <div className="flex flex-col gap-3">
                        <div className="w-full aspect-square rounded-2xl bg-[var(--bg-alt)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
                            <img src={thumbnails[activeImg]} alt="Steelgate" className="w-4/5 h-4/5 object-contain" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {thumbnails.map((img, i) => (
                                <button key={i} onClick={() => setActiveImg(i)}
                                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 bg-[var(--bg-alt)] flex items-center justify-center overflow-hidden transition-all duration-150 ${activeImg === i ? 'border-[var(--ink)]' : 'border-[var(--border)] hover:border-[var(--ink-muted)]'}`}>
                                    <img src={img} className="w-full h-full object-contain p-1.5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Purchase panel */}
                    <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] space-y-4">
                        <PreOrderPanel />
                        <WaitlistForm />
                    </div>

                </div>
            </section>

            {/* ── 2. How It Works ── */}
            <section className="w-full px-4 sm:px-6 bg-[var(--bg-alt)]" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
                <div className="max-w-[var(--content-w)] mx-auto">
                    <div className="mb-12">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">Setup</p>
                        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em]">
                            Up and running in under a minute.
                        </h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="w-full aspect-[4/3] rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center order-last lg:order-first">
                            {/* TODO: replace with device lifestyle photo */}
                            <p className="text-[13px] text-[var(--ink-muted)]">Device photo</p>
                        </div>
                        <StepAccordion steps={howItWorksSteps} />
                    </div>
                </div>
            </section>

            {/* ── 3. Stats ── */}
            <section className="w-full px-4 sm:px-6 bg-[var(--bg)]" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
                <div className="max-w-[var(--content-w)] mx-auto text-center">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">The numbers</p>
                    <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em] mb-4">
                        The numbers behind household screen time.
                    </h2>
                    <p className="text-[16px] text-[var(--ink-muted)] mb-14 max-w-prose mx-auto">
                        Why families are choosing a hardware-level solution.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
                        {[
                            { stat: "4.8h",     label: "Average daily screen time",    sub: "Per person in a household — adults included" },
                            { stat: "67%",      label: "Kids bypass app limits",       sub: "Most software controls are easy to get around" },
                            { stat: "1 device", label: "Controls your whole home",     sub: "Every phone, tablet, laptop, and smart TV" },
                        ].map(({ stat, label, sub }) => (
                            <div key={label} className="bg-[var(--bg)] px-8 py-10 text-center">
                                <p className="text-[clamp(2rem,5vw,3rem)] font-bold text-[var(--ink)] tracking-[-0.04em] leading-none mb-3">{stat}</p>
                                <p className="text-[15px] font-semibold text-[var(--ink)] mb-1">{label}</p>
                                <p className="text-[13px] text-[var(--ink-muted)] leading-snug">{sub}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <a href="#" onClick={e => { e.preventDefault(); document.querySelector('[data-preorder]')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[var(--ink)] text-white text-[15px] font-semibold hover:bg-black transition-colors duration-150">
                            Pre-Order — €10 Deposit
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 4. App Features ── */}
            <section className="w-full px-4 sm:px-6 bg-[var(--bg-alt)]" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
                <div className="max-w-[var(--content-w)] mx-auto">
                    <div className="mb-12 text-center">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">The app</p>
                        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em]">
                            Your household's control panel.
                        </h2>
                    </div>

                    <div className="flex justify-center gap-2 mb-10">
                        {["blocked", "allowed"].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all duration-150 ${activeTab === tab ? 'bg-[var(--ink)] text-white' : 'bg-[var(--bg)] text-[var(--ink-muted)] hover:text-[var(--ink)]'}`}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* TODO: replace with real app screenshots */}
                    <div className="w-full h-[260px] sm:h-[340px] rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex flex-col items-center justify-center gap-2 mb-10">
                        <p className="text-[13px] text-[var(--ink-muted)]">App dashboard screenshot</p>
                        <p className="text-[12px] text-[var(--ink-muted)] opacity-60">{activeTab === "blocked" ? "Blocked content view" : "Allowed content view"}</p>
                    </div>

                    <div className="max-w-[600px] mx-auto divide-y divide-[var(--border)]">
                        {appFeatures.map((f, i) => (
                            <div key={i}>
                                <button onClick={() => setOpenFeature(openFeature === i ? null : i)}
                                    className="w-full flex items-center justify-between py-4 text-left gap-4">
                                    <span className="text-[16px] font-medium text-[var(--ink)]">{f.label}</span>
                                    <ChevronDown size={16} className={`shrink-0 text-[var(--ink-muted)] transition-transform duration-200 ${openFeature === i ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-200 ${openFeature === i ? 'max-h-[120px] pb-4' : 'max-h-0'}`}>
                                    <p className="text-[15px] text-[var(--ink-muted)] leading-[1.65]">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. Comparison ── */}
            <section className="w-full px-4 sm:px-6 bg-[var(--bg)]" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
                <div className="max-w-[680px] mx-auto w-full">
                    <div className="mb-12 text-center">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">vs the alternatives</p>
                        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em]">
                            What sets Steelgate apart.
                        </h2>
                    </div>
                    <div className="border border-[var(--border)] rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[480px] border-collapse bg-[var(--bg)]">
                                <thead>
                                    <tr className="border-b border-[var(--border)]">
                                        <th className="text-left py-4 px-4 sm:px-5 w-[48%]" />
                                        <th className="py-4 px-3 sm:px-4 text-center">
                                            <p className="text-[10px] sm:text-[11px] font-bold text-[var(--primary)] tracking-widest uppercase">Steelgate</p>
                                        </th>
                                        <th className="py-4 px-3 sm:px-4 text-center">
                                            <p className="text-[10px] sm:text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-widest">Phone Controls</p>
                                        </th>
                                        <th className="py-4 px-3 sm:px-4 text-center">
                                            <p className="text-[10px] sm:text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-widest">DNS Tool</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border)]">
                                    {comparisonRows.map(({ label, sg, phone, dns }, i) => (
                                        <tr key={i} className={i % 2 === 1 ? 'bg-[var(--bg-alt)]/50' : ''}>
                                            <td className="py-3 px-4 sm:px-5 text-[13px] sm:text-[14px] text-[var(--ink)]">{label}</td>
                                            <td className="py-3 px-3 sm:px-4 text-center"><Tick value={sg} /></td>
                                            <td className="py-3 px-3 sm:px-4 text-center"><Tick value={phone} /></td>
                                            <td className="py-3 px-3 sm:px-4 text-center"><Tick value={dns} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

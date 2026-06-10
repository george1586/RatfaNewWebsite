import { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { track } from "../lib/analytics";
import PreOrderPanel from "./PreOrderPanel";
import WaitlistForm from "./WaitlistForm";
import productImg from "../assets/images/productimage.png";
import steelgateImg from "../assets/images/steelgate.png";
import heroImg from "../assets/images/newImgHero.png";
import ratfaImg from "../assets/images/ratfa.png";
import orderProductImg from "../assets/images/productpage.png";

const thumbnails = [orderProductImg];

const howItWorksSteps = [
    { title: "Conectează-l la router", desc: "Conectează Steelgate la routerul tău existent cu cablul ethernet inclus. Nicio reconfigurare, nicio cunoștință IT — durează sub un minut." },
    { title: "Descarcă aplicația", desc: "Descarcă aplicația Steelgate pe iOS sau Android. Dispozitivul tău este detectat automat în câteva secunde de la conectare." },
    { title: "Setează regulile tale", desc: "Alege ce aplicații și site-uri să blochezi, pentru ce dispozitive și pe ce programare. TikTok oprit după ora 21, Reddit oprit în orele de studiu — tu decizi." },
    { title: "Uită de el", desc: "Programul rulează automat. Ești în control fără să te mai gândești la asta în fiecare zi." },
];

const appFeatures = [
    { label: "Blochează și deblochează dispozitive", desc: "Taie sau restabilește accesul la internet pentru orice dispozitiv din rețeaua ta de oriunde din lume, instant." },
    { label: "Personalizează site-urile și aplicațiile", desc: "Construiește o listă de blocare adaptată casei tale. Blochează social media, conținut adult, gambling — sau orice altceva alegi." },
    { label: "Programare blocare", desc: "Setează reguli bazate pe timp, astfel încât anumit conținut să fie disponibil doar la anumite ore. Perfect pentru serile copiilor sau orele de concentrare." },
    { label: "Vezi istoricul rețelei", desc: "Consultă un jurnal complet al fiecărui domeniu accesat pe toate dispozitivele, cu marcaje temporale și categorii." },
    { label: "Acces de la distanță", desc: "Administrează rețeaua de oriunde prin aplicația Steelgate — fără VPN sau port forwarding." },
    { label: "Modul Strict", desc: "Blochează complet rețeaua cu o singură atingere. Ideal pentru sesiuni de studiu sau timp fără distracții." },
];

const comparisonRows = [
    { label: "Funcționează pe fiecare dispozitiv automat", sg: true, phone: false, dns: false },
    { label: "Nu poate fi ocolit sau dezinstalat", sg: true, phone: false, dns: false },
    { label: "Blocare pe bază de programare", sg: true, phone: false, dns: false },
    { label: "Filtrare per aplicație și site", sg: true, phone: false, dns: false },
    { label: "Blocare reclame și trackere", sg: true, phone: false, dns: true },
    { label: "Fără configurare tehnică", sg: true, phone: false, dns: true },
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
        : <X size={16} className="mx-auto text-[var(--ink-muted)]" />;
}

export default function ProductShowcase() {
    const [activeImg, setActiveImg] = useState(0);
    const [activeTab, setActiveTab] = useState("blocked");
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
                        <div className={`flex-wrap gap-2 ${thumbnails.length > 1 ? 'flex' : 'hidden'}`}>
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
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">Configurare</p>
                        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em]">
                            Gata în mai puțin de un minut.
                        </h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="w-full aspect-[4/3] rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden order-last lg:order-first p-6 sm:p-10">
                            <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                {/* Router body */}
                                <rect x="58" y="132" width="150" height="90" rx="10" fill="#EFEEEB" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
                                {/* Antennas */}
                                <rect x="85" y="108" width="5" height="26" rx="2.5" fill="#D5D4CF" transform="rotate(-7 87.5 121)" />
                                <rect x="130" y="103" width="5" height="31" rx="2.5" fill="#D5D4CF" />
                                <rect x="174" y="108" width="5" height="26" rx="2.5" fill="#D5D4CF" transform="rotate(7 176.5 121)" />
                                {/* LEDs */}
                                <circle cx="96" cy="183" r="4" fill="#2DB42D" />
                                <circle cx="116" cy="183" r="4" fill="rgba(26,26,26,0.1)" />
                                <circle cx="136" cy="183" r="4" fill="rgba(26,26,26,0.1)" />
                                <text x="133" y="207" fontSize="7.5" fill="rgba(26,26,26,0.25)" fontFamily="Inter, sans-serif" textAnchor="middle" letterSpacing="2">ROUTER</text>
                                {/* Ethernet cable */}
                                <rect x="206" y="173" width="7" height="10" rx="1.5" fill="rgba(26,26,26,0.15)" />
                                <line x1="213" y1="178" x2="254" y2="178" stroke="rgba(26,26,26,0.12)" strokeWidth="4" strokeLinecap="round" />
                                <rect x="254" y="173" width="7" height="10" rx="1.5" fill="rgba(26,26,26,0.15)" />
                                {/* Steelgate device */}
                                <rect x="261" y="152" width="122" height="68" rx="10" fill="#F8F7F5" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
                                <rect x="262" y="172" width="5" height="11" rx="1" fill="#DDDCD8" />
                                <rect x="262" y="186" width="5" height="11" rx="1" fill="#DDDCD8" />
                                <circle cx="292" cy="186" r="9" fill="#2DB42D" opacity="0.12" />
                                <circle cx="292" cy="186" r="4.5" fill="#2DB42D" />
                                <text x="338" y="191" fontSize="9" fill="rgba(26,26,26,0.3)" fontFamily="Inter, sans-serif" textAnchor="middle" letterSpacing="1" fontWeight="600">STEELGATE</text>
                                {/* Phone – top right */}
                                <rect x="404" y="88" width="38" height="64" rx="7" fill="#EFEEEB" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
                                <rect x="410" y="97" width="26" height="40" rx="2" fill="rgba(26,26,26,0.06)" />
                                <circle cx="423" cy="146" r="2.5" fill="rgba(26,26,26,0.1)" />
                                {/* Laptop – bottom left */}
                                <rect x="40" y="268" width="88" height="52" rx="5" fill="#EFEEEB" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
                                <rect x="47" y="276" width="74" height="37" rx="2" fill="rgba(26,26,26,0.06)" />
                                <rect x="28" y="320" width="112" height="5" rx="2.5" fill="#E0DFD9" />
                                {/* Tablet – bottom centre */}
                                <rect x="198" y="272" width="52" height="68" rx="7" fill="#EFEEEB" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
                                <rect x="205" y="280" width="38" height="50" rx="2" fill="rgba(26,26,26,0.06)" />
                                {/* Smart TV – bottom right */}
                                <rect x="310" y="274" width="94" height="58" rx="5" fill="#EFEEEB" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
                                <rect x="317" y="282" width="80" height="42" rx="2" fill="rgba(26,26,26,0.06)" />
                                <rect x="347" y="332" width="14" height="7" rx="2" fill="#E0DFD9" />
                                {/* Dashed connection lines */}
                                <path d="M 383 170 Q 415 170 415 152" stroke="rgba(26,26,26,0.07)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                                <path d="M 322 220 Q 357 248 357 274" stroke="rgba(26,26,26,0.07)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                                <path d="M 308 220 Q 280 248 224 272" stroke="rgba(26,26,26,0.07)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                                <path d="M 290 220 Q 240 246 136 268" stroke="rgba(26,26,26,0.07)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                            </svg>
                        </div>
                        <StepAccordion steps={howItWorksSteps} />
                    </div>
                </div>
            </section>

            {/* ── 3. Stats ── */}
            <section className="w-full px-4 sm:px-6 bg-[var(--bg)]" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
                <div className="max-w-[var(--content-w)] mx-auto text-center">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">Cifrele</p>
                    <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em] mb-4">
                        Ce spun datele despre timp petrecut pe ecrane.
                    </h2>
                    <p className="text-[16px] text-[var(--ink-muted)] mb-14 max-w-prose mx-auto">
                        De ce tot mai mulți aleg o soluție la nivel hardware.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
                        {[
                            { stat: "4.8h", label: "Timp mediu zilnic pe ecrane", sub: "Per persoană — inclusiv adulți" },
                            { stat: "67%", label: "Ocolesc limitele app-urilor", sub: "Majoritatea soluțiilor software se contournează ușor" },
                            { stat: "1 dispozitiv", label: "Controlează toată casa", sub: "Fiecare telefon, tabletă, laptop și televizor smart" },
                        ].map(({ stat, label, sub }) => (
                            <div key={label} className="bg-[var(--bg)] px-5 xs:px-8 py-8 xs:py-10 text-center">
                                <p className="text-[clamp(1.75rem,8vw,3rem)] font-bold text-[var(--ink)] tracking-[-0.04em] leading-none mb-3">{stat}</p>
                                <p className="text-[14px] xs:text-[15px] font-semibold text-[var(--ink)] mb-1">{label}</p>
                                <p className="text-[12px] xs:text-[13px] text-[var(--ink-muted)] leading-snug">{sub}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            track('preorder_clicked', {
                                page: 'products',
                                placement: 'stats_section',
                                cta_text: 'Comandă acum',
                                cta_variant: 'inline_link',
                                destination: 'scroll_to_preorder_panel',
                            });
                            document.querySelector('[data-preorder]')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[var(--ink)] text-white text-[15px] font-semibold hover:bg-black transition-colors duration-150">
                            Comandă acum
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 4. App Features ── */}
            <section className="w-full px-4 sm:px-6 bg-[var(--bg-alt)]" style={{ paddingTop: 'var(--section-y)', paddingBottom: 'var(--section-y)' }}>
                <div className="max-w-[var(--content-w)] mx-auto">
                    <div className="mb-12 text-center">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">Aplicația</p>
                        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em]">
                            Panoul de control al casei tale.
                        </h2>
                    </div>

                    <div className="flex justify-center gap-2 mb-10">
                        {[["blocked", "Blocate"], ["allowed", "Permise"]].map(([tab, label]) => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all duration-150 ${activeTab === tab ? 'bg-[var(--ink)] text-white' : 'bg-[var(--bg)] text-[var(--ink-muted)] hover:text-[var(--ink)]'}`}>
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="w-full h-[260px] sm:h-[340px] rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden mb-10">
                        <svg viewBox="0 0 240 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[92%]">
                            {/* Phone frame */}
                            <rect x="20" y="8" width="200" height="324" rx="24" fill="#1A1A1A" />
                            <rect x="24" y="12" width="192" height="316" rx="21" fill="#F8F7F5" />
                            <rect x="82" y="16" width="76" height="13" rx="6.5" fill="#1A1A1A" />
                            {/* Header */}
                            <text x="120" y="50" fontSize="13" fontWeight="700" fill="#1A1A1A" fontFamily="Inter, sans-serif" textAnchor="middle">Steelgate</text>
                            {/* Tab bar */}
                            <rect x="28" y="60" width="184" height="28" rx="10" fill="#EFEEEB" />
                            {activeTab === "blocked"
                                ? <rect x="31" y="63" width="85" height="22" rx="7" fill="#1A1A1A" />
                                : <rect x="126" y="63" width="83" height="22" rx="7" fill="#1A1A1A" />
                            }
                            <text x="73" y="79" fontSize="9.5" fontWeight="600" fill={activeTab === "blocked" ? "white" : "rgba(26,26,26,0.45)"} fontFamily="Inter, sans-serif" textAnchor="middle">Blocate</text>
                            <text x="167" y="79" fontSize="9.5" fontWeight="600" fill={activeTab === "allowed" ? "white" : "rgba(26,26,26,0.45)"} fontFamily="Inter, sans-serif" textAnchor="middle">Permise</text>
                            {/* App list */}
                            {[
                                { name: "TikTok", cat: "Social Media" },
                                { name: "Instagram", cat: "Social Media" },
                                { name: "YouTube", cat: "Video" },
                                { name: "Reddit", cat: "Forums" },
                                { name: "Twitter / X", cat: "Social Media" },
                            ].map((app, i) => {
                                const y = 104 + i * 40;
                                const isOn = activeTab === "allowed";
                                return (
                                    <g key={app.name}>
                                        {i > 0 && <line x1="52" y1={y - 5} x2="216" y2={y - 5} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />}
                                        <circle cx="48" cy={y + 11} r="10" fill="#EFEEEB" />
                                        <text x="68" y={y + 8} fontSize="10.5" fontWeight="500" fill="#1A1A1A" fontFamily="Inter, sans-serif">{app.name}</text>
                                        <text x="68" y={y + 22} fontSize="8.5" fill="rgba(26,26,26,0.4)" fontFamily="Inter, sans-serif">{app.cat}</text>
                                        <rect x="183" y={y + 5} width="28" height="14" rx="7" fill={isOn ? "#2DB42D" : "rgba(26,26,26,0.12)"} />
                                        <circle cx={isOn ? 204 : 190} cy={y + 12} r="5.5" fill="white" />
                                    </g>
                                );
                            })}
                            {/* Home indicator */}
                            <rect x="88" y="322" width="64" height="4" rx="2" fill="rgba(26,26,26,0.18)" />
                        </svg>
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
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">Față de alternative</p>
                        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--ink)] tracking-[-0.03em]">
                            Ce face Steelgate diferit.
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
                                            <p className="text-[10px] sm:text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-widest">Controale telefon</p>
                                        </th>
                                        <th className="py-4 px-3 sm:px-4 text-center">
                                            <p className="text-[10px] sm:text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-widest">Unealtă DNS</p>
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

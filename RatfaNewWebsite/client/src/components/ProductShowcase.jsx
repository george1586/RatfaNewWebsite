import { useState } from "react";
import { ShieldCheck, Truck, ChevronDown, Check, X, Gift, Briefcase, Users } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createCheckoutSession } from "../lib/api";
import productImg from "../assets/images/productimage.png";
import steelgateImg from "../assets/images/steelgate.png";
import heroImg from "../assets/images/newImgHero.png";
import ratfaImg from "../assets/images/ratfa.png";

const thumbnails = [productImg, steelgateImg, heroImg, ratfaImg];

const howItWorksSteps = [
    { title: "Connect to your router", desc: "Plug Steelgate into your existing router. No rewiring, no technical knowledge needed — it works with any ISP setup in under a minute." },
    { title: "Download the Steelgate app", desc: "Get the app on iOS or Android. Your device is detected automatically within seconds of plugging in." },
    { title: "Configure your rules", desc: "Choose what to block, who can access what, and when. Set schedules, filter content, and manage every device on the network." },
    { title: "Take back control with intention", desc: "When you need full access, unlock it intentionally. Steelgate keeps you aware of everything happening on your network." },
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
    { label: "Network-wide protection", steelgate: true, router: false, vpn: false },
    { label: "No ongoing subscription", steelgate: true, router: false, vpn: false },
    { label: "Content & app filtering", steelgate: true, router: false, vpn: false },
    { label: "Family profiles & controls", steelgate: true, router: false, vpn: false },
    { label: "Easy plug-and-play setup", steelgate: true, router: false, vpn: true },
    { label: "Ad & tracker blocking", steelgate: true, router: false, vpn: true },
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

function RadioCard({ selected, onClick, children }) {
    return (
        <div
            onClick={onClick}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${selected
                    ? "border-[var(--primary)] bg-white"
                    : "border-transparent bg-gray-100 hover:bg-gray-200"
                }`}
        >
            {children}
        </div>
    );
}

function RadioDot({ selected }) {
    return (
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-[var(--primary)]" : "border-gray-400"
            }`}>
            {selected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />}
        </div>
    );
}

function ProductShowcase() {
    const singlePrice = 229;
    const multiOriginal = singlePrice * 2;
    const multiDiscounted = Math.round(multiOriginal * 0.9);

    const { addItem } = useCart();
    const [activeImg, setActiveImg] = useState(0);
    const [bundle, setBundle] = useState("single");
    const [activeTab, setActiveTab] = useState("blocked");
    const [openFeature, setOpenFeature] = useState(null);
    const [buyLoading, setBuyLoading] = useState(false);
    const [buyError, setBuyError] = useState(null);

    const displayPrice = bundle === "single" ? singlePrice : multiDiscounted;

    const selectedProduct = bundle === "single"
        ? { id: "steelgate-single", name: "Steelgate Device", price: singlePrice, quantity: 1 }
        : { id: "steelgate-multi", name: "Steelgate Device (2-Pack)", price: multiDiscounted, quantity: 1 };

    const handleBuyNow = async () => {
        setBuyLoading(true);
        setBuyError(null);
        try {
            const { url } = await createCheckoutSession([selectedProduct]);
            window.location.href = url;
        } catch {
            setBuyError("Could not start checkout. Please try again.");
            setBuyLoading(false);
        }
    };

    const handleAddToCart = () => {
        addItem(selectedProduct);
    };

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

                    <div className="lg:sticky lg:top-[88px] space-y-5">

                        <div>
                            <h1 className="text-xl sm:text-5xl font-black text-[var(--text-dark)] [font-family:var(--font-alt)] leading-none">
                                Steelgate
                            </h1>
                            <p className="text-2xl font-bold text-[var(--text-dark)] [font-family:var(--font-alt)] mt-3">
                                €{displayPrice}
                            </p>
                            <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)] mt-1">
                                VAT Included
                            </p>
                        </div>

                        <hr className="border-[var(--border-light)]" />

                        <div className="space-y-3">

                            <RadioCard selected={bundle === "single"} onClick={() => setBundle("single")}>
                                <div className="flex items-center justify-between px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <RadioDot selected={bundle === "single"} />
                                        <span className="text-lg font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                                            1 Steelgate
                                        </span>
                                    </div>
                                    <span className="font-semibold text-[var(--text-dark)] [font-family:var(--font-alt)]">
                                        €{singlePrice}
                                    </span>
                                </div>
                            </RadioCard>

                            <RadioCard selected={bundle === "multi"} onClick={() => setBundle("multi")}>
                                <div className="px-4 pt-4 pb-3">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <RadioDot selected={bundle === "multi"} />
                                            <div>
                                                <p className="text-xs font-bold text-[var(--primary)] [font-family:var(--font-body)] uppercase tracking-widest mb-0.5">
                                                    Best Value
                                                </p>
                                                <p className="text-lg font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                                                    2+ Steelgates
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="bg-[var(--primary)] text-white text-xs font-bold px-2.5 py-1 rounded-full [font-family:var(--font-body)]">
                                                10% OFF
                                            </span>
                                            <p className="mt-1.5 text-sm font-semibold text-[var(--text-dark)] [font-family:var(--font-alt)]">
                                                €{multiDiscounted}{" "}
                                                <span className="line-through text-[var(--text-dark)] opacity-40 font-normal">
                                                    €{multiOriginal}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border-light)]">
                                        <div className="flex flex-col items-center text-center gap-1.5">
                                            <Gift size={20} className="text-[var(--text-dark)]" />
                                            <span className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)] leading-tight">
                                                The perfect gift
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-1.5">
                                            <Briefcase size={20} className="text-[var(--text-dark)]" />
                                            <span className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)] leading-tight">
                                                One for work and home
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-1.5">
                                            <Users size={20} className="text-[var(--text-dark)]" />
                                            <span className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)] leading-tight">
                                                One for the whole family
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </RadioCard>
                        </div>

                        {buyError && (
                            <p className="text-sm text-red-500 [font-family:var(--font-body)]">{buyError}</p>
                        )}
                        <button
                            onClick={handleBuyNow}
                            disabled={buyLoading}
                            className="w-full py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-2xl font-bold text-lg [font-family:var(--font-alt)] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {buyLoading ? "Redirecting to payment…" : "Buy Now"}
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-3.5 border-2 border-[var(--text-dark)] text-[var(--text-dark)] hover:bg-black hover:text-white rounded-2xl font-bold text-base [font-family:var(--font-alt)] transition-colors duration-150"
                        >
                            Add to Cart
                        </button>

                        {/* Delivery info
                        <div className="text-center space-y-1.5">
                            <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)]">
                                Estimated delivery: 5–10 business days
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <Truck size={14} className="text-[var(--text-dark)]" />
                                <span className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)]">
                                    Deliver to{" "}
                                    <span className="text-[var(--primary)] underline cursor-pointer">
                                        your location
                                    </span>
                                </span>
                            </div>
                        </div> */}

                        <hr className="border-[var(--border-light)]" />

                        {/* Trust badges — text only, 3 columns */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <p className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)]">
                                30-day money back guarantee
                            </p>
                            <p className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)]">
                                Available on iOS and Android
                            </p>
                            <p className="text-xs text-[var(--text-dark)] [font-family:var(--font-body)]">
                                Free Shipping on 2+ Units
                            </p>
                        </div>

                        <hr className="border-[var(--border-light)]" />

                        {/* Product info sections */}
                        <div className="space-y-5">
                            <div>
                                <h3 className="font-bold text-base text-[var(--text-dark)] [font-family:var(--font-body)] mb-1.5">
                                    Effortless Setup
                                </h3>
                                <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                                    Steelgate is plug-and-play. Get lifetime access to our app on{" "}
                                    <span className="underline cursor-pointer">App Store</span> or{" "}
                                    <span className="underline cursor-pointer">Google Play Store</span>{" "}
                                    to block threats, set custom rules, and monitor your entire network.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-[var(--text-dark)] [font-family:var(--font-body)] mb-1.5">
                                    Thoughtfully Designed
                                </h3>
                                <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                                    Compact and durable, designed to sit quietly beside your router and protect your network 24/7 without any maintenance.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-[var(--text-dark)] [font-family:var(--font-body)] mb-1.5 flex items-center gap-1.5">
                                    See How It Works <span>→</span>
                                </h3>
                                <p className="text-sm text-[var(--text-dark)] [font-family:var(--font-body)] leading-relaxed">
                                    Take back control of your network. Block threats, filter content, and protect every device — all from one simple app.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── 2. How It Works ── */}
            <section className="w-full px-6 py-20 border-t border-[var(--border-light)]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[var(--text-dark)] [font-family:var(--font-alt)] mb-12">
                        Steelgate keeps your network under control
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
                        Real results for your network
                    </h2>
                    <p className="text-[var(--text-dark)] [font-family:var(--font-body)] mb-12 text-sm">
                        Here is how our users feel when using Steelgate
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        {[
                            { stat: "95%+", label: "Threats Blocked", sub: "Compared to unprotected networks" },
                            { stat: "93%+", label: "Less Ads Seen", sub: "Across all devices on the network" },
                            { stat: "99%+", label: "Network Uptime", sub: "Steelgate stays on so you stay safe" },
                        ].map(({ stat, label, sub }) => (
                            <div key={label} className="border border-[var(--border-light)] rounded-2xl bg-white px-6 py-8 text-center">
                                <p className="text-4xl font-bold text-[var(--text-dark)] [font-family:var(--font-alt)]">{stat}</p>
                                <p className="text-base font-semibold text-[var(--text-dark)] mt-1 [font-family:var(--font-body)]">{label}</p>
                                <p className="text-xs text-[var(--text-dark)] opacity-60 mt-2 [font-family:var(--font-body)]">{sub}</p>
                            </div>
                        ))}
                    </div>
                    <button className="px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl font-bold text-base [font-family:var(--font-alt)] transition-colors duration-150">
                        Start Protecting Your Network
                    </button>
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
                                        Traditional<br />Router
                                    </th>
                                    <th className="py-4 px-4 text-center text-xs font-semibold text-[var(--text-dark)] [font-family:var(--font-body)]">
                                        VPN<br />Service
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

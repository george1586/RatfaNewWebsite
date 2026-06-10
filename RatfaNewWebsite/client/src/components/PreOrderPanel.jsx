import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { createPreorderSession } from "../lib/api";
import { track } from "../lib/analytics";

export default function PreOrderPanel() {
    const navigate = useNavigate();

    // --- Spots counter disabled for now ---------------------------------
    // const [spots, setSpots] = useState({ claimed: 13, total: 100 });
    // useEffect(() => {
    //     fetch("/api/preorder-count")
    //         .then(r => r.json())
    //         .then(data => setSpots(data))
    //         .catch(() => { });
    // }, []);

    // --- Stripe checkout (disabled — kept for when we re-enable payments) -
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const handlePreorder = async () => {
    //     const startedAt = performance.now();
    //     const checkoutContext = {
    //         price_eur: 45,
    //         currency: 'EUR',
    //         spots_claimed: spots.claimed,
    //         spots_remaining: spots.total - spots.claimed,
    //         spots_total: spots.total,
    //     };
    //     track('preorder_clicked', {
    //         page: 'products',
    //         placement: 'preorder_panel',
    //         cta_text: 'Order NOW',
    //         cta_variant: 'primary_button',
    //         ...checkoutContext,
    //     });
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const { url } = await createPreorderSession();
    //         track('checkout_started', {
    //             ...checkoutContext,
    //             provider: 'stripe',
    //             session_latency_ms: Math.round(performance.now() - startedAt),
    //         });
    //         window.location.href = url;
    //     } catch (err) {
    //         track('checkout_failed', {
    //             ...checkoutContext,
    //             provider: 'stripe',
    //             session_latency_ms: Math.round(performance.now() - startedAt),
    //             error_message: err?.message || 'unknown',
    //         });
    //         setError("Could not start checkout. Please try again.");
    //         setLoading(false);
    //     }
    // };
    // --------------------------------------------------------------------

    const handlePreorder = () => {
        track('preorder_clicked', {
            page: 'products',
            placement: 'preorder_panel',
            cta_text: 'Comandă acum',
            cta_variant: 'primary_button',
        });
        navigate("/checkout");
    };

    return (
        <div data-preorder className="space-y-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-4 xs:p-6 sm:p-7">

            {/* Title */}
            <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-2">
                    Comandă de fondator
                </p>
                <h1 className="font-display text-[clamp(1.6rem,4vw,2.2rem)] text-[var(--ink)] leading-tight">
                    Steelgate
                </h1>
            </div>

            {/* Pricing */}
            <div className="space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                    <span className="text-[2rem] font-bold text-[var(--ink)] tracking-[-0.03em] leading-none">€70</span>
                    <span className="text-[15px] text-[var(--ink-muted)]">o singură plată · fără abonament</span>
                </div>
                <p className="text-[13px] text-[var(--ink-muted)]">
                    TVA inclus · Integral rambursabil înainte de livrare
                </p>
            </div>

            {/* Founding supporter perks */}
            <div className="space-y-2.5">
                <p className="text-[13px] font-semibold text-[var(--ink)]">Ce primesc susținătorii fondatori</p>
                <ul className="space-y-2">
                    {[
                        "Hardware la €70, o singură plată — fără abonament, pe viață",
                        "Primul an de actualizări viitoare, gratuit",
                        "Numele tău pe pagina noastră de fondatori (opțional)",
                        "Linie directă cu fondatorii pentru feedback despre produs",
                    ].map(perk => (
                        <li key={perk} className="flex items-start gap-2 text-[13px] text-[var(--ink-muted)] leading-snug">
                            <span className="text-[var(--primary)] shrink-0 font-bold">✓</span>
                            {perk}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Founding spot bar — disabled for now */}
            {/*
            <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                    <span className="text-[13px] font-medium text-[var(--ink)]">Founding spots</span>
                    <span className="text-[13px] font-semibold text-[var(--primary)]">
                        {spots.total - spots.claimed} of {spots.total} remaining
                    </span>
                </div>
                <div className="w-full h-1.5 bg-[var(--bg-alt)] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--primary)] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${(spots.claimed / spots.total) * 100}%` }}
                    />
                </div>
                <p className="text-[12px] text-[var(--ink-muted)]">
                    After 100 founding supporters, Steelgate moves to €89/year. The founding price is permanent for the first cohort — because they're helping us build.
                </p>
            </div>
            */}

            {/* CTA */}
            <button
                onClick={handlePreorder}
                className="w-full py-4 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-[16px] font-semibold transition-colors duration-150"
            >
                Comandă acum
            </button>

            <hr className="border-[var(--border)]" />

            {/* Trust row */}
            <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 text-center">
                {["O singură plată, €70", "Toate actualizările incluse", "Livrare Q4 2026"].map(t => (
                    <p key={t} className="text-[12px] text-[var(--ink-muted)] leading-snug">{t}</p>
                ))}
            </div>

            {/* Info sections */}
            <div className="space-y-5">
                {[
                    { title: "Ce comanzi", body: "Un dispozitiv compact de rețea care se conectează la routerul tău și controlează ce poate accesa fiecare dispozitiv din casă — și când. Blochează aplicații și site-uri pe un program, la nivelul întregii case, fără să atingi fiecare dispozitiv individual." },
                    { title: "De ce să comanzi acum?", body: "Locurile de fondator sunt limitate. Comanda acum îți blochează prețul de €70 pe viață și îți asigură livrarea din primul lot." },
                    { title: "Timeline", body: "Targetăm Q4 2026 pentru livrare. Vei primi actualizări pe parcurs. Clienții fondatori primesc primii." },
                ].map(({ title, body }) => (
                    <div key={title}>
                        <p className="text-[14px] font-semibold text-[var(--ink)] mb-1.5">{title}</p>
                        <p className="text-[14px] text-[var(--ink-muted)] leading-[1.65]">{body}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

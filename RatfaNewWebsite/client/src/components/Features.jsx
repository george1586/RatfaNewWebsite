import { useEffect, useRef, useState } from "react";

const features = [
    { title: "Blocare aplicații și site-uri",  desc: "Blochează TikTok, Instagram, Reddit, YouTube sau orice alt site — pe fiecare dispozitiv din casă, fără să le atingi individual." },
    { title: "Programări personalizate",       desc: "Setează reguli diferite pentru zile lucrătoare, weekend sau seară. Programul rulează singur, fără să te mai gândești la el." },
    { title: "Protecție pentru toată casa",    desc: "Funcționează pe fiecare dispozitiv automat — telefoane, tablete, laptopuri, televizoare smart. Nicio aplicație de instalat separat." },
    { title: "Blocare reclame și trackere",    desc: "Elimină reclamele și scripturile de tracking înainte să se încarce, pe toate dispozitivele și aplicațiile. Pagini mai rapide, mai puțin zgomot." },
    { title: "Filtrare conținut adult",        desc: "Blochează categorii de conținut la nivel de rețea, fără să configurezi fiecare dispozitiv separat." },
    { title: "Modul Detox",                    desc: "Dezactivează feed-urile video scurte păstrând funcțiile de mesagerie intacte. Poți folosi aplicația, nu poți pierde ore în ea." },
    { title: "Blocare amenințări în timp real",desc: "Domeniile de phishing, endpoint-urile malware și traficul suspect sunt blocate înainte ca un dispozitiv să le încarce." },
    { title: "Confidențialitate",              desc: "Traficul tău rămâne în rețeaua ta. Nicio dată nu iese din casă și ISP-ul tău nu poate vedea ce navighezi." },
    { title: "Configurare simplă",             desc: "Îl conectezi la rețea și începe să funcționeze. Nicio configurație de router, nicio cunoștință IT necesară." },
    { title: "Ușor de administrat",            desc: "Un panou local simplu îți permite să ajustezi regulile, să verifici activitatea și să adaugi excepții pentru ce e blocat greșit." },
];

function Feature({ title, desc }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.25 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`flex gap-5 items-start transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
        >
            <div className="w-px h-full min-h-[40px] bg-[var(--border)] self-stretch shrink-0 mt-1" />
            <div className="pb-8">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[var(--ink)] tracking-[-0.02em] mb-2">
                    {title}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[var(--ink-muted)] leading-[1.65] max-w-[440px]">
                    {desc}
                </p>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <section id="features" className="w-full px-6 py-[var(--section-y)] bg-[var(--bg)]">
            <div className="max-w-[var(--content-w)] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* Sticky left */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="lg:sticky lg:top-24">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
                            Funcționalități
                        </p>
                        <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-[var(--ink)] leading-[1.1] tracking-[-0.03em] mb-6">
                            Redă-ți atenția înapoi.
                        </h2>
                        <p className="text-[16px] text-[var(--ink-muted)] leading-[1.65]">
                            Un singur dispozitiv care controlează fiecare ecran din casă — fără configurare complicată, fără bypass-uri ușoare.
                        </p>
                    </div>
                </div>

                {/* Scrolling features */}
                <div className="flex-1 pt-1">
                    {features.map((f, i) => (
                        <Feature key={i} title={f.title} desc={f.desc} />
                    ))}
                </div>

            </div>
        </section>
    );
}

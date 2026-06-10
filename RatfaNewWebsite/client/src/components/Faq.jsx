import { useState } from "react";

export const faqData = [
    {
        q: "Funcționează și pe date mobile, nu doar pe WiFi de acasă?",
        a: "Nu — Steelgate funcționează doar pe WiFi-ul de acasă. Dar asta e intenționat. Dacă te uiți sincer la obiceiurile tale, marea majoritate a scrollului neproductiv se întâmplă acasă: în pat dimineața, pe canapea seara, la birou. Acasă petreci cel mai mult timp. Și mai important: tu îl cumperi pentru că vrei să te schimbi, nu pentru că cineva te obligă. Dacă ai vrea să eviți blocarea, ai ieși din casă — ceea ce înseamnă că te-ai ridicat de pe canapea. Nici asta nu e rău.",
    },
    {
        q: "Cu ce routere este compatibil?",
        a: "Steelgate funcționează cu marea majoritate a routerelor de acasă — inclusiv modelele standard de la Digi, Orange, Vodafone și alți provideri. Nu trebuie să-ți schimbi routerul sau să ai unul special. Dacă ai un setup mai neobișnuit (mesh, router enterprise), scrie-ne și verificăm împreună.",
    },
    {
        q: "Ce platforme blochează?",
        a: "Tu setezi regulile — nu există o listă fixă. Poți bloca TikTok, Instagram, Facebook, YouTube, Reddit, Twitter/X, site-uri de știri, conținut adult sau orice altceva. Blocarea se face la nivel de DNS, deci funcționează pe orice aplicație sau browser, indiferent de dispozitiv.",
    },
    {
        q: "Este greu de configurat?",
        a: "Nu. Îl conectezi la rețea și începe să funcționeze. Nu trebuie să intri în setările routerului, nu ai nevoie de cunoștințe tehnice. Configurarea avansată există pentru cine o vrea, dar experiența implicită e construită pentru oameni care nu vor să se complice.",
    },
    {
        q: "Când se livrează?",
        a: "Targetăm Q4 2026. Cine comandă acum își rezervă locul la prețul de fondator și primele unități livrate. Te vom ține la curent pe măsură ce producția avansează — vei afla înainte de oricine altcineva.",
    },
    {
        q: "Pot anula comanda dacă mă răzgândesc?",
        a: "Da. Plata de €70 este integral rambursabilă înainte de livrare. Scrie-ne un email și procesăm rambursarea în câteva zile, fără întrebări.",
    },
    {
        q: "De ce prețul de fondator este mai mic? Care e prinderea?",
        a: "Nu e nicio prindere. Oferim un preț mai mic oamenilor care cred în Steelgate înainte să fi livrat o singură unitate. Această încredere ne ajută să validăm cererea și să finanțăm producția. În schimb, primești un preț permanent mai bun și livrare prioritară.",
    },
    {
        q: "Ce se întâmplă dacă nu atingeți numărul minim de comenzi?",
        a: "Dacă nu atingem minimul necesar pentru a trece la producție, fiecare comandă va fi integral rambursată. Nu pierzi nimic.",
    },
    {
        q: "Cu ce e diferit față de o aplicație de control parental sau Pi-hole?",
        a: "Aplicațiile de control parental funcționează doar pe dispozitivul pe care sunt instalate — și pot fi dezinstalate. Pi-hole blochează reclame la nivel DNS, dar necesită configurare tehnică și nu gestionează programări sau blocarea per-aplicație. Steelgate se află între routerul tău și dispozitive, deci funcționează pe fiecare ecran din casă automat — telefoane, tablete, laptopuri, televizoare smart — fără nicio aplicație de instalat pe fiecare.",
    },
    {
        q: "Îmi va încetini internetul sau va afecta streamingul și gaming-ul?",
        a: "Nu. Steelgate procesează traficul local și e construit să adauge latență minimă. În practică, paginile se încarcă adesea mai rapid pentru că reclamele și scripturile de tracking sunt eliminate înainte să ajungă la dispozitivele tale. Dacă ceva e blocat greșit, îl poți debloca instant.",
    },
    {
        q: "Cum îmi protejează confidențialitatea? Vedeți traficul meu?",
        a: "Steelgate rulează în întregime pe rețeaua ta locală. Deciziile de filtrare se iau pe dispozitiv, nu în cloud. Nu colectăm și nu stocăm datele tale de navigare — traficul tău rămâne în casă.",
    },
];

function FaqItem({ number, question, answer, isOpen, onToggle }) {
    return (
        <div className="border-b border-[var(--border)]">
            <button
                onClick={onToggle}
                className="w-full flex items-start gap-6 py-6 text-left group"
            >
                <span className="text-[12px] font-semibold text-[var(--ink-muted)] tabular-nums mt-1 shrink-0 w-6 group-hover:text-[var(--ink)] transition-colors duration-150">
                    {String(number).padStart(2, '0')}
                </span>
                <span className="flex-1 text-[17px] sm:text-[18px] font-medium text-[var(--ink)] leading-snug tracking-[-0.01em]">
                    {question}
                </span>
                <span className="text-[var(--ink-muted)] text-xl mt-0.5 shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                    +
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[400px] mb-6' : 'max-h-0'}`}>
                <p className="pl-[calc(1.5rem+24px)] pr-8 text-[16px] text-[var(--ink-muted)] leading-[1.7]">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="w-full bg-[var(--bg-alt)] px-6 py-[var(--section-y)]">
            <div className="max-w-[var(--content-w)] mx-auto">

                <div className="max-w-[640px] mb-14">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
                        Întrebări frecvente
                    </p>
                    <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-[var(--ink)] leading-[1.1] tracking-[-0.03em]">
                        Întrebările care contează.
                    </h2>
                </div>

                <div className="max-w-[720px]">
                    {faqData.map((item, i) => (
                        <FaqItem
                            key={i}
                            number={i + 1}
                            question={item.q}
                            answer={item.a}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

import Footer from "../components/Footer";
import { useSeo } from "../lib/useSeo";

export default function StoryPage() {
    useSeo({
        title: 'Povestea noastră — Steelgate',
        description: 'De ce am construit Steelgate — dispozitivul hardware care redă gospodăriilor controlul asupra propriei atenții.',
        canonical: 'https://steelgate.io/story',
    });

    return (
        <div className="bg-[var(--bg)] min-h-screen">

            {/* ── Hero ── */}
            <section className="pt-[calc(var(--header-h)+80px)] pb-20 px-6">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-6">
                        Povestea noastră
                    </p>
                    <h1
                        className="text-[clamp(2.6rem,6vw,4.5rem)] font-display leading-[1.05] tracking-tight text-[var(--ink)] mb-8"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Am construit întrerupătorul pe care algoritmul spera că nu-l vei găsi.
                    </h1>
                    <p className="text-[1.2rem] text-[var(--ink-muted)] leading-relaxed">
                        Steelgate a pornit dintr-o problemă personală. Nu mai puteam lăsa telefonul jos —
                        și nici ceilalți din jurul nostru. Așa că am construit ceva care face alegerea asta în locul tău.
                    </p>
                </div>
            </section>

            {/* ── Narrative: the problem ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--prose-w)] mx-auto space-y-8 text-[17px] text-[var(--ink)] leading-[1.75]">

                    <h2 className="text-[1.75rem] font-bold tracking-tight mb-2">
                        Nu e o problemă de voință
                    </h2>

                    <p>
                        Fiecare aplicație care îți luptă atenția e construită de echipe de ingineri
                        al căror unic scop este să te țină cu ochii în ecran. Redarea automată,
                        feed-ul infinit, notificarea venită exact la momentul potrivit — nimic din
                        astea nu e întâmplător. E produsul. Și funcționează. Omul obișnuit petrece
                        acum peste patru ore pe zi pe telefon, din care marea majoritate pe platforme
                        proiectate să fie imposibil de lăsat.
                    </p>

                    <p>
                        L-am văzut la mesele unde toată lumea era cu ochii în ecran. L-am văzut în
                        noi înșine — deschizând Instagram, închizând, redeschizând treizeci de secunde
                        mai târziu fără să ne dăm seama. Nu e un defect de caracter. Nu poți bate un
                        algoritm cu simpla determinare.
                    </p>

                    <p>
                        Soluțiile evidente nu au funcționat. Aplicațiile de control parental se dezinstalau.
                        Extensiile de browser acopereau un singur dispozitiv. Setările de screen time
                        se ocoleau trivial. Fiecare soluție software avea aceeași problemă: trăia pe
                        același dispozitiv ca distracția.
                    </p>
                </div>
            </section>

            {/* ── Pull quote ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--content-w)] mx-auto">
                    <div
                        className="rounded-2xl px-10 py-12 md:px-16 md:py-16"
                        style={{ background: 'var(--ink)' }}
                    >
                        <blockquote className="text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-[1.4] text-white tracking-tight max-w-[680px]">
                            „Nu ar trebui să te lupți cu propria casă pentru atenția ta.
                            Regulile trebuie să funcționeze indiferent dacă îți amintești să le aplici sau nu."
                        </blockquote>
                        <p className="mt-6 text-white/50 text-[14px] tracking-wide uppercase font-medium">
                            — Echipa Steelgate
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Narrative: the solution ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--prose-w)] mx-auto space-y-8 text-[17px] text-[var(--ink)] leading-[1.75]">

                    <h2 className="text-[1.75rem] font-bold tracking-tight mb-2">
                        Hardware, pentru că dispozitivul nu se poate repara singur
                    </h2>

                    <p>
                        Soluția trebuia să stea deasupra dispozitivelor — nu pe ele. O cutie mică
                        între routerul tău și restul casei, prin care trec automat orice telefon,
                        tabletă, laptop și televizor smart. Nicio aplicație de instalat. Nicio setare
                        de dezactivat. Niciun bypass de pe un dispozitiv care a fost deja blocat.
                    </p>

                    <p>
                        Asta e Steelgate. Setezi regulile o dată — blochezi TikTok după ora 21,
                        tai Instagram în orele de studiu, elimini feed-urile video scurte complet în
                        zilele lucrătoare — și se ocupă singur. Programul nu are nevoie de voința ta
                        ca să funcționeze. Pur și simplu funcționează.
                    </p>

                    <p>
                        Am construit și blocare de reclame și trackere la nivel de rețea. Fiecare
                        site pe care îl vizitezi raportează în liniște comportamentul tău la zeci de
                        brokeri de date. Steelgate taie aceste conexiuni înainte să iasă din casă —
                        pagini mai rapide, mai puțin zgomot, datele tale rămân ale tale.
                    </p>
                </div>
            </section>

            {/* ── Timeline — 2025 only ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <h2 className="text-[1.75rem] font-bold tracking-tight mb-12">
                        Unde suntem acum
                    </h2>
                    <div className="border-l-2 border-[var(--primary)] pl-6">
                        <p className="text-[12px] font-bold tracking-[0.15em] uppercase text-[var(--primary)] mb-1">
                            2025
                        </p>
                        <p className="text-[17px] font-semibold text-[var(--ink)] mb-2">
                            Lansăm comenzile
                        </p>
                        <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed">
                            Am deschis comenzile pentru a aduce Steelgate în primele gospodării.
                            Fiecare comandă ne ajută să îmbunătățim produsul înainte de disponibilitatea generală.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Founder sign-off ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <div
                        className="rounded-2xl p-8 md:p-12 border"
                        style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    >
                        <p className="text-[17px] text-[var(--ink)] leading-[1.75] mb-6">
                            Suntem în continuare o echipă mică. Ne răspundem singuri la emailuri. Dacă ai
                            întrebări despre ce face Steelgate, cum funcționează sau de ce am luat anumite
                            decizii de design, scrie-ne — ne-ar face plăcere să auzim de la tine.
                        </p>
                        <p className="text-[14px] text-[var(--ink-muted)] mb-1">Fondatorii Steelgate</p>
                        <a
                            href="mailto:hello@steelgate.io"
                            className="text-[14px] text-[var(--ink)] underline underline-offset-2 hover:opacity-60 transition-opacity"
                        >
                            hello@steelgate.io
                        </a>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--prose-w)] mx-auto text-center">
                    <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold text-[var(--ink)] tracking-[-0.03em] leading-[1.1] mb-5">
                        Rezervă-ți locul. Lansare în România.
                    </h2>
                    <p className="text-[17px] text-[var(--ink-muted)] mb-8">
                        Comandă Steelgate și recâștigă controlul asupra fiecărui ecran din casă.
                    </p>
                    <a
                        href="/products"
                        className="inline-flex items-center px-8 py-4 rounded-full text-white text-[15px] font-semibold transition-colors duration-150"
                        style={{ background: 'var(--ink)' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#000'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
                    >
                        Comandă Steelgate
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}

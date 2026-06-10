import deviceImg from '../assets/images/newProductImage.png';

export default function ProductInfo() {
    return (
        <section className="w-full bg-[var(--bg)] px-6 py-[var(--section-y)]">
            <div className="max-w-[var(--content-w)] mx-auto">

                <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">

                    {/* Text */}
                    <div className="w-full md:w-1/2 flex flex-col gap-8">
                        <div>
                            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
                                Ce este Steelgate?
                            </p>
                            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-[var(--ink)] leading-[1.1] tracking-[-0.03em] max-w-[12ch]">
                                Nu un app. Un dispozitiv fizic.
                            </h2>
                        </div>

                        {/* Mobile image */}
                        <div className="md:hidden w-full flex items-center justify-center">
                            <img src={deviceImg} alt="Steelgate device" className="w-full max-w-[360px] object-contain" />
                        </div>

                        <div className="space-y-5 max-w-prose">
                            <p className="text-[17px] text-[var(--ink)] leading-[1.7]">
                                Steelgate este un dispozitiv compact care se conectează între routerul tău și
                                restul dispozitivelor din casă. Controlează la ce au acces toate ecranele — și când.
                            </p>
                            <p className="text-[17px] text-[var(--ink-muted)] leading-[1.7]">
                                Nu e o aplicație pe care o poți dezinstala într-un moment slab. Nu e o extensie
                                de browser care funcționează pe un singur dispozitiv. Operează la nivel de rețea —
                                orice telefon, tabletă, laptop sau televizor conectat la WiFi-ul tău trece automat prin el.
                            </p>
                        </div>
                    </div>

                    {/* Desktop image */}
                    <div className="hidden md:flex w-1/2 items-center justify-center">
                        <img src={deviceImg} alt="Steelgate device" className="w-full max-w-[500px] object-contain" />
                    </div>

                </div>
            </div>
        </section>
    );
}

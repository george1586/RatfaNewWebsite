import heroImg from '../assets/images/HeroImg.png';
import Button from '../elements/Button';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--bg)]"
            style={{ paddingTop: 'calc(var(--header-h) + 56px)', paddingBottom: '56px' }}>

            {/* Text block */}
            <div className="text-center w-full max-w-[var(--content-w)]">
                <h1 className="font-display text-[clamp(2.0rem,5vw,4rem)] text-[var(--ink)] leading-[1.05] tracking-[-0.02em] max-w-[20ch] mx-auto">
                    Ai zis de zece ori că reduci telefonul. De data asta, mediul tău face treaba.
                </h1>
            </div>

            {/* Product image — fills the visual middle of the viewport */}
            <div className="flex items-center justify-center w-full overflow-hidden py-10">
                <img
                    src={heroImg}
                    alt="Steelgate device"
                    className="w-full max-w-[420px] sm:max-w-[620px] object-contain drop-shadow-sm"
                />
            </div>

            {/* Body + CTA */}
            <div className="text-center max-w-prose mx-auto space-y-8">
                <p className="text-[17px] sm:text-[18px] text-[var(--ink-muted)] leading-[1.65]">
                    Steelgate este un dispozitiv hardware care se conectează la routerul tău
                    și blochează progresiv rețelele sociale, reclamele și notificările —
                    pe toate dispozitivele din casă. Nu ai nevoie de voință. Ai nevoie de un mediu diferit.
                </p>
                <div className="flex justify-center">
                    <Button />
                </div>
            </div>

        </section>
    );
}

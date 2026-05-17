import heroImg from '../assets/images/HeroImg.png';
import Button from '../elements/Button';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--bg)]"
            style={{ paddingTop: 'calc(var(--header-h) + 56px)', paddingBottom: '56px' }}>

            {/* Text block */}
            <div className="text-center w-full max-w-[var(--content-w)]">
                <h1 className="font-display text-[clamp(2.0rem,5vw,4rem)] text-[var(--ink)] leading-[1.05] tracking-[-0.02em] max-w-[20ch] mx-auto">
                    The hardware your household plugs in to take its attention back.
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
                    Block distracting apps and sites across every device in your home —
                    TikTok, Instagram, Reddit, news, adult content — on schedules you set.
                    One device, every screen in the house.
                </p>
                <div className="flex justify-center">
                    <Button />
                </div>
            </div>

        </section>
    );
}

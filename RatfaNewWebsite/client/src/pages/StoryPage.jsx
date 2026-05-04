import Footer from "../components/Footer";

export default function StoryPage() {
    return (
        <div className="bg-[var(--bg)] min-h-screen">

            {/* ── Hero ── */}
            <section className="pt-[calc(var(--header-h)+80px)] pb-20 px-6">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-6">
                        Our Story
                    </p>
                    <h1
                        className="text-[clamp(2.6rem,6vw,4.5rem)] font-display leading-[1.05] tracking-tight text-[var(--ink)] mb-8"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        We built the switch the algorithm hoped you'd never find.
                    </h1>
                    <p className="text-[1.2rem] text-[var(--ink-muted)] leading-relaxed">
                        Steelgate started as a personal problem. We couldn't put our phones down —
                        and neither could anyone else in our households. So we built something that
                        makes that choice for you.
                    </p>
                </div>
            </section>

            {/* ── Narrative: the problem ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--prose-w)] mx-auto space-y-8 text-[17px] text-[var(--ink)] leading-[1.75]">

                    <h2 className="text-[1.75rem] font-bold tracking-tight mb-2">
                        It's not a willpower problem
                    </h2>

                    <p>
                        Every app fighting for your attention is built by teams of engineers
                        whose entire job is to keep you scrolling. The autoplay, the infinite
                        feed, the notification at exactly the right moment — none of that is
                        accidental. It's the product. And it works. The average person now
                        spends over four hours a day on their phone, most of it on platforms
                        designed to be impossible to leave.
                    </p>

                    <p>
                        We saw it at dinner tables where everyone was on a screen. We saw it in
                        kids who couldn't sit with homework for fifteen minutes without reaching
                        for a phone. We saw it in ourselves — opening Instagram, closing it,
                        opening it again thirty seconds later without even realising. This isn't
                        a character flaw. You can't outrun an algorithm with determination alone.
                    </p>

                    <p>
                        The obvious solutions didn't work. Parental control apps got uninstalled.
                        Browser extensions only covered one device. Screen time settings were
                        trivial to bypass. Every software solution had the same problem: it lived
                        on the device that the distraction also lived on.
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
                            "You shouldn't have to fight your own home for your attention.
                            The rules should work whether you remember to enforce them or not."
                        </blockquote>
                        <p className="mt-6 text-white/50 text-[14px] tracking-wide uppercase font-medium">
                            — The Steelgate team
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Narrative: the solution ── */}
            <section className="px-6 mb-20">
                <div className="max-w-[var(--prose-w)] mx-auto space-y-8 text-[17px] text-[var(--ink)] leading-[1.75]">

                    <h2 className="text-[1.75rem] font-bold tracking-tight mb-2">
                        Hardware, because the device can't fix itself
                    </h2>

                    <p>
                        The answer had to sit upstream of the devices — not on them. A small box
                        between your router and the rest of your home, one that every phone,
                        tablet, laptop, and smart TV in the house passes through automatically.
                        No app to install. No setting to turn off. No way around it from a device
                        that's already been blocked.
                    </p>

                    <p>
                        That's Steelgate. You set the rules once — block TikTok after 9pm,
                        cut Instagram during school hours, kill short-form video feeds entirely
                        on weekdays — and it runs itself. The schedule doesn't require your
                        willpower to enforce it. It just works.
                    </p>

                    <p>
                        We also built in ad and tracker blocking at the network level. Every
                        website you visit quietly reports your behaviour to dozens of data brokers.
                        Every app phones home with more than it should. Steelgate cuts those
                        connections before they leave your home — faster pages, less noise, and
                        your data stays yours.
                    </p>
                </div>
            </section>

            {/* ── Timeline — 2025 only ── */}
            <section className="px-6 mb-24">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <h2 className="text-[1.75rem] font-bold tracking-tight mb-12">
                        Where we are now
                    </h2>
                    <div className="flex gap-8">
                        <div className="flex flex-col items-center">
                            <div
                                className="w-3 h-3 rounded-full mt-1 shrink-0"
                                style={{ background: 'var(--primary)' }}
                            />
                        </div>
                        <div>
                            <p className="text-[12px] font-bold tracking-[0.15em] uppercase text-[var(--primary)] mb-1">
                                2025
                            </p>
                            <p className="text-[17px] font-semibold text-[var(--ink)] mb-2">
                                Pre-order launches
                            </p>
                            <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed">
                                We opened pre-orders to bring Steelgate to the first households.
                                Every pre-order helps us refine the product before general availability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Founder sign-off ── */}
            <section className="px-6 mb-24">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <div
                        className="rounded-2xl p-8 md:p-12 border"
                        style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    >
                        <p className="text-[17px] text-[var(--ink)] leading-[1.75] mb-6">
                            We're still a small team. We answer our own emails. If you have
                            questions about what Steelgate does, how it works, or why we made a
                            certain design decision, reach out — we'd genuinely love to hear from you.
                        </p>
                        <p className="text-[14px] text-[var(--ink-muted)] mb-1">The Steelgate founders</p>
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
            <section className="px-6 mb-24">
                <div className="max-w-[var(--prose-w)] mx-auto text-center">
                    <h2
                        className="text-[clamp(1.8rem,4vw,2.8rem)] font-display tracking-tight text-[var(--ink)] mb-5"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Tech's best features are the ones you choose.
                    </h2>
                    <p className="text-[17px] text-[var(--ink-muted)] mb-8">
                        Pre-order Steelgate and take back control of every screen in your home.
                    </p>
                    <a
                        href="/products"
                        className="inline-flex items-center px-8 py-4 rounded-full text-white text-[15px] font-semibold transition-colors duration-150"
                        style={{ background: 'var(--ink)' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#000'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
                    >
                        Pre-Order Steelgate
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}

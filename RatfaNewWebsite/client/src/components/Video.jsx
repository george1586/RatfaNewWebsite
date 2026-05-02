import signature from '../assets/images/Signature.png';

export default function Video() {
    return (
        <section className="w-full bg-[var(--bg-alt)] px-6 py-[var(--section-y)]">
            <div className="max-w-[var(--content-w)] mx-auto">

                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">

                        {/* Video */}
                        <div className="w-full lg:w-[480px] shrink-0 aspect-video bg-[var(--bg-alt)]">
                            <iframe
                                src="https://player.vimeo.com/video/1184751749?badge=0&autopause=0&player_id=0&app_id=58479"
                                frameBorder="0"
                                loading="lazy"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                referrerPolicy="strict-origin-when-cross-origin"
                                className="w-full h-full"
                                allowFullScreen
                            />
                        </div>

                        {/* Quote */}
                        <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between gap-8">
                            <blockquote className="text-[17px] sm:text-[18px] text-[var(--ink)] leading-[1.7] space-y-4">
                                <p>"Screen time isn't going away on its own.</p>
                                <p>Your kids already know how to get around app timers. Your own habits are just as hard to break.</p>
                                <p>We built Steelgate because every solution we tried was either too easy to bypass, or too complicated to actually use.</p>
                                <p className="font-medium">One device in your home. Every screen under your control — on your schedule."</p>
                            </blockquote>

                            <div className="flex items-center justify-between pt-6 border-t border-[var(--border)]">
                                <div>
                                    <p className="text-[14px] font-semibold text-[var(--ink)]">Ichim-Andronache George</p>
                                    <p className="text-[13px] text-[var(--ink-muted)] mt-0.5">Steelgate Co-Founder</p>
                                </div>
                                <img src={signature} alt="Signature" className="max-w-[100px] opacity-70" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

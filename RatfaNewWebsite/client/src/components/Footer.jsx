const links = {
    Produs:   [['Funcționalități', '/#features'], ['Comandă', '/products'], ['Întrebări', '/faq']],
    Companie: [['Despre noi', '/story'], ['Contact', 'mailto:hello@steelgate.io']],
    Legal:    [['Confidențialitate', '/privacy'], ['Termeni', '/terms']],
};

export default function Footer() {
    return (
        <footer className="w-full bg-[#111] border-t border-white/10">
            <div className="max-w-[var(--content-w)] mx-auto px-6 py-16">

                <div className="flex flex-col lg:flex-row justify-between gap-12">

                    <div className="max-w-[260px]">
                        <p className="font-display text-[1.25rem] text-white mb-3">STEELGATE</p>
                        <p className="text-[14px] text-white/60 leading-relaxed">
                            Dăm fiecărei gospodării controlul asupra propriei atenții.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-10">
                        {Object.entries(links).map(([group, items]) => (
                            <div key={group}>
                                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/55 mb-4">
                                    {group}
                                </p>
                                <ul className="space-y-3">
                                    {items.map(([label, href]) => (
                                        <li key={label}>
                                            <a href={href}
                                                className="text-[14px] text-white/70 hover:text-white transition-colors duration-150">
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-white/10">
                    <p className="text-[13px] text-white/55">
                        © {new Date().getFullYear()} Steelgate. Toate drepturile rezervate.
                    </p>
                </div>

            </div>
        </footer>
    );
}

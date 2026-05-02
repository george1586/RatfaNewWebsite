import { FaTiktok, FaYoutube, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const links = {
    Product:  [['Features', '#'], ['Pre-Order', '/products'], ['FAQ', '#faq']],
    Company:  [['About', '#'], ['Contact', '#']],
    Legal:    [['Privacy', '#'], ['Terms', '#']],
};

export default function Footer() {
    return (
        <footer className="w-full bg-[#111] border-t border-white/10">
            <div className="max-w-[var(--content-w)] mx-auto px-6 py-16">

                <div className="flex flex-col lg:flex-row justify-between gap-12">

                    <div className="max-w-[260px]">
                        <p className="font-display text-lg text-white mb-3">STEELGATE</p>
                        <p className="text-[14px] text-white/45 leading-relaxed">
                            Giving every household control over its own attention.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-10">
                        {Object.entries(links).map(([group, items]) => (
                            <div key={group}>
                                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
                                    {group}
                                </p>
                                <ul className="space-y-3">
                                    {items.map(([label, href]) => (
                                        <li key={label}>
                                            <a href={href}
                                                className="text-[14px] text-white/50 hover:text-white transition-colors duration-150">
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-5">
                    <p className="text-[13px] text-white/30">
                        © {new Date().getFullYear()} Steelgate. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-white/40">
                        {[FaTiktok, FaYoutube, FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
                            <a key={i} href="#" className="hover:text-white transition-colors duration-150">
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}

import { FaTiktok, FaYoutube, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
    return (
        <footer className="w-full border-t border-[var(--border-light)] mt-24  bg-black">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="flex flex-col lg:flex-row justify-between gap-10">

                    <div className="max-w-sm">
                        <h2 className="text-2xl font-bold text-[var(--text-light)]">
                            Steelgate
                        </h2>
                        <p className="mt-4 text-[var(--text-light)]">
                            Giving every household control over its own attention.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">

                        <div>
                            <h3 className="text-sm font-semibold text-[var(--text-landing)] mb-4">
                                Product
                            </h3>
                            <ul className="space-y-2 text-[var(--text-light)]">
                                <li><a href="#" className="hover:text-white transition">Features</a></li>
                                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition">Security</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-[var(--text-landing)] mb-4">
                                Company
                            </h3>
                            <ul className="space-y-2 text-[var(--text-light)]">
                                <li><a href="#" className="hover:text-white transition">About</a></li>
                                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-[var(--text-landing)] mb-4">
                                Resources
                            </h3>
                            <ul className="space-y-2 text-[var(--text-light)]">
                                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition">Docs</a></li>
                                <li><a href="#" className="hover:text-white transition">Support</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-[var(--border-light)] flex flex-col sm:flex-row justify-between items-center gap-6">

                    <p className="text-sm text-[var(--text-light)]">
                        © {new Date().getFullYear()} Steelgate. All rights reserved.
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-5 text-[var(--text-light)]">
                        <a href="#" className="hover:text-white transition"><FaTiktok size={18} /></a>
                        <a href="#" className="hover:text-white transition"><FaYoutube size={18} /></a>
                        <a href="#" className="hover:text-white transition"><FaTwitter size={18} /></a>
                        <a href="#" className="hover:text-white transition"><FaLinkedin size={18} /></a>
                        <a href="#" className="hover:text-white transition"><FaGithub size={18} /></a>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
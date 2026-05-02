import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 h-[var(--header-h)] z-[100]"
            style={{ background: 'rgba(248,247,245,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>

            <div className="max-w-[var(--content-w)] mx-auto px-6 h-full flex items-center justify-between">

                <a href="/" className="font-display text-[1.25rem] tracking-tight text-[var(--ink)] hover:opacity-70 transition-opacity duration-150">
                    STEELGATE
                </a>

                <nav className="hidden md:flex items-center gap-10">
                    {[['Products', '/products'], ['FAQ', '#faq'], ['Community', '#com']].map(([label, href]) => (
                        <a key={label} href={href}
                            className="text-[15px] font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-150">
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center">
                    <a href="/products"
                        className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-[var(--ink)] text-white text-[14px] font-semibold hover:bg-black transition-colors duration-150">
                        Pre-Order
                    </a>
                    <button
                        className="md:hidden text-[var(--ink)] p-1"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div className={`md:hidden absolute top-[var(--header-h)] left-0 right-0 bg-[var(--bg)] border-b border-[var(--border)] transition-all duration-200 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
                <div className="flex flex-col px-6 py-6 gap-5">
                    {[['Products', '/products'], ['FAQ', '#faq'], ['Community', '#com']].map(([label, href]) => (
                        <a key={label} href={href}
                            className="text-[17px] font-medium text-[var(--ink)] hover:text-[var(--ink-muted)] transition-colors"
                            onClick={() => setIsOpen(false)}>
                            {label}
                        </a>
                    ))}
                    <a href="/products"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[var(--ink)] text-white text-[15px] font-semibold hover:bg-black transition-colors duration-150 mt-2"
                        onClick={() => setIsOpen(false)}>
                        Pre-Order — €10
                    </a>
                </div>
            </div>

        </header>
    );
}

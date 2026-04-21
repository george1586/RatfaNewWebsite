import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 w-screen h-[64px] bg-[var(--bg-top)] backdrop-blur-[12px] z-[100] border-b border-[var(--border-light)]">

            <div className=" mx-auto px-[24px] h-full flex items-center justify-between">

                <a
                    href="/"
                    className="text-[2rem] italic tracking-[-0.05em] text-[var(--text-light)] hover:text-[var(--text-dark)]"
                >
                    <strong>STEELGATE</strong>
                </a>

                <nav className="hidden md:flex gap-24 mr-[120px]">
                    <a
                        href="#products"
                        className="font-medium text-[1.25rem] text-[var(--text-light)] hover:text-[var(--text-dark)] transition-colors duration-100"
                    >
                        Products
                    </a>
                    <a
                        href="#faq"
                        className="font-medium text-[1.25rem] text-[var(--text-light)] hover:text-[var(--text-dark)] transition-colors duration-100"
                    >
                        FAQ
                    </a>
                    <a
                        href="#com"
                        className="font-medium text-[1.25rem] text-[var(--text-light)] hover:text-[var(--text-dark)] transition-colors duration-100"
                    >
                        Community
                    </a>
                </nav>

                <div className="flex items-center gap-4">

                    <button className="relative text-[var(--text-light)] hover:text-[var(--text-dark)]">
                        <ShoppingCart size={24} />
                    </button>

                    <button
                        className="md:hidden text-[var(--text-light)]"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>
            </div>

            <div
                className={`md:hidden absolute top-[64px] w-[50%]  right-0  bg-white border-b border-l border-[var(--border-light)] transition-all duration-300 ${isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center py-6 gap-6">

                    <a
                        href="#products"
                        className="text-[1.25rem] font-medium text-[var(--text-light)] hover:text-[var(--text-dark)]"
                        onClick={() => setIsOpen(false)}
                    >
                        Products
                    </a>

                    <a
                        href="#faq"
                        className="text-[1.25rem] font-medium text-[var(--text-light)] hover:text-[var(--text-dark)]"
                        onClick={() => setIsOpen(false)}
                    >
                        FAQ
                    </a>

                    <a
                        href="#com"
                        className="text-[1.25rem] font-medium text-[var(--text-light)] hover:text-[var(--text-dark)]"
                        onClick={() => setIsOpen(false)}
                    >
                        Community
                    </a>

                </div>
            </div>

        </header>
    );
};

export default Header;
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import db from '../../data/db.json'

export default function HeaderMweb() {
    const navLinks = db.headerMenuItems
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Disable page scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflowY = '';
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className="lg:hidden w-full text-white border-b border-white/10 bg-primary-gradient-1 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/pattern-04.svg')] before:bg-no-repeat before:bg-cover before:opacity-30 before:z-0 overflow-x-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-full">
                    {/* Header Top Layer */}
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="shrink-0">
                            <Image 
                                src="/logo.svg" 
                                alt="Gujarat Titans" 
                                width={100}
                                height={40}
                                className="h-8 w-auto"
                            />
                        </Link>

                        <div className="flex items-center">
                            {/* Hamburger button */}
                            <button 
                                onClick={toggleMenu}
                                className="flex flex-col gap-1.5 p-2 hover:opacity-80 transition-opacity relative z-50"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    // Close icon (X)
                                    <>
                                        <span className="w-6 h-0.5 bg-secondary rotate-45 translate-y-2 transition-all"></span>
                                        <span className="w-6 h-0.5 bg-secondary opacity-0 transition-all"></span>
                                        <span className="w-6 h-0.5 bg-secondary -rotate-45 -translate-y-2 transition-all"></span>
                                    </>
                                ) : (
                                    // Hamburger icon
                                    <>
                                        <span className="w-6 h-0.5 bg-secondary transition-all"></span>
                                        <span className="w-6 h-0.5 bg-secondary transition-all"></span>
                                        <span className="w-4 h-0.5 bg-secondary transition-all"></span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Backdrop/Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Nav Menu - Absolutely positioned, slides in from left */}
            <nav 
                className={`fixed top-0 left-0 h-full w-full max-w-sm bg-primary-gradient-1 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto overflow-x-hidden ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                aria-hidden={!isMenuOpen}
            >
                <div className="relative h-full before:content-[''] before:absolute before:inset-0 before:bg-[url('/pattern-04.svg')] before:bg-no-repeat before:bg-cover before:opacity-30 before:z-0">
                    <div className="relative z-10 px-6 py-8">
                        {/* Menu Header */}
                        <div className="flex justify-between items-center mb-8">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="shrink-0">
                                <Image 
                                    src="/logo.svg" 
                                    alt="Gujarat Titans" 
                                    width={100}
                                    height={40}
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <button 
                                onClick={toggleMenu}
                                className="flex flex-col gap-1.5 p-2 hover:opacity-80 transition-opacity"
                                aria-label="Close menu"
                            >
                                <span className="w-6 h-0.5 bg-secondary rotate-45 translate-y-2 transition-all"></span>
                                <span className="w-6 h-0.5 bg-secondary opacity-0 transition-all"></span>
                                <span className="w-6 h-0.5 bg-secondary -rotate-45 -translate-y-2 transition-all"></span>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <ul className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-sm font-bold uppercase tracking-widest hover:text-secondary transition-colors inline-block py-2 break-words text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

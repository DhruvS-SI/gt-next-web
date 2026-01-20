import Link from 'next/link'
import db from '../../data/db.json'

export default function HeaderMweb() {
    const navLinks = db.headerMenuItems

    return (
        <header className="lg:hidden w-full bg-primary text-white border-b border-white/10">
            <div className="px-5">
                {/* Header Top Layer */}
                <div className="flex justify-between items-center py-4">
                    <Link href="/">
                        <h1 className="text-xl font-bold text-secondary">Gujarat Titans</h1>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Simple search icon placeholder */}
                        <button className="p-1 hover:text-secondary transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Hamburger button */}
                        <button className="flex flex-col gap-1.5">
                            <span className="w-6 h-0.5 bg-secondary"></span>
                            <span className="w-6 h-0.5 bg-secondary"></span>
                            <span className="w-4 h-0.5 bg-secondary"></span>
                        </button>
                    </div>
                </div>

                {/* Horizontal Nav Scroll for mobile */}
                <nav className="overflow-x-auto no-scrollbar pb-3">
                    <ul className="flex items-center gap-6 whitespace-nowrap">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-[11px] font-bold uppercase tracking-widest hover:text-secondary transition-colors inline-block"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

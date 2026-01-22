import Link from 'next/link'
import db from '../../data/db.json'

export default function HeaderWeb() {
    const navLinks = db.headerMenuItems.slice(0, 6)
    const moreLinks = db.headerMenuItems.slice(6)

    return (
        <header className="hidden lg:block w-full text-white border-b border-white/10 bg-primary-gradient-1 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/pattern-04.svg')] before:opacity-30 before:z-0">
            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                {/* Header Bottom */}
                <div className="flex items-center justify-between gap-12">
                    <Link href="/" className="shrink-0">
                        <img src="/logo.svg" alt="Gujarat Titans" className="w-[127px] relative bottom-[-10px]" />
                    </Link>

                    <nav>
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-bold uppercase tracking-widest hover:text-secondary transition-colors py-4 inline-block relative group"
                                    >
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                            <li className="relative group">
                                <button className="text-sm font-bold uppercase tracking-widest hover:text-secondary transition-colors py-4 inline-block">
                                    More +
                                </button>
                                <div className="absolute top-full left-0 w-48 bg-primary border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                    <ul className="py-2">
                                        {moreLinks.map(link => (
                                            <li key={link.href}>
                                                <Link href={link.href} className="block px-4 py-2 text-sm hover:bg-white/5 hover:text-secondary transition-colors">
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

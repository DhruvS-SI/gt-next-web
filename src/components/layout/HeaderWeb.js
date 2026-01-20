import Link from 'next/link'
import db from '../../data/db.json'

export default function HeaderWeb() {
    const navLinks = db.headerMenuItems.slice(0, 6)
    const moreLinks = db.headerMenuItems.slice(6)

    return (
        <header className="hidden lg:block w-full bg-primary text-white border-b border-white/10">
            <div className="max-w-[1440px] mx-auto px-6">
                {/* Header Top */}
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <div className="flex items-center gap-8 flex-1">
                        <Link href="/" className="shrink-0">
                            <h1 className="text-3xl font-bold text-secondary tracking-tight">Gujarat Titans</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-6">
                            <div className="flex gap-3">
                                <Link href="#" className="hover:text-secondary transition-colors"><i className="icon-facebook text-lg"></i></Link>
                                <Link href="#" className="hover:text-secondary transition-colors"><i className="icon-twitter text-lg"></i></Link>
                                <Link href="#" className="hover:text-secondary transition-colors"><i className="icon-instagram text-lg"></i></Link>
                                <Link href="#" className="hover:text-secondary transition-colors"><i className="icon-youtube text-lg"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header Bottom */}
                <div className="flex justify-between items-center py-2">
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

                    <div className="flex items-center gap-6">
                        <button className="p-2 hover:text-secondary transition-colors">
                            <span className="text-sm font-bold uppercase tracking-widest">Search</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

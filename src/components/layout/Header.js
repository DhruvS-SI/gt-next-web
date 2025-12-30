import Link from 'next/link'

export default function Header() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '/matches', label: 'Matches' },
    { href: '/news', label: 'News' },
    { href: '/gallery', label: 'Gallery' },
  ]

  return (
    <header className="bg-[#1a2744] text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#d4af37]">Gujarat Titans</h1>
        </Link>
        
        <nav>
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="hover:text-[#d4af37] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

